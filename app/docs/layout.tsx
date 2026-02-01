import Link from "next/link";

const sidebarItems = [
  { title: "Overview", href: "/docs", number: "00" },
  { title: "Protocol Spec", href: "/docs/spec", number: "01" },
  { title: "Server Guide", href: "/docs/server", number: "02" },
  { title: "Client SDK", href: "/docs/client", number: "03" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid-bg min-h-screen bg-[#0a0a0a] text-[#e0e0e0]">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-[#2a2a2a] border-b bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link className="group flex items-center gap-3" href="/">
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
            <span className="font-mono text-[#39FF14] text-sm uppercase tracking-widest">
              better-skills
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              className="font-mono text-[#e0e0e0] text-xs uppercase tracking-wider"
              href="/docs"
            >
              Docs
            </Link>
            <a
              className="font-mono text-[#666] text-xs uppercase tracking-wider transition-colors hover:text-[#39FF14]"
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed top-16 bottom-0 left-0 hidden w-72 overflow-y-auto border-[#2a2a2a] border-r bg-[#0a0a0a] md:block">
          <nav className="p-6">
            <div className="mb-8">
              <span className="font-mono text-[#666] text-[10px] uppercase tracking-widest">
                Documentation
              </span>
            </div>
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  className="group flex items-center gap-4 border-transparent border-l-2 px-4 py-3 text-sm transition-all hover:border-[#39FF14] hover:bg-[#111]"
                  href={item.href}
                  key={item.href}
                >
                  <span className="font-mono text-[#39FF14]/50 text-xs group-hover:text-[#39FF14]">
                    {item.number}
                  </span>
                  <span className="body-text text-[#888] group-hover:text-[#e0e0e0]">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* Decorative element */}
            <div className="mt-12 border border-[#2a2a2a] bg-[#111] p-4">
              <div className="mb-2 font-mono text-[#39FF14]/50 text-[10px] uppercase tracking-widest">
                Status
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#39FF14]" />
                <span className="font-mono text-[#666] text-xs">
                  v1.0 Stable
                </span>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem)] flex-1 md:ml-72">
          <div className="mx-auto max-w-4xl px-8 py-16">
            <article className="docs-content">{children}</article>
          </div>
        </main>
      </div>

      <style global jsx>{`
        .docs-content h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 700;
          color: #e0e0e0;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .docs-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.875rem;
          font-weight: 600;
          color: #e0e0e0;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #2a2a2a;
        }

        .docs-content h3 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          font-weight: 600;
          color: #39FF14;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .docs-content p {
          font-family: 'Space Grotesk', sans-serif;
          color: #888;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .docs-content pre {
          background: #111 !important;
          border: 1px solid #2a2a2a;
          border-radius: 0;
          padding: 1.5rem;
          margin: 1.5rem 0;
          overflow-x: auto;
        }

        .docs-content code {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 0.875rem;
          color: #888;
        }

        .docs-content p code,
        .docs-content li code {
          background: #1a1a1a;
          padding: 0.125rem 0.375rem;
          border: 1px solid #2a2a2a;
          color: #39FF14;
        }

        .docs-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-family: 'Space Grotesk', sans-serif;
        }

        .docs-content th {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #39FF14;
          text-align: left;
          padding: 1rem;
          border-bottom: 1px solid #2a2a2a;
          background: #111;
        }

        .docs-content td {
          padding: 1rem;
          border-bottom: 1px solid #2a2a2a;
          color: #888;
          font-size: 0.875rem;
        }

        .docs-content ul,
        .docs-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .docs-content li {
          font-family: 'Space Grotesk', sans-serif;
          color: #888;
          line-height: 1.8;
          margin-bottom: 0.5rem;
        }

        .docs-content li::marker {
          color: #39FF14;
        }

        .docs-content a {
          color: #39FF14;
          text-decoration: none;
          border-bottom: 1px solid #39FF14;
          transition: all 0.2s;
        }

        .docs-content a:hover {
          color: #2dd310;
          border-color: #2dd310;
        }

        .docs-content blockquote {
          border-left: 2px solid #39FF14;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          color: #666;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
