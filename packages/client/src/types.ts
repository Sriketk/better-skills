export type {
  ResolvedSkill,
  Skill,
  SkillFeed,
  SkillsSubscription,
  Subscription,
} from "@better-skills/schema";

export interface CacheEntry {
  content: string;
  etag?: string;
  lastModified?: string;
  cachedAt: number;
}

export interface CacheStore {
  get(key: string): CacheEntry | undefined;
  set(key: string, entry: CacheEntry): void;
  delete(key: string): void;
  clear(): void;
  has(key: string): boolean;
}

export interface FetchResult {
  content: string;
  fromCache: boolean;
  etag?: string;
}

export interface ClientOptions {
  /** Custom cache store (defaults to in-memory) */
  cache?: CacheStore;
  /** Request timeout in milliseconds (default: 10000) */
  timeout?: number;
  /** Number of retries for failed requests (default: 3) */
  retries?: number;
  /** Maximum concurrent requests (default: 5) */
  concurrent?: number;
  /** Cache TTL in seconds (default: 3600) */
  cacheTtl?: number;
  /** Custom fetch implementation */
  fetch?: typeof fetch;
}

export interface FetchAllOptions {
  /** Force refresh, ignoring cache */
  forceRefresh?: boolean;
  /** Only fetch specific skill IDs */
  skillIds?: string[];
  /** Filter by tags */
  tags?: string[];
}
