import { NextRequest, NextResponse } from "next/server";
import { fetchWithRetry } from "@/lib/api-retry";
import { trackAndLog } from "@/lib/cost-tracker";

interface AssessmentInput {
  crisisType: string;
  businessStage: string;
  teamSize: string;
  situation: string;
}

const SYSTEM_PROMPT = `You are a compassionate crisis resilience coach specializing in helping startup founders and entrepreneurs navigate personal crises while keeping their businesses running.

Given the founder's crisis type, business context, and personal situation, provide a thorough resilience assessment and coping plan. You MUST output ONLY valid JSON with this exact structure:

{
  "resilienceScore": <number 0-100>,
  "immediateActions": ["<action 1>", "<action 2>", "<action 3>", "<action 4>", "<action 5>"],
  "businessProtectionPlan": ["<step 1>", "<step 2>", "<step 3>", "<step 4>", "<step 5>"],
  "selfCarePlan": [
    { "area": "<e.g. Sleep>", "action": "<specific action>", "frequency": "<e.g. Every night>" },
    { "area": "<e.g. Exercise>", "action": "<specific action>", "frequency": "<e.g. 3x per week>" },
    { "area": "<e.g. Social>", "action": "<specific action>", "frequency": "<e.g. Weekly>" },
    { "area": "<e.g. Mindset>", "action": "<specific action>", "frequency": "<e.g. Daily>" }
  ],
  "boundarySettings": ["<boundary 1>", "<boundary 2>", "<boundary 3>", "<boundary 4>"],
  "recoveryTimeline": [
    { "week": "Week 1-2", "focus": "<focus area>", "milestones": ["<milestone>", "<milestone>"] },
    { "week": "Week 3-4", "focus": "<focus area>", "milestones": ["<milestone>", "<milestone>"] },
    { "week": "Month 2-3", "focus": "<focus area>", "milestones": ["<milestone>", "<milestone>"] },
    { "week": "Month 3-6", "focus": "<focus area>", "milestones": ["<milestone>", "<milestone>"] }
  ],
  "affirmation": "<a powerful, personalized daily affirmation for this founder>"
}

Scoring guidelines for resilienceScore:
- 70+: Strong foundations, mostly needs fine-tuning
- 40-69: Moderate resilience, needs targeted support
- <40: High vulnerability, needs immediate intervention plan

Be empathetic but practical. Focus on actionable steps. Consider the founder's business stage and team size when recommending business protection strategies. The self-care plan should be realistic for a busy founder. The recovery timeline should be progressive and achievable.

IMPORTANT: This is NOT therapy. Frame everything as coping strategies and practical planning. Include a note about seeking professional help when appropriate.

ONLY output valid JSON. No markdown, no explanation outside the JSON.`;

