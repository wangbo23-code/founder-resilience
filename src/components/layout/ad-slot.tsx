"use client";

import { siteConfig } from "@/lib/config";

/**
 * AdSense ad slot — only renders if adsense.enabled is true in config.
 * Usage: <AdSlot /> anywhere you want an ad placeholder.
 */
export function AdSlot() {
  if (!siteConfig.adsense.enabled || !siteConfig.adsense.clientId) {
    return null;
  }

  return (
    <div className="my-8 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.adsense.clientId}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
