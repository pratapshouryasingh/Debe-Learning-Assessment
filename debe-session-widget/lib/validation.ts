import { addHours, isBefore } from "date-fns";

export function validateReschedule(
  currentSlot: Date,
  newSlot: Date
): string | null {
  // Cannot choose same slot
  if (currentSlot.getTime() === newSlot.getTime()) {
    return "Please select a different time.";
  }

  // Cannot choose past time
  if (isBefore(newSlot, new Date())) {
    return "Selected time is in the past.";
  }

  // Must be at least 2 hours from now
  const minimumAllowed = addHours(new Date(), 2);

  if (isBefore(newSlot, minimumAllowed)) {
    return "Sessions can only be rescheduled at least 2 hours in advance.";
  }

  return null;
}