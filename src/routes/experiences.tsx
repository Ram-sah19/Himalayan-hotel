import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mountain, Sparkles, Sun } from "lucide-react";
import heroHotel from "../assets/hero-hotel.jpg";
import { GoldCta, PageIntro, SiteFooter, SiteHeader } from "../components/site-shell";

export const Route = createFileRoute("/experiences")({ component: Experiences });

const experiences = [
  ["The valley at dawn", "Begin before the city wakes with a private sunrise drive to a hilltop lookout.", Sun],
  ["Temple & artisan trail", "Meet the makers, monks, and guardians of the valley on a slow cultural walk.", Sparkles],
  ["Into the Himalayas", "A tailor-made day in the mountains, from gentle forest paths to unforgettable passes.", Mountain],
];

function Experiences() {
  return <main className="min-h-screen bg-ivory text-charcoal"><SiteHeader /><PageIntro eyebrow="Make it yours" title={<>Go beyond <em className="font-normal text-gold">the expected.</em></>} description="Our concierge team turns a stay into a story, with private access, thoughtful pacing, and the Kathmandu only locals know." /><section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-32"><div className="grid gap-6 lg:grid-cols-3">{experiences.map(([title, description, Icon], index) => <article key={title} className={`border border-border bg-white p-8 ${index === 1 ? "lg:mt-16" : ""}`}><Icon size={28} strokeWidth={1.2} className="text-gold" /><p className="mt-12 font-display text-xl text-gold">0{index + 1}</p><h2 className="mt-4 text-3xl text-navy">{title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p><Link to="/contact" className="mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-navy hover:text-gold">Build your itinerary <ArrowRight size={14} /></Link></article>)}</div><div className="mt-24 grid gap-12 bg-[#eeeae2] p-8 lg:grid-cols-[1fr_0.8fr] lg:p-14"><div><p className="eyebrow">A slower way to travel</p><h2 className="mt-5 text-5xl text-navy">The best moments are not on the itinerary.</h2></div><div><p className="text-sm leading-7 text-muted-foreground">Leave space for the unexpected. A hidden courtyard, a conversation over butter tea, a perfect view from the back seat. Tell us what moves you and we will take care of the rest.</p><Link to="/contact" className="mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-navy hover:text-gold">Speak to our concierge <ArrowRight size={14} className="text-gold" /></Link></div></div></section><GoldCta /><SiteFooter /></main>;
}

