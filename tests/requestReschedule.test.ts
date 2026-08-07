import assert from "node:assert/strict";
import test from "node:test";
import { requestReschedule } from "../functions/requestReschedule";

const now = new Date("2026-08-07T10:00:00.000Z");
const baseRequest = {
  sessionId: "ses-104",
  existingDatetimeUtc: "2026-08-10T15:30:00.000Z",
  requestedDatetimeUtc: "2026-08-11T15:30:00.000Z",
  reason: "Conflict" as const,
};

test("accepts a future time different from the current session", async () => {
  assert.deepEqual(await requestReschedule(baseRequest, now), { success: true });
});

test("rejects a slot in the past", async () => {
  const response = await requestReschedule({ ...baseRequest, requestedDatetimeUtc: "2026-08-06T15:30:00.000Z" }, now);
  assert.deepEqual(response, { success: false, error: "The new session time must be in the future." });
});

test("rejects a slot inside the two-hour tutoring lead time", async () => {
  const response = await requestReschedule({ ...baseRequest, requestedDatetimeUtc: "2026-08-07T11:30:00.000Z" }, now);
  assert.deepEqual(response, { success: false, error: "Please choose a time at least 2 hours from now." });
});

test("rejects the current session slot", async () => {
  const response = await requestReschedule({ ...baseRequest, requestedDatetimeUtc: baseRequest.existingDatetimeUtc }, now);
  assert.deepEqual(response, { success: false, error: "Choose a time different from the current session." });
});
