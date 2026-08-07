"use client";

import { FormEvent, useMemo, useState } from "react";
import type { RescheduleReason, TutoringSession } from "@/lib/types";

interface SessionRescheduleWidgetProps {
  sessions: TutoringSession[];
}

const reasons: RescheduleReason[] = ["Conflict", "Illness", "Time zone", "Other"];

function formatSessionTime(datetimeUtc: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(datetimeUtc));
}

export function SessionRescheduleWidget({ sessions }: SessionRescheduleWidgetProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [localDateTime, setLocalDateTime] = useState("");
  const [reason, setReason] = useState<RescheduleReason>("Conflict");
  const [message, setMessage] = useState<string | null>(null);

  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === selectedSessionId) ?? null,
    [selectedSessionId, sessions],
  );

  function openForm(sessionId: string): void {
    setSelectedSessionId(sessionId);
    setLocalDateTime("");
    setReason("Conflict");
    setMessage(null);
  }

  function closeForm(): void {
    setSelectedSessionId(null);
    setMessage(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setMessage("Reschedule requests will be sent for validation in the next step.");
  }

  return (
    <section className="widget" aria-labelledby="sessions-heading">
      <header className="widget-header">
        <div>
          <p className="eyebrow">Tutoring schedule</p>
          <h1 id="sessions-heading">Upcoming sessions</h1>
        </div>
        <span className="session-count">{sessions.length} scheduled</span>
      </header>

      <div className="session-list">
        {sessions.map((session) => (
          <article className="session-row" key={session.id}>
            <div className="subject-mark" aria-hidden="true">{session.subject.slice(0, 1)}</div>
            <div className="session-details">
              <h2>{session.subject}</h2>
              <p>{session.teacherName}</p>
              <time dateTime={session.datetimeUtc}>{formatSessionTime(session.datetimeUtc)}</time>
            </div>
            <span className={`status status-${session.status.toLowerCase()}`}>{session.status}</span>
            <button className="button button-secondary" type="button" onClick={() => openForm(session.id)}>
              Request reschedule
            </button>
          </article>
        ))}
      </div>

      {selectedSession && (
        <form className="reschedule-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <div>
              <p className="eyebrow">Reschedule request</p>
              <h2>{selectedSession.subject} with {selectedSession.teacherName}</h2>
            </div>
            <button className="close-button" type="button" onClick={closeForm} aria-label="Close reschedule form">x</button>
          </div>
          <label htmlFor="requested-time">New local date and time</label>
          <input
            id="requested-time"
            type="datetime-local"
            value={localDateTime}
            onChange={(event) => setLocalDateTime(event.target.value)}
            required
          />
          <label htmlFor="reason">Reason</label>
          <select id="reason" value={reason} onChange={(event) => setReason(event.target.value as RescheduleReason)}>
            {reasons.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {message && <p className="form-message" role="status">{message}</p>}
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={closeForm}>Cancel</button>
            <button className="button button-primary" type="submit">Send request</button>
          </div>
        </form>
      )}
    </section>
  );
}
