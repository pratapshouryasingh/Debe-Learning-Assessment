import {
  RescheduleRequest,
  RescheduleResponse,
} from "@/types/session";

import { validateReschedule } from "./validation";

export async function requestReschedule(
  request: RescheduleRequest
): Promise<RescheduleResponse> {
  // Simulate Firebase Cloud Function
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const validationError = validateReschedule(
    new Date(request.currentSlot),
    new Date(request.newSlot)
  );

  if (validationError) {
    return {
      success: false,
      error: validationError,
    };
  }

  return {
    success: true,
  };
}