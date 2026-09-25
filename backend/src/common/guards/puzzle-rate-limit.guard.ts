export interface PuzzleSubmissionAttempt {
  userId: string;
  puzzleId: string;
  timestamp: number;
}

export class PuzzleRateLimitGuard {
  private attempts: Map<string, number[]> = new Map();

  public checkRateLimit(userId: string, puzzleId: string, limit: number = 5, windowMs: number = 60000): boolean {
    const key = `${userId}:${puzzleId}`;
    const now = Date.now();
    const timestamps = (this.attempts.get(key) || []).filter(ts => now - ts < windowMs);

    if (timestamps.length >= limit) {
      return false;
    }

    timestamps.push(now);
    this.attempts.set(key, timestamps);
    return true;
  }
}
