"use client";

import { useState } from "react";

import { Session } from "@/types/session";
import { sessions } from "@/lib/mockData";

import SessionCard from "./SessionCard";
import RescheduleDialog from "./RescheduleDialog";

export default function SessionGrid() {
  const [sessionList, setSessionList] = useState(sessions);

  const [selectedSession, setSelectedSession] =
    useState<Session | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sessionList.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onReschedule={setSelectedSession}
          />
        ))}
      </div>

      <RescheduleDialog
        session={selectedSession}
        open={!!selectedSession}
        onOpenChange={(open) => {
          if (!open) setSelectedSession(null);
        }}
        onSuccess={(sessionId) => {
          setSessionList((prev) =>
            prev.map((session) =>
              session.id === sessionId
                ? {
                    ...session,
                    status: "Reschedule Pending",
                  }
                : session
            )
          );
        }}
      />
    </>
  );
}