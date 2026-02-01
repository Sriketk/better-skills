# Example Skill Server

This is an example of how to host your own skill feed using the better-skills.

## Directory Structure

```
example-skill-server/
├── skills/
│   ├── react-best-practices.md
│   ├── nextjs-patterns.md
│   └── typescript-tips.md
├── package.json
└── README.md
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. The server will be running at `http://localhost:3001`:
   - Feed: `http://localhost:3001/feed.json`
   - Skills: `http://localhost:3001/skills/<skill-name>.md`

## Adding Skills

Create a new Markdown file in the `skills/` directory:

```markdown
---
id: my-new-skill
name: My New Skill
description: A helpful skill for agents
version: 1.0.0
tags:
  - example
---

# My New Skill

Skill content goes here...
```

The server will automatically pick up the new skill and include it in the feed.

## Deployment

### Vercel

1. Push this directory to a GitHub repository
2. Import the repository in Vercel
3. Your feed will be available at `https://your-project.vercel.app/feed.json`

### Docker

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]
```

### Cloudflare Workers

See the better-skills documentation for Cloudflare Workers deployment guide.
