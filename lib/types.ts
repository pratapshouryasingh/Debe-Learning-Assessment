export type SessionStatus = "Confirmed" | "Pending";

export interface TutoringSession {
  id: string;
  subject: string;
  teacherName: string;
  datetimeUtc: string;
  status: SessionStatus;
}

export type RescheduleReason = "Conflict" | "Illness" | "Time zone" | "Other";

export interface RescheduleRequest {
  sessionId: string;
  existingDatetimeUtc: string;
  requestedDatetimeUtc: string;
  reason: RescheduleReason;
}

export interface RescheduleResponse {
  success: boolean;
  error?: string;
}
