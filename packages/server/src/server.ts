import { createHash } from "node:crypto";
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { generateFeed, getSkillContent } from "./feed.js";
import type { ServeOptions, ServerConfig } from "./types.js";

/**
 * Generate an ETag from content
 */
function generateETag(content: string): string {
  return `"${createHash("md5").update(content).digest("hex")}"`;
}

/**
 * Set CORS headers
 */
function setCorsHeaders(res: ServerResponse): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, If-None-Match");
}

/**
 * Send JSON response
 */
function sendJson(
  res: ServerResponse,
  data: unknown,
  options: ServeOptions
): void {
  const content = JSON.stringify(data, null, 2);
  const etag = options.etag ? generateETag(content) : undefined;

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (etag) {
    res.setHeader("ETag", etag);
  }
  res.end(content);
}

/**
 * Send Markdown response
 */
function sendMarkdown(
  res: ServerResponse,
  content: string,
  options: ServeOptions
): void {
  const etag = options.etag ? generateETag(content) : undefined;

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  if (etag) {
    res.setHeader("ETag", etag);
  }
  res.end(content);
}

/**
 * Send 404 response
 */
function send404(res: ServerResponse): void {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Not found" }));
}

/**
 * Check if request can use cached version (304)
 */
function checkETagMatch(req: IncomingMessage, etag: string): boolean {
  const ifNoneMatch = req.headers["if-none-match"];
  return ifNoneMatch === etag;
}

/**
 * Handle feed requests
 */
async function handleFeedRequest(
  req: IncomingMessage,
  res: ServerResponse,
  config: ServerConfig,
  opts: ServeOptions
): Promise<void> {
  const feed = await generateFeed(config);
  const content = JSON.stringify(feed, null, 2);
  const etag = generateETag(content);

  if (opts.etag && checkETagMatch(req, etag)) {
    res.statusCode = 304;
    res.end();
    return;
  }

  sendJson(res, feed, opts);
}

/**
 * Handle skill content requests
 */
async function handleSkillRequest(
  req: IncomingMessage,
  res: ServerResponse,
  skillsDir: string,
  skillPath: string,
  opts: ServeOptions
): Promise<void> {
  const content = await getSkillContent(skillsDir, skillPath);

  if (!content) {
    send404(res);
    return;
  }

  const etag = generateETag(content);
  if (opts.etag && checkETagMatch(req, etag)) {
    res.statusCode = 304;
    res.end();
    return;
  }

  sendMarkdown(res, content, opts);
}

/**
 * Create and start the skills server
 */
export function createSkillsServer(
  config: ServerConfig,
  options: ServeOptions = {}
): ReturnType<typeof createServer> {
  const { skillsDir, port } = config;
  const opts: ServeOptions = {
    cors: options.cors ?? true,
    etag: options.etag ?? true,
  };

  const server = createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://localhost:${port}`);
    const path = url.pathname;

    // Handle CORS preflight
    if (opts.cors) {
      setCorsHeaders(res);
      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
      }
    }

    // Only handle GET requests
    if (req.method !== "GET") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Method not allowed" }));
      return;
    }

    try {
      // Feed endpoint
      if (path === "/" || path === "/feed.json") {
        await handleFeedRequest(req, res, config, opts);
        return;
      }

      // Skill content endpoint
      if (path.startsWith("/skills/")) {
        const skillPath = path.slice("/skills/".length);
        await handleSkillRequest(req, res, skillsDir, skillPath, opts);
        return;
      }

      // Health check
      if (path === "/health") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "ok" }));
        return;
      }

      send404(res);
    } catch (error) {
      console.error("Server error:", error);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  });

  return server;
}

/**
 * Start the server and listen on the specified port
 */
export function startServer(
  config: ServerConfig,
  options: ServeOptions = {}
): Promise<void> {
  const server = createSkillsServer(config, options);

  return new Promise((resolve) => {
    server.listen(config.port, () => {
      console.log(`Skills server running at http://localhost:${config.port}`);
      console.log(`  Feed:   http://localhost:${config.port}/feed.json`);
      console.log(`  Skills: http://localhost:${config.port}/skills/`);
      resolve();
    });
  });
}
