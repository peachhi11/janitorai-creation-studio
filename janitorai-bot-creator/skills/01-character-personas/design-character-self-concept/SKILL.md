---
name: design-character-self-concept
description: Use for text-based roleplay when {{char}}’s identity, confidence, shame, ambition, rebellion, belonging, competence, autonomy, public mask, or private self-story needs specific behavior. Trigger phrases include “what does {{char}} believe about themself,” “show {{char}}’s insecurity,” “build {{char}}’s self-image,” and “why does {{char}} need to prove this?”
---

## Steps

1. Record who {{char}} believes they are.
2. Record who {{char}} needs others to believe they are.
3. Record the standards {{char}} uses to measure worth.
4. Record roles, groups, relationships, and achievements that support belonging.
5. Record abilities {{char}} trusts and abilities they fear are fraudulent.
6. Separate self-esteem, status, competence, autonomy, connection, and approval.
7. Record the outcomes that make {{char}} feel strong, lovable, intelligent, desirable, safe, or good.
8. Record what happens when those outcomes are denied.
9. Give the public mask a function and cost.
10. Give the private self desires, doubts, tenderness, resentment, or ambition without making it automatically more authentic.
11. Record contradictions and evidence {{char}} explains away.
12. Record experiences that could force {{char}} to revise the old self-story.

## Decision rules

- Yes: Does the self-story change what {{char}} protects, performs, risks, or avoids? Keep it. No: mark it as background.
- Yes: Can {{char}} feel admired and privately unworthy, or act independently while following an internal audience? Preserve the split. No: keep the supported alignment.
- Yes: Is confidence being treated as worth? Separate the two. No: continue.
- Yes: Is the public mask being treated as false and the private self as automatically true? Make both partial, strategic, or sincerely believed. No: continue.
- Yes: Does an event force reinterpretation? Update the self-story and keep residue from the old version. No: preserve the old story.
- Yes: Does the writing force self-acceptance, redemption, or healthy identity integration? Remove the forced arc. No: preserve the selected tone.
- Yes: Does the description decide {{user}}’s identity, feelings, attraction, consent, or choices? Remove that decision. No: continue.

## Output

- Format: `Self-concept record`
- Self-story: state who {{char}} thinks they are and who they need others to see.
- Standards: list worth measures, belonging anchors, competence claims, and approval needs.
- Investments: list outcomes {{char}} protects and the response when they are denied.
- Mask: contrast public presentation, private story, function, and cost.
- Contradictions: list split beliefs, defended evidence, and pressure leaks.
- Revision: list experiences that could reinforce, challenge, or change the self-story.

```text
Self-concept record
Self-story: {{char}} believes they are the reliable one and needs {{user}} to see them as unshakable.
Standards: Worth comes from competence and usefulness; belonging depends on being needed.
Investments: Failure threatens status, safety, and the right to ask for care.
Mask: Publicly calm and helpful; privately resentful of always being responsible.
Contradictions: {{char}} wants intimacy but hides any need that might make {{user}} feel responsible.
Revision: Being trusted after a visible mistake could challenge the old story without erasing it.
```

## Stop when

- No identity, self-image, confidence, shame, belonging, or self-story problem is supplied: return `No self-concept update` and do not invent {{char}}’s identity.
