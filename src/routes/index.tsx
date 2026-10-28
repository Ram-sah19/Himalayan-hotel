import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Instagram,
  Menu,
  Minus,
  Phone,
  Plus,
  Quote,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";

import heroHotel from "../assets/hero-hotel.jpg";
import talentTeam from "../assets/talent-team.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const experiences = [
  {
    number: "01",
    title: "Rooms & Suites",
    description:
      "Quietly spectacular spaces with hand-finished details and uninterrupted Himalayan views.",
    image: heroHotel,
    link: "Explore stays",
  },
  {
    number: "02",
    title: "Dining at altitude",
    description:
      "A contemporary expression of Nepalese flavour, served with a view that needs no embellishment.",
    image: talentTeam,
    link: "Discover dining",
  },
  {
    number: "03",
    title: "The Kathmandu edit",
    description:
      "Private journeys into the valley, curated by people who know every hidden courtyard and mountain path.",
    image: heroHotel,
    link: "Plan your journey",
  },
];

const details = [
  ["Location", "Kathmandu, Nepal"],
  ["Check-in", "From 2:00 pm"],
  ["Check-out", "Until 12:00 pm"],
  ["Contact", "+977 1 555 0199"],
];

const rooms = [
  {
    name: "Valley View Room",
    detail: "48 sqm · King bed · Valley view",
    price: "From $320 / night",
    image: heroHotel,
  },
  {
    name: "Himalayan Suite",
    detail: "86 sqm · Separate lounge · Mountain view",
    price: "From $540 / night",
    image: talentTeam,
  },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-ivory text-charcoal">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
        <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <a href="#" className="group flex items-center gap-3" aria-label="Himalayan Grand home">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/80 text-gold transition-transform group-hover:rotate-45">
              <span className="-rotate-45 font-display text-xl">H</span>
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block font-display text-lg tracking-[0.16em]">HIMALAYAN</span>
              <span className="mt-1 block text-[9px] font-semibold tracking-[0.38em] text-gold">GRAND · KATHMANDU</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.18em] lg:flex">
            <a className="text-gold" href="#stay">Stay</a>
            <a className="transition-colors hover:text-gold" href="/rooms">Suites</a>
            <a className="transition-colors hover:text-gold" href="/experiences">Experience</a>
            <a className="transition-colors hover:text-gold" href="/about">Our story</a>
            <a className="transition-colors hover:text-gold" href="/contact">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingOpen(true)}
              className="hidden border border-gold bg-gold px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:bg-transparent hover:text-gold sm:block"
            >
              Book your stay
            </button>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 items-center justify-center border border-white/30 transition-colors hover:border-gold hover:text-gold lg:hidden"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/15 bg-navy-deep px-6 py-7 lg:hidden">
            <nav className="flex flex-col gap-5 text-xs font-semibold uppercase tracking-[0.2em]">
              {["Stay", "Suites", "Experience", "Our story", "Contact"].map((item) => (
                <a key={item} href={item === "Stay" ? "#stay" : item === "Suites" ? "/rooms" : item === "Experience" ? "/experiences" : item === "Our story" ? "/about" : "/contact"} onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <button onClick={() => { setMenuOpen(false); setBookingOpen(true); }} className="mt-2 w-full bg-gold py-4 text-navy">
                Book your stay
              </button>
            </nav>
          </div>
        )}
      </header>

      <section className="relative flex min-h-[760px] items-end bg-navy-deep pb-24 pt-40 text-white lg:min-h-[850px] lg:pb-32">
        <img src={heroHotel} alt="The Himalayan Grand hotel lobby overlooking the mountains" className="absolute inset-0 h-full w-full object-cover object-center opacity-75" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-deep/80 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="eyebrow mb-7 animate-in fade-in slide-in-from-bottom-3 duration-700">A new perspective on Kathmandu</p>
            <h1 className="text-balance-tight font-display text-6xl leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[108px]">
              Stay above<br /><em className="font-normal text-gold">the ordinary.</em>
            </h1>
            <p className="mt-8 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              A landmark hotel where the spirit of the Himalayas meets the art of exceptional hospitality.
            </p>
          </div>
          <div className="mt-16 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 text-gold"><ArrowRight size={15} /></span>
            Scroll to discover
          </div>
        </div>
      </section>

      <section id="stay" className="relative z-20 mx-auto -mt-2 max-w-[1280px] px-5 lg:-mt-12 lg:px-10">
        <div className="grid border border-white/10 bg-white shadow-2xl shadow-navy/10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1.25fr_1fr_1fr_auto]">
          <BookingField label="Check in" value="12 October 2026" />
          <BookingField label="Check out" value="16 October 2026" border />
          <div className="flex items-center justify-between border-t border-border px-6 py-5 sm:border-l lg:border-t-0">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Guests</p>
              <p className="mt-2 font-display text-lg">{guests} adults</p>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Decrease guests" onClick={() => setGuests(Math.max(1, guests - 1))} className="flex h-7 w-7 items-center justify-center rounded-full border border-border hover:border-gold"><Minus size={12} /></button>
              <button aria-label="Increase guests" onClick={() => setGuests(guests + 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-border hover:border-gold"><Plus size={12} /></button>
            </div>
          </div>
          <BookingField label="Promo code" value="Optional" border muted />
          <button onClick={() => setBookingOpen(true)} className="flex items-center justify-center gap-3 bg-gold px-7 py-6 text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:bg-gold-light">
            Check availability <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section id="story" className="mx-auto grid max-w-[1400px] gap-14 px-6 py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28 lg:px-12 lg:py-40">
        <div>
          <p className="eyebrow">The Himalayan Grand</p>
          <div className="gold-rule mt-6" />
          <h2 className="mt-7 max-w-md text-5xl leading-[1.05] lg:text-6xl">A sense of place, <em className="font-normal text-gold">elevated.</em></h2>
        </div>
        <div className="max-w-2xl">
          <p className="font-display text-2xl leading-snug text-navy lg:text-3xl">“The details are Nepalese. The feeling is entirely your own.”</p>
          <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground">
            Set at the edge of the Kathmandu Valley, Himalayan Grand is a considered retreat for curious travellers. We bring together warm, intuitive service, locally rooted design, and the rare luxury of space to breathe.
          </p>
          <a href="#experience" className="mt-9 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:text-gold">
            Our philosophy <ArrowRight size={14} className="text-gold" />
          </a>
        </div>
      </section>

      <section id="rooms" className="border-y border-border bg-[#f1eee7] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-24">
            <div>
              <p className="eyebrow">Stay awhile</p>
              <h2 className="mt-5 text-5xl leading-[1.05] lg:text-6xl">Rooms with a <em className="font-normal text-gold">point of view.</em></h2>
            </div>
            <div className="flex items-end justify-between gap-6">
              <p className="max-w-lg text-sm leading-7 text-muted-foreground">Every room is a quiet frame for the valley: natural textures, generous light, and the considered comforts that make a great stay feel effortless.</p>
              <a href="#stay" className="hidden shrink-0 items-center gap-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy hover:text-gold sm:flex">View all rooms <ArrowRight size={14} /></a>
            </div>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {rooms.map((room) => (
              <article key={room.name} className="group bg-white">
                <div className="relative aspect-[1.55] overflow-hidden">
                  <img src={room.image} alt={room.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
                  <span className="absolute bottom-5 left-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Himalayan Grand</span>
                </div>
                <div className="flex flex-col justify-between gap-5 p-7 sm:flex-row sm:items-end">
                  <div>
                    <h3 className="text-3xl text-navy">{room.name}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{room.detail}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs font-semibold text-navy">{room.price}</p>
                    <a href="#stay" className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Discover <ChevronRight size={13} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-14 grid gap-5 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {details.map(([label, value]) => (
              <div key={label}>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                <p className="mt-2 font-display text-lg text-navy">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-navy py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Make it yours</p>
              <h2 className="mt-5 text-5xl lg:text-6xl">The Grand <em className="font-normal text-gold">experience.</em></h2>
            </div>
            <a href="#contact" className="hidden items-center gap-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold sm:flex">View all <ArrowRight size={14} /></a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {experiences.map((experience, index) => (
              <article key={experience.number} className={`group ${index === 1 ? "md:mt-16" : ""}`}>
                <div className="relative aspect-[0.82] overflow-hidden bg-navy-deep">
                  <img src={experience.image} alt={experience.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent opacity-80" />
                  <span className="absolute left-6 top-6 font-display text-xl text-gold">{experience.number}</span>
                  <div className="absolute inset-x-6 bottom-7">
                    <h3 className="text-3xl">{experience.title}</h3>
                    <p className="mt-3 max-w-xs text-xs leading-6 text-white/70">{experience.description}</p>
                    <a href={experience.number === "02" ? "/dining" : experience.number === "03" ? "/experiences" : "/rooms"} className="mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">{experience.link} <ChevronRight size={14} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gold px-6 py-20 text-navy lg:px-12 lg:py-24">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border border-navy/15" />
        <div className="absolute -right-4 -top-16 h-56 w-56 rounded-full border border-navy/10" />
        <div className="relative mx-auto flex max-w-[1400px] flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/65">Your Kathmandu, curated</p>
            <h2 className="mt-4 max-w-2xl text-4xl leading-tight lg:text-5xl">Come for the view.<br /><em className="font-normal">Stay for the feeling.</em></h2>
          </div>
          <button onClick={() => setBookingOpen(true)} className="inline-flex w-fit items-center gap-4 border border-navy px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-navy hover:text-gold">Plan your stay <ArrowRight size={15} /></button>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-14 px-6 py-28 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-12 lg:py-40">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -bottom-6 -left-6 h-32 w-32 border-b border-l border-gold" />
          <img src={talentTeam} alt="The Himalayan Grand hospitality team" className="relative z-10 aspect-[1.05] w-full object-cover" />
          <div className="absolute -right-4 -top-5 z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gold text-center text-[9px] font-bold uppercase leading-4 tracking-[0.14em] text-navy">
            Est.<br />2026
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow">The people behind the welcome</p>
          <h2 className="mt-6 max-w-lg text-5xl leading-[1.05] lg:text-6xl">Service is a <em className="font-normal text-gold">craft.</em></h2>
          <p className="mt-7 max-w-lg text-sm leading-7 text-muted-foreground">From the first cup of chiya to the last look at the peaks, our team notices the small things. It is the warmth of Nepal, made personal.</p>
          <div className="mt-9 flex flex-wrap gap-8 border-t border-border pt-7">
            <div><p className="font-display text-3xl text-navy">24/7</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">At your service</p></div>
            <div><p className="font-display text-3xl text-navy">38</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Local artisans</p></div>
            <div><p className="font-display text-3xl text-navy">1:1</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Personal care</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeae2] px-6 py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto text-gold" size={30} strokeWidth={1} />
          <blockquote className="mt-7 font-display text-3xl leading-tight text-navy lg:text-5xl">“A beautifully judged stay — generous, discreet, and full of the valley’s quiet magic.”</blockquote>
          <div className="mt-8 flex justify-center gap-1 text-gold"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Amelia R. · Condé Nast Traveller</p>
        </div>
      </section>

      <footer id="contact" className="bg-navy-deep px-6 pb-8 pt-20 text-white lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold"><span className="font-display text-xl">H</span></span>
                <div className="leading-none"><span className="block font-display text-lg tracking-[0.16em]">HIMALAYAN</span><span className="mt-1 block text-[9px] font-semibold tracking-[0.38em] text-gold">GRAND · KATHMANDU</span></div>
              </div>
              <p className="mt-7 max-w-xs text-sm leading-7 text-white/55">A new perspective on Kathmandu, with the mountains always in view.</p>
            </div>
            <div><p className="eyebrow mb-5">Explore</p><div className="flex flex-col gap-3 text-sm text-white/70"><a href="#stay" className="hover:text-gold">Stay with us</a><a href="#experience" className="hover:text-gold">Experiences</a><a href="#story" className="hover:text-gold">Our story</a></div></div>
            <div><p className="eyebrow mb-5">Contact</p><div className="flex flex-col gap-3 text-sm text-white/70"><a href="tel:+97715550199" className="flex items-center gap-2 hover:text-gold"><Phone size={13} /> +977 1 555 0199</a><p className="flex items-start gap-2"><Clock3 size={13} className="mt-1" /> Boudha, Kathmandu<br />Nepal 44600</p></div></div>
            <div><p className="eyebrow mb-5">Follow along</p><a href="#instagram" className="inline-flex items-center gap-3 text-sm text-white/70 hover:text-gold"><Instagram size={16} /> @himalayangrand</a></div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-7 text-[10px] uppercase tracking-[0.14em] text-white/35 sm:flex-row"><span>© 2026 Himalayan Grand</span><span>Privacy · Terms · Accessibility</span></div>
        </div>
      </footer>

      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <div className="relative w-full max-w-lg bg-ivory p-8 shadow-2xl sm:p-12">
            <button aria-label="Close booking dialog" onClick={() => setBookingOpen(false)} className="absolute right-5 top-5 text-muted-foreground hover:text-navy"><X size={19} /></button>
            <p className="eyebrow">Your escape awaits</p>
            <h2 id="booking-title" className="mt-4 text-4xl">Begin your stay.</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Our reservations team will be in touch shortly to tailor your Himalayan Grand experience.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">First name<input className="mt-2 w-full border border-border bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-gold" placeholder="Your name" /></label>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Email address<input type="email" className="mt-2 w-full border border-border bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-gold" placeholder="you@example.com" /></label>
            </div>
            <button onClick={() => setBookingOpen(false)} className="mt-7 flex w-full items-center justify-center gap-3 bg-gold py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-navy hover:bg-gold-light">Request availability <ArrowRight size={15} /></button>
          </div>
        </div>
      )}
    </main>
  );
}

function BookingField({ label, value, border, muted }: { label: string; value: string; border?: boolean; muted?: boolean }) {
  return (
    <div className={`px-6 py-5 ${border ? "border-t border-border sm:border-l lg:border-t-0" : ""}`}>
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display text-lg ${muted ? "text-muted-foreground" : "text-navy"}`}>{value}</p>
    </div>
  );
}
