const TOKEN_PATTERN = /[a-z][a-z0-9-]{2,}/g;
const DAY_MS = 86_400_000;
const STOP_WORDS = new Set([
  "what",
  "when",
  "where",
  "which",
  "should",
  "this",
  "that",
  "with",
  "from",
  "about",
  "does",
  "have",
  "been",
  "the",
  "and",
  "for",
  "into",
  "after",
  "before",
  "happened",
  "happen",
  "changed",
  "change",
  "changing",
  "project",
  "verified",
  "verifi",
]);
const EVENT_ALIASES = new Map([
  ["disclose", "disclosure"],
  ["disclosed", "disclosure"],
  ["disclosing", "disclosure"],
  ["promise", "promise"],
  ["promised", "promise"],
  ["promising", "promise"],
  ["verified", "verified"],
  ["observed", "observed"],
]);

const LAYER_TERMS = {
  semantic: [
    "fact",
    "canon",
    "true",
    "established",
    "current",
    "evidence",
    "belief",
  ],
  episodic: [
    "happened",
    "before",
    "after",
    "scene",
    "episode",
    "history",
    "promise",
    "disclosure",
    "when",
    "happened",
    "happen",
    "changed",
    "change",
    "changing",
    "current",
    "project",
    "verified",
    "between",
  ],
  procedural: [
    "how",
    "revise",
    "use",
    "skill",
    "workflow",
    "steps",
    "procedure",
    "preserve",
  ],
  "in-context": [
    "current",
    "next",
    "now",
    "this",
    "scene",
    "working",
    "generate",
    "context",
  ],
};

const AUTHORITY_WEIGHT = {
  "approved-canon": 1,
  "approved-state": 1,
  "derived-approved-update": 0.95,
  "objective-evidence": 1,
  "explicit-current-preference": 0.95,
  "observed-event": 0.9,
  "annotated-event-summary": 0.88,
  "working-state": 0.86,
  "skill-library": 0.84,
  "session-summary": 0.72,
  "retrieved-reference": 0.55,
  "user-preference": 0.5,
  "user-belief": 0.35,
  inference: 0.2,
  rumour: 0.1,
  "author-only": 0,
};

function tokens(value) {
  return new Set(String(value).toLowerCase().match(TOKEN_PATTERN) || []);
}

function normaliseToken(token) {
  return EVENT_ALIASES.get(token) || token.replace(/(ing|ed|es|s)$/, "");
}

function normalisedTokens(value) {
  return new Set([...tokens(value)].map(normaliseToken));
}

const PROCEDURAL_FIELDS = [
  "task_type",
  "inputs",
  "outputs",
  "prerequisites",
  "steps",
  "verification",
  "failure_modes",
];

function metadataText(item, fields = PROCEDURAL_FIELDS) {
  return fields
    .flatMap((field) => {
      const value = item[field];
      return value == null
        ? []
        : [Array.isArray(value) ? value.join(" ") : value];
    })
    .join(" ");
}

export function extractQueryFacets(query) {
  const raw = [...tokens(query)];
  const normalised = raw.map(normaliseToken);
  const temporal = {
    before: raw.includes("before"),
    after: raw.includes("after"),
    between: raw.includes("between"),
    ordered:
      raw.includes("between") ||
      (raw.includes("before") && raw.includes("after")),
  };
  const eventTerms = normalised.filter((token) =>
    [
      "disclosure",
      "promise",
      "scene",
      "episode",
      "event",
      "confrontation",
      "repair",
      "observed",
    ].includes(token)
  );
  const entityTerms = normalised.filter(
    (token) =>
      !STOP_WORDS.has(token) &&
      !eventTerms.includes(token) &&
      !["before", "after"].includes(token)
  );
  return {
    temporal,
    eventTerms: new Set(eventTerms),
    entityTerms: new Set(entityTerms),
    requiresEvidence: raw.some((token) =>
      ["evidence", "verified", "according", "proof"].includes(token)
    ),
  };
}

