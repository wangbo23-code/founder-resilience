import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, Zap, Shield, Sparkles, CheckCircle } from "lucide-react";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="container mx-auto max-w-5xl px-4">
      {/* ============================================================
          ABOVE THE FOLD — for USERS
          V2.0: Tool-first. User sees an interactive trial immediately.
          ============================================================ */}

      <section className="py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          AI-Powered Tool
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          {siteConfig.hero.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          {siteConfig.hero.subtitle}
        </p>

        {/* [V2.0] TOOL TRIAL WIDGET — renders inline if configured */}
        {(siteConfig as any).trialWidget?.enabled ? (
          <div className="max-w-2xl mx-auto mb-8 p-6 border rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground mb-3">
              {(siteConfig as any).trialWidget?.prompt}
            </p>
            {/* Placeholder — each product replaces this with its own mini tool form.
                The actual interactive widget is injected from src/app/tool/trial-widget.tsx
                via the TrialWidget component slot below. */}
            <div className="flex gap-2">
              <Link href="/tool" className="w-full">
                <Button size="lg" className="w-full">
                  {siteConfig.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              No signup required for your first try.
            </p>
          </div>
        ) : (
          <div className="flex gap-4 justify-center mb-8">
            <Link href="/tool">
              <Button size="lg">
                {siteConfig.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        )}

        {/* [GEO] BLUF — core definition for AI extraction */}
        {siteConfig.hero.bluf && (
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {siteConfig.hero.bluf}
          </p>
        )}
      </section>

      {/* ============================================================
          BELOW THE FOLD — for GOOGLE / AI SEARCH ENGINES
          Dense, structured, keyword-rich content for SEO + GEO.
          ============================================================ */}

      {/* [GEO] Use Cases — extractable answer blocks */}
      {siteConfig.useCases.length > 0 && (
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            Common Problems {siteConfig.name} Solves
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Each solution is AI-generated based on proven methods. Describe your
            problem and get a personalized result in seconds.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {siteConfig.useCases.map((item) => (
              <Card key={item.problem}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.problem}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm font-medium text-primary">
                    Solution: {item.solution}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* [GEO] Comparison Table — AI search engines' favorite format */}
      {siteConfig.differentiator.comparisons.length > 0 && (
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            {siteConfig.differentiator.title}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto leading-relaxed">
            {siteConfig.differentiator.content}
          </p>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold border-b">
                    Feature
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b">
                    {siteConfig.name}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b">
                    Alternatives
                  </th>
                </tr>
              </thead>
              <tbody>
                {siteConfig.differentiator.comparisons.map((c) => (
                  <tr key={c.vs} className="border-b">
                    <td className="py-3 px-4 font-medium">{c.vs}</td>
                    <td className="py-3 px-4 text-primary">{c.difference}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {c.vs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why {siteConfig.name}?
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 mb-2 text-yellow-500" />
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Get results in seconds, not hours. AI does the heavy lifting so
              you don&apos;t have to.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 mb-2 text-blue-500" />
              <CardTitle className="text-lg">Reliable Output</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Consistent, professional quality every time. Tested and refined
              for real-world use.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle className="text-lg">Dead Simple</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              No learning curve. Paste your input, click generate, done. Anyone
              can use it.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          Get your results in three simple steps.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {siteConfig.howItWorks.map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 text-center">
        <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <p className="text-3xl font-bold">Fast</p>
            <p className="text-sm text-muted-foreground">
              Results in under 30s
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">Accurate</p>
            <p className="text-sm text-muted-foreground">
              AI-powered analysis
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">Simple</p>
            <p className="text-sm text-muted-foreground">No signup to try</p>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Simple Pricing</h2>
        <p className="text-muted-foreground mb-8">
          Try free, pay only when you need more. Credits never expire.
        </p>
        <Card className="max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">
              {siteConfig.pricing.price}
            </CardTitle>
            <p className="text-muted-foreground">
              {siteConfig.pricing.period} &middot;{" "}
              {siteConfig.pricing.credits} credits
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm mb-6">
              {siteConfig.pricing.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/tool">
              <Button className="w-full">Get Started Free</Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {siteConfig.faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold mb-1">{faq.q}</h3>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* [SEO] Recent Blog Articles — internal links for authority */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Latest Articles
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base group-hover:underline">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:underline"
            >
              View all articles
            </Link>
          </div>
        </section>
      )}

      {/* [GEO] External authority links */}
      {siteConfig.authorityLinks.length > 0 && (
        <section className="py-8 text-center text-sm text-muted-foreground">
          <p>
            {siteConfig.name} is built on research and methods from{" "}
            {siteConfig.authorityLinks.map((link, i) => (
              <span key={link.url}>
                {i > 0 && (i === siteConfig.authorityLinks.length - 1 ? ", and " : ", ")}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {link.label}
                </a>
              </span>
            ))}
            .
          </p>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6">
          Try {siteConfig.name} free — no credit card required.
        </p>
        <Link href="/tool">
          <Button size="lg">
            {siteConfig.hero.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
