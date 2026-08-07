import type { TutoringSession } from "./types";

// Dates are deliberately stored as UTC. Rendering happens in the parent browser's timezone.
export const upcomingSessions: TutoringSession[] = [
  {
    id: "ses-math-104",
    subject: "Mathematics",
    teacherName: "Maya Patel",
    datetimeUtc: "2026-08-10T15:30:00.000Z",
    status: "Confirmed",
  },
  {
    id: "ses-science-219",
    subject: "Science",
    teacherName: "Daniel Ortiz",
    datetimeUtc: "2026-08-12T13:00:00.000Z",
    status: "Confirmed",
  },
  {
    id: "ses-english-087",
    subject: "English",
    teacherName: "Leah Kim",
    datetimeUtc: "2026-08-14T16:00:00.000Z",
    status: "Pending",
  },
];
