# Schema.org — Per Content Type Reference

> מדריך הטמעה לכל schema.org type שאנחנו דורשים ב-routes של Phase 3 ומעלה. **Owner**: Content & SEO (specs) + Engineer (implementation בכל route).
> כל ה-snippets ב-JSON-LD (`<script type="application/ld+json">`) ב-SSR. מומלץ helper משותף ב-`app/lib/seo/jsonld.ts` עם פונקציות פר-type.
> **Validator**: `https://validator.schema.org/` ו-`https://search.google.com/test/rich-results` — חובה ירוק לפני merge.

---

## 0. עקרונות כלליים

1. **כל דף = JSON-LD אחד מבונה כ-`@graph`** — לא לפצל למספר tags. מאפשר reuse של `@id` בין types.
2. **`@id` קנוני** — `https://tedros.org.il/he/...#entityName`. ה-`@id` משמש להפנות בין types (לדוגמה: `RealEstateListing.address` מצביע ל-`Place.@id`).
3. **שפה** — `inLanguage` חובה (`he-IL` / `en` / `am`). אם הדף RTL/LTR נקבע אוטומטית ע"י `<html dir>` ב-RR7 root (ראה ADR-008 הצפוי).
4. **תאריכים** — ISO 8601 בלבד. `dateModified` חייב להתעדכן בכל commit לתוכן.
5. **תמונות** — מינימום 1200×630 ל-`image`/`og:image`. R2 URL ישיר עם content hash.
6. **Authoritative source** — `sameAs` אם יש לישות מקבילה ב-Wikipedia/Wikidata (יוסיף E-E-A-T).
7. **noindex pages** — לא לטמון schema מלא (רק `WebPage` בסיסי). חוסך crawl budget.

---

## 1. RealEstateListing

**מתי**: `/listings/{city}/{type}/{slug}` — דף נכס בודד (Phase 3, סעיף 3.3).
**מקור נתונים**: `listings`, `listing_translations`, `listing_media`, `cities`, `neighborhoods`.

