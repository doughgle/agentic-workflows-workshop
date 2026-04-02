---
on:
  schedule: daily
permissions:
      contents: read
      issues: read
      pull-requests: read
engine:
  id: copilot
  model: gpt-5-mini
network: defaults
tools:
  github:
    toolsets: [default]
safe-outputs:
  create-issue:
    max: 1
---

# daily-digest

Create a daily high-signal digest from public GitHub repositories only.
Do not use non-GitHub sources.

Research recent activity from these sources only:

1. GitHub Releases
2. GitHub Packages (especially GHCR image/package updates)
3. GitHub Issues
Apply strict editorial judgment: prefer depth over breadth. It is better
to surface two excellent updates than ten weak ones.

Use the last 24 hours of activity and evaluate updates only from this
shortlist of public repositories.

**Focus topics and repository shortlist**

1. **Observing AI agents** (monitoring, snooping, eBPF for agent
   workloads)
  - cilium/tetragon
  - pixie-io/pixie
  - openlit/openlit
  - langfuse/langfuse
  - Arize-ai/phoenix
  - inspektor-gadget/inspektor-gadget
  - iovisor/bcc
  - bpftrace/bpftrace
  - open-telemetry/opentelemetry-ebpf-instrumentation
  - alex-ilgayev/MCPSpy

2. **Telemetry updates for coding agents** (GitHub Copilot, Claude Code,
   Gemini CLI, OpenAI Codex, OpenClaw)
  - microsoft/vscode-copilot-chat
  - github/copilot-cli
  - anthropics/claude-code
  - google-gemini/gemini-cli
  - openai/codex
  - openclaw/openclaw

3. **OpenTelemetry standards** (specification and Semantic Conventions
   for GenAI)
  - open-telemetry/opentelemetry-specification
  - open-telemetry/semantic-conventions
  - open-telemetry/opentelemetry-collector-contrib
  - open-telemetry/opentelemetry-collector

Scoring and filtering:

- Drop any candidate that is not clearly relevant to one of the three
  topics.
- Assign each item to exactly one best-fit topic.
- Compute a GitHub signal `Score` from 0-100 using:
  - impact of change (breaking/spec/runtime impact),
  - discussion intensity (issue comments/reactions),
  - adoption relevance for enterprise teams.
- Keep only items with Score >= 70.

Output rules:

- If no items qualify after filtering, do nothing and do not create an
  issue.
- Otherwise create one issue titled "GitHub Digest - <date>".
- Use one Markdown table per topic that has qualifying items.
- Keep the same table format for each row:
  - Title (linked)
  - Score
  - Comments
  - Why actionable (one sentence for enterprise developers building or
    operating AI systems)
- `Comments` should reflect discussion count for issues and best
  available discussion count for releases/packages (use 0 when none).
