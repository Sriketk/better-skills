export default function ServerDocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Server Guide</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Learn how to host your own skill feed using the reference server.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Quick Start</h2>
        <p className="text-muted-foreground">
          The reference server automatically generates a feed from a directory
          of Markdown files.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`# Create a skills directory
mkdir skills

# Add a skill file
cat > skills/my-skill.md << 'EOF'
---
id: my-skill
name: My Skill
description: A useful skill for agents
version: 1.0.0
tags:
  - example
---

# My Skill

Skill content goes here...
EOF

# Start the server
npx @better-skills/server --dir ./skills --name "my-skills"`}
          </pre>
        </div>

        <p className="text-muted-foreground">
          The server will be running at <code>http://localhost:3001</code>:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>
            <code>/feed.json</code> - The skill feed manifest
          </li>
          <li>
            <code>/skills/my-skill.md</code> - Individual skill content
          </li>
          <li>
            <code>/health</code> - Health check endpoint
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">CLI Options</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Option</th>
              <th className="py-2 text-left">Default</th>
              <th className="py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">
                <code>--dir, -d</code>
              </td>
              <td>./skills</td>
              <td>Directory containing skill Markdown files</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>--port, -p</code>
              </td>
              <td>3001</td>
              <td>Port to listen on</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>--name, -n</code>
              </td>
              <td>my-skills</td>
              <td>Feed name</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>--author</code>
              </td>
              <td>-</td>
              <td>Author name</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>--homepage</code>
              </td>
              <td>-</td>
              <td>Homepage URL</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">
                <code>--description</code>
              </td>
              <td>-</td>
              <td>Feed description</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Skill File Format</h2>
        <p className="text-muted-foreground">
          Skills are Markdown files with optional YAML frontmatter. The server
          auto-generates metadata from the file if frontmatter is missing.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`---
id: react-best-practices        # Optional: defaults to filename
name: React Best Practices      # Optional: defaults to titleized id
description: Performance tips   # Optional
version: 1.0.0                  # Optional: defaults to 1.0.0
tags:                           # Optional
  - react
  - performance
triggers:                       # Optional: keywords that trigger this skill
  - optimize react
  - react hooks
dependencies:                   # Optional: other skill IDs this depends on
  - javascript-basics
---

# React Best Practices

Your skill content here in GitHub-flavored Markdown.

## Code Examples

\`\`\`tsx
const MyComponent = () => {
  return <div>Hello World</div>;
};
\`\`\`

## Tips

- Tip 1
- Tip 2
- Tip 3`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Programmatic Usage</h2>
        <p className="text-muted-foreground">
          You can also use the server programmatically in your own Node.js
          application.
        </p>

        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`import { createSkillsServer, startServer } from '@better-skills/server';

// Option 1: Create server and control it manually
const server = createSkillsServer({
  skillsDir: './skills',
  port: 3001,
  feedName: 'my-skills',
  author: 'Your Name',
});

server.listen(3001);

// Option 2: Use the convenience function
await startServer({
  skillsDir: './skills',
  port: 3001,
  feedName: 'my-skills',
});`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Deployment</h2>
        <p className="text-muted-foreground">
          The server is designed for easy deployment to serverless platforms.
        </p>

        <h3 className="font-semibold text-xl">Vercel</h3>
        <p className="text-muted-foreground">
          Create an API route that uses the server's feed generation:
        </p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`// app/api/feed/route.ts
import { generateFeed } from '@better-skills/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const feed = await generateFeed({
    skillsDir: './skills',
    port: 0,
    feedName: 'my-skills',
    author: 'Your Name',
  });

  return NextResponse.json(feed);
}`}
          </pre>
        </div>

        <h3 className="font-semibold text-xl">Docker</h3>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`FROM node:20-slim
WORKDIR /app
COPY skills/ ./skills/
RUN npm install -g @better-skills/server
EXPOSE 3001
CMD ["skills-server", "--dir", "./skills"]`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Features</h2>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>
            <strong>Auto-generation</strong>: Feed is generated from Markdown
            files automatically
          </li>
          <li>
            <strong>ETag support</strong>: Enables efficient caching with
            conditional requests
          </li>
          <li>
            <strong>CORS enabled</strong>: Cross-origin requests allowed by
            default
          </li>
          <li>
            <strong>Hot reload</strong>: Changes to skill files are reflected
            immediately
          </li>
          <li>
            <strong>Zero config</strong>: Works out of the box with sensible
            defaults
          </li>
        </ul>
      </section>
    </div>
  );
}
