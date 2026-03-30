/**
 * Site configuration — FounderResilience
 */
export const siteConfig = {
  name: "FounderResilience",
  description: "AI crisis coping guide for founders managing personal struggles while running a business",
  url: (process.env.NEXTAUTH_URL ?? "https://founderresilience.forgetool.co").trim(),
  contactEmail: "support@forgetool.co",

  hero: {
    title: "Going Through Hell While Running a Company? You're Not Alone.",
    subtitle:
      "AI-powered coping strategies for founders dealing with breakups, burnout, or personal crises while keeping their business alive.",
    cta: "Get My Resilience Plan →",
  },

  howItWorks: [
    { step: "1", title: "Describe your situation", description: "Select your crisis type, business stage, and share a brief overview of what you're going through." },
    { step: "2", title: "AI builds your plan", description: "Our AI creates a personalized resilience plan balancing your mental health and business needs." },
    { step: "3", title: "Get actionable steps", description: "Receive immediate actions, a self-care plan, boundary settings, and a week-by-week recovery timeline." },
  ] as { step: string; title: string; description: string }[],

  faqs: [
    { q: "What kind of crises does this cover?", a: "Breakups and divorce, burnout, grief and loss, health issues, financial stress, and other personal crises that affect your ability to run your business." },
    { q: "Is this a replacement for therapy?", a: "No. FounderResilience provides AI-powered coping strategies and business protection plans, but it is not a substitute for professional mental health support. If you're in crisis, please reach out to a licensed therapist." },
    { q: "How is the resilience score calculated?", a: "Our AI evaluates your crisis severity, available support systems, business resilience factors, and coping capacity to generate a 0-100 resilience score." },
    { q: "Will my information be kept private?", a: "Yes. We do not store your personal situation details after generating your plan. See our Privacy Policy for full details." },
    { q: "Can I try it for free?", a: "Yes! You get 3 free assessments when you sign up. No credit card required." },
    { q: "What if I need immediate help?", a: "If you are in immediate danger or experiencing a mental health emergency, please call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room. This tool is for coping strategies, not emergency intervention." },
  ] as { q: string; a: string }[],

  pricing: {
    price: "$5",
    period: "one-time" as "one-time" | "monthly",
    credits: 50,
    features: [
      "Resilience score (0-100)",
      "Immediate action steps",
      "Business protection plan",
      "Personalized self-care plan",
      "Week-by-week recovery timeline",
    ],
  },

  credits: {
    freeOnSignup: 3,
    perUse: 1,
  },

  seo: {
    keywords: [
      "founder mental health",
      "entrepreneur breakup",
      "startup burnout",
      "founder burnout recovery",
      "running business during divorce",
      "entrepreneur grief",
      "startup founder stress",
      "founder crisis coping",
      "entrepreneur mental health tools",
      "business owner burnout",
    ],
    metaTitle: "Going Through a Crisis While Running a Startup? AI Coping Guide | FounderResilience",
    metaDescription: "AI-powered resilience plans for founders dealing with breakups, burnout, grief, or personal crises. Get immediate coping strategies and a business protection plan. Free to try.",
  },

  lemonSqueezy: {
    productId: process.env.LEMONSQUEEZY_PRODUCT_ID ?? "",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID ?? "",
  },
};

export type SiteConfig = typeof siteConfig;
