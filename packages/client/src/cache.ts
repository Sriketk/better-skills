import type { CacheEntry, CacheStore } from "./types.js";

/**
 * In-memory cache implementation
 */
export class MemoryCache implements CacheStore {
  private readonly store = new Map<string, CacheEntry>();

  get( key: string ): CacheEntry | undefined {
    return this.store.get( key );
  }

  set( key: string, entry: CacheEntry ): void {
    this.store.set( key, entry );
  }

  delete( key: string ): void {
    this.store.delete( key );
  }

  clear(): void {
    this.store.clear();
  }

  has( key: string ): boolean {
    return this.store.has( key );
  }

  size(): number {
    return this.store.size;
  }

  keys(): string[] {
    return Array.from( this.store.keys() );
  }
}

/**
 * Check if a cache entry is still valid based on TTL
 */
export function isCacheValid( entry: CacheEntry, ttlSeconds: number ): boolean {
  const now = Date.now();
  const age = ( now - entry.cachedAt ) / 1000;
  return age < ttlSeconds;
}

/**
 * Create a cache key for a URL
 */
export function createCacheKey( url: string ): string {
  return `skill:${url}`;
}
