# Template: Neighborhood Page — שכונה × התחדשות עירונית

> תבנית פר-שכונה, מתמקדת ב**התחדשות עירונית** + נוכחות קהילתית. מנוע ה-programmatic מייצר אובייקט `programmatic_pages` עם `template = "neighborhood-renewal"`.
> **Locale**: עברית canonical. EN/AM אופציונלי בסבב הראשון (5 שכונות Phase 3) — לפתוח רק אחרי ולידציה אנושית.
> **URL pattern (HE)**: `/hitchadshut-ironit/{neighborhood-slug}` (לדוגמה: `/hitchadshut-ironit/ramat-eliyahu`).
> **Word-count gate**: ≥800 מילים בעברית.

---

## 1. שדות נתונים (`payload` JSONB)

```jsonc
{
  "neighborhood": {
    "id": "uuid", // FK ל-neighborhoods.id
    "slug": "ramat-eliyahu",
    "name_he": "רמת אליהו",
    "name_en": "Ramat Eliyahu",
    "city_slug": "rishon-letzion",
    "city_name_he": "ראשון לציון",
    "lat": 31.961,
    "lng": 34.776,
  },
  "community": {
    "ethiopian_share_estimate": 0.3, // 0–1, מקורר לשנתי (CBS / ENP)
    "context_he": "אחת מנקודות הריכוז הקהילתיות הגדולות בארץ. שירותים קהילתיים: ENP, מתנ\"ס, מועדון זקנים.",
  },
  "renewal": {
    "status": "construction", // planning | permits | construction | done | none
    "start_year": 2018,
    "expected_completion_year": 2032,
    "tama": "פינוי-בינוי", // tama-38 | פינוי-בינוי | תמ\"א 70 | חידוש מתחמי
    "developer_he": "TBD",
    "minhelet_url": "https://www.rishonlezion.muni.il/...",
    "rights_for_residents": [
      "דירה חלופית בגודל זהה לפחות",
      "פיצוי דמי הסתגלות",
      "ייעוץ משפטי בחינם דרך מינהלת השכונה",
    ],
    "legal_aid_contact_he": "מינהלת רמת אליהו, טל' XXX-XXXX, ימים א'‑ה' 09:00‑16:00",
    "milestones": [
      { "date": "2024-Q3", "label_he": "אישור תכנית בוועדה המחוזית" },
      { "date": "2026-Q1", "label_he": "התחלת הריסות אגף צפוני" },
    ],
  },
  "available_listings_count": 0, // hydrate מ-listings בעיבוד
  "professionals_in_area": [
    // top 3‑5
    {
      "user_id": "uuid",
      "profession": "lawyer-real-estate",
      "url": "/orech-din-yotzei-etiopiya/rishon-letzion",
    },
  ],
  "faqs": [
    {
      "q_he": "האם דייר יוצא אתיופיה ברמת אליהו זכאי לסיוע משפטי בפינוי-בינוי?",
      "a_he": "כן. מינהלת השכונה מספקת ייעוץ משפטי בחינם...",
    },
  ],
  "sources": [
    { "label": "מינהלת רמת אליהו", "url": "https://..." },
    { "label": "החלטה מ' 1107 — סיוע ייעודי", "url": "https://www.gov.il/..." },
  ],
}
```

---

## 2. SEO meta

| Field              | Hebrew                                                                                                                                 | מקס תווים |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `<title>`          | `התחדשות עירונית {neighborhood.name_he} ({city_name_he}) — סטטוס, זכויות דייר ופרויקטים פעילים \| Tedros`                              | 60        |
| `meta description` | `כל המידע על פינוי-בינוי ב{neighborhood.name_he}: סטטוס נוכחי, מועדים, זכויות לדיירים יוצאי אתיופיה, פרטי המינהלת וייעוץ משפטי בחינם.` | 155       |
| `og:image`         | `/og/neighborhood/{neighborhood.slug}.png`                                                                                             | 1200×630  |
| `canonical`        | `https://tedros.org.il/he/hitchadshut-ironit/{neighborhood.slug}`                                                                      |           |

---

## 3. תוכן הדף (H-tree)

> 800‑1500 מילים. דף זה דורש **דיוק עובדתי גבוה** — תאריכים, מינהלת, חוקים. כל טענה = מקור.

### H1

`התחדשות עירונית ב{neighborhood.name_he} ({city_name_he})`

### Above-the-fold

