/**
 * Site configuration — FounderResilience
 *
 * GEO-OPTIMIZED TEMPLATE
 * Fields marked [GEO] are designed for AI search optimization.
 */
export const siteConfig = {
  name: "FounderResilience",
  // [GEO] Complete, self-contained definition sentence.
  description:
    "FounderResilience is an AI-powered crisis coping tool that helps startup founders and entrepreneurs manage personal struggles like breakups, burnout, and grief while keeping their business running, by generating personalized resilience plans with immediate action steps and week-by-week recovery timelines.",
  // [GEO] Deployed URL, not localhost.
  url: "https://founder-resilience.vercel.app",
  contactEmail: "support@forgetool.co",

  // [GEO] Organization info for Schema markup
  organization: {
    name: "ForgeTools",
    url: "https://forgetool.co",
    sameAs: [] as string[],
  },

  // [GEO] Publication dates for Article Schema
  dates: {
    published: "2025-01-15",
  },

  hero: {
    title: "Going Through Hell While Running a Company? You're Not Alone.",
    subtitle:
      "AI-powered coping strategies for founders dealing with breakups, burnout, or personal crises while keeping their business alive.",
    // [GEO] BLUF
    bluf: "FounderResilience is an AI-powered coping guide designed specifically for startup founders facing personal crises while running a business. Select your crisis type and business stage, and get a personalized resilience plan with a resilience score, immediate action steps, a business protection plan, self-care strategies, and a week-by-week recovery timeline.",
    cta: "Get My Resilience Plan →",
  },

  // [GEO] Key use cases
  useCases: [
    {
      problem: "Going through a breakup or divorce while trying to lead a team",
      solution: "Emotional boundary plan with delegation framework for low-energy days",
      detail: "FounderResilience creates a plan that identifies which business functions to delegate during acute emotional periods, provides scripts for communicating with your team without oversharing, and schedules recovery time around your business commitments.",
    },
    {
      problem: "Burnout making it impossible to focus on work or make decisions",
      solution: "Decision fatigue reduction plan with energy management schedule",
      detail: "The AI generates a prioritized task list that eliminates non-essential decisions, creates batched decision windows aligned with your peak energy times, and identifies which responsibilities to temporarily hand off.",
    },
    {
      problem: "Grieving a loss while investors and clients expect normal performance",
      solution: "Stakeholder communication templates with grief-aware business continuity plan",
      detail: "FounderResilience provides templates for communicating with investors, clients, and team members during grief, plus a 4-week business continuity plan that maintains critical operations while allowing space for mourning.",
    },
    {
      problem: "Financial stress from the startup threatening personal mental health",
      solution: "Financial-emotional boundary framework with runway-based action plan",
      detail: "The AI creates a framework for separating business financial stress from personal wellbeing, identifies concrete financial actions to reduce uncertainty, and provides coping strategies specific to founder financial anxiety.",
    },
  ] as { problem: string; solution: string; detail: string }[],

  // [GEO] Differentiator
  differentiator: {
    title: "What Makes FounderResilience Different",
    content:
      "Unlike generic mental health apps that ignore the reality of running a business, FounderResilience creates coping plans that balance personal recovery with business survival, specifically for founders who cannot simply take time off.",
    comparisons: [
      { vs: "Generic therapy apps (BetterHelp, Calm)", difference: "General wellness apps offer generic coping advice; FounderResilience understands founder-specific pressures like investor expectations, team leadership, and runway anxiety." },
      { vs: "Executive coaching", difference: "Coaching costs hundreds per session and requires scheduling; FounderResilience provides an instant, actionable resilience plan you can start implementing today." },
      { vs: "Online mental health articles", difference: "Articles offer general advice; FounderResilience generates a personalized plan based on your specific crisis type, business stage, and available support systems." },
    ] as { vs: string; difference: string }[],
  },

  howItWorks: [
    { step: "1", title: "Describe your situation", description: 'Select your crisis type (breakup, burnout, grief, health issue, financial stress), business stage (pre-revenue, growth, profitable), and share a brief overview. For example: "Going through a divorce, Series A startup with 12 employees, struggling to focus."' },
    { step: "2", title: "AI builds your plan", description: "Our AI creates a personalized resilience plan that balances your mental health needs with your business responsibilities, generating a resilience score from 0 to 100 based on your situation." },
    { step: "3", title: "Get actionable steps", description: "Receive immediate actions for today, a self-care plan, boundary-setting scripts, team communication templates, and a week-by-week recovery timeline." },
  ] as { step: string; title: string; description: string }[],

  faqs: [
    { q: "What kind of crises does this cover?", a: "Breakups and divorce, burnout, grief and loss, health issues, financial stress, co-founder conflicts, and other personal crises that affect your ability to run your business." },
    { q: "Is this a replacement for therapy?", a: "No. FounderResilience provides AI-powered coping strategies and business protection plans, but it is not a substitute for professional mental health support. If you are in crisis, please reach out to a licensed therapist or counselor." },
    { q: "How is the resilience score calculated?", a: "Our AI evaluates your crisis severity, available support systems, business resilience factors, and coping capacity to generate a 0-100 resilience score with specific recommendations for improvement." },
    { q: "Will my information be kept private?", a: "Yes. We do not store your personal situation details after generating your plan. Your data is processed in real-time and immediately discarded. See our Privacy Policy for full details." },
    { q: "Can I try it for free?", a: "Yes. You get 3 free assessments when you sign up. No credit card required." },
    { q: "What if I need immediate help?", a: "If you are in immediate danger or experiencing a mental health emergency, please call 988 (Suicide and Crisis Lifeline) or go to your nearest emergency room. FounderResilience is for coping strategies, not emergency intervention." },
    { q: "How long do credits last?", a: "Credits never expire. Once purchased, your 50 credits are available until used. No monthly fees." },
    { q: "What makes this different from general mental health advice?", a: "FounderResilience specifically addresses the founder context: you cannot simply take time off, your team depends on you, investors expect updates, and your identity is often tied to your company. Every recommendation accounts for these realities." },
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

  // [GEO] External authority links
  authorityLinks: [
    { label: "SAMHSA National Helpline", url: "https://www.samhsa.gov/find-help/national-helpline" },
    { label: "Harvard Business Review on Founder Burnout", url: "https://hbr.org/topic/subject/burnout" },
    { label: "National Alliance on Mental Illness (NAMI)", url: "https://www.nami.org/" },
  ] as { label: string; url: string }[],

  lemonSqueezy: {
    productId: process.env.LEMONSQUEEZY_PRODUCT_ID ?? "",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID ?? "",
  },
};

export type SiteConfig = typeof siteConfig;
