"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";

/** Bottom-border email field with an arrow submit. No backend yet: confirms locally. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="text-body">
        Thank you — the next letter is on its way to your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center border-b border-line-strong">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Email address"
        className="min-w-0 flex-1 bg-transparent py-3 text-body outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="inline-flex size-12 items-center justify-center transition-opacity duration-300 ease-atelier hover:opacity-60"
      >
        <ArrowRightIcon />
      </button>
    </form>
  );
}
