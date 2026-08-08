"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  if (status === "success") {
    return (
      <div className="rounded-xl bg-white/5 border border-brand-gold/30 p-4 text-center">
        <p className="text-brand-gold text-sm font-semibold">Subscribed Successfully!</p>
        <p className="text-brand-white/60 text-xs mt-1">Thank you for joining our newsletter.</p>
      </div>
    );
  }

  return (
    <form 
      className="flex flex-col gap-3" 
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("success");
      }}
    >
      <div className="relative">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="w-full bg-brand-deep-forest border border-brand-gold/20 rounded-xl py-3 px-4 text-sm text-brand-white placeholder:text-brand-white/35 focus:outline-none focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/40 transition-all duration-200"
          aria-label="Email address for newsletter"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-sm font-semibold hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-200"
      >
        Subscribe
      </button>
    </form>
  );
}
