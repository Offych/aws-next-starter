"use client"

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export function CalendarComponent() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-sm"
      captionLayout="dropdown"
    />
  )
}
