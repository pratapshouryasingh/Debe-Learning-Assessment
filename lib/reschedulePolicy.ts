import type { TutoringSession } from "./types";

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

export function findNearbySession(
  requestedDatetimeUtc: string,
  sessions: readonly TutoringSession[],
  excludedSessionId: string,
): TutoringSession | undefined {
  const requestedTime = new Date(requestedDatetimeUtc).getTime();

  return sessions.find((session) => {
    if (session.id === excludedSessionId) return false;
    const sessionTime = new Date(session.datetimeUtc).getTime();
    return Math.abs(requestedTime - sessionTime) < TWO_HOURS_MS;
  });
}