function overlap(queryTokens, text) {
  const textTokens = normalisedTokens(text);
  let score = 0;
  for (const token of queryTokens) if (textTokens.has(token)) score += 1;
  return score;
}

function authorityWeight(authority) {
  return AUTHORITY_WEIGHT[authority] ?? 0.4;
}

function recencyWeight(timestamp, now) {
  if (!timestamp) return 0.5;
  const age = Math.max(
    0,
    new Date(now).getTime() - new Date(timestamp).getTime()
  );
  return 1 / (1 + age / (30 * DAY_MS));
}

function isAllowed(
  item,
  { viewer = "project", scope, blockedAuthorities = [] } = {}
) {
  return (
    ["valid", "active"].includes(item.status) &&
    (item.access === "project" || item.access === viewer) &&
    (!item.scope || item.scope === scope) &&
    !blockedAuthorities.includes(item.authority)
  );
}

export function classifyMemoryLayer(query) {
  const queryTokens = normalisedTokens(query);
  const scores = Object.fromEntries(
    Object.entries(LAYER_TERMS).map(([layer, terms]) => [
      layer,
      terms.reduce((score, term) => score + Number(queryTokens.has(term)), 0),
    ])
  );
  const ordered = Object.entries(scores).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
  return { primary: ordered[0][1] ? ordered[0][0] : "semantic", scores };
}

export function rankLayerAwareMemory(
  items,
  query,
  {
    limit = 4,
    viewer = "project",
    scope,
    blockedAuthorities = ["author-only", "inference"],
    now = new Date().toISOString(),
    causalIds = [],
  } = {}
) {
  const queryTokens = normalisedTokens(query);
  const facets = extractQueryFacets(query);
  const classification = classifyMemoryLayer(query);
  const causalSet = new Set(causalIds);
  return items
    .filter((item) => isAllowed(item, { viewer, scope, blockedAuthorities }))
    .map((item) => {
      const relevance = overlap(queryTokens, item.text);
      const layerMatch = item.layer === classification.primary ? 1 : 0;
      const validity = authorityWeight(item.authority);
      const recency = recencyWeight(item.timestamp, now);
      const causal = (item.derived_from || []).some((id) => causalSet.has(id))
        ? 1
        : 0;
      const eventMatch = [...facets.eventTerms].filter((term) =>
        normalisedTokens(item.text).has(term)
      ).length;
      const procedureRelevance =
        classification.primary === "procedural"
          ? overlap(queryTokens, metadataText(item))
          : 0;
      const procedureCompleteness =
        classification.primary === "procedural"
          ? PROCEDURAL_FIELDS.filter((field) => item[field] != null).length /
            PROCEDURAL_FIELDS.length
          : 0;
      const score =
        relevance +
        layerMatch * 0.75 +
        validity * 0.5 +
        recency * 0.25 +
        causal * 0.5 +
        eventMatch * 0.5 +
        procedureRelevance * 0.75 +
        procedureCompleteness * 1.25;
      return {
        id: item.id,
        layer: item.layer,
        timestamp: item.timestamp || null,
        evidence: item.evidence || [],
        score,
        signals: {
          relevance,
          layerMatch,
          validity,
          recency,
          causal,
          eventMatch,
          procedureRelevance,
          procedureCompleteness,
        },
      };
    })
    .filter((item) => item.signals.relevance > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);
}

export function promoteCrossLayerEvents(items, ranked, { limit = 8 } = {}) {
  const selectedIds = new Set(ranked.map((entry) => entry.id));
  return items
    .filter((item) => {
      const sources = [
        ...(item.derived_from || []),
        ...(item.source_event_ids || []),
      ];
      return (
        sources.some((id) => selectedIds.has(id)) &&
        ["semantic", "in-context"].includes(item.layer) &&
        ["derived-approved-update", "approved-state", "working-state"].includes(
          item.authority
        ) &&
        ["valid", "active"].includes(item.status)
      );
    })
    .map((item) => ({
      id: item.id,
      layer: item.layer,
      timestamp: item.timestamp || null,
      evidence: item.evidence || [],
      score: 0,
      signals: {
        promotion: 1,
        sourceIds: [
          ...(item.derived_from || []),
          ...(item.source_event_ids || []),
        ],
      },
    }))
    .slice(0, limit);
}

