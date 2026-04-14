# AI Development Rules for This Project

## Sandbox Rule (CRITICAL)
- You can ONLY write business logic code in `src/app/tool/` directory
- You MUST NOT modify: lib/auth.ts, lib/payment.ts, webhook routes, layout.tsx
- You MUST use Shadcn UI components only. No custom CSS files.
- You can import and use functions from lib/credits.ts and lib/db.ts
- You can use any components from components/ui/

## Blog Content Rules (Phase 4)
- Blog articles go in `content/` directory as `.md` files
- Each article MUST have frontmatter: title, description, keywords, publishedAt
- 1 target long-tail keyword = 1 article (1 unique URL). Never target the same keyword twice.
- Use assertive, #1-claim titles (e.g., "#1 Best Free AI X Tool in 2026")
- Every article MUST include at least 1 comparison table
- Affiliate links are configured in lib/config.ts, not hardcoded in articles
- Articles between different independent domain sites MUST NOT link to each other

## Tech Stack (locked, do not change)
- Next.js 16 App Router + TypeScript strict mode
- Shadcn UI + Tailwind CSS (utility classes only)
- Supabase for data storage
- Server Actions for backend logic

## Code Style
- File naming: kebab-case (e.g., `tool-form.tsx`)
- Functions/variables: camelCase
- Types/interfaces: PascalCase
- Comments: English

## Available APIs for Sandbox Use
```typescript
// Credits — check and consume
import { getCredits, useCredit, hasCredits } from "@/lib/credits"
// Database — read/write user data
import { getUserByEmail } from "@/lib/db"
// Config — site settings (includes affiliate, adsense, trialWidget)
import { siteConfig } from "@/lib/config"
// Auth — get current user (read-only)
import { getCurrentUser, requireAuth } from "@/lib/auth"
// Blog — list and get articles
import { getAllPosts, getPostBySlug } from "@/lib/blog"
```

## Paywall Component
Wrap any paid feature with the Paywall component:
```tsx
import { Paywall } from "@/components/layout/paywall"

<Paywall featureName="Generate Report">
  <YourToolComponent />
</Paywall>
```

## Ad Slot Component
Insert ad placeholders (only renders when adsense.enabled = true in config):
```tsx
import { AdSlot } from "@/components/layout/ad-slot"

<AdSlot />
```
