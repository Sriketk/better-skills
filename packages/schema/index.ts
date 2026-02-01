// biome-ignore lint/performance/noBarrelFile: Package entry point requires barrel exports
export { default as feedSchema } from "./feed.schema.json";
export { default as subscriptionSchema } from "./subscription.schema.json";

// TypeScript types derived from the schemas

export interface Skill {
  id: string;
  name: string;
  description?: string;
  version: string;
  updated_at: string;
  content_url: string;
  tags?: string[];
  triggers?: string[];
  dependencies?: string[];
}

export interface SkillFeed {
  version: string;
  name: string;
  author?: string;
  homepage?: string;
  description?: string;
  updated_at: string;
  skills: Skill[];
}

export interface Subscription {
  url: string;
  name?: string;
  skills?: "*" | string[];
  enabled?: boolean;
  priority?: number;
}

export interface CacheConfig {
  enabled?: boolean;
  ttl?: number;
  directory?: string;
}

export interface FetchConfig {
  timeout?: number;
  retries?: number;
  concurrent?: number;
}

export interface SkillsSubscription {
  subscriptions: Subscription[];
  cache?: CacheConfig;
  fetch?: FetchConfig;
}

// Resolved skill with content loaded
export interface ResolvedSkill extends Skill {
  content: string;
  feedUrl: string;
  feedName: string;
}
