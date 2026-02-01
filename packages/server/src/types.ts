export interface SkillFrontmatter {
  id?: string;
  name?: string;
  description?: string;
  version?: string;
  tags?: string[];
  triggers?: string[];
  dependencies?: string[];
}

export interface ParsedSkillFile {
  frontmatter: SkillFrontmatter;
  content: string;
  filePath: string;
  updatedAt: Date;
}

export interface ServerConfig {
  skillsDir: string;
  port: number;
  feedName: string;
  author?: string;
  homepage?: string;
  description?: string;
}

export interface ServeOptions {
  cors?: boolean;
  etag?: boolean;
}
