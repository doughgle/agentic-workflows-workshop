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
    min-integrity: none
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

Fetch efficiency and API hygiene:

- When re-checking release metadata, use conditional requests with
  `If-None-Match` (ETag) and `If-Modified-Since` to avoid repeated full
  payload downloads.
- If the API returns `304 Not Modified`, skip that repo for release
  content processing in this run.
- Prefer metadata-first retrieval and only fetch expanded content when a
  release or issue passes the telemetry relevance gate.
Apply strict editorial judgment: prefer depth over breadth. It is better
to surface two excellent updates than ten weak ones.

Use the last 24 hours of activity and evaluate updates only from this
shortlist of public repositories.

**Focus topics and repository shortlist**

1. **Observing AI agents** (monitoring, snooping, eBPF for agent
   workloads)
  - cilium/tetragon
  - pixie-io/pixie
  - langfuse/langfuse
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
- Hard gate for Releases and Issues: include an item if and only if it
  has direct telemetry implications for coding agents (for example:
  instrumentation/tracing, metrics dimensions, span schema changes,
  collector/exporter behavior, agent runtime observability, or GenAI
  semantic convention changes).
- Exclude non-telemetry releases/issues even if they are popular or
  highly discussed.
- Compute a GitHub signal `Score` from 0-100 using:
  - telemetry specificity and operational impact for coding agents (50%),
  - impact of change (breaking/spec/runtime impact) (30%),
  - discussion intensity and adoption relevance for enterprise teams
    (20%).
- Keep only items with Score >= 75.

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
- Mention me (@doughgle on Github).
