import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 border border-[#2a2a2a] bg-[#111] px-3 py-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#39FF14]" />
          <span className="font-mono text-[#666] text-[10px] uppercase tracking-widest">
            Documentation
          </span>
        </div>
        <h1 className="display-heading text-5xl text-[#e0e0e0] md:text-6xl">
          better-skills
        </h1>
        <p className="body-text max-w-2xl text-[#666] text-xl">
          A decentralized system for sharing AI agent skills via RSS-like feeds.
          Subscribe once, stay updated forever.
        </p>
      </header>

      {/* What is it */}
      <section className="space-y-6">
        <h2 className="display-heading border-[#2a2a2a] border-b pb-4 text-3xl text-[#e0e0e0]">
          What is the better-skills?
        </h2>
        <div className="body-text space-y-4 text-[#888]">
          <p>
            The better-skills replaces traditional skill installation with a
            subscription model. Instead of running <code>npx skills add</code>{" "}
            every time you want to update, agents subscribe to skill feeds and
            fetch fresh content automatically.
          </p>
          <p>
            Think of it like RSS for blogs: skill authors host their own feeds,
            and agents subscribe to get the latest content. No more stale
            skills, no more manual updates.
          </p>
        </div>

        {/* Diagram */}
        <div className="border border-[#2a2a2a] bg-[#111] p-8 font-mono text-sm">
          <div className="mb-4 text-[#39FF14]/50">{"// Architecture"}</div>
          <pre className="overflow-x-auto text-[#888]">
            {`┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Author A  │     │   Author B  │     │   Author C  │
│   /feed.json│     │   /feed.json│     │   /feed.json│
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                           ▼
                 ┌─────────────────┐
                 │    AI Agent     │
                 │  ┌───────────┐  │
                 │  │ skills.json│  │
                 │  │ (subs)    │  │
                 │  └───────────┘  │
                 └─────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="space-y-6">
        <h2 className="display-heading border-[#2a2a2a] border-b pb-4 text-3xl text-[#e0e0e0]">
          Key Concepts
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              number: "01",
              title: "Skill Feed",
              description:
                "A JSON manifest at a known URL listing available skills with metadata.",
            },
            {
              number: "02",
              title: "Skill Content",
              description:
                "Individual skills served as GitHub-flavored Markdown with optional frontmatter.",
            },
            {
              number: "03",
              title: "Subscription",
              description:
                "Agent's local config file listing feed URLs and which skills to fetch.",
            },
            {
              number: "04",
              title: "ETag Caching",
              description:
                "Efficient caching with conditional requests. No bandwidth wasted on unchanged content.",
            },
          ].map((item) => (
            <div
              className="group border border-[#2a2a2a] bg-[#111] p-6 transition-colors hover:border-[#39FF14]/30"
              key={item.number}
            >
              <span className="mb-4 block font-mono text-4xl text-[#39FF14]/20">
                {item.number}
              </span>
              <h3 className="mono-heading mb-2 text-[#39FF14] text-xs">
                {item.title}
              </h3>
              <p className="body-text text-[#666] text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-6">
        <h2 className="display-heading border-[#2a2a2a] border-b pb-4 text-3xl text-[#e0e0e0]">
          Quick Links
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/docs/spec",
              title: "Protocol Spec",
              description: "JSON schema and HTTP conventions",
            },
            {
              href: "/docs/server",
              title: "Server Guide",
              description: "Host your own skill feed",
            },
            {
              href: "/docs/client",
              title: "Client SDK",
              description: "Fetch skills in your agent",
            },
          ].map((link) => (
            <Link
              className="group block border border-[#2a2a2a] bg-[#0a0a0a] p-6 transition-all hover:border-[#39FF14] hover:bg-[#111]"
              href={link.href}
              key={link.href}
            >
              <div className="mb-2 flex items-center gap-2">
                <h3 className="mono-heading text-[#888] text-xs group-hover:text-[#39FF14]">
                  {link.title}
                </h3>
                <span className="text-[#39FF14] opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </div>
              <p className="body-text text-[#666] text-sm">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-6">
        <h2 className="display-heading border-[#2a2a2a] border-b pb-4 text-3xl text-[#e0e0e0]">
          Quick Start
        </h2>

        <div className="space-y-4">
          <div className="border border-[#2a2a2a] bg-[#111]">
            <div className="flex items-center gap-4 border-[#2a2a2a] border-b px-4 py-3">
              <span className="font-mono text-[#39FF14] text-xs">01</span>
              <span className="mono-heading text-[#666] text-[10px]">
                Install SDK
              </span>
            </div>
            <pre className="overflow-x-auto p-4">
              <code className="text-[#888] text-sm">
                npm install @better-skills/client
              </code>
            </pre>
          </div>

          <div className="border border-[#2a2a2a] bg-[#111]">
            <div className="flex items-center gap-4 border-[#2a2a2a] border-b px-4 py-3">
              <span className="font-mono text-[#39FF14] text-xs">02</span>
              <span className="mono-heading text-[#666] text-[10px]">
                Fetch Skills
              </span>
            </div>
            <pre className="overflow-x-auto p-4">
              <code className="text-[#888] text-sm">
                {`import { SkillsClient } from '@better-skills/client';

const client = SkillsClient.fromUrls([
  'https://skills.example.com/feed.json'
]);

const skills = await client.fetchAll();`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
