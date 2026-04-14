"use client";

/**
 * AdSense ad slot — only renders if adsense config exists and is enabled.
 * Usage: <AdSlot /> anywhere you want an ad placeholder.
 */
export function AdSlot() {
  // Safe access: old configs may not have adsense field
  const config = require("@/lib/config").siteConfig;
  const adsense = (config as Record<string, unknown>).adsense as
    | { enabled: boolean; clientId: string }
    | undefined;

  if (!adsense?.enabled || !adsense?.clientId) {
    return null;
  }

  return (
    <div className="my-8 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsense.clientId}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
