import Link from "next/link";

const ASCII_LOGO = `
███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`;

const FEED_EXAMPLE = `{
  "version": "1.0",
  "name": "vercel-skills",
  "updated_at": "2026-01-31T12:00:00Z",
  "skills": [
    {
      "id": "react-best-practices",
      "name": "React Best Practices",
      "version": "2.1.0",
      "content_url": "/skills/react.md"
    }
  ]
}`;

export default function HomePage() {
  return (
    <div className="grid-bg noise-overlay min-h-screen overflow-hidden bg-[#0a0a0a] text-[#e0e0e0]">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-[#2a2a2a] border-b bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link className="group flex items-center gap-3" href="/">
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
            <span className="font-mono text-[#39FF14] text-sm uppercase tracking-widest">
              better-skills
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              className="font-mono text-[#666] text-xs uppercase tracking-wider transition-colors hover:text-[#39FF14]"
              href="/docs"
            >
              Docs
            </Link>
            <Link
              className="font-mono text-[#666] text-xs uppercase tracking-wider transition-colors hover:text-[#39FF14]"
              href="/docs/spec"
            >
              Spec
            </Link>
            <Link
              className="font-mono text-[#666] text-xs uppercase tracking-wider transition-colors hover:text-[#39FF14]"
              href="/docs/server"
            >
              Server
            </Link>
            <a
              className="inline-flex h-8 items-center justify-center rounded-md border border-[#39FF14] px-3 font-mono text-[#39FF14] text-xs uppercase tracking-wider transition-colors hover:bg-[#39FF14] hover:text-[#0a0a0a]"
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center pt-16">
        {/* Decorative grid lines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
          <div className="absolute top-3/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
          <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#39FF14]/20 to-transparent" />
          <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#39FF14]/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          {/* ASCII Logo */}
          <pre className="ascii-art stagger-1 mx-auto mb-8 hidden animate-[slide-up-fade_0.8s_ease-out_forwards] border-none bg-transparent text-center opacity-60 md:block">
            {ASCII_LOGO}
          </pre>

          {/* Protocol badge */}
          <div className="stagger-1 mb-8 inline-flex animate-[slide-up-fade_0.6s_ease-out_forwards] items-center gap-2 border border-[#2a2a2a] bg-[#111] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#39FF14]" />
            <span className="font-mono text-[#666] text-xs uppercase tracking-widest">
              Protocol v1.0
            </span>
          </div>

          {/* Main heading */}
          <h1 className="display-heading stagger-2 mb-6 animate-[slide-up-fade_0.8s_ease-out_forwards] text-6xl md:text-8xl lg:text-9xl">
            <span className="text-[#e0e0e0]">RSS for</span>
            <br />
            <span className="neon-text">AI Agents</span>
          </h1>

          {/* Subheading */}
          <p className="body-text stagger-3 mx-auto mb-12 max-w-2xl animate-[slide-up-fade_0.8s_ease-out_forwards] text-[#666] text-xl md:text-2xl">
            A decentralized protocol for sharing agent skills via feeds.
            <br />
            <span className="text-[#888]">Always fresh. Never stale.</span>
          </p>

          {/* CTA buttons */}
          <div className="stagger-4 mb-20 flex animate-[slide-up-fade_0.8s_ease-out_forwards] flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="inline-flex h-11 items-center justify-center bg-[#39FF14] px-8 font-mono text-[#0a0a0a] text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all hover:bg-[#2dd310] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
              href="/docs"
            >
              Get Started
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center border border-[#2a2a2a] px-8 font-mono text-[#888] text-sm uppercase tracking-widest transition-colors hover:border-[#39FF14] hover:text-[#39FF14]"
              href="/docs/spec"
            >
              View Spec →
            </Link>
          </div>

          {/* Terminal preview */}
          <div className="stagger-5 mx-auto max-w-3xl animate-[slide-up-fade_1s_ease-out_forwards]">
            <div className="terminal-card overflow-hidden rounded-none p-0">
              <div className="flex items-center gap-2 border-[#2a2a2a] border-b bg-[#0a0a0a] px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27ca40]" />
                </div>
                <span className="ml-4 font-mono text-[#666] text-xs">
                  feed.json
                </span>
              </div>
              <pre className="overflow-x-auto border-none bg-[#111] p-6 text-left text-sm">
                <code className="text-[#888]">{FEED_EXAMPLE}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2">
          <span className="font-mono text-[#666] text-xs uppercase tracking-widest">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-[#39FF14] to-transparent" />
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="relative border-[#2a2a2a] border-t py-32">
        <div className="absolute top-8 left-8 font-mono text-[#39FF14]/30 text-xs uppercase tracking-widest">
          01 — The Problem
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Problem side */}
            <div className="space-y-8">
              <h2 className="display-heading text-4xl text-[#e0e0e0] md:text-5xl">
                Skills go{" "}
                <span className="text-[#ff5f56] line-through opacity-60">
                  stale
                </span>
              </h2>
              <div className="body-text space-y-4 text-[#666]">
                <p className="flex items-start gap-4">
                  <span className="font-mono text-[#ff5f56]">✗</span>
                  Manual installation via CLI
                </p>
                <p className="flex items-start gap-4">
                  <span className="font-mono text-[#ff5f56]">✗</span>
                  Updates require re-running commands
                </p>
                <p className="flex items-start gap-4">
                  <span className="font-mono text-[#ff5f56]">✗</span>
                  Skills become outdated silently
                </p>
                <p className="flex items-start gap-4">
                  <span className="font-mono text-[#ff5f56]">✗</span>
                  Maintenance overhead for users
                </p>
              </div>
              <div className="border border-[#2a2a2a] bg-[#111] p-4 font-mono text-sm">
                <span className="text-[#888]">$</span> npx skills add owner/repo
                <br />
                <span className="text-[#666] opacity-50">
                  {"# ...3 months later..."}
                </span>
                <br />
                <span className="text-[#888]">$</span> npx skills add owner/repo{" "}
                <span className="text-[#ff5f56]">{"# again?"}</span>
              </div>
            </div>

            {/* Solution side */}
            <div className="space-y-8 lg:border-[#2a2a2a] lg:border-l lg:pl-16">
              <h2 className="display-heading text-4xl text-[#e0e0e0] md:text-5xl">
                Subscribe. <span className="neon-text-subtle">Stay fresh.</span>
              </h2>
              <div className="body-text space-y-4 text-[#666]">
                <p className="flex items-start gap-4">
                  <span className="font-mono text-[#39FF14]">✓</span>
                  Skill authors host lightweight servers
                </p>
                <p className="flex items-start gap-4">
                  <span className="font-mono text-[#39FF14]">✓</span>
                  Agents subscribe to feeds via URL
                </p>
                <p className="flex items-start gap-4">
                  <span className="font-mono text-[#39FF14]">✓</span>
                  Content fetched fresh with ETag caching
                </p>
                <p className="flex items-start gap-4">
                  <span className="font-mono text-[#39FF14]">✓</span>
                  Zero maintenance, always up-to-date
                </p>
              </div>
              <div className="border border-[#39FF14]/30 bg-[#111] p-4 font-mono text-sm shadow-[0_0_20px_rgba(57,255,20,0.1)]">
                <span className="text-[#39FF14]">const</span> skills ={" "}
                <span className="text-[#39FF14]">await</span> client.fetchAll();
                <br />
                <span className="text-[#666]">
                  {"// Always fresh. Always current."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative border-[#2a2a2a] border-t py-32">
        <div className="absolute top-8 left-8 font-mono text-[#39FF14]/30 text-xs uppercase tracking-widest">
          02 — How It Works
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <h2 className="display-heading mb-4 text-center text-5xl md:text-6xl">
            Three <span className="neon-text-subtle">components</span>
          </h2>
          <p className="body-text mx-auto mb-20 max-w-xl text-center text-[#666]">
            A simple, decentralized architecture inspired by RSS
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Author */}
            <div className="group relative">
              <div className="absolute -inset-px bg-gradient-to-b from-[#39FF14]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative h-full border border-[#2a2a2a] bg-[#111] p-8 transition-colors hover:border-[#39FF14]/50">
                <div className="mb-6 font-mono text-6xl text-[#39FF14]/20">
                  01
                </div>
                <h3 className="mono-heading mb-4 text-[#39FF14] text-sm">
                  Skill Authors
                </h3>
                <p className="body-text mb-6 text-[#666] text-sm">
                  Write skills as Markdown files. Deploy a server that
                  auto-generates the feed.
                </p>
                <div className="border border-[#2a2a2a] bg-[#0a0a0a] p-3 font-mono text-[#888] text-xs">
                  skills-server --dir ./skills
                </div>
              </div>
            </div>

            {/* Protocol */}
            <div className="group relative md:-mt-8">
              <div className="absolute -inset-px bg-gradient-to-b from-[#39FF14]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative h-full border border-[#2a2a2a] bg-[#111] p-8 transition-colors hover:border-[#39FF14]/50">
                <div className="mb-6 font-mono text-6xl text-[#39FF14]/20">
                  02
                </div>
                <h3 className="mono-heading mb-4 text-[#39FF14] text-sm">
                  Feed Protocol
                </h3>
                <p className="body-text mb-6 text-[#666] text-sm">
                  JSON manifest listing skills with metadata. Each skill served
                  as Markdown.
                </p>
                <div className="border border-[#2a2a2a] bg-[#0a0a0a] p-3 font-mono text-[#888] text-xs">
                  GET /feed.json
                </div>
              </div>
            </div>

            {/* Agent */}
            <div className="group relative">
              <div className="absolute -inset-px bg-gradient-to-b from-[#39FF14]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative h-full border border-[#2a2a2a] bg-[#111] p-8 transition-colors hover:border-[#39FF14]/50">
                <div className="mb-6 font-mono text-6xl text-[#39FF14]/20">
                  03
                </div>
                <h3 className="mono-heading mb-4 text-[#39FF14] text-sm">
                  Agent SDK
                </h3>
                <p className="body-text mb-6 text-[#666] text-sm">
                  Subscribe to feeds. Fetch and cache skills. Use directly in
                  LLM context.
                </p>
                <div className="border border-[#2a2a2a] bg-[#0a0a0a] p-3 font-mono text-[#888] text-xs">
                  client.fetchAll()
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="relative overflow-hidden border-[#2a2a2a] border-t py-32">
        <div className="absolute top-8 left-8 font-mono text-[#39FF14]/30 text-xs uppercase tracking-widest">
          03 — Quick Start
        </div>

        {/* Decorative element */}
        <div className="absolute top-1/2 right-0 h-full w-1/3 -translate-y-1/2 opacity-5">
          <div className="h-full w-full bg-[length:60px_60px] bg-[linear-gradient(45deg,#39FF14_25%,transparent_25%,transparent_75%,#39FF14_75%,#39FF14),linear-gradient(45deg,#39FF14_25%,transparent_25%,transparent_75%,#39FF14_75%,#39FF14)] bg-[position:0_0,30px_30px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <h2 className="display-heading mb-4 text-5xl md:text-6xl">
            Start in <span className="neon-text-subtle">seconds</span>
          </h2>
          <p className="body-text mb-16 max-w-xl text-[#666]">
            Three steps to connect your agent to the skills ecosystem
          </p>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="border border-[#2a2a2a] bg-[#111]">
              <div className="flex items-center gap-4 border-[#2a2a2a] border-b px-6 py-4">
                <span className="font-mono text-[#39FF14] text-sm">01</span>
                <span className="mono-heading text-[#888] text-xs">
                  Create Subscription
                </span>
              </div>
              <pre className="overflow-x-auto border-none bg-transparent p-6">
                <code className="text-sm">
                  <span className="text-[#666]">{"// skills.json"}</span>
                  {"\n"}
                  {`{
  `}
                  <span className="text-[#39FF14]">"subscriptions"</span>
                  {`: [
    { `}
                  <span className="text-[#39FF14]">"url"</span>
                  {`: "https://skills.vercel.com/feed.json" }
  ]
}`}
                </code>
              </pre>
            </div>

            {/* Step 2 */}
            <div className="border border-[#2a2a2a] bg-[#111]">
              <div className="flex items-center gap-4 border-[#2a2a2a] border-b px-6 py-4">
                <span className="font-mono text-[#39FF14] text-sm">02</span>
                <span className="mono-heading text-[#888] text-xs">
                  Fetch Skills
                </span>
              </div>
              <pre className="overflow-x-auto border-none bg-transparent p-6">
                <code className="text-sm">
                  <span className="text-[#39FF14]">import</span>
                  {" { SkillsClient } "}
                  <span className="text-[#39FF14]">from</span>
                  {" '@better-skills/client';\n\n"}
                  <span className="text-[#39FF14]">const</span>
                  {
                    " client = SkillsClient.fromUrls([\n  'https://skills.vercel.com/feed.json'\n]);\n\n"
                  }
                  <span className="text-[#39FF14]">const</span>
                  {" skills = "}
                  <span className="text-[#39FF14]">await</span>
                  {" client.fetchAll();"}
                </code>
              </pre>
            </div>

            {/* Step 3 */}
            <div className="border border-[#2a2a2a] bg-[#111]">
              <div className="flex items-center gap-4 border-[#2a2a2a] border-b px-6 py-4">
                <span className="font-mono text-[#39FF14] text-sm">03</span>
                <span className="mono-heading text-[#888] text-xs">
                  Use in Context
                </span>
              </div>
              <pre className="overflow-x-auto border-none bg-transparent p-6">
                <code className="text-sm">
                  <span className="text-[#39FF14]">const</span>
                  {
                    " context = skills.map(s => s.content).join('\\n---\\n');\n\n"
                  }
                  <span className="text-[#666]">
                    {"// Feed directly to your LLM"}
                  </span>
                  {"\nsystemPrompt += context;"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-[#2a2a2a] border-t py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#39FF14]/5 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="display-heading mb-6 text-5xl md:text-7xl">
            Ready to <span className="neon-text">subscribe</span>?
          </h2>
          <p className="body-text mx-auto mb-12 max-w-xl text-[#666] text-xl">
            Read the docs. Host your skills. Join the decentralized skills
            ecosystem.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              className="inline-flex h-12 items-center justify-center bg-[#39FF14] px-10 font-mono text-[#0a0a0a] text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all hover:bg-[#2dd310] hover:shadow-[0_0_50px_rgba(57,255,20,0.6)]"
              href="/docs"
            >
              Read the Docs
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center border border-[#2a2a2a] px-10 font-mono text-[#888] text-sm uppercase tracking-widest transition-colors hover:border-[#39FF14] hover:text-[#39FF14]"
              href="/docs/spec"
            >
              Protocol Spec
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-[#2a2a2a] border-t py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#39FF14]" />
              <span className="font-mono text-[#666] text-xs uppercase tracking-widest">
                better-skills
              </span>
            </div>
            <p className="font-mono text-[#666] text-xs">
              Open source. Decentralized. For AI agents.
            </p>
            <div className="flex items-center gap-6">
              <Link
                className="font-mono text-[#666] text-xs uppercase tracking-wider hover:text-[#39FF14]"
                href="/docs"
              >
                Docs
              </Link>
              <a
                className="font-mono text-[#666] text-xs uppercase tracking-wider hover:text-[#39FF14]"
                href="https://github.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
