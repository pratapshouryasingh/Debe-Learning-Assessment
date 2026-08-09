import {
  BookOpen,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";

import { format } from "date-fns";

import { Session } from "@/types/session";
import { Badge } from "@/components/ui/badge";

interface Props {
  session: Session;
  onReschedule: (session: Session) => void;
}

export default function SessionCard({
  session,
  onReschedule,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-7 shadow-sm transition hover:shadow-md">
      {/* Subject */}
      <div className="flex items-center gap-3">
        <BookOpen
          size={22}
          className="text-orange-500"
        />

        <h3 className="text-xl font-semibold">
          {session.subject}
        </h3>
      </div>

      {/* Session Details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-slate-600">
          <UserRound size={18} />

          <span>{session.teacherName}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <CalendarDays size={18} />

          <span>
            {format(
              new Date(session.dateTime),
              "dd MMM yyyy"
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <Clock3 size={18} />

          <span>
            {format(
              new Date(session.dateTime),
              "hh:mm a"
            )}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6">
        <Badge
          className={
            session.status === "Confirmed"
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : session.status === "Reschedule Pending"
                ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
          }
        >
          {session.status}
        </Badge>
      </div>

      {/* Reschedule Button */}
      <button
        disabled={false}
        onClick={() => onReschedule(session)}
        className={`mt-8 w-full rounded-xl py-3 font-medium text-white transition ${
          session.status === "Reschedule Pending"
            ? "bg-yellow-400 hover:bg-amber-500"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {session.status === "Reschedule Pending"
          ? "Edit Request"
          : "Request Reschedule"}
      </button>
    </div>
  );
}