# Firebase Cloud Function Debugging

This repository contains my solution for the Firebase Cloud Functions + TypeScript debugging task.

The provided Cloud Function had four separate bugs related to async/await, security, and Firestore logic.

I debugged the function locally using TypeScript and fixed the issues directly in `original.ts`.

## Project Structure

```text
part-2-debug/
│
├── original.ts
├── Report.txt
├── package.json
├── package-lock.json
├── tsconfig.json
└── .gitignore
```

## Bugs Found

### Bug 1 — Missing `await`

The Firestore `.get()` query was not awaited.

This caused `existing` to be a Promise instead of a QuerySnapshot.

Fixed by awaiting the query before checking `existing.docs`.

### Bug 2 — Security Issue

The function did not check `context.auth`.

This allowed unauthenticated callers to invoke the function and create bookings.

Added an authentication check using `HttpsError`.

### Bug 3 — Firestore Write Not Awaited

The booking was added to Firestore without awaiting the write.

The function could return `success: true` before the booking was actually saved.

Fixed by awaiting the Firestore write.

### Bug 4 — Different Collections

The duplicate booking check and the booking write were using different Firestore locations.

The check was using:

```text
teachers/{teacherId}/bookings
```

while the booking was being added to:

```text
bookings
```

This could allow duplicate bookings.

Fixed by using the teacher's bookings collection consistently.

## Local Validation

The project uses TypeScript to check the function locally.

Run:

```bash
npm install
```

Then:

```bash
npx tsc --noEmit
```

The corrected `original.ts` compiles without TypeScript errors.

## Debugging Notes

The detailed debugging process, compiler error, and changes made for each bug are documented in:

```text
Report.txt
```

## Tech Stack

- TypeScript
- Firebase Cloud Functions
- Firebase Admin SDK
- Firestore