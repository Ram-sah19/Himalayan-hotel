import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import heroHotel from "../assets/hero-hotel.jpg";
import talentTeam from "../assets/talent-team.jpg";
import { GoldCta, PageIntro, SiteFooter, SiteHeader } from "../components/site-shell";

export const Route = createFileRoute("/rooms")({ component: Rooms });

const rooms = [
  ["Valley View Room", "48 sqm · King bed · Valley view", "From $320 / night", heroHotel],
  ["Himalayan Suite", "86 sqm · Separate lounge · Mountain view", "From $540 / night", talentTeam],
  ["Grand Terrace Suite", "124 sqm · Private terrace · 180° views", "From $780 / night", heroHotel],
];

function Rooms() {
  return <main className="min-h-screen bg-ivory text-charcoal"><SiteHeader /><PageIntro eyebrow="Stay awhile" title={<>Rooms with a <em className="font-normal text-gold">point of view.</em></>} description="Thoughtful spaces, natural textures, and the stillness of the valley. Choose the room that makes your Kathmandu yours." /><section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28"><div className="grid gap-8 lg:grid-cols-3">{rooms.map(([name, detail, price, image]) => <article key={name} className="bg-white shadow-sm"><div className="aspect-[1.15] overflow-hidden"><img src={image} alt={name} className="h-full w-full object-cover transition duration-700 hover:scale-105" /></div><div className="p-7"><h2 className="font-display text-3xl text-navy">{name}</h2><p className="mt-3 text-xs text-muted-foreground">{detail}</p><p className="mt-7 text-sm font-semibold text-navy">{price}</p><Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Reserve this room <ArrowRight size={14} /></Link></div></article>)}</div><div className="mt-20 grid gap-10 border-t border-border pt-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">Included with every stay</p><h2 className="mt-5 text-4xl text-navy">The details that make the difference.</h2></div><div className="grid gap-4 sm:grid-cols-2">{["Daily breakfast for two", "Airport transfer on request", "24-hour concierge service", "Complimentary high-speed Wi-Fi", "Evening turndown ritual", "Access to the wellness floor"].map((item) => <p key={item} className="flex items-center gap-3 border-b border-border pb-4 text-sm text-muted-foreground"><Check size={15} className="text-gold" />{item}</p>)}</div></div></section><GoldCta /><SiteFooter /></main>;
}

