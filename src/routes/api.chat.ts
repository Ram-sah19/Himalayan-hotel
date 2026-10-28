import { createFileRoute } from "@tanstack/react-router";

type Intent =
  | "greeting"
  | "hotel"
  | "rooms"
  | "dining"
  | "experiences"
  | "arrival"
  | "amenities"
  | "contact"
  | "thanks"
  | "fallback";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatLink = {
  label: string;
  to: "/rooms" | "/dining" | "/experiences" | "/about" | "/contact";
};

const responses: Record<Intent, string> = {
  greeting:
    "Welcome to Himalayan Grand. It’s lovely to have you here. I can help you discover the hotel, compare rooms, plan Kathmandu experiences, arrange dining, or connect you with our reservations team. What would you like to explore first?",
  hotel:
    "Himalayan Grand is a luxury hotel in Boudha, Kathmandu, created for travellers who want to feel a destination rather than simply pass through it. Our design brings together Nepalese craft, warm natural materials, generous mountain views, and calm modern spaces. During your stay, you can choose from considered rooms and suites, dine at Maya, use the 24-hour concierge, enjoy the wellness floor, arrange airport transfers, and discover Kathmandu through private experiences shaped around your interests.",
  rooms:
    "We offer three stay options. The Valley View Room is 48 sqm with a king bed and valley views, from $320 per night. The 86 sqm Himalayan Suite adds a separate lounge and mountain views, from $540. For the most expansive stay, the 124 sqm Grand Terrace Suite includes a private terrace and 180-degree views, from $780. These are starting rates rather than live availability, so our reservations team will confirm the best room and exact price for your dates.",
  dining:
    "Maya is our all-day dining room, where Nepalese ingredients and familiar international flavours are presented with a contemporary point of view. Breakfast is served from 6:30–10:30 and dinner from 18:00–22:30. We can arrange private dining, bespoke menus, and special occasions with advance notice. Would you prefer a table for a relaxed breakfast, dinner, or a private experience?",
  experiences:
    "Our concierge can arrange sunrise over the valley, temple and artisan trails, and tailor-made Himalayan days. We can create a gentle cultural morning, a food-focused day, a mountain outing, or a slower itinerary with time to wander. Every experience is shaped around your interests, energy, and pace, leaving room for the unexpected.",
  arrival:
    "Himalayan Grand is in Boudha, Kathmandu, Nepal 44600, in the Boudha area of the Kathmandu Valley. Check-in is from 2:00 pm and check-out is until 12:00 pm. If you arrive early or need a later departure, please mention it to reservations and we will do our best to assist. Airport transfers can also be arranged through our concierge.",
  amenities:
    "Every stay includes daily breakfast for two, 24-hour concierge service, high-speed Wi-Fi, evening turndown, and access to the wellness floor. Our team can also help arrange airport transfers, dining reservations, cultural visits, and special requests before you arrive.",
  contact:
    "Our reservations team is available 24 hours. You can call +977 1 555 0199 or email stay@himalayangrand.com for room availability, rates, special requests, airport transfers, dining reservations, or help planning your visit. You can also send an enquiry through our contact page; the team responds within one business day. The team will personally confirm availability rather than relying on the starting rates shown online.",
  thanks:
    "It’s my pleasure. Whenever you’re ready, I can help compare rooms, arrange dining, shape a Kathmandu itinerary, or connect you with reservations. There is no need to have everything decided at once.",
  fallback:
    "I can help with the hotel, rooms and rates, dining, Kathmandu experiences, arrival details, amenities, or reservations. Which would you like to explore?",
};

const links: Partial<Record<Intent, ChatLink[]>> = {
  hotel: [
    { label: "Read our story", to: "/about" },
    { label: "See rooms & suites", to: "/rooms" },
  ],
  rooms: [
    { label: "Compare rooms & suites", to: "/rooms" },
    { label: "Request availability", to: "/contact" },
  ],
  dining: [
    { label: "Discover dining", to: "/dining" },
    { label: "Reserve a table", to: "/contact" },
  ],
  experiences: [
    { label: "Explore experiences", to: "/experiences" },
    { label: "Speak to concierge", to: "/contact" },
  ],
  contact: [{ label: "Contact reservations", to: "/contact" }],
  arrival: [{ label: "Plan your arrival", to: "/contact" }],
  amenities: [{ label: "See what’s included", to: "/rooms" }],
};

function getIntent(message: string): Intent {
  const query = message.toLowerCase().trim();

  if (!query) return "fallback";
  if (/^(hi|hello|hey|hiya|good morning|good afternoon|good evening)\b/.test(query)) return "greeting";
  if (query.includes("how are you") || query.includes("how are things")) return "greeting";
  if (/^(thanks|thank you|great|perfect|wonderful|fine|good|okay|ok|it's good|it is good|sounds good|that helps)$/.test(query)) return "thanks";
  if (query === "hotel" || query.includes("about the hotel") || query.includes("tell me more") || query.includes("know more") || query.includes("himalayan grand") || query.includes("what is more") || query.includes("what's more") || query.includes("what else") || query.includes("what do you have") || query.includes("what is there") || query.includes("what's there") || query.includes("explore about") || query.includes("more in there")) return "hotel";
  if (query.includes("room") || query.includes("suite") || query.includes("accommodation") || query.includes("stay") || query.includes("rate") || query.includes("price")) return "rooms";
  if (query.includes("dining") || query.includes("dinning") || query.includes("restaurant") || query.includes("breakfast") || query.includes("dinner") || query.includes("food") || query.includes("table")) return "dining";
  if (query.includes("experience") || query.includes("kathmandu") || query.includes("activity") || query.includes("tour") || query.includes("mountain") || query.includes("temple")) return "experiences";
  if (query.includes("contact") || query.includes("reservation") || query.includes("booking") || query.includes("book") || query.includes("helpline") || query.includes("phone") || query.includes("email") || query.includes("email address") || query.includes("human") || query.includes("call")) return "contact";
  if (query.includes("location") || query.includes("where") || query.includes("airport") || query.includes("address") || query.includes("arrival") || query.includes("check-in") || query.includes("checkout")) return "arrival";
  if (query.includes("wifi") || query.includes("amenit") || query.includes("include") || query.includes("wellness") || query.includes("facility")) return "amenities";
  return "fallback";
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: unknown };
        try {
          body = (await request.json()) as { messages?: unknown };
        } catch {
          return Response.json({ error: "Invalid JSON request." }, { status: 400 });
        }

        if (!body || !Array.isArray(body.messages)) {
          return Response.json({ error: "A messages array is required." }, { status: 400 });
        }

        const messages = body.messages.filter(
          (message): message is ChatMessage =>
            Boolean(message) &&
            typeof message === "object" &&
            "role" in message &&
            "content" in message &&
            (((message as { role?: unknown }).role === "user") || ((message as { role?: unknown }).role === "assistant")) &&
            typeof (message as { content?: unknown }).content === "string",
        );
        const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
        const intent = getIntent(latestUserMessage);

        return Response.json({
          answer: responses[intent],
          intent,
          confidence: intent === "fallback" ? 0 : 1,
          links: links[intent] ?? [],
        });
      },
    },
  },
});
