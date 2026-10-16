import { useState, type FormEvent } from "react";
import { buttonClasses } from "@/lib/button";
import { ButtonLabel } from "./ButtonLabel";

type Props = { placeholder: string; buttonLabel: string };

export function NewsletterForm({ placeholder, buttonLabel }: Props) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(dev): send the email address to your newsletter provider (Mailchimp, ConvertKit, Resend audiences…).
    setSent(true);
  }

  if (sent) {
    return <p className="rounded-full bg-white p-7.5 text-xl">Thanks! You&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={placeholder}
        className="w-full rounded-full bg-white p-7.5 text-xl outline-none placeholder:text-placeholder focus-visible:ring-2 focus-visible:ring-ink"
      />
      <button type="submit" className={buttonClasses("black", "xl", "w-full")}>
        <ButtonLabel>{buttonLabel}</ButtonLabel>
      </button>
    </form>
  );
}
