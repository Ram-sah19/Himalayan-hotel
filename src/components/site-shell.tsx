import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Menu, Phone, X } from "lucide-react";
import { useState, type ReactNode } from "react";

type SiteHeaderProps = {
  dark?: boolean;
};

export function SiteHeader({ dark = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const textClass = dark ? "text-white" : "text-navy";

  return (
    <header className={`relative z-30 border-b ${dark ? "border-white/15" : "border-border"} ${textClass}`}>
      <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <Link to="/" className="group flex items-center gap-3" aria-label="Himalayan Grand home">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition-transform group-hover:rotate-45">
            <span className="-rotate-45 font-display text-xl">H</span>
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-lg tracking-[0.16em]">HIMALAYAN</span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.38em] text-gold">GRAND · KATHMANDU</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em] lg:flex">
          <Link to="/rooms" className="transition-colors hover:text-gold">Stay</Link>
          <Link to="/rooms" className="transition-colors hover:text-gold">Suites</Link>
          <Link to="/experiences" className="transition-colors hover:text-gold">Experience</Link>
          <Link to="/dining" className="transition-colors hover:text-gold">Dining</Link>
          <Link to="/about" className="transition-colors hover:text-gold">Our story</Link>
          <Link to="/contact" className="transition-colors hover:text-gold">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden border border-gold bg-gold px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:bg-transparent hover:text-gold sm:block">
            Book your stay
          </Link>
          <button aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)} className={`flex h-11 w-11 items-center justify-center border ${dark ? "border-white/30" : "border-border"} transition-colors hover:border-gold hover:text-gold lg:hidden`}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`border-t px-6 py-7 lg:hidden ${dark ? "border-white/15 bg-navy-deep" : "border-border bg-white"}`}>
          <nav className="flex flex-col gap-5 text-xs font-semibold uppercase tracking-[0.2em]">
            <Link to="/rooms" onClick={() => setMenuOpen(false)}>Stay & suites</Link>
            <Link to="/experiences" onClick={() => setMenuOpen(false)}>Experience</Link>
            <Link to="/dining" onClick={() => setMenuOpen(false)}>Dining</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>Our story</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="mt-2 w-full bg-gold py-4 text-center text-navy">Book your stay</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep px-6 pb-8 pt-20 text-white lg:px-12 lg:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold"><span className="font-display text-xl">H</span></span>
              <div className="leading-none"><span className="block font-display text-lg tracking-[0.16em]">HIMALAYAN</span><span className="mt-1 block text-[9px] font-semibold tracking-[0.38em] text-gold">GRAND · KATHMANDU</span></div>
            </Link>
            <p className="mt-7 max-w-xs text-sm leading-7 text-white/55">A new perspective on Kathmandu, with the mountains always in view.</p>
          </div>
          <div><p className="eyebrow mb-5">Explore</p><div className="flex flex-col gap-3 text-sm text-white/70"><Link to="/rooms" className="hover:text-gold">Stay with us</Link><Link to="/experiences" className="hover:text-gold">Experiences</Link><Link to="/about" className="hover:text-gold">Our story</Link></div></div>
          <div><p className="eyebrow mb-5">Contact</p><div className="flex flex-col gap-3 text-sm text-white/70"><a href="tel:+97715550199" className="flex items-center gap-2 hover:text-gold"><Phone size={13} /> +977 1 555 0199</a><p> Boudha, Kathmandu<br />Nepal 44600</p></div></div>
          <div><p className="eyebrow mb-5">Follow along</p><a href="#instagram" className="inline-flex items-center gap-3 text-sm text-white/70 hover:text-gold"><Instagram size={16} /> @himalayangrand</a></div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-7 text-[10px] uppercase tracking-[0.14em] text-white/35 sm:flex-row"><span>© 2026 Himalayan Grand</span><span>Privacy · Terms · Accessibility</span></div>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode }) {
  return (
    <section className="bg-navy px-6 py-24 text-white lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <h1 className="max-w-4xl text-6xl leading-[0.95] tracking-[-0.03em] lg:text-8xl">{title}</h1>
          <p className="max-w-md text-sm leading-7 text-white/70">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function GoldCta() {
  return (
    <section className="bg-gold px-6 py-16 text-navy lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-7 sm:flex-row sm:items-center">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60">Your Himalayan escape</p><h2 className="mt-3 font-display text-4xl">Make room for wonder.</h2></div>
        <Link to="/contact" className="inline-flex w-fit items-center gap-4 border border-navy px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-navy hover:text-gold">Book your stay <ArrowRight size={15} /></Link>
      </div>
    </section>
  );
}