### דוגמה (sale)

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      "@id": "https://tedros.org.il/he/listings/netanya/sale/dirat-3-chadarim-dora#listing",
      "name": "דירת 3 חדרים שמורה בדורה, נתניה",
      "description": "דירת 3 חדרים, קומה 2 מתוך 4, מרפסת שמש, חניה. 80 מ\"ר. שכונה עם נוכחות קהילתית.",
      "url": "https://tedros.org.il/he/listings/netanya/sale/dirat-3-chadarim-dora",
      "image": [
        "https://r2.tedros.org.il/listings/abc123/main.jpg",
        "https://r2.tedros.org.il/listings/abc123/floor.jpg",
      ],
      "datePosted": "2026-04-25T08:00:00+03:00",
      "validThrough": "2026-07-25T23:59:59+03:00",
      "inLanguage": "he-IL",
      "offers": {
        "@type": "Offer",
        "price": "1850000",
        "priceCurrency": "ILS",
        "availability": "https://schema.org/InStock",
        "businessFunction": "https://purl.org/goodrelations/v1#Sell",
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "נתניה",
        "addressRegion": "מחוז המרכז",
        "addressCountry": "IL",
        "streetAddress": "רחוב X 12, שכונת דורה",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 32.3215, "longitude": 34.853 },
      "numberOfRooms": 3,
      "floorSize": { "@type": "QuantitativeValue", "value": 80, "unitCode": "MTK" },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "קומה", "value": "2 מתוך 4" },
        { "@type": "PropertyValue", "name": "חניה", "value": "כן" },
        { "@type": "PropertyValue", "name": "סוג עסקה", "value": "מכירה" },
      ],
      "broker": {
        "@type": "RealEstateAgent",
        "@id": "https://tedros.org.il/agencies/{agency-slug}#agent",
      },
    },
  ],
}
```

### Variants לפי `listing_type`

| `listing_type`  | שינוי עיקרי                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `sale`          | `businessFunction = Sell`, `availability = InStock`                                                    |
| `rent`          | `businessFunction = LeaseOut`, `Offer.priceSpecification = UnitPriceSpecification` עם `unitCode=MON`   |
| `urban_renewal` | להוסיף `RealEstateListing.subjectOf = GovernmentService` של תוכנית ההתחדשות; `availability = PreOrder` |
| `investment`    | `additionalType = "https://schema.org/SingleFamilyResidence"`; `Offer.eligibleCustomerType = Investor` |
| `gov_program`   | להוסיף `subjectOf = GovernmentService`; `eligibilityToWorkRequirement` (אם רלוונטי)                    |
| `commercial`    | `additionalType = "https://schema.org/Store"` או דומה — לדון פר-מקרה                                   |

### Validation

- `price` חובה > 0 — אחרת `noindex` הדף עד מילוי.
- `image` חובה ≥1 — listings ללא תמונה לא נכנסות לאינדקס.
- `address.addressCountry = "IL"` תמיד.

---

## 2. GovernmentService

**מתי**:

- דף זכות סטטוטורית (תוכנית הדיור, מחיר למשתכן, דיור ציבורי).
- דף שכונה × התחדשות עירונית (הזכויות החוקיות של דיירים בפינוי-בינוי).

**מקור נתונים**: `rights` schema (קיים) + `programmatic_pages.payload`.

### דוגמה: תוכנית הדיור ליוצאי אתיופיה

```jsonc
{
  "@context": "https://schema.org",
  "@type": "GovernmentService",
  "@id": "https://tedros.org.il/he/zchuyot/diur/tochnit-diur-yotzei-etiopiya#service",
  "name": "תוכנית הדיור ליוצאי אתיופיה",
  "description": "תוכנית סיוע ייעודית של משרד הבינוי והשיכון: הגרלת זכאות, סבסוד, וליווי לרכישת דירה ראשונה.",
  "url": "https://tedros.org.il/he/zchuyot/diur/tochnit-diur-yotzei-etiopiya",
  "inLanguage": "he-IL",
  "serviceType": "Housing assistance",
  "audience": {
    "@type": "Audience",
    "audienceType": "Israeli citizens of Ethiopian origin",
    "geographicArea": { "@type": "Country", "name": "Israel" },
  },
  "provider": {
    "@type": "GovernmentOrganization",
    "name": "משרד הבינוי והשיכון",
    "url": "https://www.gov.il/he/departments/ministry_of_construction_and_housing",
    "sameAs": "https://www.wikidata.org/wiki/Q3296935",
  },
  "areaServed": { "@type": "Country", "name": "Israel" },
  "isBasedOn": [
    {
      "@type": "Legislation",
      "name": "החלטת ממשלה 1107",
      "url": "https://www.gov.il/he/departments/policies/dec1107_2016",
    },
  ],
  "termsOfService": "https://www.gov.il/...",
  "potentialAction": {
    "@type": "ApplyAction",
    "target": "https://www.gov.il/he/service/...",
    "name": "הגש בקשה",
  },
}
```

### חובות

- `provider` תמיד `GovernmentOrganization` רשמי (אל תכתוב "ממשלת ישראל" כ-`name` כללי — להצביע על המשרד הרלוונטי).
- `isBasedOn` חובה — Legislation או DecisionalDocument עם URL.
- `audience.audienceType` בעברית מותר אם זהו הטקסט הקנוני של ה-policy.

---

## 3. Article

**מתי**: pillar pages עריכתיים (זכויות, ביתא ישראל, סיגד) + cluster posts (Phase 4+).
**לא להשתמש**: ב-pillar עיר (זה לא מאמר חדשותי — ראה `pillar-city.md` סעיף 5).

**מקור נתונים**: `articles`, `article_translations`, `users` (author).

### דוגמה: pillar "ביתא ישראל"

```jsonc
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://tedros.org.il/he/beta-israel#article",
  "headline": "ביתא ישראל — היסטוריה, מורשת, וקהילה היום",
  "alternativeHeadline": "Beta Israel — History and Community Today",
  "description": "סיפור הקהילה היהודית-אתיופית מנקודת מבט פנימית: שורשים, עליות, וחיים בישראל ב-2026.",
  "image": "https://r2.tedros.org.il/articles/beta-israel/cover.jpg",
  "url": "https://tedros.org.il/he/beta-israel",
  "datePublished": "2026-04-15T09:00:00+03:00",
  "dateModified": "2026-04-27T10:00:00+03:00",
  "inLanguage": "he-IL",
  "author": {
    "@type": "Person",
    "@id": "https://tedros.org.il/team/{author-slug}#person",
    "name": "שם המחבר",
    "url": "https://tedros.org.il/team/{author-slug}",
    "jobTitle": "Content Lead",
    "sameAs": ["https://www.linkedin.com/in/..."],
  },
  "publisher": {
    "@type": "Organization",
    "name": "Tedros",
    "url": "https://tedros.org.il",
    "logo": {
      "@type": "ImageObject",
      "url": "https://r2.tedros.org.il/brand/logo-512.png",
    },
  },
  "mainEntityOfPage": "https://tedros.org.il/he/beta-israel",
  "articleSection": "תרבות ומורשת",
  "wordCount": 1450,
  "citation": [
    {
      "@type": "CreativeWork",
      "name": "CBS — אוכלוסיית יוצאי אתיופיה",
      "url": "https://www.cbs.gov.il/...",
    },
  ],
}
```

### חובות

- `author.@id` לא string — `Person` מובנה עם `sameAs` (LinkedIn) → E-E-A-T.
- `dateModified` ≥ `datePublished` תמיד.
- `wordCount` תואם ל-`article_translations.word_count` ב-DB (sanity check ב-CI).
- `citation` ≥1 לכל מאמר עובדתי.

---

## 4. FAQPage

**מתי**: כל דף שמכיל ≥3 שאלות (pillar עיר, neighborhood, pillar זכויות, calculator).
**אזהרה**: Google בודק שה-FAQs **מופיעים visually בדף**. אם רק ב-schema → spam violation.

### דוגמה

```jsonc
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://tedros.org.il/he/nadlan/netanya#faq",
  "inLanguage": "he-IL",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "האם יוצאי אתיופיה זכאים להטבות נוספות במחיר למשתכן בנתניה?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "כן. תוכנית הדיור ליוצאי אתיופיה (החלטה 1107) מאפשרת הגרלה ייעודית עם תנאים משופרים...",
      },
    },
    {
      "@type": "Question",
      "name": "כמה משפחות יוצאות אתיופיה גרות בנתניה?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "לפי הערכות 2024 של ENP, כ-7,500 איש מהקהילה מתגוררים בנתניה, בעיקר בשכונות דורה, נאות שקד וקרית נורדאו.",
      },
    },
  ],
}
```

### חובות

- `Question.name` חייב להופיע מילה-במילה ב-DOM הגלוי.
- `Answer.text` יכול להיות מקוצר ביחס לטקסט הויזואלי, אבל לא להפך.
- מינימום 3 שאלות. מקסימום 10 — מעבר לזה Google מתעלם.

---

## 5. BreadcrumbList

**מתי**: **כל דף** למעט homepage. חובה.

### דוגמה

```jsonc
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://tedros.org.il/he/hitchadshut-ironit/ramat-eliyahu#breadcrumbs",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "דף הבית",
      "item": "https://tedros.org.il/he",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "התחדשות עירונית",
      "item": "https://tedros.org.il/he/hitchadshut-ironit",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "ראשון לציון",
      "item": "https://tedros.org.il/he/nadlan/rishon-letzion",
    },
    { "@type": "ListItem", "position": 4, "name": "רמת אליהו" },
  ],
}
```

הפריט האחרון **בלי `item`** (זה הדף הנוכחי).

---

## 6. Place / GeoCoordinates (תוספת)

**מתי**: דפי שכונה + dataable cities (כתוספת ל-Article/WebPage, לא standalone).

```jsonc
{
  "@type": "Place",
  "@id": "https://tedros.org.il/he/hitchadshut-ironit/ramat-eliyahu#place",
  "name": "רמת אליהו",
  "containedInPlace": {
    "@type": "City",
    "name": "ראשון לציון",
    "@id": "https://www.wikidata.org/wiki/Q189169",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 31.961, "longitude": 34.776 },
  "additionalType": "https://schema.org/Neighborhood",
}
```

---

## 7. Person (Professional)

**מתי**: profile cards + directory pages (Phase 3, ליסטינג מקצוענים, סעיף 3.4 של TED-17).
**מקור**: `professionals` schema (קיים).

```jsonc
{
  "@type": "Person",
  "@id": "https://tedros.org.il/he/yoetz-mashkanta/netanya/{slug}#person",
  "name": "שם איש המקצוע",
  "jobTitle": "יועץ משכנתאות",
  "knowsLanguage": ["he", "am", "en"],
  "areaServed": { "@type": "City", "name": "נתניה" },
  "memberOf": { "@type": "Organization", "name": "ENP", "url": "https://enp.org.il" },
  "sameAs": ["https://www.linkedin.com/in/..."],
  "url": "https://tedros.org.il/he/yoetz-mashkanta/netanya/{slug}",
  "image": "https://r2.tedros.org.il/professionals/{id}/avatar.jpg",
}
```

### חובות

- `knowsLanguage` קריטי — זה ה-USP של directory הקהילה (דובר אמהרית).
- אם ה-professional לא אישר profile public → אין schema (privacy).

---

## 8. WebPage (default wrapper)

עוטף **כל דף**. שאר ה-types נכנסים תחת `mainEntity` או `about`.

```jsonc
{
  "@type": "WebPage",
  "@id": "https://tedros.org.il/he/nadlan/netanya#webpage",
  "url": "https://tedros.org.il/he/nadlan/netanya",
  "name": "נדל\"ן ליוצאי אתיופיה בנתניה",
  "inLanguage": "he-IL",
  "isPartOf": { "@type": "WebSite", "@id": "https://tedros.org.il/#website" },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://r2.tedros.org.il/og/pillar-city/netanya.png",
  },
  "datePublished": "2026-04-27T09:00:00+03:00",
  "dateModified": "2026-04-27T09:00:00+03:00",
  "breadcrumb": { "@id": "https://tedros.org.il/he/nadlan/netanya#breadcrumbs" },
  "mainEntity": { "@id": "https://tedros.org.il/he/nadlan/netanya#place" },
}
```

---

## 9. Mapping per route (Phase 3)

| Route                                      | Schema graph                                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `/he`                                      | `WebSite` + `Organization` + `SearchAction` (sitelinks searchbox)                              |
| `/he/listings/{city}/sale`                 | `WebPage` + `BreadcrumbList` + `ItemList` of `RealEstateListing`                               |
| `/he/listings/{city}/{type}/{slug}`        | `WebPage` + `BreadcrumbList` + `RealEstateListing` (mainEntity)                                |
| `/he/nadlan/{city}` (pillar עיר)           | `WebPage` + `BreadcrumbList` + `Place` + `FAQPage` (אם ≥3 שאלות)                               |
| `/he/hitchadshut-ironit/{neighborhood}`    | `WebPage` + `BreadcrumbList` + `Place` + `GovernmentService` + `FAQPage`                       |
| `/he/zchuyot/diur/{slug}` (pillar זכות)    | `WebPage` + `BreadcrumbList` + `Article` + `GovernmentService` + `FAQPage`                     |
| `/he/calculator/mashkanta-yotzei-etiopiya` | `WebPage` + `BreadcrumbList` + `WebApplication` (calculator) + `GovernmentService` (subjectOf) |
| `/he/yoetz-mashkanta/{city}`               | `WebPage` + `BreadcrumbList` + `ItemList` of `Person`                                          |
| `/he/yoetz-mashkanta/{city}/{slug}`        | `WebPage` + `BreadcrumbList` + `Person` (mainEntity)                                           |
| `/he/{article}` (Phase 4 cluster posts)    | `WebPage` + `BreadcrumbList` + `Article` + `FAQPage` (אופציונלי)                               |

---

## 10. Engineer hooks (where to wire)

> זה קלט עבור Engineer (TED-17 + TED-16). ההצעה — לא binding על implementation.

- **Helper module**: `app/lib/seo/jsonld.ts` עם פונקציות:
  - `webPage({ url, name, inLanguage, ... })`
  - `breadcrumbs(items: Array<{ name, item? }>)`
  - `realEstateListing(listing, city, neighborhood, media)`
  - `governmentService(right)`
  - `article(article, author, translation)`
  - `faqPage(faqs)`
  - `place(neighborhood)`
  - `person(professional)`
  - `graph(...nodes)` → עוטף ב-`@context` + `@graph`
- **Route integration**: בכל `route.tsx`, ב-loader: להחזיר `jsonLd` נפרד מ-data ולהשתמש ב-`<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />` ב-component (HTML escape כבר ב-React, אבל לחתוך `</`).
- **Tests**: 1 unit test פר-helper על snapshot של JSON-LD valid + 1 e2e (Playwright) שמושך את הדף ובודק `application/ld+json` קיים.
- **CI gate**: action שרץ `https://validator.schema.org/` API על דוגמת URLs מ-staging — fail אם errors.

