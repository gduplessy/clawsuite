# Dashboard v2.1.2 — Usage/Cost/Notifications Consistency Test Plan

## Test Date: 2026-02-10
## Branch: phaseD1-dashboard-hardening

### Test Steps

| # | Step | Expected Result | Status |
|---|------|----------------|--------|
| 1 | Load `/dashboard`, check Usage Meter description | Shows "All-time token usage totals by provider." | ⏳ |
| 2 | Load `/dashboard`, check Cost Tracker description | Shows "Current billing period spend and daily trend." | ⏳ |
| 3 | Usage Meter cost label | Shows "All-Time Cost" (not generic "Total Cost") | ⏳ |
| 4 | Cost Tracker spend label | Shows "Period Spend" (not generic "Total Spend") | ⏳ |
| 5 | Notifications widget description | Shows "Session lifecycle events — starts, stops, and errors." | ⏳ |
| 6 | Notifications content | Only shows session started/stopped/error items — NOT raw gateway tick events (those go in Activity Log) | ⏳ |
| 7 | Recent Sessions fallback text | When a session has no messages, shows "No messages yet — start a conversation" | ⏳ |
| 8 | Agent Status with 0 agents | Shows "No active agent sessions" in styled container | ⏳ |
| 9 | `npm run build` | ✅ Zero errors, built in <2s | ✅ Passed |
| 10 | Security grep `src/` | No secrets in client code | ✅ Passed |

### Data Source Documentation

| Widget | Endpoint | Scope | Key Metric |
|--------|----------|-------|------------|
| Usage Meter | `GET /api/usage` | All-time | Total tokens + cost by provider |
| Cost Tracker | `GET /api/cost` | Billing period | Daily/weekly/monthly spend with timeseries |
| Notifications | `GET /api/sessions` | Current sessions | Session lifecycle events |
| Activity Log | `SSE /api/events` | Real-time | Gateway events (ticks, errors, session activity) |

### Known Differences (Not Bugs)
- Usage Meter total (~$826) ≠ Cost Tracker total (~$83): different time windows (all-time vs billing period)
- Notifications shows session lifecycle; Activity Log shows real-time gateway events. Some overlap expected when a session starts.
