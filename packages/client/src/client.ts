import { MemoryCache } from "./cache.js";
import { fetchFeed, fetchSkillContent, resolveUrl } from "./fetcher.js";
import type {
  CacheStore,
  ClientOptions,
  FetchAllOptions,
  ResolvedSkill,
  Skill,
  SkillFeed,
  SkillsSubscription,
  Subscription,
} from "./types.js";

interface SkillToFetch {
  skill: Skill;
  feedUrl: string;
  feedName: string;
  priority: number;
}

/**
 * Check if a skill matches the filter options
 */
function matchesFilters(skill: Skill, options: FetchAllOptions): boolean {
  if (options.skillIds && !options.skillIds.includes(skill.id)) {
    return false;
  }
  if (options.tags && !skill.tags?.some((t) => options.tags?.includes(t))) {
    return false;
  }
  return true;
}

/**
 * Skills client for fetching and managing skill subscriptions
 */
export class SkillsClient {
  private readonly config: SkillsSubscription;
  private readonly cache: CacheStore;
  private readonly options: ClientOptions;
  private readonly feedCache = new Map<string, SkillFeed>();

  constructor(config: SkillsSubscription, options: ClientOptions = {}) {
    this.config = config;
    this.cache = options.cache ?? new MemoryCache();
    this.options = {
      timeout: config.fetch?.timeout ?? options.timeout ?? 10_000,
      retries: config.fetch?.retries ?? options.retries ?? 3,
      concurrent: config.fetch?.concurrent ?? options.concurrent ?? 5,
      cacheTtl: config.cache?.ttl ?? options.cacheTtl ?? 3600,
      fetch: options.fetch,
    };
  }

  /**
   * Create a client from a subscription configuration object
   */
  static fromConfig(
    config: SkillsSubscription,
    options?: ClientOptions
  ): SkillsClient {
    return new SkillsClient(config, options);
  }

  /**
   * Create a client from a list of feed URLs (subscribe to all skills)
   */
  static fromUrls(urls: string[], options?: ClientOptions): SkillsClient {
    const config: SkillsSubscription = {
      subscriptions: urls.map((url) => ({ url, skills: "*" })),
    };
    return new SkillsClient(config, options);
  }

  /**
   * Get enabled subscriptions
   */
  private getEnabledSubscriptions(): Subscription[] {
    return this.config.subscriptions.filter((s) => s.enabled !== false);
  }

  /**
   * Fetch all feeds and return them
   */
  async fetchFeeds(): Promise<Map<string, SkillFeed>> {
    const feeds = new Map<string, SkillFeed>();
    const subscriptions = this.getEnabledSubscriptions();
    const concurrent = this.options.concurrent ?? 5;

    for (let i = 0; i < subscriptions.length; i += concurrent) {
      const batch = subscriptions.slice(i, i + concurrent);
      const results = await Promise.allSettled(
        batch.map(async (sub) => {
          const feed = await fetchFeed(sub.url, this.options);
          return { url: sub.url, feed };
        })
      );

      for (const result of results) {
        if (result.status === "fulfilled") {
          feeds.set(result.value.url, result.value.feed);
          this.feedCache.set(result.value.url, result.value.feed);
        } else {
          console.warn(`Failed to fetch feed: ${result.reason}`);
        }
      }
    }

    return feeds;
  }

  /**
   * Get the list of skills to fetch from a subscription
   */
  private getSkillsToFetch(
    subscription: Subscription,
    feed: SkillFeed
  ): Skill[] {
    if (subscription.skills === "*") {
      return feed.skills;
    }

    const skillIds = new Set(subscription.skills);
    return feed.skills.filter((s) => skillIds.has(s.id));
  }

