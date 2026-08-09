import { addDays, setHours, setMinutes } from "date-fns";
import { Session } from "@/types/session";

const createDate = (
  days: number,
  hour: number,
  minute: number
) => {
  return setMinutes(
    setHours(addDays(new Date(), days), hour),
    minute
  ).toISOString(); // Stored in UTC
};

export const sessions: Session[] = [
  {
    id: "1",
    subject: "Mathematics",
    teacherName: "Sarah Johnson",
    dateTime: createDate(1, 17, 0),
    status: "Confirmed",
  },
  {
    id: "2",
    subject: "Science",
    teacherName: "David Wilson",
    dateTime: createDate(2, 16, 30),
    status: "Confirmed",
  },
  {
    id: "3",
    subject: "English",
    teacherName: "Emily Brown",
    dateTime: createDate(3, 19, 0),
    status: "Confirmed",
  },
];