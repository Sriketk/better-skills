import { createCacheKey, isCacheValid } from "./cache.js";
import type {
  CacheStore,
  ClientOptions,
  FetchResult,
  SkillFeed,
} from "./types.js";

const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_RETRIES = 3;

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number,
  fetchFn: typeof fetch
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout( () => controller.abort(), timeout );

  try {
    const response = await fetchFn( url, {
      ...options,
      signal: controller.signal,
    } );
    return response;
  } finally {
    clearTimeout( timeoutId );
  }
}

/**
 * Fetch with retry support
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  timeout: number,
  retries: number,
  fetchFn: typeof fetch
): Promise<Response> {
  let lastError: Error | undefined;

  for ( let attempt = 0; attempt <= retries; attempt++ ) {
    try {
      return await fetchWithTimeout( url, options, timeout, fetchFn );
    } catch ( error ) {
      lastError = error as Error;
      if ( attempt < retries ) {
        // Exponential backoff: 100ms, 200ms, 400ms, ...
        await new Promise( ( resolve ) => setTimeout( resolve, 100 * 2 ** attempt ) );
      }
    }
  }

  throw lastError;
}

/**
 * Fetch a skill feed from a URL
 */
export async function fetchFeed(
  url: string,
  options: ClientOptions = {}
): Promise<SkillFeed> {
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;
  const retries = options.retries ?? DEFAULT_RETRIES;
  const fetchFn = options.fetch ?? fetch;

  const response = await fetchWithRetry(
    url,
    {
      headers: {
        Accept: "application/json",
      },
    },
    timeout,
    retries,
    fetchFn
  );

  if ( !response.ok ) {
    throw new Error(
      `Failed to fetch feed: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<SkillFeed>;
}

/**
 * Fetch skill content with cache support
 */
export async function fetchSkillContent(
  url: string,
  cache: CacheStore,
  options: ClientOptions = {}
): Promise<FetchResult> {
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;
  const retries = options.retries ?? DEFAULT_RETRIES;
  const cacheTtl = options.cacheTtl ?? 3600;
  const fetchFn = options.fetch ?? fetch;
  const cacheKey = createCacheKey( url );

  // Check cache first
  const cached = cache.get( cacheKey );
  if ( cached && isCacheValid( cached, cacheTtl ) ) {
    return {
      content: cached.content,
      fromCache: true,
      etag: cached.etag,
    };
  }

  // Build request headers
  const headers: Record<string, string> = {
    Accept: "text/markdown, text/plain, */*",
  };

  // Include ETag for conditional request if we have cached content
  if ( cached?.etag ) {
    headers[ "If-None-Match" ] = cached.etag;
  }
  if ( cached?.lastModified ) {
    headers[ "If-Modified-Since" ] = cached.lastModified;
  }

  const response = await fetchWithRetry(
    url,
    { headers },
    timeout,
    retries,
    fetchFn
  );

  // Handle 304 Not Modified
  if ( response.status === 304 && cached ) {
    // Update cache timestamp
    cache.set( cacheKey, {
      ...cached,
      cachedAt: Date.now(),
    } );
    return {
      content: cached.content,
      fromCache: true,
      etag: cached.etag,
    };
  }

  if ( !response.ok ) {
    throw new Error(
      `Failed to fetch skill: ${response.status} ${response.statusText}`
    );
  }

  const content = await response.text();
  const etag = response.headers.get( "etag" ) ?? undefined;
  const lastModified = response.headers.get( "last-modified" ) ?? undefined;

  // Update cache
  cache.set( cacheKey, {
    content,
    etag,
    lastModified,
    cachedAt: Date.now(),
  } );

  return {
    content,
    fromCache: false,
    etag,
  };
}

/**
 * Resolve a relative URL against a base URL
 */
export function resolveUrl( baseUrl: string, path: string ): string {
  // If path is already absolute, return it
  if ( path.startsWith( "http://" ) || path.startsWith( "https://" ) ) {
    return path;
  }

  const base = new URL( baseUrl );
  return new URL( path, base.origin ).toString();
}
