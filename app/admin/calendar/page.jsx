"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "@/styles/calendar.css";
export default function AdminCalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchPrograms() {
      const res = await fetch("/api/programs");
      const data = await res.json();

      const formattedEvents = [];

      data.forEach((program, programIndex) => {
        const start = new Date(program.startDate);
        const end = new Date(program.endDate);
        const colorClass = `event-${programIndex % 6}`;

        for (
          let date = new Date(start);
          date <= end;
          date.setDate(date.getDate() + 1)
        ) {
          formattedEvents.push({
            id: `${program._id}-${date.toISOString().slice(0, 10)}`,
            title: program.title,
            start: new Date(date),
            allDay: true,
            url: `/programs/${program._id}`,
            classNames: [colorClass],
          });
        }
      });

      setEvents(formattedEvents);
    }

    fetchPrograms();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-100 font-neue ml-64">
        <h1 className="text-2xl font-bold text-[#152C5B] mb-6">
          Program Calendar
        </h1>
        <div className="bg-white rounded-lg shadow p-4">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            dayMaxEventRows={3}
            eventClassNames={(arg) => arg.event.classNames}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth",
            }}
          />
        </div>
      </main>
    </div>
  );
}