  /**
   * Collect skills from all subscriptions
   */
  private collectSkillsToFetch(
    feeds: Map<string, SkillFeed>,
    options: FetchAllOptions
  ): SkillToFetch[] {
    const skillsToFetch: SkillToFetch[] = [];
    const subscriptions = this.getEnabledSubscriptions();

    for (const sub of subscriptions) {
      const feed = feeds.get(sub.url);
      if (!feed) {
        continue;
      }

      const skills = this.getSkillsToFetch(sub, feed);
      for (const skill of skills) {
        if (!matchesFilters(skill, options)) {
          continue;
        }

        skillsToFetch.push({
          skill,
          feedUrl: sub.url,
          feedName: feed.name,
          priority: sub.priority ?? 0,
        });
      }
    }

    return skillsToFetch.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Fetch skill content for a batch of skills
   */
  private async fetchSkillBatch(
    batch: SkillToFetch[],
    options: FetchAllOptions
  ): Promise<ResolvedSkill[]> {
    const resolved: ResolvedSkill[] = [];

    const results = await Promise.allSettled(
      batch.map(async ({ skill, feedUrl, feedName }) => {
        const contentUrl = resolveUrl(feedUrl, skill.content_url);

        if (options.forceRefresh) {
          this.cache.delete(`skill:${contentUrl}`);
        }

        const result = await fetchSkillContent(
          contentUrl,
          this.cache,
          this.options
        );

        return {
          ...skill,
          content: result.content,
          feedUrl,
          feedName,
        } as ResolvedSkill;
      })
    );

    for (const result of results) {
      if (result.status === "fulfilled") {
        resolved.push(result.value);
      } else {
        console.warn(`Failed to fetch skill content: ${result.reason}`);
      }
    }

    return resolved;
  }

  /**
   * Fetch all subscribed skills and return their content
   */
  async fetchAll(options: FetchAllOptions = {}): Promise<ResolvedSkill[]> {
    const feeds = await this.fetchFeeds();
    const skillsToFetch = this.collectSkillsToFetch(feeds, options);
    const resolvedSkills: ResolvedSkill[] = [];
    const concurrent = this.options.concurrent ?? 5;

    for (let i = 0; i < skillsToFetch.length; i += concurrent) {
      const batch = skillsToFetch.slice(i, i + concurrent);
      const batchResults = await this.fetchSkillBatch(batch, options);
      resolvedSkills.push(...batchResults);
    }

    return resolvedSkills;
  }

  /**
   * Fetch a single skill by ID
   */
  async fetchSkill(skillId: string): Promise<ResolvedSkill | null> {
    const skills = await this.fetchAll({ skillIds: [skillId] });
    return skills[0] ?? null;
  }

  /**
   * Fetch skills by tag
   */
  fetchByTag(tag: string): Promise<ResolvedSkill[]> {
    return this.fetchAll({ tags: [tag] });
  }

  /**
   * Get all available skills (metadata only, no content)
   */
  async listSkills(): Promise<
    Array<Skill & { feedUrl: string; feedName: string }>
  > {
    const feeds = await this.fetchFeeds();
    const skills: Array<Skill & { feedUrl: string; feedName: string }> = [];
    const subscriptions = this.getEnabledSubscriptions();

    for (const sub of subscriptions) {
      const feed = feeds.get(sub.url);
      if (!feed) {
        continue;
      }

      const subSkills = this.getSkillsToFetch(sub, feed);
      for (const skill of subSkills) {
        skills.push({
          ...skill,
          feedUrl: sub.url,
          feedName: feed.name,
        });
      }
    }

    return skills;
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
    this.feedCache.clear();
  }

  /**
   * Get the current subscription configuration
   */
  getConfig(): SkillsSubscription {
    return this.config;
  }

  /**
   * Add a subscription
   */
  addSubscription(subscription: Subscription): void {
    this.config.subscriptions.push(subscription);
  }

  /**
   * Remove a subscription by URL
   */
  removeSubscription(url: string): void {
    this.config.subscriptions = this.config.subscriptions.filter(
      (s) => s.url !== url
    );
  }
}