function expandRelatedContext(items, ranked, { limit = 4 } = {}) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const relatedIds = new Set(
    ranked.flatMap((entry) => byId.get(entry.id)?.related_ids || [])
  );
  return items
    .filter((item) => relatedIds.has(item.id))
    .map((item) => ({
      id: item.id,
      layer: item.layer,
      timestamp: item.timestamp || null,
      evidence: item.evidence || [],
      score: 0,
      signals: { relatedContext: 1 },
    }))
    .slice(0, limit);
}

function structuredProceduralCandidates(items, ranked) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const structured = ranked.filter((entry) => {
    const item = byId.get(entry.id);
    return (
      item?.layer === "procedural" &&
      PROCEDURAL_FIELDS.filter((field) => item[field] != null).length >= 2
    );
  });
  return structured.length >= 2 ? structured : ranked;
}

export function expandEventThread(
  items,
  ranked,
  { limit = 4, eventTerms = new Set() } = {}
) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const seedItems = ranked.map((entry) => byId.get(entry.id)).filter(Boolean);
  const participants = new Set(
    seedItems.flatMap((item) => item.participants || [])
  );
  const evidence = new Set(seedItems.flatMap((item) => item.evidence || []));
  const threadIds = new Set(ranked.map((entry) => entry.id));
  for (const item of items) {
    const related =
      (item.participants || []).some((participant) =>
        participants.has(participant)
      ) ||
      (item.evidence || []).some((id) => evidence.has(id)) ||
      (item.derived_from || []).some((id) => threadIds.has(id)) ||
      (item.supersedes || []).some((id) => threadIds.has(id));
    const eventMatch =
      !eventTerms.size ||
      [...eventTerms].some((term) => normalisedTokens(item.text).has(term));
    if (related && eventMatch && item.layer === "episodic") {
      threadIds.add(item.id);
    }
  }
  const expanded = items
    .filter((item) => threadIds.has(item.id))
    .map(
      (item) =>
        ranked.find((entry) => entry.id === item.id) || {
          id: item.id,
          layer: item.layer,
          timestamp: item.timestamp || null,
          evidence: item.evidence || [],
          score: 0,
          signals: {},
        }
    )
    .sort((a, b) => {
      const left = byId.get(a.id)?.timestamp || "";
      const right = byId.get(b.id)?.timestamp || "";
      return (
        left.localeCompare(right) ||
        b.score - a.score ||
        a.id.localeCompare(b.id)
      );
    });
  return expanded.slice(0, limit);
}

export function assessAnswerability(
  query,
  ranked,
  items,
  { minScore = 1.5 } = {}
) {
  const facets = extractQueryFacets(query);
  const byId = new Map(items.map((item) => [item.id, item]));
  const selected = ranked.map((entry) => byId.get(entry.id)).filter(Boolean);
  const hasStrongMatch = ranked.some((entry) => entry.score >= minScore);
  const hasEntity =
    facets.entityTerms.size === 0 ||
    selected.some((item) => {
      const itemTokens = normalisedTokens(item.text);
      return [...facets.entityTerms].some((term) => itemTokens.has(term));
    });
  const hasEvent =
    facets.eventTerms.size === 0 ||
    selected.some((item) => {
      const itemTokens = normalisedTokens(item.text);
      return [...facets.eventTerms].some((term) => itemTokens.has(term));
    });
  const evidenceComplete =
    !facets.requiresEvidence ||
    selected.some((item) => (item.evidence || []).length > 0);
  const temporalComplete =
    !facets.temporal.ordered ||
    selected.filter((item) => item.layer === "episodic").length >= 2;
  const conflicting = selected.some((item) =>
    ["rumour", "user-belief", "inference"].includes(item.authority)
  );
  const answerable =
    hasStrongMatch &&
    hasEntity &&
    hasEvent &&
    evidenceComplete &&
    temporalComplete;
  return {
    status: answerable
      ? conflicting
        ? "conflicting_evidence"
        : "answerable"
      : "insufficient_evidence",
    confidence: Number(
      (ranked[0]?.score ? Math.min(1, ranked[0].score / 4) : 0).toFixed(4)
    ),
    missing: [
      !hasStrongMatch && "strong_match",
      !hasEntity && "entity",
      !hasEvent && "event",
      !evidenceComplete && "evidence",
      !temporalComplete && "temporal_thread",
    ].filter(Boolean),
  };
}

