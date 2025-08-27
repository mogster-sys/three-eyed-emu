interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(private config: RateLimitConfig) {}

  isAllowed(key: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    
    const recentRequests = userRequests.filter(
      timestamp => now - timestamp < this.config.windowMs
    );
    
    if (recentRequests.length >= this.config.maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    
    setTimeout(() => {
      const requests = this.requests.get(key) || [];
      this.requests.set(
        key,
        requests.filter(timestamp => now - timestamp < this.config.windowMs)
      );
    }, this.config.windowMs);
    
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

export const apiRateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60000
});

export const authRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 300000
});

export const downloadRateLimiter = new RateLimiter({
  maxRequests: 20,
  windowMs: 3600000
});