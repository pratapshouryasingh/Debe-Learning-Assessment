export type SessionStatus =
  | "Confirmed"
  | "Reschedule Pending"
  | "Completed";

export type RescheduleReason =
  | "Conflict"
  | "Illness"
  | "Time zone"
  | "Other";

export interface Session {
  id: string;
  subject: string;
  teacherName: string;

  // Stored in UTC
  dateTime: string;

  status: SessionStatus;
}

export interface RescheduleRequest {
  sessionId: string;
  currentSlot: string;
  newSlot: string;
  reason: RescheduleReason;
}

export interface RescheduleResponse {
  success: boolean;
  error?: string;
}