// ==========================================================
// SOURCE QUALITY TIERING
// ==========================================================
// This gives a defensible, transparent basis for judging
// source reliability instead of an arbitrary/fake score.
//
// TIER 1 - Official / primary / academic / major wire services
// TIER 2 - Established, widely recognized news organizations
// TIER 3 - Everything else (unknown reliability)
//
// This is intentionally simple and based only on domain
// patterns, not a "black box" credibility score.
// ==========================================================

const TIER_1_PATTERNS = [
  /\.gov$/i,
  /\.gov\./i,
  /\.edu$/i,
  /\.edu\./i,
  /\.int$/i,
  /who\.int/i,
  /un\.org/i,
  /nic\.in/i,
  /pib\.gov\.in/i,
  /reuters\.com/i,
  /apnews\.com/i,
  /afp\.com/i,
  /prnewswire\.com/i,
];

const TIER_2_PATTERNS = [
  /bbc\.co(m|\.uk)?/i,
  /nytimes\.com/i,
  /washingtonpost\.com/i,
  /theguardian\.com/i,
  /wsj\.com/i,
  /npr\.org/i,
  /aljazeera\.com/i,
  /bloomberg\.com/i,
  /thehindu\.com/i,
  /indianexpress\.com/i,
  /hindustantimes\.com/i,
  /timesofindia\.indiatimes\.com/i,
  /ndtv\.com/i,
  /economictimes\.indiatimes\.com/i,
  /cnbc\.com/i,
  /forbes\.com/i,
  /cnn\.com/i,
  /abcnews\.go\.com/i,
];

function extractDomain(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function getSourceTier(url) {
  const domain = extractDomain(url);

  if (!domain) return { tier: 3, label: "Unverified" };

  if (TIER_1_PATTERNS.some((pattern) => pattern.test(domain))) {
    return { tier: 1, label: "Official / Primary" };
  }

  if (TIER_2_PATTERNS.some((pattern) => pattern.test(domain))) {
    return { tier: 2, label: "Established News" };
  }

  return { tier: 3, label: "Unverified" };
}

module.exports = {
  getSourceTier,
  extractDomain,
};
