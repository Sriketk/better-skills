export default function ClientDocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Client SDK</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Learn how to fetch skills in your AI agent using the client SDK.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Installation</h2>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`npm install @better-skills/client
# or
bun add @better-skills/client`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Quick Start</h2>

        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`import { SkillsClient } from '@better-skills/client';

// Create a client with subscriptions
const client = SkillsClient.fromConfig({
  subscriptions: [
    {
      url: 'https://skills.example.com/feed.json',
      skills: '*'  // Subscribe to all skills
    }
  ]
});

// Fetch all subscribed skills
const skills = await client.fetchAll();

// Each skill has content and metadata
for (const skill of skills) {
  console.log(skill.name);    // "React Best Practices"
  console.log(skill.content); // Markdown content
}

// Use in LLM context
const context = skills.map(s => s.content).join('\\n\\n---\\n\\n');`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Configuration</h2>
        <p className="text-muted-foreground">
          Create a subscription configuration either inline or from a file.
        </p>

        <h3 className="font-semibold text-xl">Subscription Config</h3>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`const config = {
  subscriptions: [
    {
      url: 'https://skills.vercel.com/feed.json',
      name: 'Vercel Skills',        // Optional friendly name
      skills: ['react-best-practices', 'nextjs-patterns'],
      enabled: true,                 // Can disable without removing
      priority: 10                   // Higher = preferred in conflicts
    },
    {
      url: 'https://expo.dev/skills/feed.json',
      skills: '*'                    // Subscribe to all
    }
  ],
  cache: {
    enabled: true,
    ttl: 3600                        // Cache for 1 hour
  },
  fetch: {
    timeout: 10000,                  // 10 second timeout
    retries: 3,                      // Retry failed requests
    concurrent: 5                    // Max concurrent requests
  }
};

const client = SkillsClient.fromConfig(config);`}
          </pre>
        </div>

        <h3 className="font-semibold text-xl">From URLs</h3>
        <p className="text-muted-foreground">
          Quick way to subscribe to all skills from multiple feeds:
        </p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`const client = SkillsClient.fromUrls([
  'https://skills.vercel.com/feed.json',
  'https://expo.dev/skills/feed.json'
]);`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">API Reference</h2>

        <h3 className="font-semibold text-xl">fetchAll(options?)</h3>
        <p className="text-muted-foreground">
          Fetch all subscribed skills and return their content.
        </p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`const skills = await client.fetchAll();

// With options
const skills = await client.fetchAll({
  forceRefresh: true,              // Bypass cache
  skillIds: ['react-best-practices'], // Only specific skills
  tags: ['react']                  // Filter by tag
});`}
          </pre>
        </div>

        <h3 className="font-semibold text-xl">fetchSkill(id)</h3>
        <p className="text-muted-foreground">Fetch a single skill by ID.</p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`const skill = await client.fetchSkill('react-best-practices');

if (skill) {
  console.log(skill.content);
}`}
          </pre>
        </div>

        <h3 className="font-semibold text-xl">fetchByTag(tag)</h3>
        <p className="text-muted-foreground">
          Fetch all skills with a specific tag.
        </p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`const reactSkills = await client.fetchByTag('react');`}
          </pre>
        </div>

        <h3 className="font-semibold text-xl">listSkills()</h3>
        <p className="text-muted-foreground">
          Get metadata for all available skills without fetching content.
        </p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`const allSkills = await client.listSkills();

for (const skill of allSkills) {
  console.log(\`\${skill.name} v\${skill.version}\`);
}`}
          </pre>
        </div>

        <h3 className="font-semibold text-xl">clearCache()</h3>
        <p className="text-muted-foreground">Clear the skill cache.</p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {"client.clearCache();"}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Caching</h2>
        <p className="text-muted-foreground">
          The client supports efficient caching using ETags. When a skill's
          content hasn't changed, the server returns 304 Not Modified and the
          cached version is used.
        </p>

        <h3 className="font-semibold text-xl">Custom Cache Store</h3>
        <p className="text-muted-foreground">
          Implement the CacheStore interface for custom storage (e.g., Redis,
          file system):
        </p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`import { SkillsClient, CacheStore } from '@better-skills/client';

class RedisCacheStore implements CacheStore {
  get(key: string) { /* ... */ }
  set(key: string, entry: CacheEntry) { /* ... */ }
  delete(key: string) { /* ... */ }
  clear() { /* ... */ }
  has(key: string) { /* ... */ }
}

const client = SkillsClient.fromConfig(config, {
  cache: new RedisCacheStore()
});`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">TypeScript Types</h2>
        <p className="text-muted-foreground">
          The client is fully typed. Key types:
        </p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`import type {
  Skill,              // Skill metadata
  SkillFeed,          // Feed manifest
  ResolvedSkill,      // Skill with content loaded
  SkillsSubscription, // Subscription config
  ClientOptions,      // Client options
  FetchAllOptions     // fetchAll options
} from '@better-skills/client';`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">Error Handling</h2>
        <p className="text-muted-foreground">
          The client handles errors gracefully and logs warnings for failed
          fetches:
        </p>
        <div className="rounded-lg bg-muted p-4">
          <pre className="overflow-x-auto text-sm">
            {`try {
  const skills = await client.fetchAll();
  // Some skills may have failed to fetch
  // Check the returned array length vs expected
} catch (error) {
  // Network error, all feeds unreachable
  console.error('Failed to fetch skills:', error);
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
