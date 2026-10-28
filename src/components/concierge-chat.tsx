import { Link } from "@tanstack/react-router";
import {
  ArrowUp,
  CalendarDays,
  ChevronRight,
  ConciergeBell,
  Minus,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
  links?: { label: string; to: "/rooms" | "/dining" | "/experiences" | "/about" | "/contact" }[];
};

const quickQuestions = [
  "Which room is right for me?",
  "What can I do in Kathmandu?",
  "Tell me about dining",
  "How do I contact reservations?",
];

const intro: Message = {
  id: 1,
  role: "assistant",
  text: "Welcome to Himalayan Grand. I’m your private concierge — here to help with rooms, dining, experiences, and everything you need to plan a beautiful stay.",
  links: [
    { label: "Explore rooms & suites", to: "/rooms" },
    { label: "Meet our experiences", to: "/experiences" },
  ],
};

function answerQuestion(question: string): Omit<Message, "id" | "role"> {
  const query = question.toLowerCase();

  if (/^(hi|hello|hey|hiya|good morning|good afternoon|good evening)\b/.test(query.trim())) {
    return {
      text: "Hello, and welcome to Himalayan Grand. It’s lovely to have you here. Are you just discovering the hotel, planning a stay, or looking for something to do in Kathmandu?",
      links: [
        { label: "Discover the hotel", to: "/about" },
        { label: "Plan a stay", to: "/contact" },
      ],
    };
  }

  if (query.includes("how are you") || query.includes("how are things")) {
    return {
      text: "I’m doing wonderfully, thank you for asking — and I’m here to make your Himalayan Grand planning easy. Would you like to hear about the hotel, your room options, dining, or things to do in Kathmandu?",
      links: [{ label: "Discover the hotel", to: "/about" }, { label: "Explore experiences", to: "/experiences" }],
    };
  }

  if (
    query.includes("room") ||
    query.includes("suite") ||
    query.includes("accommodation") ||
    query === "rooms" ||
    query.includes("about the room") ||
    query.includes("about rooms") ||
    query.includes("room rate") ||
    query.includes("room price") ||
    query.includes("dinning") ||
    query.includes("dining") ||
    query.includes("restaurant") ||
    query.includes("breakfast") ||
    query.includes("dinner") ||
    query.includes("food")
  ) {
    if (query.includes("dining") || query.includes("dinning") || query.includes("restaurant") || query.includes("breakfast") || query.includes("dinner") || query.includes("food")) {
      return {
        text: "Maya is our all-day dining room, serving a contemporary expression of Nepalese flavour. Breakfast is served from 6:30–10:30 and dinner from 18:00–22:30. We can also arrange private dining and bespoke menus.",
        links: [{ label: "Discover dining", to: "/dining" }, { label: "Reserve a table", to: "/contact" }],
      };
    }
    return {
      text: "We offer three stay options: the 48 sqm Valley View Room from $320 per night, the 86 sqm Himalayan Suite from $540, and the 124 sqm Grand Terrace Suite from $780. These are starting rates, so our reservations team confirms the exact room and price for your dates.",
      links: [{ label: "Compare rooms & suites", to: "/rooms" }, { label: "Request availability", to: "/contact" }],
    };
  }

  if (
    query.includes("about the hotel") ||
    query.includes("tell me more") ||
    query.includes("know more") ||
    query.includes("what is the hotel") ||
    query.includes("your hotel") ||
    query.includes("himalayan grand") ||
    query.includes("what is more") ||
    query.includes("what's more") ||
    query.includes("what else") ||
    query.includes("what do you have") ||
    query.includes("what is there") ||
    query.includes("what's there") ||
    query.includes("explore about") ||
    query.includes("more in there")
  ) {
    return {
      text: "There is quite a bit to discover at Himalayan Grand. We offer considered rooms and suites, Maya all-day dining, a wellness floor, 24-hour concierge service, airport transfers, and private Kathmandu experiences. The hotel is in Boudha, so your stay can be as restful or as exploratory as you like — from a quiet breakfast with mountain views to temple walks, artisan trails, and tailor-made Himalayan days.",
      links: [
        { label: "Read our story", to: "/about" },
        { label: "See rooms & suites", to: "/rooms" },
        { label: "Explore the experience", to: "/experiences" },
      ],
    };
  }

  if (
    query.includes("facebook") ||
    query.includes("fb") ||
    query.includes("instagram") ||
    query.includes("social media") ||
    query.includes("social profile") ||
    query.includes("follow")
  ) {
    return {
      text: "I don’t want to give you an unverified social profile. Our reservations team can share the official social links and help with anything you’re planning at the hotel.",
      links: [{ label: "Ask reservations", to: "/contact" }],
    };
  }

  if (query === "hotel" || query.includes("it's good") || query.includes("its good") || query === "good") {
    return {
      text: "I’m glad to hear that. Himalayan Grand is a luxury hotel in Boudha, Kathmandu, bringing together Nepalese craft, mountain views, intuitive service, considered rooms, all-day dining, and private experiences.",
      links: [{ label: "Discover the hotel", to: "/about" }, { label: "Explore rooms", to: "/rooms" }],
    };
  }

  if (
    query.includes("helpline") ||
    query.includes("hotline") ||
    query.includes("call") ||
    query.includes("speak to someone") ||
    query.includes("human") ||
    query.includes("agent") ||
    query.includes("help desk")
  ) {
    return {
      text: "Of course — our reservations team is available 24 hours and would be delighted to help personally. You can call +977 1 555 0199, email stay@himalayangrand.com, or send an enquiry and we’ll get back to you within one business day.",
      links: [{ label: "Contact reservations", to: "/contact" }],
    };
  }

  if (
    query === "fine" ||
    query === "good" ||
    query === "that's good" ||
    query === "that is good" ||
    query === "sounds good" ||
    query === "that helps" ||
    query.includes("thank") ||
    query.includes("thanks") ||
    query.includes("great") ||
    query.includes("perfect") ||
    query.includes("okay") ||
    query.includes("ok")
  ) {
    return {
      text: "It’s my pleasure. Whenever you’re ready, I can help you compare rooms, shape a Kathmandu itinerary, or connect you with our reservations team.",
      links: [
        { label: "Compare rooms", to: "/rooms" },
        { label: "Plan your itinerary", to: "/experiences" },
      ],
    };
  }

  if (query.includes("room") || query.includes("suite") || query.includes("stay") || query.includes("price")) {
    return {
      text: "We have three considered stay options: the 48 sqm Valley View Room from $320 per night, the 86 sqm Himalayan Suite from $540, and the 124 sqm Grand Terrace Suite from $780. Every stay includes breakfast for two, concierge service, Wi-Fi, and evening turndown.",
      links: [{ label: "Compare rooms & suites", to: "/rooms" }, { label: "Request availability", to: "/contact" }],
    };
  }

  if (query.includes("food") || query.includes("dining") || query.includes("restaurant") || query.includes("breakfast") || query.includes("table")) {
    return {
      text: "Maya is our all-day dining room, serving a contemporary expression of Nepalese flavour. Breakfast is served from 6:30–10:30 and dinner from 18:00–22:30. We can also arrange private dining and bespoke menus.",
      links: [{ label: "Discover dining", to: "/dining" }, { label: "Reserve a table", to: "/contact" }],
    };
  }

  if (query.includes("experience") || query.includes("kathmandu") || query.includes("activity") || query.includes("tour") || query.includes("mountain") || query.includes("temple")) {
    return {
      text: "Our concierge can arrange sunrise over the valley, temple and artisan trails, and tailor-made Himalayan days. We leave room for the unexpected and shape each itinerary around your pace and interests.",
      links: [{ label: "Explore experiences", to: "/experiences" }, { label: "Speak to concierge", to: "/contact" }],
    };
  }

  if (query.includes("contact") || query.includes("reservation") || query.includes("book") || query.includes("phone") || query.includes("email") || query.includes("helpline") || query.includes("human")) {
    return {
      text: "Our reservations team is available 24 hours. You can call +977 1 555 0199 or email stay@himalayangrand.com for room availability, rates, special requests, airport transfers, dining reservations, or help planning your visit. You can also send an enquiry through our contact page; the team responds within one business day.",
      links: [{ label: "Contact reservations", to: "/contact" }],
    };
  }

  if (query.includes("location") || query.includes("where") || query.includes("airport") || query.includes("address")) {
    return {
      text: "Himalayan Grand is in Boudha, Kathmandu, Nepal 44600 — close to the valley’s cultural landmarks and with the mountains always in view. Airport transfers can be arranged through our concierge.",
      links: [{ label: "Plan your arrival", to: "/contact" }],
    };
  }

  if (query.includes("check") || query.includes("time") || query.includes("wifi") || query.includes("amenit") || query.includes("include")) {
    return {
      text: "Check-in begins at 2:00 pm and check-out is until 12:00 pm. Every stay includes breakfast for two, high-speed Wi-Fi, 24-hour concierge service, evening turndown, and access to the wellness floor.",
      links: [{ label: "See what’s included", to: "/rooms" }],
    };
  }

  return {
    text: "I’d be happy to help. I can tell you about the hotel, rooms and rates, dining, Kathmandu experiences, arrival details, amenities, or reservations. If you’re not sure what to ask, simply tell me what kind of stay you’re imagining — a quiet retreat, a cultural weekend, a special celebration, or help with your arrival.",
    links: [
      { label: "Discover the hotel", to: "/about" },
      { label: "Contact our concierge", to: "/contact" },
    ],
  };
}

