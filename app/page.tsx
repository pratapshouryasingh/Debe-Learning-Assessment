import { SessionRescheduleWidget } from "@/components/SessionRescheduleWidget";
import { upcomingSessions } from "@/lib/sessions";

export default function HomePage() {
  return (
    <main>
      <SessionRescheduleWidget sessions={upcomingSessions} />
    </main>
  );
}