- 1 פסקה עם הסטטוס הנוכחי + מועד צפוי.
- "Status badge": תכנון / היתרים / בנייה / הסתיים.
- CTA primary: "השאר פרטים — נעדכן בכל שלב חדש" → email capture.
- CTA secondary: "צור קשר עם המינהלת" → tel: + WhatsApp link.

### H2 — `מה זה אומר עבור הקהילה האתיופית-ישראלית`

פסקה אחת מ-`payload.community.context_he` + אזכור מספר משפחות מהקהילה (אם נתון אמין). מקור: ENP / מינהלת.

### H2 — `סטטוס הפרויקט`

טבלה: סוג ההתחדשות, יזם, מינהלת, תאריך התחלה, תאריך סיום צפוי. רנדור מ-`payload.renewal`.

### H2 — `ציר זמן`

לולאה על `payload.renewal.milestones`. רנדור visual + Schema `Event` אופציונלי (אם יש תאריך עתידי).

### H2 — `זכויות הדייר`

לולאה על `payload.renewal.rights_for_residents`. **חובה**: כל זכות עם link למקור חוקי (gov.il / kolzchut). Schema: `GovernmentService` עבור החוק שמסדיר את הזכות.

### H2 — `סיוע משפטי וקהילתי`

- מינהלת השכונה: שם, טל', שעות, כתובת.
- ארגוני קהילה: ENP, IAEJ, Tene Briut (אם רלוונטי).
- אנשי מקצוע מהקהילה: 3‑5 כרטיסים מ-`payload.professionals_in_area`.

### H2 — `דירות זמינות בסביבה`

Live render. אם `available_listings_count = 0` → CTA "השאר פרטים".

### H2 — `שאלות נפוצות`

לולאה על `payload.faqs` → FAQPage schema.

### H2 — `מקורות`

חובה. **שני מקורות מינימום** — אחד רשמי (gov.il / עירייה) ואחד קהילתי (ENP / kolzchut).

### Footer-of-content (E-E-A-T)

מחבר/ת + תאריך עדכון + "דווח על שינוי בסטטוס".

---

## 4. Internal linking

חובה:

- 1 link ל-pillar עיר: `/nadlan/{city.slug}`.
- 1 link לכל שכונה אחרת באותה עיר עם פרויקט פעיל (cross-link).
- 1 link → `/zchuyot/diur/tochnit-diur-yotzei-etiopiya`.
- 1 link → directory עו"ד: `/orech-din-yotzei-etiopiya/{city.slug}`.
- BreadcrumbList: `Home › התחדשות עירונית › {city_name_he} › {neighborhood.name_he}`.

---

## 5. Schema.org

ראה `schema-org.md`. Neighborhood-renewal כולל:

- `WebPage` + `mainEntity = Place` (השכונה)
- `BreadcrumbList`
- `GovernmentService` עבור הזכויות הסטטוטוריות
- `FAQPage` (אם ≥3 שאלות)
- `Event` (אופציונלי, פר-milestone עם תאריך עתידי)

---

## 6. QA gate

- [ ] `word_count >= 800` בעברית.
- [ ] H1 ייחודי.
- [ ] meta description 120‑160 תווים.
- [ ] **לפחות 2 מקורות רשמיים** (gov.il / עירייה / ועדה מקומית).
- [ ] טל' המינהלת מאומת (Researcher: שיחה אקראית פעם ברבעון).
- [ ] תאריכי milestones מאומתים מול גורם רשמי תוך 30 יום.
- [ ] hreflang — לפחות `he` ו-`x-default`. EN/AM רק אם תורגם אנושית.
- [ ] OG image קיים.
- [ ] FAQPage schema valid.
- [ ] AA accessibility (axe).

---

## 7. עדכון שוטף (לא pre-launch בלבד)

תאריכי בנייה משתנים. **חובה** Autopilot שבועי שמאתר שינויים:

- בודק את עמוד המינהלת (web fetch) → diff מול `payload.renewal.status`.
- אם diff → פותח issue ל-Researcher עם שינוי מוצע.
- DevOps: מנהל את ה-Autopilot (ראה TED-17, זרוע 5).

ללא autopilot → תוכן stale → CTR נופל → רנקינג נופל. זו תלות קריטית.

---

## 8. דוגמה: `ramat-eliyahu`

ראה `payload` בסעיף 1. הדף הזה הוא הראשון שיופק — Phase 3, סבב ראשון. לאחר ולידציה, להפיק עוד 4: `kiryat-moshe-rehovot`, `dora-netanya`, `neot-shaked-netanya`, `kiryat-nordau-netanya` (TED-16, סעיף 3.2).
