# Debe Learning — Tech Intern Assessment

Hi, I'm Pratap. Here's my submission for the Tech Intern assessment, broken into the four parts that were asked for.

**Name:** Pratap Shourya Singh
**GitHub profile:** [ADD YOUR GITHUB PROFILE LINK HERE]
**Main repo for this assessment:** https://github.com/pratapshouryasingh/Debe-Learning-Assessment

---

## Part 1 — A Quick Tour of My Work

### Project 1 — PDF & E-Commerce Toolkit
**Type:** Freelance project, built solo · **GitHub:** [ADD LINK] · **Live Demo:** [ADD LINK]

This is a tool that automatically converts PDFs and processes shipping labels, so people don't have to do it by hand. It also takes care of storing and managing those files in the cloud.

**What I actually did:** I built the whole thing myself, front end and back end. That means the REST APIs (20+ of them), the PDF processing logic, some Python automation, WebSocket features, and Azure Blob Storage for file handling. I also put the backend in Docker so it's easier to deploy consistently.

**What I'd do differently now:** Right now, a lot of the PDF processing happens directly in the main app flow. If I rebuilt this today, I'd move that into background jobs instead. It would make things much easier to scale when a lot of files come in at once, and easier to retry or monitor jobs that fail.

### Project 2 — Seller Return Claim Automation
**Type:** Freelance project, built solo · **GitHub:** https://github.com/pratapshouryasingh/autoclame-meshoo · **Demo:** [ADD VIDEO LINK]

Sellers on e-commerce platforms deal with a lot of return claims — wrong item, damaged item, missing item, and so on. Handling these manually is repetitive and slow, so this project automates it.

**What I actually did:** I built the entire automation using Python and Selenium — logging in as the seller, looking up orders, filling out claim forms, uploading evidence, submitting tickets, and tracking claim status. I also added CSV/JSON tracking, error handling, session recovery, retry logic, and support for multiple accounts running at once.

**What I'd do differently now:** I'd break the whole process into smaller, independent jobs using a proper job queue. That way, if one claim fails, it doesn't affect the others, and I can process several claims at the same time without things getting tangled.

---

## Part 2 — Fixing the Firebase Function

You'll find my work for this in `part2-debug/` — the original file, my fixed version, and a short report explaining everything.

I found four bugs:

1. **A missing `await`.** The code queried Firestore but never waited for the result, so it was checking a Promise instead of the actual data. I added the `await`.
2. **No login check.** Anyone, logged in or not, could call this function and create bookings. I added a proper check for `context.auth` so only logged-in users can use it.
3. **The write wasn't awaited either.** The function could say "success: true" before the booking was actually saved to the database. I fixed this by waiting for the write to finish first.
4. **Two different places for the same data.** The code checked one Firestore location for existing bookings but saved new ones somewhere else entirely — which could let duplicate bookings slip through. I made both use the same location.

**To check it works:** run `npm install`, then `npx tsc --noEmit`. It compiles with no errors.

---

## Part 3 — The Reschedule Widget

LIVE- 

This is a small Next.js + TypeScript widget that lets a parent see their kid's upcoming tutoring sessions and request to reschedule one.

**What it does:**
- Shows the next 3 sessions (using mock data, no real backend needed)
- Each session has a "Request Reschedule" button that opens a form — date, time, and a reason (Conflict, Illness, Time zone, Other)
- Submitting the form calls a mock version of a Firebase function (`requestReschedule`) that checks the new time isn't in the past and isn't the same as before
- Everything is typed with TypeScript, no shortcuts with `any`
- Has proper loading and error states, so nothing breaks silently
- Parents can also edit a request that's still pending

**The trickiest part — time zones:** The assignment specifically wanted the 2-hour cutoff rule handled carefully, not just bolted onto the UI. So: parents can't pick a time slot that's within 2 hours of right now, they always see times in their own local time zone, but under the hood everything gets converted to UTC before it's saved. I explain this reasoning directly in the code comments (see `lib/timeSlots.ts` and `utils/timezone.ts`), not just in the interface.

**Built with:** Next.js 16, React, TypeScript, Tailwind, shadcn/ui, date-fns, and Sonner for toast notifications.

**How the code is organized:** `app/` for pages, `components/` for the UI pieces (Header, SessionCard, SessionGrid, RescheduleDialog, LoadingButton), `lib/` for the logic (mock data, the mock function, validation, time slot rules), and `types/` + `utils/` for shared types and time zone helpers.

**To run it yourself:**
```
git clone <repo-url>
npm install
npm run dev
```
Then open http://localhost:3000



---

## Part 4 — Me Explaining It On Camera

**Video link:** [ADD YOUR LOOM / SCREEN RECORDING LINK HERE]

This is a short, unedited screen recording (4–7 minutes) where I:

- Walk through the Part 3 code live, talking through it without reading from notes
- Explain, in my own words, why I handled local time vs. UTC the way I did
- Explain the 2-hour lockout logic and why it matters
- Break something small on purpose (like commenting out the time zone conversion in `utils/timezone.ts`) and explain what goes wrong and why

---

Thanks for reading through this — happy to walk through any part of it in more detail.

**Pratap Shourya Singh**
