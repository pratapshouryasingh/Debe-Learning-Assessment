"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Session, RescheduleReason } from "@/types/session";
import { requestReschedule } from "@/lib/requestReschedule";
import { localToUTC } from "@/utils/timezone";
import { timeSlots } from "@/lib/timeSlots";
import { toast } from "sonner";

import LoadingButton from "./LoadingButton";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  session: Session | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (sessionId: string) => void;
}

export default function RescheduleDialog({
  session,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  const [reason, setReason] =
    useState<RescheduleReason>("Conflict");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!session) return;

    const current = new Date(session.dateTime);

    setSelectedDate(current);

    setSelectedTime(format(current, "HH:mm"));

    setReason("Conflict");

    setError("");

    setSuccess("");
  }, [session]);

  if (!session) return null;

  async function handleSubmit() {
  if (!session || !selectedDate || !selectedTime) {
    setError("Please select a date and time.");
    return;
  }

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    // Create local date & time selected by the parent
    const [hours, minutes] = selectedTime
      .split(":")
      .map(Number);

    const localDateTime = new Date(selectedDate);

    localDateTime.setHours(hours);
    localDateTime.setMinutes(minutes);
    localDateTime.setSeconds(0);
    localDateTime.setMilliseconds(0);

    /**
     * Assessment Requirement:
     * Parents choose a time in their local timezone,
     * but we store/send it as UTC.
     */
    const utcDateTime = localToUTC(localDateTime);

    const result = await requestReschedule({
      sessionId: session.id,
      currentSlot: session.dateTime,
      newSlot: utcDateTime,
      reason,
    });

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
      return;
    }

    toast.success("Reschedule request submitted!");
    onSuccess(session.id);

    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  } catch (err) {
    console.error(err);

    setError("Unable to submit request.");
  } finally {
    setLoading(false);
  }
}

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-[calc(100%-1rem)] max-w-2xl max-h-[90vh] overflow-y-auto p-2 sm:p-4">

        <DialogHeader>

          <DialogTitle className="text-2xl">
            Request Reschedule
          </DialogTitle>

          <DialogDescription>
            Select a new date and time for this tutoring
            session.
          </DialogDescription>

        </DialogHeader>

        {/* Current Session */}

        <div className="mt-2 rounded-2xl bg-slate-100 p-4">

          <h3 className="font-semibold">
            {session.subject}
          </h3>

          <p className="text-sm text-slate-600">
            {session.teacherName}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {format(
              new Date(session.dateTime),
              "dd MMM yyyy • hh:mm a"
            )}
          </p>

        </div>

        {/* Calendar */}

{/* Date & Time Section */}

<div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-[1fr_100px]">

  {/* LEFT COLUMN */}

  <div>
    <label className="mb-3 block text-sm font-medium">
      Choose New Date
    </label>

    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      disabled={(date) => {
        return date < new Date(new Date().setHours(0, 0, 0, 0));
      }}
      className="rounded-xl border w-fit"
    />
  </div>

  {/* RIGHT COLUMN */}

  <div className="space-y-6 pt-9">

    {/* Time */}

    <div>

      <label className="mb-2 block text-sm font-medium">
        Choose Time
      </label>

      <Select
  value={selectedTime}
  onValueChange={(value) => {
    if (value !== null) {
      setSelectedTime(value);
    }
  }}
>
  <SelectTrigger>
    <SelectValue placeholder="Select time" />
  </SelectTrigger>

  <SelectContent>
    {timeSlots.map((slot) => {
      const [hours, minutes] = slot.split(":").map(Number);

      const slotDate = new Date(selectedDate!);

      slotDate.setHours(hours);
      slotDate.setMinutes(minutes);
      slotDate.setSeconds(0);

      const now = new Date();

      const minimumAllowed = new Date(
        now.getTime() + 2 * 60 * 60 * 1000
      );

      const isToday =
        selectedDate?.toDateString() === now.toDateString();

      const disabled =
        isToday && slotDate < minimumAllowed;

      return (
        <SelectItem
          key={slot}
          value={slot}
          disabled={disabled}
        >
          {slot}
        </SelectItem>
      );
    })}
  </SelectContent>
</Select>
    </div>

    {/* Reason */}

    <div>

      <label className="mb-2 block text-sm font-medium">
        Reason
      </label>

      <Select
        value={reason}
        onValueChange={(value) =>
          setReason(value as RescheduleReason)
        }
      >

        <SelectTrigger >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="Conflict">
            Conflict
          </SelectItem>

          <SelectItem value="Illness">
            Illness
          </SelectItem>

          <SelectItem value="Time zone">
            Time Zone
          </SelectItem>

          <SelectItem value="Other">
            Other
          </SelectItem>

        </SelectContent>

      </Select>

    </div>

  </div>

</div>

        {/* Error */}

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3">
            <p className="text-sm text-green-700">
              {success}
            </p>
          </div>
        )}

        {/* Footer */}

        <div className="mt-3 flex justify-end gap-1">

          <button
            onClick={() => onOpenChange(false)}
            className="rounded-xl border px-5 py-3 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
          >
            Submit Request
          </LoadingButton>

        </div>

      </DialogContent>

    </Dialog>

  );
}
