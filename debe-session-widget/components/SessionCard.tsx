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
    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-2">
        <BookOpen className="text-orange-500" size={20} />

        <h3 className="text-xl font-semibold">
          {session.subject}
        </h3>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-slate-600">
          <UserRound size={18} />

          <span>{session.teacherName}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <CalendarDays size={18} />

          <span>
            {format(new Date(session.dateTime), "dd MMM yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <Clock3 size={18} />

          <span>
            {format(new Date(session.dateTime), "hh:mm a")}
          </span>
        </div>
      </div>

      <div className="mt-6">
       <Badge
  className={
    session.status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : session.status === "Reschedule Pending"
      ? "bg-orange-100 text-orange-700"
      : "bg-gray-100 text-gray-700"
  }
>
  {session.status}
</Badge>
      </div>

<button
  onClick={() => onReschedule(session)}
  className={`mt-8 w-full rounded-xl py-3 font-medium text-white transition ${
    session.status === "Reschedule Pending"
      ? "bg-yellow-400 hover:bg-amber-600"
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