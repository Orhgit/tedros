# Template: Pillar Page — עיר (Real Estate)

> תבנית אחידה ל-pillar page פר-עיר. מנוע ה-programmatic מייצר אובייקט `programmatic_pages` עם `template = "pillar-city"`.
> **Locale**: עברית canonical. EN/AM דרך `payload->>locale` ו-Paraglide messages — לא תרגום-מכונה ללא בדיקה אנושית.
> **Word-count gate**: ≥800 מילים ב-locale שמתפרסם (ADR-005, נאכף ב-action layer ע"פ `programmatic_pages.word_count`).
> **URL pattern (HE)**: `/listings/{city-slug}/sale` (listings hub) או `/nadlan/{city-slug}` (pillar overview).

---

## 1. שדות נתונים (`payload` JSONB)

```jsonc
{
  "city": {
    "id": "uuid",                         // FK ל-cities.id
    "slug": "netanya",                    // canonical HE slug
    "name_he": "נתניה",
    "name_en": "Netanya",
    "name_am": "ናታኒያ",
    "lat": 32.3215,
    "lng": 34.853,
    "population": 235000,                  // CBS, רענון רבעוני (Researcher)
    "ethiopian_community_estimate": 7500,  // CBS / ENP — רענון שנתי
    "neighborhoods_with_community": ["dora", "neot-shaked", "kiryat-nordau"]
  },
  "stats": {
    "active_listings": 0,                  // refresh ב-action layer מ-listings
    "median_price_3room": null,            // CBS / רמ"י
    "median_price_4room": null,
    "as_of": "2026-04-27"
  },
  "highlights": [                          // 3‑6 bullets, אנושי ולא boilerplate
    "ריכוז קהילתי בולט בשכונת דורה, נאות שקד וקרית נורדאו.",
    "פרויקטי התחדשות עירונית פעילים: דורה — שלב תכנון; נאות שקד — שלב היתרים."
  ],
  "renewal_projects": [                    // hydrate מ-DB אם קיים, אחרת empty
    {
      "neighborhood_slug": "dora-netanya",
      "name_he": "פינוי-בינוי דורה צפון",
      "status": "planning",                // planning | permits | construction | done
      "developer": "TBD",
      "url": "/hitchadshut-ironit/dora-netanya"
    }
  ],
  "professionals": [                       // top 3‑6 מתוך directory
    { "user_id": "uuid", "profession": "mortgage-advisor", "url": "/yoetz-mashkanta/netanya" }
  ],
  "rights_local": [                        // זכויות עם הקשר עירוני
    { "right_id": "uuid", "title_he": "סבסוד שכ\"ד נתניה", "url": "/zchuyot/diur/sivsud-sechar-dira-netanya" }
  ],
  "faqs": [                                // 5‑8 שאלות, נכנסות גם ל-FAQPage schema
    { "q_he": "האם זכאי ליוצא אתיופיה לרכוש דירה בנתניה במחיר למשתכן?", "a_he": "..." }
  ],
  "sources": [                             // ADR-005 — כל טענה עובדתית = מקור
    { "label": "CBS — אוכלוסייה לפי עיר", "url": "https://www.cbs.gov.il/..." }
  ]
}
```

---

## 2. SEO meta (per locale)

| Field             | Hebrew (canonical)                                                                         | מקס תווים    |
| ----------------- | ------------------------------------------------------------------------------------------ | ------------ |
| `<title>`         | `נדל"ן ליוצאי אתיופיה ב{city.name_he} — דירות, התחדשות עירונית ומקצוענים מהקהילה \| Tedros` | 60           |
| `meta description` | `מחפש דירה ב{city.name_he}? מצא ליסטינגים מותאמים, פרויקטי התחדשות עירונית בשכונות דורה ונאות שקד, ויועצי משכנתאות מהקהילה. עברית, אמהרית ואנגלית.` | 155 |
| `og:title`         | זהה ל-`<title>` (קצר אם נחתך)                                                             | 60           |
| `og:description`   | זהה ל-meta description                                                                    | 155          |
| `og:image`         | `/og/pillar-city/{city.slug}.png` (יוצר @vercel/og עם שם העיר + כיתוב קהילתי)              | 1200×630     |
| `canonical`        | `https://tedros.org.il/he/nadlan/{city.slug}`                                              |              |
| `hreflang`         | `he`, `en`, `am`, `x-default=he`                                                          | 4 שורות      |
| `robots`           | `index, follow` (אם `published_at != null` ו-`word_count >= 800`)                          |              |

---

## 3. תוכן הדף (H-tree)

> 800‑1500 מילים בעברית. אורכים ב-EN/AM גמישים ע"פ זמינות תרגום אנושי.

### H1 (ייחודי, 1 פר-דף)
`נדל"ן ליוצאי אתיופיה ב{city.name_he}`

### Above-the-fold
- 1 פסקת פתיחה (40‑60 מילים): מה הדף נותן, למי הוא מיועד, CTA ראשי.
- כפתור CTA primary: "מצא דירה ב{city.name_he}" → `/listings/{city-slug}/sale`.
- כפתור CTA secondary: "בדוק זכאות משכנתא" → `/calculator/mashkanta-yotzei-etiopiya`.

### H2 — `{city.name_he} עבור הקהילה האתיופית-ישראלית`
פסקה אחת + שלוש bullets מ-`payload.highlights`. מקור CBS לאוכלוסייה (footnote → `payload.sources`).

### H2 — `שכונות עם נוכחות קהילתית`
לולאה על `neighborhoods_with_community`. כל פריט = card → `/{neighborhood-slug}` (link ל-neighborhood pillar).

### H2 — `דירות זמינות עכשיו`
Live render מ-`listings` (אקטיבי, פר-עיר). אם `active_listings = 0` → CTA: "השאר פרטים, נעדכן כשיתפנה". **לא להשאיר את ה-section ריק** (thin content gate).

### H2 — `התחדשות עירונית ב{city.name_he}`
לולאה על `renewal_projects`. סטטוס + מינהלת + link לדף שכונה. אם 0 → להציג Section "אין פרויקטים פעילים שאנחנו עוקבים אחריהם — דווח לנו".

### H2 — `אנשי מקצוע מהקהילה ב{city.name_he}`
3‑6 כרטיסי profile מ-`payload.professionals`. כל כרטיס לינקיני ל-`/yoetz-mashkanta/{city.slug}` וכו'.

### H2 — `זכויות דיור רלוונטיות ב{city.name_he}`
3‑5 פריטים מ-`payload.rights_local` עם link לדף הזכות (Right pillar).

### H2 — `שאלות נפוצות`
לולאה על `payload.faqs` → גם רנדור visual וגם Schema `FAQPage` (ראה `schema-org.md`).

### H2 — `מקורות`
לולאה על `payload.sources`. כל טענה עובדתית בדף מסומנת footnote.

### Footer-of-content (E-E-A-T)
- שם המחבר/ת + bio קצר + LinkedIn.
- "עודכן לאחרונה: {updated_at}".
- "דווח על אי-דיוק" → form.

---

## 4. Internal linking

חובה (כל דף):
- 1 link → pillar עיר משלים (לדוגמה דף `/diur/mehir-le-mishtaken-yotzei-etiopiya`).
- 1 link לכל שכונה ב-`neighborhoods_with_community`.
- 1 link → `/calculator/mashkanta-yotzei-etiopiya`.
- 1 link → directory לאיש מקצוע (`/yoetz-mashkanta/{city.slug}` וכו').
- 1 link → `/zchuyot` (pillar זכויות).
- BreadcrumbList: `Home › נדל"ן › {city.name_he}`.

מומלץ: 2‑3 cross-links לערים גובלות (נתניה ↔ הרצליה, ראשון ↔ רחובות) — בונה topical relevance.

---

## 5. Schema.org (per page)

ראה `schema-org.md` לדוגמאות מלאות. Pillar-city כולל:

- `WebPage` (top-level)
- `BreadcrumbList`
- `Place` עבור העיר (`@id` קנוני)
- `FAQPage` (אם `payload.faqs.length >= 3`)
- `ItemList` עבור `renewal_projects` (כל פריט = `Place` או `RealEstateListing`)

`Article` schema **לא מתאים** ל-pillar עיר (זה לא מאמר חדשותי) — להשתמש ב-`WebPage` + `mainEntity = Place`.

---

## 6. QA gate (לפני `published_at = now()`)

- [ ] `word_count >= 800` בעברית (נמדד ב-action; raw text ללא HTML).
- [ ] H1 ייחודי, מופיע פעם אחת.
- [ ] meta description 120‑160 תווים, כולל CTA.
- [ ] לפחות 5 internal links (לפי סעיף 4).
- [ ] לפחות 3 מקורות חיצוניים DA50+ (gov.il, CBS, kolzchut, knesset).
- [ ] OG image 1200×630 קיים ב-R2.
- [ ] hreflang 4 שורות (he/en/am/x-default).
- [ ] FAQPage schema valid (Google Rich Results test).
- [ ] AA accessibility על H-tree (axe ב-CI).

---

## 7. דוגמת payload חיה (`netanya`)

```jsonc
{
  "city": {
    "slug": "netanya",
    "name_he": "נתניה",
    "name_en": "Netanya",
    "name_am": "ናታኒያ",
    "population": 235000,
    "ethiopian_community_estimate": 7500,
    "neighborhoods_with_community": ["dora-netanya", "neot-shaked-netanya", "kiryat-nordau-netanya"]
  },
  "highlights": [
    "ריכוז קהילתי בולט בשכונות דורה, נאות שקד וקרית נורדאו.",
    "שלושה פרויקטי התחדשות עירונית פעילים נכון ל-2026."
  ],
  "renewal_projects": [
    { "neighborhood_slug": "dora-netanya", "name_he": "פינוי-בינוי דורה צפון", "status": "planning", "url": "/hitchadshut-ironit/dora-netanya" }
  ],
  "faqs": [
    {
      "q_he": "האם יוצאי אתיופיה זכאים להטבות נוספות במחיר למשתכן בנתניה?",
      "a_he": "כן — תוכנית הדיור הייעודית ליוצאי אתיופיה (החלטת ממשלה 1107) מאפשרת..."
    }
  ],
  "sources": [
    { "label": "החלטת ממשלה 1107 — תוכנית הדיור ליוצאי אתיופיה", "url": "https://www.gov.il/he/departments/policies/dec1107_2016" }
  ]
}
```

---

## 8. Variants

מנוע ה-programmatic תומך ב-Variants (TED-17, זרוע 2 — Programmatic SEO). לכל עיר ניתן להפיק כמה variants ע"י axes נוספים:

| Axis     | Values                              | Slug suffix     | Template                |
| -------- | ----------------------------------- | --------------- | ----------------------- |
| `type`   | sale / rent / urban-renewal         | `-sale`/`-rent` | `pillar-city-{type}`    |
| `topic`  | mortgage / mehir-le-mishtaken       | `-mortgage`     | `pillar-city-{topic}`   |

**אזהרה:** לא ליצור variants ללא תוכן ייחודי לכל אחד (Google duplicate content). gate: כל variant חייב לפחות 600 מילים שונות מהבסיס.
