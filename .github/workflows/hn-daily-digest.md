---
on:
  schedule: daily
permissions:
      contents: read
      issues: read
      pull-requests: read
engine: gemini
network: defaults
tools:
  github:
    toolsets: [default]
  web-fetch:
safe-outputs:
  create-issue:
    max: 1
---

# hn-daily-digest

Every weekday, fetch the top 30 stories from the Hacker News API
(https://hacker-news.firebaseio.com/v0/topstories.json). Discard any
story with a score below 150.

From the remaining stories, keep only those that are genuinely relevant
to one of the three focus topics below. Apply strict editorial judgment:
prefer depth over breadth — it is better to surface two high-quality
stories than ten loosely related ones. If a story could plausibly fit
more than one topic, assign it to the best fit only.

**Focus topics**

1. **Observing AI agents** — runtime visibility into autonomous AI
   systems: tracing, monitoring, snooping on tool-call chains, and
   applying eBPF / kernel-level instrumentation to agent workloads.

2. **Telemetry for coding agents** — observability updates, usage
   metrics, tracing integrations, and operational changes for the
   following tools specifically: GitHub Copilot, Claude Code, Gemini
   CLI, OpenAI Codex, and OpenClaw (a self-hosted gateway that bridges
   messaging apps such as WhatsApp/Telegram/Discord/iMessage to AI
   coding agents like Pi —  https://docs.openclaw.ai/).

3. **OpenTelemetry standards** — specification changes, SDKs, collector
   updates, and community discussion around OpenTelemetry, with emphasis
   on the Semantic Conventions for GenAI
   (https://opentelemetry.io/docs/specs/semconv/gen-ai/).

**Output rules**

- If no story clears the relevance bar after filtering, do nothing —
  do not create a GitHub issue.
- Otherwise, create a single GitHub issue titled "HN Digest – <date>"
  containing one Markdown table per topic that has qualifying stories.
  Each table row must include: Title (linked), Score, Comments, and a
  one-sentence note on why the story is actionable for enterprise
  developers building or operating AI systems.

<!--
## TODO: Customize this workflow

The workflow has been generated based on your selections. Consider adding:

- [ ] More specific instructions for the AI
- [ ] Error handling requirements
- [ ] Output format specifications
- [ ] Integration with other workflows
- [ ] Testing and validation steps

## Configuration Summary

- **Trigger**: Daily schedule (fuzzy, scattered time)
- **AI Engine**: gemini
- **Tools**: github, web-fetch
- **Safe Outputs**: create-issue
- **Network Access**: defaults

## Next Steps

1. Review and customize the workflow content above
2. Remove TODO sections when ready
3. Run `gh aw compile` to generate the GitHub Actions workflow
4. Test the workflow with a manual trigger or appropriate event
-->