export function assembleWorkingContext(
  ranked,
  items,
  { maxItems = 4, maxChars = 8_000 } = {}
) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const selected = [];
  let chars = 0;
  for (const candidate of ranked) {
    const item = byId.get(candidate.id);
    if (!item) continue;
    const nextChars = chars + item.text.length;
    if (selected.length >= maxItems || nextChars > maxChars) continue;
    selected.push({ ...candidate, text: item.text });
    chars = nextChars;
  }
  return {
    items: selected,
    text: selected.map((item) => `[${item.layer}] ${item.text}`).join("\n\n"),
    chars,
    dropped: ranked
      .filter((item) => !selected.some((chosen) => chosen.id === item.id))
      .map((item) => item.id),
  };
}

export function retrieveLayerAwareMemory(items, query, options = {}) {
  const candidateLimit = Math.max(options.limit || 4, 16);
  const initial = rankLayerAwareMemory(items, query, {
    ...options,
    limit: candidateLimit,
  });
  const facets = extractQueryFacets(query);
  const eventSeeds = facets.temporal.ordered
    ? initial.filter((entry) => {
        const item = items.find((candidate) => candidate.id === entry.id);
        const itemTokens = normalisedTokens(item?.text || "");
        return (
          item?.layer === "episodic" &&
          [...facets.eventTerms].some((term) => itemTokens.has(term))
        );
      })
    : initial;
  const expanded = facets.temporal.ordered
    ? expandEventThread(items, eventSeeds, {
        limit: candidateLimit,
        eventTerms: facets.eventTerms,
      })
    : initial;
  const primaryLayer = classifyMemoryLayer(query).primary;
  const contextRelated = ["in-context", "procedural"].includes(primaryLayer)
    ? expandRelatedContext(items, expanded, { limit: candidateLimit })
    : [];
  const proceduralCandidates =
    primaryLayer === "procedural"
      ? structuredProceduralCandidates(items, expanded)
      : expanded;
  const promotions = ["episodic", "semantic", "in-context"].includes(
    primaryLayer
  )
    ? promoteCrossLayerEvents(items, expanded, { limit: candidateLimit })
    : [];
  const enriched = [
    ...(primaryLayer === "in-context"
      ? expanded.filter((entry) => {
          const item = items.find((candidate) => candidate.id === entry.id);
          return (
            item?.layer === "in-context" || item?.authority === "working-state"
          );
        })
      : primaryLayer === "procedural"
        ? proceduralCandidates
        : expanded),
    ...contextRelated,
    ...promotions.filter(
      (promotion) => !expanded.some((entry) => entry.id === promotion.id)
    ),
  ];
  const answerability = assessAnswerability(query, enriched, items, options);
  const ranked =
    answerability.status === "insufficient_evidence"
      ? []
      : enriched.slice(0, options.limit || 4);
  return {
    classification: classifyMemoryLayer(query),
    facets,
    answerability,
    promotions,
    ranked,
    context: assembleWorkingContext(ranked, items, options),
  };
}
