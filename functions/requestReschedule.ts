import type { RescheduleRequest, RescheduleResponse } from "../lib/types";

/**
 * Local stand-in for the Firebase callable function. Keep this contract shared
 * with the client so replacing it with httpsCallable does not change validation payloads.
 */
export async function requestReschedule(
  request: RescheduleRequest,
  now: Date = new Date(),
): Promise<RescheduleResponse> {
  const existingSlot = new Date(request.existingDatetimeUtc);
  const requestedSlot = new Date(request.requestedDatetimeUtc);

  if (Number.isNaN(requestedSlot.getTime()) || Number.isNaN(existingSlot.getTime())) {
    return { success: false, error: "Please select a valid session time." };
  }

  if (requestedSlot.getTime() <= now.getTime()) {
    return { success: false, error: "The new session time must be in the future." };
  }

  if (requestedSlot.getTime() === existingSlot.getTime()) {
    return { success: false, error: "Choose a time different from the current session." };
  }

  return { success: true };
}
