"use client";

import { useState, type FormEvent } from "react";
import { ButtonLabel, buttonClasses } from "@/components/ui/Button";
import { cn } from "@/(core)/lib/utils";

const field = "w-full rounded-full bg-canvas px-6 py-4 outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ink";
const label = "mb-2 block text-sm text-muted";

export function BookingForm({ services, buttonLabel }: { services: string[]; buttonLabel: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(dev): send the booking request (e.g. a route handler that emails it with Resend, or your booking system's API).
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-10 rounded-card bg-canvas p-8 animate-fade-in">
        <p className="text-2xl">Thanks — your request is in.</p>
        <p className="mt-2 text-muted">We&apos;ll confirm your session by email within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-5 md:grid-cols-2">
      <div>
        <label htmlFor="book-name" className={label}>Full name</label>
        <input id="book-name" name="name" required autoComplete="name" placeholder="Jordan Lee" className={field} />
      </div>
      <div>
        <label htmlFor="book-email" className={label}>Email</label>
        <input id="book-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
      </div>
      <div>
        <label htmlFor="book-phone" className={label}>Phone</label>
        <input id="book-phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" className={field} />
      </div>
      <div>
        <label htmlFor="book-service" className={label}>What would you like to book?</label>
        <select id="book-service" name="service" required defaultValue="" className={cn(field, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22black%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-position-[right_1.5rem_center] bg-no-repeat pr-12")}>
          <option value="" disabled>Choose a session</option>
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="book-date" className={label}>Preferred date</label>
        <input id="book-date" name="date" type="date" required className={field} />
      </div>
      <div>
        <label htmlFor="book-time" className={label}>Preferred time</label>
        <input id="book-time" name="time" type="time" className={field} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="book-message" className={label}>Anything we should know?</label>
        <textarea
          id="book-message"
          name="message"
          rows={4}
          placeholder="Your level, goals, or questions for the coach"
          className={cn(field, "resize-none rounded-card")}
        />
      </div>
      <button type="submit" className={buttonClasses("black", "lg", "md:col-span-2")}>
        <ButtonLabel>{buttonLabel}</ButtonLabel>
      </button>
    </form>
  );
}
