// ---------------------------------------------------------------------------
// Monitoring & Alerting Engine for Drishti Wealth Backend
// Tracks rolling 1-minute window metrics for error rate spikes, latency & uptime
// ---------------------------------------------------------------------------
const logger = require('./logger');

class MonitoringEngine {
  constructor() {
    this.windowMs = 60 * 1000; // 1 minute window
    this.requests = [];
    this.errorThresholdRatio = 0.05; // 5% error rate triggers alert
    this.latencyThresholdMs = 1000;  // >1000ms latency triggers alert
    this.minRequestsForAlert = 5;

    // Run health check / metric evaluation every 30 seconds
    setInterval(() => this.evaluateMetrics(), 30000);
  }

  recordRequest({ method, url, statusCode, durationMs, ip }) {
    const record = {
      timestamp: Date.now(),
      method,
      url,
      statusCode,
      durationMs,
      ip,
      isError: statusCode >= 500
    };

    this.requests.push(record);
    this.cleanOldRecords();

    // Instant warning for severe high latency (>2000ms)
    if (durationMs > 2000) {
      logger.warn('High Request Latency Detected', {
        event: 'LATENCY_WARNING',
        method,
        url,
        duration_ms: durationMs,
        client_ip: ip
      });
    }
  }

  cleanOldRecords() {
    const cutoff = Date.now() - this.windowMs;
    this.requests = this.requests.filter(r => r.timestamp >= cutoff);
  }

  evaluateMetrics() {
    this.cleanOldRecords();
    const total = this.requests.length;
    if (total < this.minRequestsForAlert) return;

    const errors = this.requests.filter(r => r.isError).length;
    const errorRate = errors / total;
    const avgLatency = this.requests.reduce((acc, r) => acc + r.durationMs, 0) / total;

    // Check Error Rate Spike Alert
    if (errorRate >= this.errorThresholdRatio) {
      logger.alert('ERROR_RATE_SPIKE', `Error rate spike detected: ${(errorRate * 100).toFixed(1)}% of requests failed`, {
        total_requests: total,
        error_count: errors,
        error_rate_pct: (errorRate * 100).toFixed(1),
        time_window: '1m'
      });
    }

    // Check Latency Increase Alert
    if (avgLatency >= this.latencyThresholdMs) {
      logger.alert('LATENCY_INCREASE', `Average latency spike detected: ${Math.round(avgLatency)}ms`, {
        total_requests: total,
        avg_latency_ms: Math.round(avgLatency),
        threshold_ms: this.latencyThresholdMs,
        time_window: '1m'
      });
    }
  }

  getHealthStats() {
    this.cleanOldRecords();
    const total = this.requests.length;
    const errors = this.requests.filter(r => r.isError).length;
    const errorRate = total > 0 ? (errors / total) * 100 : 0;
    const avgLatency = total > 0 ? Math.round(this.requests.reduce((acc, r) => acc + r.durationMs, 0) / total) : 0;

    return {
      status: errorRate > 20 ? 'degraded' : 'healthy',
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      metrics_1m: {
        total_requests: total,
        error_count: errors,
        error_rate_pct: Number(errorRate.toFixed(2)),
        avg_latency_ms: avgLatency
      },
      memory: process.memoryUsage()
    };
  }
}

const monitor = new MonitoringEngine();
module.exports = monitor;
