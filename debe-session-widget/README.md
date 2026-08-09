# Student Session Reschedule Widget

A parent-facing tutoring session rescheduling widget built with **Next.js (App Router)** and **TypeScript** as part of the Debe Learning Software Engineering Assessment.

The application allows parents to view a student's upcoming tutoring sessions and submit reschedule requests while enforcing tutoring lead-time policies.

---
## Problem statment

Build a small, self-contained feature — not a generic tutorial clone — simulating something close to real work on Debe's portal.

**Requirements**
• Next.js (App Router) page/component: a parent-facing widget that shows a student's next 3 upcoming tutoring
sessions (mock the data — a static JSON array is fine, no real Firebase project needed) with fields: subject,
teacherName, datetime, status.
• Each session has a "Request Reschedule" button that opens a form (date/time picker + reason dropdown:
Conflict / Illness / Time zone / Other).
• On submit, call a Firebase Cloud Function (requestReschedule) — you can stub/mock this function locally, it
does not need to be deployed — that validates the new slot isn't in the past and isn't identical to the existing
slot, and returns a typed response ({ success: boolean; error?: string }).
• Use TypeScript throughout (shared types between frontend and function, no any).
• Add basic loading and error states in the UI — no unhandled promise rejections.
• Constraint to prevent generic AI boilerplate: the reschedule form must disable time slots within 2
hours of the current time (to reflect real tutoring lead-time policy), and must show the parent's local
time while storing the value in UTC. This detail must be visibly reasoned about in your
code/comments — not just present in the UI.
Commit incrementally (at minimum: scaffold → UI → validation logic → styling/polish)


##  Features

- View the student's next **3 upcoming tutoring sessions**
- Display:
  - Subject
  - Teacher Name
  - Session Date
  - Session Time
  - Current Status
- Request a session reschedule
- Edit an existing pending reschedule request
- Local date & time selection
- Store selected time in **UTC**
- Mock Firebase Cloud Function
- Type-safe API request/response
- Loading, success and error handling
- Responsive UI

---

##  Lead Time Policy

The widget enforces a tutoring lead-time policy.

- Parents cannot select time slots within **2 hours of the current local time**.
- Time shown in the UI is the **parent's local time**.
- Before submitting the request, the selected date and time are converted to **UTC** for storage.

This behaviour is implemented both in the UI and in the validation logic.

---

## Tech Stack

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- date-fns
- Sonner (Toast Notifications)

---

## Project Structure

```
app/
├── page.tsx
├── layout.tsx

components/
├── Header.tsx
├── SessionCard.tsx
├── SessionGrid.tsx
├── RescheduleDialog.tsx
├── LoadingButton.tsx
└── ui/

lib/
├── mockData.ts
├── requestReschedule.ts
├── validation.ts
└── timeSlots.ts

types/
└── session.ts

utils/
└── timezone.ts
```

---

## Mock Cloud Function

The assessment required a Firebase Cloud Function.

Instead of deploying Firebase, the project contains a mocked implementation:

```
requestReschedule()
```

It validates:

- Session is not rescheduled to the same slot
- Session is not moved into the past
- Session satisfies the 2-hour lead-time rule

Returns:

```ts
{
  success: boolean;
  error?: string;
}
```

---

## Reschedule Flow

1. Parent clicks **Request Reschedule**
2. Dialog opens
3. Parent selects:
   - Date
   - Time
   - Reason
4. Request is validated
5. Local time is converted to UTC
6. Mock Cloud Function processes the request
7. Session status changes to:

```
Reschedule Pending
```

The parent can later click **Edit Request** to modify the pending request.

---

## UI

- Responsive session cards
- Status badges
- Toast notifications
- Scrollable time picker
- Calendar date picker
- Clean parent dashboard layout

---

## Getting Started

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## Assessment Notes

This project intentionally uses mocked data and a mocked Firebase Cloud Function as requested in the assessment.

No backend deployment or Firebase project is required.

---

## Author

**Pratap Shourya Singh**

Software Engineering Assessment Submission