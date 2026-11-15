function ratio(value, total) {
  return total ? Number((value / total).toFixed(4)) : 0;
}

export function compareSkillBundles(contract) {
  const required = new Set(contract.requiredCoverage);
  const candidate = new Set(contract.candidate.coverage);
  const missing = [...required].filter((item) => !candidate.has(item));
  const baselineSteps = contract.baseline.steps;
  const candidateSteps = contract.candidate.steps;
  return {
    passed: missing.length === 0 && candidateSteps <= baselineSteps,
    missing,
    stepReduction: baselineSteps - candidateSteps,
    baselineSkills: contract.baseline.skills.length,
    candidateSkills: contract.candidate.skills.length,
  };
}

export function evaluateJudgePairs(rows) {
  const agreementA = rows.filter((row) => row.judgeA === row.gold).length;
  const agreementB = rows.filter((row) => row.judgeB === row.gold).length;
  const interJudge = rows.filter((row) => row.judgeA === row.judgeB).length;
  const disagreements = rows
    .filter((row) => row.judgeA !== row.judgeB)
    .map((row) => row.id);
  return {
    cases: rows.length,
    judgeAAccuracy: ratio(agreementA, rows.length),
    judgeBAccuracy: ratio(agreementB, rows.length),
    interJudgeAgreement: ratio(interJudge, rows.length),
    disagreements,
  };
}

export function replayWorldEvents(replay) {
  const state = { ...replay.initial };
  const superseded = new Set();
  for (const event of replay.events) {
    for (const id of event.supersedes || []) superseded.add(id);
    if (event.op === "set") state[event.field] = event.value;
    if (event.op === "increment") state[event.field] += event.value;
  }
  const matches = JSON.stringify(state) === JSON.stringify(replay.expected);
  return { passed: matches, state, superseded: [...superseded] };
}

export function evaluateActionPairs(
  pairs,
  actions = pairs.map((pair) => pair.expected)
) {
  const correct = pairs.filter(
    (pair, index) => actions[index] === pair.expected
  ).length;
  return { cases: pairs.length, accuracy: ratio(correct, pairs.length) };
}

function lower(value) {
  return String(value).toLowerCase();
}

export function evaluateRoleplayContract(contract) {
  const output = lower(contract.output);
  const missing = contract.requiredTerms.filter(
    (term) => !output.includes(lower(term))
  );
  const forbidden = contract.forbiddenTerms.filter((term) =>
    output.includes(lower(term))
  );
  return {
    passed: missing.length === 0 && forbidden.length === 0,
    missing,
    forbidden,
  };
}

export function evaluateContextDivergence(pairs) {
  const results = pairs.map((pair) => ({
    id: pair.id,
    diverged: pair.normal !== pair.evaluation,
    expectedDivergence: pair.expectedDivergence,
  }));
  return {
    cases: results.length,
    results,
    accuracy: ratio(
      results.filter((result) => result.diverged === result.expectedDivergence)
        .length,
      results.length
    ),
  };
}

export function evaluateMultimodalIdentity(contract) {
  const channels = Object.entries(contract).filter(
    ([key]) => key !== "required"
  );
  const mismatches = [];
  for (const field of contract.required) {
    const values = channels.map(([, channel]) => channel[field]);
    if (values.some((value) => value !== values[0])) mismatches.push(field);
  }
  return {
    passed: mismatches.length === 0,
    mismatches,
    channels: channels.map(([key]) => key),
  };
}

export function runAgentEvaluationBenchmark(benchmark) {
  return {
    version: benchmark.version,
    skillBundle: compareSkillBundles(benchmark.skill_bundle),
    judgePairs: evaluateJudgePairs(benchmark.judge_pairs),
    worldReplay: replayWorldEvents(benchmark.world_replay),
    actionPairs: evaluateActionPairs(benchmark.action_pairs),
    roleplayContract: evaluateRoleplayContract(benchmark.roleplay_contract),
    contextDivergence: evaluateContextDivergence(
      benchmark.evaluation_context_pairs
    ),
    multimodalIdentity: evaluateMultimodalIdentity(
      benchmark.multimodal_identity
    ),
  };
}
