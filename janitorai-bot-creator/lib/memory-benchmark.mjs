const TOKEN_PATTERN = /[a-z][a-z0-9-]{2,}/g;

function tokens(value) {
  return new Set(String(value).toLowerCase().match(TOKEN_PATTERN) || []);
}

function overlap(queryTokens, item) {
  let score = 0;
  for (const token of queryTokens) if (tokens(item.text).has(token)) score += 1;
  return score;
}

function isAllowed(item, viewer = "project", scope) {
  return (
    item.status === "valid" &&
    (item.access === "project" || item.access === viewer) &&
    (!item.scope || item.scope === scope)
  );
}

export function rankMemoryItems(
  items,
  query,
  { limit = 4, viewer = "project", scope } = {}
) {
  const queryTokens = tokens(query);
  return items
    .filter((item) => isAllowed(item, viewer, scope))
    .map((item) => ({ item, score: overlap(queryTokens, item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id))
    .slice(0, limit)
    .map(({ item, score }) => ({ id: item.id, layer: item.layer, score }));
}

function metric(value) {
  return Number(value.toFixed(4));
}

export function evaluateMemoryCase(fixture, ranked) {
  const selected = ranked.map((entry) => entry.id);
  const gold = new Set(fixture.gold);
  const forbidden = new Set(fixture.forbidden || fixture.distractors || []);
  const relevant = selected.filter((id) => gold.has(id)).length;
  const forbiddenHits = selected.filter((id) => forbidden.has(id)).length;
  const firstRelevant = selected.findIndex((id) => gold.has(id));
  const passedBudget = selected.length <= (fixture.limit || 4);
  const selectedItems = new Map(
    (fixture.items || []).map((item) => [item.id, item])
  );
  const temporalGold = fixture.gold
    .map((id) => selectedItems.get(id)?.timestamp)
    .filter(Boolean);
  const passedTemporalOrder = temporalGold.every(
    (timestamp, index) => index === 0 || timestamp >= temporalGold[index - 1]
  );
  const passedEvidence = fixture.gold.every((id) => {
    const item = selectedItems.get(id);
    return !fixture.requireEvidence || (item?.evidence?.length ?? 0) > 0;
  });
  const passedAbstention =
    fixture.expectedAction !== "abstain" || selected.length === 0;
  return {
    id: fixture.id,
    selected,
    gold: fixture.gold,
    precisionAtK: metric(relevant / Math.max(selected.length, 1)),
    recallAtK: gold.size ? metric(relevant / gold.size) : null,
    reciprocalRank: firstRelevant < 0 ? 0 : metric(1 / (firstRelevant + 1)),
    forbiddenRate: metric(forbiddenHits / Math.max(selected.length, 1)),
    passedSafety: forbiddenHits === 0,
    passedRecall: relevant === gold.size,
    passedBudget,
    passedTemporalOrder,
    passedEvidence,
    passedAbstention,
  };
}

export function validateDecisionTrace(contract, trace = contract.sample) {
  const missing = contract.required.filter((field) => !(field in trace));
  return { passed: missing.length === 0, missing };
}

export function compareProceduralSnapshots(contract) {
  const baseline = new Map(
    contract.baseline.map((item) => [item.id, item.completion])
  );
  const candidate = new Map(
    contract.candidate.map((item) => [item.id, item.completion])
  );
  const missing = contract.required.filter((id) => !candidate.has(id));
  const changed = contract.required.filter(
    (id) => baseline.has(id) && candidate.get(id) !== baseline.get(id)
  );
  return {
    passed: missing.length === 0 && changed.length === 0,
    missing,
    changed,
  };
}

export function runMemoryBenchmark(benchmark, { viewer = "project" } = {}) {
  const results = benchmark.fixtures.map((fixture) =>
    evaluateMemoryCase(
      fixture,
      rankMemoryItems(benchmark.items, fixture.query, {
        limit: fixture.limit || 4,
        viewer,
        scope: fixture.scope,
      })
    )
  );
  for (const result of results) {
    const fixture = benchmark.fixtures.find((item) => item.id === result.id);
    result.passedTemporalOrder = fixture
      ? evaluateMemoryCase(
          { ...fixture, items: benchmark.items },
          result.selected.map((id) => ({ id }))
        ).passedTemporalOrder
      : true;
    result.passedEvidence = fixture
      ? fixture.requireEvidence
        ? fixture.gold.every(
            (id) =>
              benchmark.items.find((item) => item.id === id)?.evidence?.length >
              0
          )
        : true
      : true;
  }
  const average = (key) => {
    const values = results
      .map((result) => result[key])
      .filter((value) => typeof value === "number");
    return values.length
      ? metric(values.reduce((sum, value) => sum + value, 0) / values.length)
      : null;
  };
  return {
    version: benchmark.version,
    cases: results,
    summary: {
      cases: results.length,
      precisionAtK: average("precisionAtK"),
      recallAtK: average("recallAtK"),
      reciprocalRank: average("reciprocalRank"),
      forbiddenRate: average("forbiddenRate"),
      safetyPassRate: metric(
        results.filter((result) => result.passedSafety).length / results.length
      ),
      fullRecallRate: metric(
        results.filter((result) => result.passedRecall).length / results.length
      ),
      budgetPassRate: metric(
        results.filter((result) => result.passedBudget).length / results.length
      ),
      temporalOrderPassRate: metric(
        results.filter((result) => result.passedTemporalOrder).length /
          results.length
      ),
      evidencePassRate: metric(
        results.filter((result) => result.passedEvidence).length /
          results.length
      ),
      abstentionPassRate: metric(
        results.filter((result) => result.passedAbstention).length /
          results.length
      ),
    },
    decisionTrace: validateDecisionTrace(benchmark.decision_trace_contract),
    proceduralRegression: compareProceduralSnapshots(
      benchmark.procedural_regression_contract
    ),
  };
}