export async function POST(req: NextRequest) {
  try {
    const input: AssessmentInput = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(generateFallbackAssessment(input));
    }

    const model = process.env.AI_MODEL ?? "anthropic/claude-sonnet-4";
    const teamSizeNum = parseInt(input.teamSize) || 0;

    const crisisLabels: Record<string, string> = {
      "breakup-divorce": "Breakup / Divorce",
      "burnout": "Burnout",
      "grief": "Grief / Loss",
      "health": "Health Issue",
      "financial": "Financial Crisis",
      "other": "Other Personal Crisis",
    };

    const stageLabels: Record<string, string> = {
      "early": "Early Stage (pre-revenue or <1 year)",
      "growth": "Growth Stage (1-3 years, scaling)",
      "established": "Established (3+ years, stable)",
    };

    const userPrompt = `Assess this founder's resilience and create a coping plan:

CRISIS TYPE: ${crisisLabels[input.crisisType] || input.crisisType}
BUSINESS STAGE: ${stageLabels[input.businessStage] || input.businessStage}
TEAM SIZE: ${teamSizeNum === 0 ? "Solo founder" : `${teamSizeNum} team members`}
SITUATION: ${input.situation}

Create a compassionate, practical resilience plan that helps them cope with this crisis while protecting their business.`;

    const startTime = Date.now();
    const res = await fetchWithRetry("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://founderresilience.forgetool.co",
        "X-Title": "FounderResilience",
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    }, { maxRetries: 2 });

    if (!res.ok) {
      console.error("OpenRouter error:", await res.text());
      return NextResponse.json(generateFallbackAssessment(input));
    }

    const json = await res.json();
    await trackAndLog("founder-resilience", json, model, undefined, Date.now() - startTime);
    const text = json.choices?.[0]?.message?.content ?? "";
    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const assessment = JSON.parse(cleanText);
    return NextResponse.json(assessment);
  } catch (err) {
    console.error("Assessment error:", err);
    return NextResponse.json(
      { error: "Assessment failed. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Simple rule-based fallback when AI is unavailable
 */
function generateFallbackAssessment(input: AssessmentInput) {
  const isSolo = !input.teamSize || parseInt(input.teamSize) === 0;
  const isEarly = input.businessStage === "early";
  const isBurnout = input.crisisType === "burnout";

  let score = 50;
  if (isSolo) score -= 10;
  if (isEarly) score -= 10;
  if (isBurnout) score -= 5;
  if (input.situation.length > 100) score -= 5; // longer descriptions may indicate more complex situations
  score = Math.max(20, Math.min(80, score));

  return {
    resilienceScore: score,
    immediateActions: [
      "Take a 24-hour break from all non-critical business decisions",
      "Tell one trusted person (friend, mentor, or advisor) what you're going through",
      "Set up an auto-responder for non-urgent emails for the next 48 hours",
      "Write down the 3 most critical business tasks that only you can do this week",
      "Schedule a call with a therapist or counselor within the next 7 days",
    ],
    businessProtectionPlan: [
      isSolo
        ? "Identify one freelancer or contractor who can handle urgent tasks if you need a day off"
        : "Brief your most trusted team member on your reduced capacity (you don't need to share details)",
      "Set up automated systems for recurring tasks (invoicing, social media, email sequences)",
      "Create a 'minimum viable operations' list — the bare minimum to keep the business running",
      isEarly
        ? "Pause any new feature development and focus only on serving existing customers"
        : "Delegate non-critical projects and focus on revenue-critical activities only",
      "Review upcoming deadlines and proactively communicate any potential delays to clients",
    ],
    selfCarePlan: [
      { area: "Sleep", action: "Set a non-negotiable bedtime and wake time, even if you can't sleep well", frequency: "Every night" },
      { area: "Movement", action: "Take a 20-minute walk outside, no phone", frequency: "Daily" },
      { area: "Nutrition", action: "Eat at least 2 proper meals per day — order meal delivery if cooking feels impossible", frequency: "Daily" },
      { area: "Social", action: "Have one real conversation with someone who cares about you", frequency: "Every 2 days" },
      { area: "Mindset", action: "Write 3 things that went okay today before bed", frequency: "Every evening" },
    ],
    boundarySettings: [
      "No work emails or Slack after 8 PM",
      "Block off 2 hours every morning for personal recovery time before starting work",
      "Say no to all non-essential meetings for the next 2 weeks",
      "Turn off social media notifications — check only at scheduled times",
    ],
    recoveryTimeline: [
      {
        week: "Week 1-2",
        focus: "Stabilization",
        milestones: [
          "Establish minimum viable daily routine",
          "Set up business safety nets (auto-responders, delegations)",
        ],
      },
      {
        week: "Week 3-4",
        focus: "Foundation Building",
        milestones: [
          "Start consistent self-care habits",
          "Resume normal business communication with adjusted expectations",
        ],
      },
      {
        week: "Month 2-3",
        focus: "Gradual Recovery",
        milestones: [
          "Increase work capacity to 70-80%",
          "Begin processing the crisis with professional support",
        ],
      },
      {
        week: "Month 3-6",
        focus: "Rebuilding Strength",
        milestones: [
          "Return to full operational capacity",
          "Implement long-term resilience practices into your routine",
        ],
      },
    ],
    affirmation: "I am more than this moment. My business and I have survived hard things before, and we will get through this too.",
  };
}
