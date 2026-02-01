/**
 * Demo: Fetching skills from externally-hosted Markdown files
 *
 * This example shows how better-skills can consume skills
 * that are hosted anywhere on the web.
 */

import { SkillsClient } from "../../packages/client/src/index";

async function main() {
  console.log( "better-skills - External Skills Demo\n" );
  console.log( "=".repeat( 50 ) );

  // Option 1: If you have a feed.json hosted somewhere
  // const client = SkillsClient.fromUrls(['https://example.com/feed.json']);

  // Option 2: Create a client with inline config pointing to external content
  // (Shown for reference - you'd use this when your feed.json is hosted)
  const _client = SkillsClient.fromConfig( {
    subscriptions: [
      {
        // This feed.json references external markdown files
        url: "https://www.sriket.com/feed.json", // You'd host this feed.json
        name: "Sriket Skills",
        skills: "*",
        enabled: true,
      },
    ],
    fetch: {
      timeout: 15_000,
      retries: 2,
    },
  } );

  // For this demo, let's directly fetch the external markdown
  console.log(
    "\nFetching skill from: https://www.sriket.com/react-useeffect-guide.md\n"
  );

  try {
    // Direct fetch demo (simulating what the client does)
    const response = await fetch(
      "https://www.sriket.com/react-useeffect-guide.md"
    );
    const content = await response.text();

    console.log( "✓ Successfully fetched external skill!\n" );
    console.log( `Content length: ${content.length} characters` );
    console.log( "\nFirst 500 characters:\n" );
    console.log( "-".repeat( 50 ) );
    console.log( content.slice( 0, 500 ) );
    console.log( "-".repeat( 50 ) );
    console.log( "\n...content continues...\n" );

    // Show how this would be used in an LLM prompt
    console.log( "Example LLM prompt with this skill:\n" );
    const prompt = buildPrompt(
      "How do I properly clean up a subscription in useEffect?",
      content
    );
    console.log( prompt.slice( 0, 800 ) );
    console.log( "\n...prompt continues..." );
  } catch ( error ) {
    console.error( "Error fetching skill:", error );
  }
}

function buildPrompt( question: string, skillContent: string ): string {
  return `You are a helpful coding assistant. Use the following skill knowledge to answer:

<skill>
${skillContent}
</skill>

User question: ${question}

Answer:`;
}

main().catch( console.error );