---

## 11. אזהרות (Common pitfalls)

- **Duplicate `@id`** בין דפים → Google מאחד אותם. תמיד hash-fragment ייחודי פר-דף.
- **`hasFunction` במקום `businessFunction`** — שגיאת copy-paste נפוצה. רק `businessFunction` עובד ל-Offer ב-real estate.
- **שכחת `priceCurrency`** — ה-`Offer` נדחה ב-Rich Results Test. תמיד `ILS`.
- **מספר `Article` schemas בדף אחד** — Google בוחר את הראשון. תמיד אחד.
- **FAQ schema על דפי category/listing** — נגד Google guidelines (Mar 2024 update). FAQ רק על דפים שבאמת FAQ-style.
- **תאריכי `dateModified` שמופעלים בכל request** — Google מאבד אמון. עדכן רק כשהתוכן באמת השתנה (db trigger או build-time).

---

## 12. Sources

- schema.org official: https://schema.org/
- Google Search Central — Structured Data: https://developers.google.com/search/docs/appearance/structured-data
- Google FAQPage policy update (2024): https://developers.google.com/search/blog/2023/08/howto-faq-changes
- ADR-005 (SEO Architecture, צפוי) ו-ADR-002 (Data Model) — קישורים יתווספו עם הוצאת ה-ADRs.
