# Keyword research — Tedros

Owner: Tedros Content & SEO. Review quarterly.

Sources used:
- Google Trends (HE/EN, `IL` region) — directional signal only, no exact volume
- AnswerThePublic (HE seed words: `יוצאי אתיופיה`, `משכנתא`, `התחדשות עירונית`)
- Google "People also ask" / "Related searches" probe at the time of writing
- Community-org content surveys (Tebeka, Friends by Nature, Israel Association of Ethiopian Jews)

No paid Ahrefs / SEMrush yet — all volumes here are qualitative buckets, not exact numbers.

## Top-line audience terms

| HE | EN | AM | Intent | Bucket |
|---|---|---|---|---|
| יוצאי אתיופיה | Israeli-Ethiopian / Beta Israel | ኢትዮጵያውያን-እስራኤላውያን | identity / informational | high |
| עולים מאתיופיה | Ethiopian olim | ከኢትዮጵያ የመጡ ኦሊም | programmatic / official | medium |
| קהילה אתיופית | Ethiopian community Israel | የኢትዮጵያ ማህበረሰብ | informational | medium |

**Note**: the community self-identifies primarily as `יוצאי אתיופיה` (yotzei Ethiopia). `עולים מאתיופיה` (olim me'Ethiopia) is the *programmatic* term used by ministries and so is the right term in eligibility / official-form contexts. Both belong in keyword strategy; lean on `יוצאי אתיופיה` for community-facing copy and `עולים מאתיופיה` for benefits/eligibility copy.

## Topic clusters

### Cluster A — mortgage / housing assistance

| HE | EN | Intent |
|---|---|---|
| מחשבון משכנתא לעולים מאתיופיה | mortgage calculator for ethiopian olim | transactional |
| משכנתא לעולים מאתיופיה | ethiopian olim mortgage / beta israel mortgage | transactional |
| זכאות משכנתא | mortgage eligibility | informational |
| הלוואה מסובסדת | subsidised mortgage israel | informational |
| מענק עומד דיור | non-repayable housing grant | informational |
| משכנתא חד הורי | single-parent mortgage track | informational |
| סיוע בדיור משרד הקליטה | ministry of aliyah housing assistance | informational |

Avoid: `דיור ציבורי` / `public housing` / `የመንግሥት መኖሪያ` — different programme (rent-controlled public housing), wrong intent for this site.

### Cluster B — real estate × city

| Pattern (HE) | Example | Intent |
|---|---|---|
| נדל"ן ב{עיר} | נדל"ן בנתניה, נדל"ן ברחובות | transactional |
| דירות ב{עיר} | דירות בקריית גת | transactional |
| משכנתא {עיר} | משכנתא בבאר שבע | transactional |
| יוצאי אתיופיה {עיר} | יוצאי אתיופיה ראשון לציון | informational + community |

Templated as `city_keywords` in messages, interpolated per-city. See `docs/seo/programmatic-templates.md` (T1).

### Cluster C — urban renewal × neighborhood

| HE | Intent |
|---|---|
| התחדשות עירונית קריית משה רחובות | transactional |
| התחדשות עירונית רמת אליהו | transactional |
| פינוי בינוי דורה נתניה | transactional |
| התחדשות עירונית קהילה אתיופית | informational |

Will drive T3 templates. Slugs locked as `<neighborhood>-<city>` to avoid collision.

### Cluster D — community professionals

| HE | EN |
|---|---|
| יועץ משכנתאות יוצאי אתיופיה | mortgage advisor ethiopian community |
| עו"ד דיור קהילה אתיופית | housing lawyer ethiopian israeli |
| סוכן נדל"ן יוצאי אתיופיה | ethiopian israeli real estate agent |

Will drive T6 templates (profession × city).

## Long-tail / FAQ candidates

These are the question forms that drove the initial FAQ block on the mortgage calculator. Maintain the same pattern when adding FAQ schema to other pages.

- מי זכאי למשכנתא לעולים מאתיופיה?
- כמה הסיוע במשכנתא לעולים?
- האם בני הדור השני זכאים?
- איך מתחילים את התהליך?
- מה ההבדל בין מסלול סטנדרטי למורחב?
- האם המענק הוא עומד או חוזר?
- מה הריבית במשכנתא לעולים?
- אילו בנקים משתתפים בתוכנית?

(English/Amharic mirrors live in `messages/{en,am}.json`.)

## What we are *not* targeting (yet)

- General real-estate terms with no community framing (`דירות למכירה`, `apartment israel`) — too competitive, no differentiation. Revisit when listings volume justifies it.
- Mortgage calculator without community framing (`מחשבון משכנתא` alone) — same reason. We compete only on the community-specific long tail.

## Update cadence

- This file: quarterly.
- `app/lib/cities/registry.ts` overviews: when neighborhood / community data changes.
- Per-page meta keys (`*_meta_title`, `*_meta_description`, `*_keywords`): on any community-org or ministry policy change that affects framing.
