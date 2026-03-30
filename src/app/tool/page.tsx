"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Paywall } from "@/components/layout/paywall";
import {
  Loader2,
  Heart,
  Shield,
  CheckCircle,
  Calendar,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface SelfCareItem {
  area: string;
  action: string;
  frequency: string;
}

interface TimelineWeek {
  week: string;
  focus: string;
  milestones: string[];
}

interface ResilienceResult {
  resilienceScore: number;
  immediateActions: string[];
  businessProtectionPlan: string[];
  selfCarePlan: SelfCareItem[];
  boundarySettings: string[];
  recoveryTimeline: TimelineWeek[];
  affirmation: string;
}

export default function ToolPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Crisis Resilience Assessment</h1>
      <p className="text-muted-foreground mb-6">
        Tell us what you&apos;re going through. AI will build a personalized resilience plan for you.
      </p>

      <Paywall featureName="resilience assessment">
        <AssessmentForm />
      </Paywall>
    </div>
  );
}

function AssessmentForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResilienceResult | null>(null);

  // Form state
  const [crisisType, setCrisisType] = useState("");
  const [businessStage, setBusinessStage] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [situation, setSituation] = useState("");

  async function handleAssess() {
    if (!session?.user?.email) return;

    setLoading(true);
    setResult(null);

    try {
      // Consume a credit
      const creditRes = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (!creditRes.ok) {
        const err = await creditRes.json();
        alert(`Error: ${err.error}`);
        setLoading(false);
        return;
      }

      // Call AI assessment
      const res = await fetch("/api/tool/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crisisType,
          businessStage,
          teamSize,
          situation,
        }),
      });

      if (!res.ok) {
        throw new Error("Assessment failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  const isFormValid =
    crisisType.trim() !== "" &&
    businessStage.trim() !== "" &&
    situation.trim().length >= 10;

  if (result) {
    return <ResultView result={result} onReset={() => setResult(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Crisis Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5" />
            What Are You Going Through?
          </CardTitle>
          <CardDescription>
            Select the type of crisis and tell us briefly what&apos;s happening.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Crisis Type</Label>
            <Select value={crisisType} onValueChange={(v) => setCrisisType(v ?? "")}>
              <SelectTrigger>
                <SelectValue placeholder="Select crisis type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakup-divorce">Breakup / Divorce</SelectItem>
                <SelectItem value="burnout">Burnout</SelectItem>
                <SelectItem value="grief">Grief / Loss</SelectItem>
                <SelectItem value="health">Health Issue</SelectItem>
                <SelectItem value="financial">Financial Crisis</SelectItem>
                <SelectItem value="other">Other Personal Crisis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Brief Situation (what&apos;s happening)</Label>
            <Textarea
              placeholder="Share what you're going through. The more context you give, the more tailored your plan will be. Everything stays private."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Context */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Your Business Context
          </CardTitle>
          <CardDescription>
            Help us understand your business so we can protect it while you heal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Business Stage</Label>
              <Select value={businessStage} onValueChange={(v) => setBusinessStage(v ?? "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early">Early Stage (pre-revenue or &lt;1yr)</SelectItem>
                  <SelectItem value="growth">Growth Stage (1-3 yrs, scaling)</SelectItem>
                  <SelectItem value="established">Established (3+ yrs, stable)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Team Size</Label>
              <Input
                type="number"
                placeholder="e.g. 3"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleAssess}
        disabled={loading || !isFormValid}
        className="w-full h-12 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Building your resilience plan...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 mr-2" />
            Get My Resilience Plan (1 credit)
          </>
        )}
      </Button>
    </div>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const color =
    score >= 70 ? "text-green-600" : score >= 40 ? "text-yellow-600" : "text-red-600";
  const bg =
    score >= 70 ? "bg-green-50" : score >= 40 ? "bg-yellow-50" : "bg-red-50";
  const label =
    score >= 70
      ? "You have strong resilience foundations"
      : score >= 40
        ? "You have moderate resilience — let's strengthen it"
        : "You're in a tough spot — but we've got a plan for you";

  return (
    <div className={`${bg} rounded-2xl p-8 text-center`}>
      <div className={`text-7xl font-bold ${color}`}>{score}</div>
      <div className="text-sm text-muted-foreground mt-1">Resilience Score</div>
      <p className="text-sm mt-2 font-medium">{label}</p>
    </div>
  );
}

function ResultView({ result, onReset }: { result: ResilienceResult; onReset: () => void }) {
  return (
    <div className="space-y-6">
      {/* Resilience Score */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Your Resilience Score</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreGauge score={result.resilienceScore} />
        </CardContent>
      </Card>

      {/* Daily Affirmation */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-center text-lg font-medium italic">
            &ldquo;{result.affirmation}&rdquo;
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Your daily affirmation
          </p>
        </CardContent>
      </Card>

      {/* Immediate Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Do These Right Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {result.immediateActions.map((action, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Business Protection Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Business Protection Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.businessProtectionPlan.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Self-Care Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Self-Care Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.selfCarePlan.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm border-b pb-3 last:border-0 last:pb-0">
                <div className="bg-pink-100 text-pink-700 rounded-md px-2 py-1 text-xs font-medium shrink-0">
                  {item.area}
                </div>
                <div className="flex-1">
                  <p>{item.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Boundary Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Boundaries to Set</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.boundarySettings.map((boundary, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground mt-0.5 shrink-0">--</span>
                {boundary}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recovery Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            Recovery Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.recoveryTimeline.map((week, i) => (
              <div key={i} className="border-l-2 border-green-300 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{week.week}</span>
                  <span className="text-xs text-muted-foreground">-- {week.focus}</span>
                </div>
                <ul className="space-y-1">
                  {week.milestones.map((milestone, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={onReset} variant="outline" className="w-full">
        Run Another Assessment
      </Button>
    </div>
  );
}
