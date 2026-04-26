# Community Interview Protocol — Phase 0.3

**Goal**: Validate assumptions about real-estate journey, trust, language, and rights awareness in the Ethiopian-Israeli community.

**Sample**: 5–10 participants, 30–45 minutes each.

## Sample composition

| Dimension | Target |
|---|---|
| Age | Range 25–65 |
| Geography | Mix: Center (Netanya, Rishon, Rehovot), South (Ashkelon, Kiryat Gat, Kiryat Malakhi, Be'er Sheva), North (Haifa) |
| Real-estate status | Mix: renters, owners, looking-to-buy |
| Generation | Mix: Ethiopia-born + Israel-born (2nd generation) |
| Language preference | Mix: Hebrew-primary + Amharic-primary speakers |

## Recruitment

- Through partner organizations (ENP, IAEJ, Fidel, Tene Briut, community Facebook groups)
- Compensation: small token (~100 NIS gift card)
- Consent form translated to Hebrew + Amharic; recorded with permission only

## Question blocks

### Block 1 — Real-estate journey (10 min)
1. Tell me about a recent property search (sale or rent). Where did you start?
2. Which sites/apps do you use regularly? (Yad2, Madlan, Facebook groups, WhatsApp?)
3. Whom did you trust in deciding — broker, friend, family, advisor? Why?

### Block 2 — Rights & programs (8 min)
4. Have you encountered a right or government program that helped you (or could have)? How did you find out about it?
5. The community-specific mortgage (600K, 0% for 10 years) — have you heard? Used it? Why or why not?
6. Urban renewal in your area — aware? involved? worried?

### Block 3 — Trust & professionals (7 min)
7. When you contacted a professional (lawyer, appraiser, broker) — how did you find them? What worked / didn't work?
8. Would you trust an Ethiopian-Israeli professional more than a generic one in the same field? Why or why not?

### Block 4 — Platform fit (5 min)
9. In which language is it easiest for you to read legal/financial content — Hebrew, English, or Amharic?
10. What would make you trust a new platform over Yad2 or Kol-Zchut?
11. If a community-specific platform existed today, what's the one feature you'd want most? *(open-ended)*

## Documentation template

Each interview saved to `docs/discovery/interviews/<participant-pseudonym>.md`:

```
# Interview: <Pseudonym>

- Date: YYYY-MM-DD
- Age: NN
- City: ___
- RE status: renter / owner / looking
- Generation: 1st / 2nd
- Language preference: HE / AM / EN

## Block 1 — Real-estate journey
...

## Block 2 — Rights & programs
...

## Block 3 — Trust & professionals
...

## Block 4 — Platform fit
...

## Standout quotes
- "..."

## Insights
- ...

## Implications for product
- ...
```

## Synthesis

After 5+ interviews:
1. Cross-tabulate answers per block.
2. Tag patterns (e.g., "X% of participants distrust generic broker sites").
3. Update [`0.0-summary.md`](./0.0-summary.md) Strategic Findings section.
4. Adjust [`risk-register.md`](./risk-register.md) — escalate or downgrade R2, R6, R8.
5. Feed into Phase 1 architecture (data model fields, lead flow, language priorities).

## Who runs interviews

Interviewer must be human (likely אור, a community PM, or a hired research consultant). AI agents draft synthesis and follow-up questions but do not conduct the live conversation.
