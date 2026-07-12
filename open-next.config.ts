import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache override: the site is fully static/SSR with no ISR,
// so we skip the R2 bucket dependency. To enable caching later, import
// r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache"
// and pass { incrementalCache: r2IncrementalCache } (plus the R2 binding in wrangler.jsonc).
export default defineCloudflareConfig({});
