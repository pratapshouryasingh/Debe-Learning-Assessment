import { GraduationCap } from "lucide-react";

export default function Header() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm border">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
          <GraduationCap className="h-7 w-7 text-orange-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Aarav Sharma
          </h1>

          <p className="text-slate-500">
            Grade 8 • Student
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">
        Upcoming Tutoring Sessions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        View upcoming tutoring sessions and request a
        reschedule if needed.
      </p>
    </section>
  );
}