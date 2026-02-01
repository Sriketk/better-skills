/**
 * Example: Integrating Skills Protocol into an AI Agent
 *
 * This example demonstrates how to:
 * 1. Create a skills client from a subscription config
 * 2. Fetch all subscribed skills
 * 3. Use skills in an LLM context
 * 4. Fetch specific skills by ID or tag
 */

import {
  type ResolvedSkill,
  SkillsClient,
} from "../../packages/client/src/index";

// Subscription configuration
const config = {
  subscriptions: [
    {
      url: "http://localhost:3001/feed.json",
      name: "Example Skills",
      skills: "*" as const, // Subscribe to all skills
      enabled: true,
      priority: 10,
    },
  ],
  cache: {
    enabled: true,
    ttl: 3600, // 1 hour cache
  },
  fetch: {
    timeout: 10_000,
    retries: 3,
    concurrent: 5,
  },
};

/**
 * Format skills for use in an LLM system prompt
 */
function formatSkillsForContext(skills: ResolvedSkill[]): string {
  if (skills.length === 0) {
    return "No skills available.";
  }

  const sections = skills.map((skill) => {
    return `## ${skill.name} (v${skill.version})\n\n${skill.content}`;
  });

  return `# Available Skills\n\n${sections.join("\n\n---\n\n")}`;
}

/**
 * Example: Build an LLM prompt with skills context
 */
function buildPromptWithSkills(
  userQuery: string,
  skills: ResolvedSkill[]
): string {
  const skillsContext = formatSkillsForContext(skills);

  return `You are a helpful AI assistant with access to the following skills and knowledge:

<skills>
${skillsContext}
</skills>

Use the above skills to help answer the user's question. If a skill is relevant, apply its guidance.

User: ${userQuery}`;
}

/**
 * Main function demonstrating the skills client
 */
async function main() {
  console.log("Skills Protocol - Agent Integration Example\n");
  console.log("=".repeat(50));

  // Create the skills client
  const client = SkillsClient.fromConfig(config);

  try {
    // 1. List all available skills (metadata only)
    console.log("\n1. Listing available skills...\n");
    const skillsList = await client.listSkills();

    if (skillsList.length === 0) {
      console.log("No skills found. Make sure the skill server is running!");
      console.log("Run: npm start in ../skill-server/");
      return;
    }

    for (const skill of skillsList) {
      console.log(`  - ${skill.name} (${skill.id}) v${skill.version}`);
      if (skill.tags?.length) {
        console.log(`    Tags: ${skill.tags.join(", ")}`);
      }
    }

    // 2. Fetch all skills with content
    console.log("\n2. Fetching all skill content...\n");
    const allSkills = await client.fetchAll();
    console.log(`  Fetched ${allSkills.length} skills`);

    // 3. Fetch a specific skill by ID
    console.log("\n3. Fetching a specific skill by ID...\n");
    const reactSkill = await client.fetchSkill("react-best-practices");
    if (reactSkill) {
      console.log(`  Found: ${reactSkill.name}`);
      console.log(`  Content length: ${reactSkill.content.length} characters`);
      console.log(`  First 200 chars: ${reactSkill.content.slice(0, 200)}...`);
    } else {
      console.log("  Skill not found");
    }

    // 4. Fetch skills by tag
    console.log("\n4. Fetching skills by tag...\n");
    const reactSkills = await client.fetchByTag("react");
    console.log(`  Found ${reactSkills.length} skills with 'react' tag:`);
    for (const skill of reactSkills) {
      console.log(`    - ${skill.name}`);
    }

    // 5. Build an LLM prompt with skills
    console.log("\n5. Building LLM prompt with skills context...\n");
    const userQuery = "How can I optimize my React app's performance?";
    const prompt = buildPromptWithSkills(userQuery, allSkills);
    console.log(`  Prompt length: ${prompt.length} characters`);
    console.log("  Preview (first 500 chars):\n");
    console.log(`${prompt.slice(0, 500)}...`);

    // 6. Demonstrate caching
    console.log(
      "\n6. Demonstrating cache (second fetch should be faster)...\n"
    );
    const start1 = Date.now();
    await client.fetchAll();
    const time1 = Date.now() - start1;
    console.log(`  First fetch: ${time1}ms`);

    const start2 = Date.now();
    await client.fetchAll();
    const time2 = Date.now() - start2;
    console.log(`  Second fetch (cached): ${time2}ms`);

    // 7. Force refresh
    console.log("\n7. Force refresh (bypassing cache)...\n");
    const start3 = Date.now();
    await client.fetchAll({ forceRefresh: true });
    const time3 = Date.now() - start3;
    console.log(`  Force refresh: ${time3}ms`);

    console.log(`\n${"=".repeat(50)}`);
    console.log("Example completed successfully!");
  } catch (error) {
    console.error("Error:", error);
    console.log("\nMake sure the skill server is running:");
    console.log("  cd ../skill-server && npm start");
  }
}

// Run the example
main().catch(console.error);
