import { readFile, stat } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import type { Skill, SkillFeed } from "@better-skills/schema";
import glob from "fast-glob";
import matter from "gray-matter";
import type {
  ParsedSkillFile,
  ServerConfig,
  SkillFrontmatter,
} from "./types.js";

/**
 * Parse a skill markdown file, extracting frontmatter and content
 */
export async function parseSkillFile(
  filePath: string,
  baseDir: string
): Promise<ParsedSkillFile> {
  const content = await readFile(filePath, "utf-8");
  const stats = await stat(filePath);
  const parsed = matter(content);

  return {
    frontmatter: parsed.data as SkillFrontmatter,
    content: parsed.content,
    filePath: relative(baseDir, filePath),
    updatedAt: stats.mtime,
  };
}

/**
 * Generate a skill ID from a filename
 */
function generateId(filePath: string): string {
  const name = basename(filePath, extname(filePath));
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generate a human-readable name from a skill ID
 */
function generateName(id: string): string {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Convert a parsed skill file to a Skill object
 */
function toSkill(parsed: ParsedSkillFile): Skill {
  const id = parsed.frontmatter.id || generateId(parsed.filePath);
  const name = parsed.frontmatter.name || generateName(id);

  return {
    id,
    name,
    description: parsed.frontmatter.description,
    version: parsed.frontmatter.version || "1.0.0",
    updated_at: parsed.updatedAt.toISOString(),
    content_url: `/skills/${parsed.filePath}`,
    tags: parsed.frontmatter.tags,
    triggers: parsed.frontmatter.triggers,
    dependencies: parsed.frontmatter.dependencies,
  };
}

/**
 * Generate a feed from a directory of skill markdown files
 */
export async function generateFeed(config: ServerConfig): Promise<SkillFeed> {
  const { skillsDir, feedName, author, homepage, description } = config;

  // Find all markdown files
  const files = await glob("**/*.md", {
    cwd: skillsDir,
    absolute: true,
  });

  // Parse all skill files
  const parsedFiles = await Promise.all(
    files.map((file) => parseSkillFile(file, skillsDir))
  );

  // Convert to skills
  const skills = parsedFiles.map(toSkill);

  // Sort by name
  skills.sort((a, b) => a.name.localeCompare(b.name));

  // Find the most recent update
  const latestUpdate = parsedFiles.reduce(
    (latest, file) => (file.updatedAt > latest ? file.updatedAt : latest),
    new Date(0)
  );

  return {
    version: "1.0",
    name: feedName,
    author,
    homepage,
    description,
    updated_at: latestUpdate.toISOString(),
    skills,
  };
}

/**
 * Get a single skill's content by ID
 */
export async function getSkillContent(
  skillsDir: string,
  skillPath: string
): Promise<string | null> {
  try {
    const fullPath = join(skillsDir, skillPath);
    const content = await readFile(fullPath, "utf-8");
    const parsed = matter(content);
    return parsed.content;
  } catch {
    return null;
  }
}
