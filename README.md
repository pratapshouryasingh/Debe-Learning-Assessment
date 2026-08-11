# Debe Learning Tech Intern Assessment

Submission for the Debe Learning Tech Intern Assessment by **Pratap Shourya Singh**.

## Contents

| Part | Location | Description |
| --- | --- | --- |
| 1 | `SUBMISSION.md` | Project walkthroughs and engineering reflections. |
| 2 | `Debug/` | Firebase Cloud Function debugging exercise and report. |
| 3 | `debe-session-widget/` | Parent-facing tutoring-session rescheduling widget. |
| 4 | `SUBMISSION.md` | Screen-recording link and explanation. |

## Part 3: Session Reschedule Widget

A self-contained Next.js application that lets a parent review a student's next three tutoring sessions and request a new time.

### Features

- Shows subject, teacher, date/time, and status for three upcoming sessions.
- Opens a reschedule form with local date/time selection and a reason: Conflict, Illness, Time zone, or Other.
- Supports editing an existing pending reschedule request.
- Uses a typed local mock of the `requestReschedule` Firebase Cloud Function.
- Provides loading, success, and error states in the UI.
- Applies a two-hour lead-time policy in both the selectable slots and server-side-style validation.

### Time Zone and Lead-Time Handling

The parent chooses a date and time in their browser's local time zone. Before the request is sent, the selected value is converted to an ISO 8601 UTC string with `Date#toISOString()`. This keeps the persisted value unambiguous for parents and teachers in different regions.

The mock function rejects a request when the new slot is:

- identical to the current session slot;
- in the past; or
- less than two hours from the current time.

### Tech Stack

Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, date-fns, and Sonner.

### Run Locally

```bash
cd debe-session-widget
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful Commands

```bash
cd debe-session-widget
npm run lint
npm run build
```

### Project Structure

```text
debe-session-widget/
|-- app/          # Next.js App Router page and global styles
|-- components/   # Dashboard, session cards, dialog, and UI primitives
|-- lib/          # Mock data, request function, validation, and time slots
|-- types/        # Shared TypeScript request/response and session types
`-- utils/        # Local-time and UTC conversion helpers
```

## Links

- Live widget: https://debe-learning-assessment-25r6.vercel.app/
- Assessment details and video: [`SUBMISSION.md`](SUBMISSION.md)
