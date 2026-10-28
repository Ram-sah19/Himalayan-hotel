import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { GoldCta, PageIntro, SiteFooter, SiteHeader } from "../components/site-shell";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <SiteHeader />
      <PageIntro eyebrow="We are here to help" title={<>Begin your <em className="font-normal text-gold">stay.</em></>} description="Whether you are planning a weekend in Kathmandu or a longer journey through Nepal, our reservations team is ready to make it effortless." />
      <section className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12 lg:py-32">
        <div>
          <p className="eyebrow">Reservations & concierge</p>
          <h2 className="mt-5 text-5xl text-navy">Let’s make a plan.</h2>
          <p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground">Tell us a little about your trip and our team will be in touch within one business day.</p>
          <div className="mt-10 space-y-5 border-t border-border pt-7 text-sm text-muted-foreground">
            <a href="tel:+97715550199" className="flex items-center gap-3 hover:text-gold"><Phone size={16} className="text-gold" /> +977 1 555 0199</a>
            <a href="mailto:stay@himalayangrand.com" className="flex items-center gap-3 hover:text-gold"><Mail size={16} className="text-gold" /> stay@himalayangrand.com</a>
            <p className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-gold" /> Boudha, Kathmandu<br />Nepal 44600</p>
            <p className="flex items-center gap-3"><Clock3 size={16} className="text-gold" /> Reservations: 24 hours</p>
          </div>
        </div>
        <form className="bg-white p-7 shadow-sm sm:p-10" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          {submitted ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy"><ArrowRight size={22} /></span>
              <h2 className="mt-6 text-4xl text-navy">We have your note.</h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Thank you. Our reservations team will be in touch shortly.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" placeholder="Your name" />
                <Field label="Email address" placeholder="you@example.com" type="email" />
                <Field label="Arrival" placeholder="Select a date" />
                <Field label="Departure" placeholder="Select a date" />
              </div>
              <label className="mt-5 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Tell us about your stay<textarea className="mt-2 min-h-32 w-full resize-y border border-border bg-ivory px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-gold" placeholder="What can we arrange for you?" /></label>
              <button type="submit" className="mt-7 flex w-full items-center justify-center gap-3 bg-gold py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:bg-gold-light">Send enquiry <ArrowRight size={15} /></button>
            </>
          )}
        </form>
      </section>
      <GoldCta />
      <SiteFooter />
    </main>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}<input type={type} required className="mt-2 w-full border border-border bg-ivory px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-gold" placeholder={placeholder} /></label>;
}

