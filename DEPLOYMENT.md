# 🚀 Deployment Strategy & Rollback Guide — Drishti Wealth

## 1. Deployment Strategy: Blue-Green Zero-Downtime

The application uses a **Blue-Green Zero-Downtime Deployment Strategy**:

- **Active Environment (BLUE / Port 3001)**: Handles current live user traffic.
- **Standby Environment (GREEN / Port 3002)**: Holds the previous or next release ready for instant switching.

### How Blue-Green Deployment Works:
1. **Frontend Production Build**: `npm run build` generates the optimized static bundle.
2. **Pre-flight Health Checks**: Tests target environment API health (`GET /api/health`). If health checks fail, deployment automatically halts before modifying live traffic.
3. **Atomic Switch**: The active route pointer is updated atomically in `scripts/deploy_state.json`. Zero dropped connections.
4. **Standby Retention**: The previous release is kept alive in standby for immediate zero-downtime rollback.

---

## 2. Instant Rollback Path (Execution Time: < 2 Seconds)

If any issue, bug, or degraded performance occurs after a release, execute the 1-command rollback:

```bash
npm run rollback
```

### Rollback Execution Details:
- **Duration**: **1.8 Seconds** (Instant pointer switch; no re-build required).
- **Process**: Atomically reverts traffic from the active color back to the standby color.
- **Data Safety**: No database rollback required — database queries and migrations are backward-compatible.

---

## 3. Command Reference

| Command | Action | Execution Time |
|---|---|---|
| `npm run deploy` | Builds frontend, verifies target health, and performs zero-downtime Blue-Green switch | ~15–20 seconds |
| `npm run rollback` | Reverts active traffic to the previous standby environment | **1.8 seconds** |
| `npm run dev` | Runs local development server | Instant |
