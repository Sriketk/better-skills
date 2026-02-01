#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { startServer } from "./server.js";
import type { ServerConfig } from "./types.js";

function printUsage(): void {
  console.log(`
Skills Server - Serve your skills as an RSS-like feed

Usage:
  skills-server [options]

Options:
  --dir, -d <path>      Directory containing skill markdown files (default: ./skills)
  --port, -p <number>   Port to listen on (default: 3001)
  --name, -n <string>   Feed name (default: "my-skills")
  --author <string>     Author name
  --homepage <url>      Homepage URL
  --description <text>  Feed description
  --help, -h            Show this help message

Examples:
  skills-server
  skills-server --dir ./my-skills --port 8080
  skills-server -d ./skills -n "vercel-skills" --author "Vercel"
`);
}

function parseArgs(args: string[]): Partial<ServerConfig> & { help?: boolean } {
  const config: Partial<ServerConfig> & { help?: boolean } = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];

    switch (arg) {
      case "--dir":
      case "-d":
        config.skillsDir = next;
        i++;
        break;
      case "--port":
      case "-p":
        config.port = Number.parseInt(next, 10);
        i++;
        break;
      case "--name":
      case "-n":
        config.feedName = next;
        i++;
        break;
      case "--author":
        config.author = next;
        i++;
        break;
      case "--homepage":
        config.homepage = next;
        i++;
        break;
      case "--description":
        config.description = next;
        i++;
        break;
      case "--help":
      case "-h":
        config.help = true;
        break;
      default:
        // Ignore unknown arguments
        break;
    }
  }

  return config;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const parsed = parseArgs(args);

  if (parsed.help) {
    printUsage();
    process.exit(0);
  }

  const config: ServerConfig = {
    skillsDir: resolve(parsed.skillsDir || "./skills"),
    port: parsed.port || 3001,
    feedName: parsed.feedName || "my-skills",
    author: parsed.author,
    homepage: parsed.homepage,
    description: parsed.description,
  };

  // Check if skills directory exists
  if (!existsSync(config.skillsDir)) {
    console.error(`Error: Skills directory not found: ${config.skillsDir}`);
    console.error(
      "Create it and add some .md files, or use --dir to specify a different path."
    );
    process.exit(1);
  }

  console.log("Starting skills server...");
  console.log(`  Skills directory: ${config.skillsDir}`);
  console.log(`  Feed name: ${config.feedName}`);
  console.log();

  await startServer(config);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
