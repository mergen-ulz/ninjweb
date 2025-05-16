"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@/styles/calendar.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PublicCalendarPage() {
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
    <>
      <div className="bg-[#152C5B] h-22">
        <NavBar />
      </div>

      <main className="min-h-screen px-4 py-10 font-neue my-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#152C5B] mb-10">
          Program Calendar
        </h1>

        <div className="bg-white rounded-lg shadow p-4 max-w-6xl mx-auto">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            eventClassNames={(arg) => arg.event.classNames}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth",
            }}
            buttonText={{
              dayGridMonth: "Month",
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