export function ConciergeChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const requestRef = useRef<AbortController | null>(null);
  const sessionRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const nextId = useMemo(() => messages.length + 2, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  const sendMessage = async (value = input) => {
    const text = value.trim();
    if (!text || isSending) return;
    const assistantId = nextId + 1;
    const requestSession = sessionRef.current;
    const controller = new AbortController();
    requestRef.current = controller;
    setIsSending(true);
    setMessages((current) => [
      ...current,
      { id: nextId, role: "user", text },
      { id: assistantId, role: "assistant", text: "" },
    ]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...messages, { id: nextId, role: "user", text }]
            .map((message) => ({ role: message.role, content: message.text })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(await response.text());
      }

      const payload = (await response.json()) as { answer?: string; links?: Message["links"] };
      if (requestSession !== sessionRef.current) return;
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                text: payload.answer ?? "I’m sorry, I couldn’t prepare an answer just now.",
                links: payload.links,
              }
            : message,
        ),
      );
    } catch {
      if (requestSession !== sessionRef.current) return;
      const response = answerQuestion(text);
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId ? { ...message, ...response } : message,
        ),
      );
    } finally {
      if (requestSession === sessionRef.current) {
        setIsSending(false);
        requestRef.current = null;
      }
    }
  };

  const resetConversation = () => {
    sessionRef.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;
    setIsSending(false);
    setMessages([]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Himalayan Grand concierge"
        className={`group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-gold bg-navy px-4 py-3 text-white shadow-xl shadow-navy/25 transition-all hover:-translate-y-1 hover:bg-navy-deep ${open ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"}`}
      >
        <span className="pointer-events-none absolute -top-[92px] right-3 flex flex-col items-end">
          <span className="relative mb-1 rounded-full border border-gold/60 bg-ivory px-3 py-2 text-[10px] font-semibold text-navy opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
            Need anything?
            <span className="absolute -bottom-1 right-7 h-2 w-2 rotate-45 border-b border-r border-gold/60 bg-ivory" />
          </span>
          <span className="relative animate-[concierge-float_3s_ease-in-out_infinite]">
            <ConciergeMascot />
            <span className="absolute -left-2 top-5 animate-[concierge-sparkle_2.4s_ease-in-out_infinite] text-gold">✦</span>
            <span className="absolute -right-1 top-1 animate-[concierge-sparkle_2.4s_ease-in-out_0.8s_infinite] text-gold/80">✧</span>
          </span>
        </span>
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy">
          <ConciergeBell size={17} />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy bg-emerald-400" />
        </span>
        <span className="pr-1 text-left"><span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold">Himalayan Grand</span><span className="block text-xs font-medium">Ask our concierge</span></span>
      </button>

      <aside className={`fixed bottom-5 right-5 z-50 flex h-[min(700px,calc(100vh-40px))] w-[min(410px,calc(100vw-40px))] origin-bottom-right flex-col overflow-hidden border border-white/15 bg-ivory shadow-2xl shadow-navy/30 transition-all duration-300 ${open ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"}`} aria-label="Himalayan Grand concierge chat">
        <div className="relative bg-navy px-5 pb-5 pt-6 text-white">
          <div className="absolute right-4 top-4 flex gap-1">
            <button onClick={() => setOpen(false)} aria-label="Minimize concierge" className="flex h-8 w-8 items-center justify-center text-white/60 hover:text-gold"><Minus size={16} /></button>
            <button onClick={() => { setOpen(false); resetConversation(); }} aria-label="Close concierge" className="flex h-8 w-8 items-center justify-center text-white/60 hover:text-gold"><X size={16} /></button>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold"><ConciergeBell size={19} /></span>
            <div><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold">Private concierge</p><h2 className="mt-1 font-display text-2xl">How may we help?</h2></div>
          </div>
          <p className="mt-5 max-w-xs text-xs leading-5 text-white/65"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />Online now · Instant answers about your stay</p>
        </div>

        <div className="slim-scroll flex-1 overflow-y-auto px-4 py-5">
          {messages.length === 0 ? (
            <div className="flex min-h-full flex-col">
              <div className="rounded-sm border border-border bg-white p-4">
                <div className="flex gap-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold"><Sparkles size={14} /></span><p className="text-sm leading-6 text-navy">{intro.text}</p></div>
              </div>
              <div className="mt-auto pt-8"><p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Start with a question</p><div className="grid gap-2">{quickQuestions.map((question) => <button key={question} onClick={() => sendMessage(question)} className="flex items-center justify-between border border-border bg-white px-3 py-3 text-left text-xs text-navy transition-colors hover:border-gold hover:text-gold">{question}<ChevronRight size={14} className="text-gold" /></button>)}</div></div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((message) => <div key={message.id} className={message.role === "user" ? "ml-8" : "mr-4"}><div className={message.role === "user" ? "bg-navy px-4 py-3 text-sm leading-6 text-white" : "border border-border bg-white px-4 py-3 text-sm leading-6 text-navy"}>{message.text || (isSending && message.role === "assistant" ? "Thinking…" : "")}</div>{message.links && <div className="mt-2 flex flex-col gap-1.5">{message.links.map((link) => <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className="flex items-center justify-between border border-gold/50 bg-gold/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-navy hover:bg-gold/20">{link.label}<ChevronRight size={13} className="text-gold" /></Link>)}</div>}</div>)}
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="border-t border-border bg-white p-3">
          <div className="flex items-center gap-2 border border-border bg-ivory px-3 py-1 focus-within:border-gold">
            <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(); }} placeholder="Ask about your stay..." aria-label="Message concierge" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground" />
            <button onClick={() => sendMessage()} aria-label="Send message" className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy transition-colors hover:bg-gold-light"><ArrowUp size={15} /></button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground"><Link to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-1 hover:text-gold"><CalendarDays size={11} /> Plan a stay</Link><a href="tel:+97715550199" className="flex items-center gap-1 hover:text-gold"><Phone size={11} /> Call reservations</a></div>
        </div>
      </aside>
    </>
  );
}

