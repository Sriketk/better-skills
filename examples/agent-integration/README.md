# Agent Integration Example

This example demonstrates how to integrate the better-skills into an AI agent.

## Prerequisites

First, start the example skill server:

```bash
cd ../skill-server
npm install
npm start
```

The skill server will be running at `http://localhost:3001`.

## Running the Example

```bash
npm install
npm start
```

## What This Example Demonstrates

1. **Creating a skills client** from a subscription configuration
2. **Listing available skills** (metadata only, no content)
3. **Fetching all skills** with their full content
4. **Fetching specific skills** by ID
5. **Fetching skills by tag** for filtering
6. **Building an LLM prompt** with skills as context
7. **Caching behavior** - second fetch is faster
8. **Force refresh** - bypassing the cache

## Configuration

The `skills.json` file contains the subscription configuration:

```json
{
  "subscriptions": [
    {
      "url": "http://localhost:3001/feed.json",
      "name": "Local Skills Server",
      "skills": "*",
      "enabled": true,
      "priority": 10
    }
  ],
  "cache": {
    "enabled": true,
    "ttl": 3600
  }
}
```

## Using in Your Agent

```typescript
import { SkillsClient } from '@better-skills/client';

// Create client
const client = SkillsClient.fromConfig(config);

// Fetch skills
const skills = await client.fetchAll();

// Build context for your LLM
const context = skills.map(s => s.content).join('\n\n---\n\n');

// Use in your agent's system prompt
const systemPrompt = `You have access to these skills:\n\n${context}`;
```

## Selective Skill Fetching

Instead of fetching all skills, you can be selective:

```typescript
// Fetch only React-related skills
const reactSkills = await client.fetchByTag('react');

// Fetch a specific skill
const skill = await client.fetchSkill('react-best-practices');

// Fetch multiple specific skills
const skills = await client.fetchAll({
  skillIds: ['react-best-practices', 'typescript-tips']
});
```

## Adding More Skill Feeds

Modify `skills.json` to subscribe to multiple feeds:

```json
{
  "subscriptions": [
    {
      "url": "http://localhost:3001/feed.json",
      "skills": "*"
    },
    {
      "url": "https://skills.vercel.com/feed.json",
      "skills": ["nextjs-patterns"]
    },
    {
      "url": "https://expo.dev/skills/feed.json",
      "skills": "*",
      "priority": 5
    }
  ]
}
```
