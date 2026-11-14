export function createRateLimiter({ limit, windowMs, clock = () => Date.now() }) {
  const buckets = new Map();

  function check(key) {
    const now = clock();
    const current = buckets.get(key);

    if (!current || now >= current.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterMs: 0 };
    }

    if (current.count >= limit) {
      return {
        allowed: false,
        retryAfterMs: Math.max(0, current.resetAt - now)
      };
    }

    current.count += 1;
    return { allowed: true, retryAfterMs: 0 };
  }

  return { check };
}