function ConciergeMascot() {
  return (
    <span className="relative block h-[88px] w-[94px]">
      <span className="absolute bottom-0 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-black/20 blur-[3px]" />
      <svg viewBox="0 0 100 110" className="relative h-full w-full drop-shadow-[0_6px_5px_rgba(20,43,59,0.18)]" role="img" aria-label="Himalayan Grand concierge mascot">
        <path d="M18 52C11 25 28 7 51 7c24 0 39 18 32 45-7-11-16-17-29-18-11 13-22 18-36 18Z" fill="#142b3b" />
        <path d="M20 49c0-19 13-31 30-31 19 0 31 13 31 34v12c-5 16-17 27-31 27-15 0-27-11-31-27Z" fill="#f5dabe" />
        <path d="M20 48c7 7 14 8 21 3-2-9 1-19 9-27-18 2-27 10-30 24Zm60 6c-3-10-9-16-18-19 4-4 5-10 4-16 12 6 17 18 14 35Z" fill="#1b3448" />
        <path d="M28 47c5 4 10 5 14 4M72 47c-4 4-8 5-12 4" fill="none" stroke="#c6a36d" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="38" cy="58" rx="5.2" ry="6.3" fill="#142b3b" />
        <ellipse cx="63" cy="58" rx="5.2" ry="6.3" fill="#142b3b" />
        <ellipse cx="39" cy="56.5" rx="2.1" ry="2.6" fill="#fff" />
        <ellipse cx="64" cy="56.5" rx="2.1" ry="2.6" fill="#fff" />
        <circle cx="31" cy="67" r="3.5" fill="#e9a5a0" opacity=".42" />
        <circle cx="70" cy="67" r="3.5" fill="#e9a5a0" opacity=".42" />
        <path d="M46 74c3 3 6 4 9 0" fill="none" stroke="#a85f62" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M29 101c5-14 14-20 21-20s17 6 22 20" fill="#142b3b" />
        <path d="M35 93c5-4 11-6 15-6s10 2 15 6v17H35Z" fill="#f8f6f1" />
        <path d="M45 88h10v22H45Z" fill="#c5a46d" />
        <path d="M50 86l-5 5 5 5 5-5Z" fill="#c5a46d" />
        <path d="M74 91c7-4 11-1 13 4-6 1-10 0-13-4Z" fill="#c5a46d" />
        <path d="M79 91c-1-5 1-8 5-10 1 5 0 8-5 10Z" fill="#c5a46d" />
      </svg>
    </span>
  );
}
