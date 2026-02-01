# better-skills

A decentralized protocol for sharing AI agent skills via RSS-like feeds.

## The Problem

Current skill sharing requires manual installation (`npx skills add <repo>`). When skills are updated, users must manually reinstall. This leads to stale skills and maintenance overhead.

## The Solution

**better-skills** is an RSS-like system where:

- **Skill authors** host lightweight servers serving skills as Markdown
- **Agents** subscribe to feeds and fetch fresh content via API
- **Content stays up-to-date** automatically with caching and ETag validation

Think of it like RSS for blogs: authors host their own feeds, consumers subscribe and get updates automatically.

## Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Skill Author   │      │  Skill Author   │      │  Skill Author   │
│    Server A     │      │    Server B     │      │    Server C     │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         │  /feed.json            │  /feed.json            │  /feed.json
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          AI Agent                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ skills.json  │──│ Skills SDK   │──│ Local Cache  │              │
│  │ (subscriptions)│ │ (fetcher)    │  │ (ETag-based) │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

## Packages

This monorepo contains:

| Package | Description |
|---------|-------------|
| `@better-skills/schema` | JSON Schema definitions for feed and subscription formats |
| `@better-skills/server` | Reference server for hosting skill feeds |
| `@better-skills/client` | Client SDK for fetching skills in agents |

## Quick Start

### For Skill Authors

Host your skills by creating a directory of Markdown files:

```bash
# Create skills directory
mkdir skills
cat > skills/my-skill.md << 'EOF'
---
id: my-skill
name: My Skill
version: 1.0.0
tags: [example]
---

# My Skill

Skill content here...
EOF

# Start the server
npx @better-skills/server --dir ./skills --name "my-skills"

# Feed available at http://localhost:3001/feed.json
```

### For Agent Developers

Subscribe to skill feeds and fetch content:

```typescript
import { SkillsClient } from '@better-skills/client';

const client = SkillsClient.fromConfig({
  subscriptions: [
    { url: 'https://skills.example.com/feed.json', skills: '*' }
  ]
});

// Fetch all skills
const skills = await client.fetchAll();

// Use in LLM context
const context = skills.map(s => s.content).join('\n\n---\n\n');
```

## Feed Format

```json
{
  "version": "1.0",
  "name": "my-skills",
  "author": "Your Name",
  "updated_at": "2026-01-31T12:00:00Z",
  "skills": [
    {
      "id": "react-best-practices",
      "name": "React Best Practices",
      "version": "1.0.0",
      "updated_at": "2026-01-30T10:00:00Z",
      "content_url": "/skills/react-best-practices.md",
      "tags": ["react", "performance"]
    }
  ]
}
```

## Subscription Format

```json
{
  "subscriptions": [
    {
      "url": "https://skills.vercel.com/feed.json",
      "skills": ["react-best-practices"]
    },
    {
      "url": "https://expo.dev/skills/feed.json",
      "skills": "*"
    }
  ],
  "cache": {
    "enabled": true,
    "ttl": 3600
  }
}
```

## Development

```bash
# Install dependencies
bun install

# Run the documentation site
bun run dev

# Build all packages
bun run build:packages
```

## Examples

See the `examples/` directory for:

- `skill-server/` - Example skill server deployment
- `agent-integration/` - Example agent using the SDK

## Documentation

Visit the [documentation site](http://localhost:3000/docs) for:

- Protocol specification
- Server deployment guide
- Client SDK reference

## License

MIT
