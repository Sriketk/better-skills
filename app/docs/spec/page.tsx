export default function SpecPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold text-4xl tracking-tight">
          Protocol Specification
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The formal specification for the better-skills feed format and HTTP
          conventions.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Feed Format (feed.json)</h2>
        <p className="text-muted-foreground">
          Each skill server exposes a JSON manifest at a known endpoint,
          typically <code>/feed.json</code> or the root path <code>/</code>.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`{
  "version": "1.0",
  "name": "my-skills",
  "author": "Your Name",
  "homepage": "https://example.com",
  "description": "A collection of useful skills",
  "updated_at": "2026-01-31T12:00:00Z",
  "skills": [
    {
      "id": "skill-id",
      "name": "Skill Name",
      "description": "What this skill provides",
      "version": "1.0.0",
      "updated_at": "2026-01-30T10:00:00Z",
      "content_url": "/skills/skill-id.md",
      "tags": ["tag1", "tag2"],
      "triggers": ["keyword1", "keyword2"]
    }
  ]
}`}
          </pre>
        </div>

        <h3 className="font-semibold text-xl">Feed Fields</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Field</th>
              <th className="py-2 text-left">Type</th>
              <th className="py-2 text-left">Required</th>
              <th className="py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">
                <code>version</code>
              </td>
              <td>string</td>
              <td>Yes</td>
              <td>Protocol version (e.g., "1.0")</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>name</code>
              </td>
              <td>string</td>
              <td>Yes</td>
              <td>Name of this skill collection</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>author</code>
              </td>
              <td>string</td>
              <td>No</td>
              <td>Author or organization name</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>homepage</code>
              </td>
              <td>string (URL)</td>
              <td>No</td>
              <td>Homepage URL</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>description</code>
              </td>
              <td>string</td>
              <td>No</td>
              <td>Brief description</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>updated_at</code>
              </td>
              <td>string (ISO 8601)</td>
              <td>Yes</td>
              <td>Last update timestamp</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>skills</code>
              </td>
              <td>array</td>
              <td>Yes</td>
              <td>List of skill objects</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Skill Object</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Field</th>
              <th className="py-2 text-left">Type</th>
              <th className="py-2 text-left">Required</th>
              <th className="py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">
                <code>id</code>
              </td>
              <td>string</td>
              <td>Yes</td>
              <td>Unique identifier (URL-safe slug)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>name</code>
              </td>
              <td>string</td>
              <td>Yes</td>
              <td>Human-readable name</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>description</code>
              </td>
              <td>string</td>
              <td>No</td>
              <td>Brief description</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>version</code>
              </td>
              <td>string</td>
              <td>Yes</td>
              <td>Semantic version</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>updated_at</code>
              </td>
              <td>string (ISO 8601)</td>
              <td>Yes</td>
              <td>Last update timestamp</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>content_url</code>
              </td>
              <td>string</td>
              <td>Yes</td>
              <td>Relative or absolute URL to content</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>tags</code>
              </td>
              <td>array of strings</td>
              <td>No</td>
              <td>Tags for categorization</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>triggers</code>
              </td>
              <td>array of strings</td>
              <td>No</td>
              <td>Keywords that trigger this skill</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>dependencies</code>
              </td>
              <td>array of strings</td>
              <td>No</td>
              <td>IDs of dependent skills</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Skill Content Format</h2>
        <p className="text-muted-foreground">
          Individual skills are served as GitHub-flavored Markdown with optional
          YAML frontmatter.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`---
id: react-best-practices
name: React Best Practices
description: Performance optimization guidelines
version: 1.0.0
tags:
  - react
  - performance
triggers:
  - optimize react
  - react hooks
---

# React Best Practices

Content here in GitHub-flavored Markdown...`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">HTTP Conventions</h2>

        <h3 className="font-semibold text-xl">Endpoints</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Endpoint</th>
              <th className="py-2 text-left">Method</th>
              <th className="py-2 text-left">Content-Type</th>
              <th className="py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">
                <code>/</code> or <code>/feed.json</code>
              </td>
              <td>GET</td>
              <td>application/json</td>
              <td>Returns the feed manifest</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>/skills/:path.md</code>
              </td>
              <td>GET</td>
              <td>text/markdown</td>
              <td>Returns skill content</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>/health</code>
              </td>
              <td>GET</td>
              <td>application/json</td>
              <td>Health check endpoint</td>
            </tr>
          </tbody>
        </table>

        <h3 className="font-semibold text-xl">Caching Headers</h3>
        <p className="text-muted-foreground">
          Servers should include caching headers for efficient content delivery:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>
            <code>ETag</code>: Content hash for conditional requests
          </li>
          <li>
            <code>Last-Modified</code>: Last modification timestamp
          </li>
          <li>
            <code>Cache-Control</code>: Caching directives
          </li>
        </ul>

        <h3 className="font-semibold text-xl">Conditional Requests</h3>
        <p className="text-muted-foreground">
          Clients can send <code>If-None-Match</code> with the ETag value. If
          content hasn't changed, the server returns{" "}
          <code>304 Not Modified</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          Subscription Format (skills.json)
        </h2>
        <p className="text-muted-foreground">
          Agents maintain a subscription configuration file:
        </p>

        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`{
  "subscriptions": [
    {
      "url": "https://skills.example.com/feed.json",
      "name": "Example Skills",
      "skills": "*",
      "enabled": true,
      "priority": 10
    },
    {
      "url": "https://other.example.com/feed.json",
      "skills": ["skill-a", "skill-b"]
    }
  ],
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "directory": ".skills-cache"
  },
  "fetch": {
    "timeout": 10000,
    "retries": 3,
    "concurrent": 5
  }
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
