# Urban Renewal — 5 Priority Neighborhoods (Phase 3.2)

> **Owner**: Tedros Researcher · **Issue**: TED-20 · **Last verified**: 2026-04-27
> **Languages of sources**: HE (primary), EN (cross-reference). All quotes left in HE; EN gloss in parentheses where useful.
> **Handoff**: Tedros Engineer (UI + map), then Tedros Content & SEO (meta + slugs).

## Executive Summary

Five neighborhoods anchor Tedros' urban-renewal product surface, all with **active, government-backed pinui-binui (evacuation–reconstruction) plans** and a publicly-named מינהלת (administration) we can route community questions to:

| #   | Neighborhood (HE) | City             | Slug (proposed)         | Plan #                           | Scale (existing → new)                 | Administration                                              |
| --- | ----------------- | ---------------- | ----------------------- | -------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| 1   | קריית משה         | רחובות (Rehovot) | `kiryat-moshe-rehovot`  | תמ"ל/1086                        | ~1,400 → ~10,000 dwellings             | מינהלת התחדשות עירונית קריית משה (dedicated, neighborhood)  |
| 2   | רמת אליהו         | ראשון לציון      | `ramat-eliyahu-rishon`  | מתחם 1000 +                      | ~2,600 dwellings (pinui-binui)         | מנהלת פינוי בינוי רמת אליהו (dedicated) + עירייה            |
| 3   | רמת ידין (דורה)   | נתניה (Netanya)  | `ramat-yadin-netanya`   | first plan filed; 88→352 (pilot) | ~5,000+ ramping                        | מינהלת התחדשות עירונית חברתית (covers all 3 Netanya הוודות) |
| 4   | נאות שקד          | נתניה            | `neot-shaked-netanya`   | אאורה (Aura) approved            | 392 → 1,558 dwellings                  | (same as #3)                                                |
| 5   | קריית נורדאו      | נתניה            | `kiryat-nordau-netanya` | 408-0413930 + ש"י עגנון          | ~1,300 existing → ~5,000 + master plan | (same as #3)                                                |

All five appear on the **government urban-renewal layer at GovMap** (`govmap.gov.il/?lay=200720`) — useful for cross-checking polygon boundaries.

**Insight for Engineer**: Netanya's three neighborhoods share one administration and one contact channel — one shared "Contact" component is enough for the Netanya pages. Kiryat Moshe and Ramat Eliyahu each have their own administration and their own phone/email.

**Insight for Content & SEO**: All five are "סינדרלה" stories (post-1950s immigrant absorption neighborhoods → premium real-estate today). Frame copy around community continuity + transparent rights, not "investment opportunity".

---

## 1. קריית משה — רחובות (Kiryat Moshe, Rehovot)

### Status

- **Plan**: תמ"ל/1086 — approved comprehensive master plan; דו"ח סביבה available on רמ"י (land.gov.il).
- **Scale**: ~1,500 dunams in south-west Rehovot. Demolition of ~1,300–1,400 existing dwellings; construction of **~10,000–11,000** new dwellings (40 % on existing land, ~6,000 on supplementary state-allocated land), plus ~470,000 m² commerce/employment, ~120 dunams open space, 14-dunam transit terminal, and a new highway interchange (411/410).
- **Active sub-projects**:
  - **גבריאלוב 31–33** (developer: כוכב הנגב) — first building permit issued 2022; eviction notices delivered June 2024; 32 → 186 units + 1,000 m² retail + 560 m² public buildings.
  - **קול קורא של רמ"י** for additional pinui-binui projects in the neighborhood (tender 4000592651, extended to 2024-11-20).
  - First on-the-ground demolitions reported as a "historic milestone" for the largest pinui-binui project in Israel.
- **Phase**: Construction-permits and first demolitions phase.

### Administration

- **Name**: מינהלת התחדשות עירונית קריית משה רחובות
- **Head**: ד"ר אור גולדפרב (Dr. Or Goldfarb)
- **Address**: טוכמן 108, רחובות (Tuckman 108, Rehovot)
- **Phone**: 08-957-1881
- **Email**: `minhelet-km@rehovot.muni.il`
- **Facebook**: https://www.facebook.com/minhelet.km/
- **Municipality page**: https://www.rehovot.muni.il/495/

### Geographic boundary

- **Center (OSM, node 563961991)**: `31.8873081, 34.7869891`
- **Polygon**: ❌ No polygon currently in OpenStreetMap. Use the **תמ"ל/1086 plan boundary** (authoritative) — plan PDF: https://apps.land.gov.il/IturTabotData/takanonim/merkaz/4050546.pdf — or the GovMap urban-renewal layer (200720). Approximate bounding box for placeholder map (replace before launch):
  ```geojson
  [
    [
      34.7805,
      31.883
    ],
    [
      34.7935,
      31.883
    ],
    [
      34.7935,
      31.892
    ],
    [
      34.7805,
      31.892
    ],
    [
      34.7805,
      31.883
    ]
  ]
  ```

### Sources

- עיריית רחובות — תוכנית התחדשות קריית משה: https://www.rehovot.muni.il/495/
- עיריית רחובות — טקס הריסת שני הבניינים הראשונים: https://www.rehovot.muni.il/articles/item/6461/
- gov.il — קול קורא 4000592651: https://www.gov.il/he/pages/tender-4000592651
- רמ"י — תקנון תמ"ל/1086 PDF: https://apps.land.gov.il/IturTabotData/takanonim/merkaz/4050546.pdf
- Ynet — 10,000 דירות חדשות: https://www.ynet.co.il/articles/0,7340,L-5611883,00.html
- מרכז הנדל"ן — היסטוריה: בוצעה הריסה ראשונה: https://www.nadlancenter.co.il/article/10590
- מגדילים — היתר בנייה ראשון בקריית משה: https://magdilim.co.il/0211202259-2/
- בר לוי אדריכלים — מתאר התחדשות: https://www.brlv.co.il/he/תוכנית-מתאר-להתחדשות-עירונית-קרית-משה/

---

## 2. רמת אליהו — ראשון לציון (Ramat Eliyahu, Rishon LeZion)

### Status

- **Scale**: 633 dunams; ~5,397 dwellings in 9–30-story buildings; +55,000 m² employment; +12 dunams public space; +23 dunams open space. Total program budget ~₪20 billion — among the largest urban-renewal programs in Israel.
- **Active components**: pinui-binui (~2,600 units), תמ"א 38 strengthening (~19 buildings), and three new adjacent neighborhoods being readied (נחלת יהודה עליון, נרקיסים/נורית, מתחם 1000).
- **Milestone**: first families from the existing neighborhood **already moved into new replacement apartments (December 2023)** — the first such full transition in Israel.

### Administration (two layers)

- **Neighborhood-specific**: מנהלת פינוי-בינוי רמת אליהו
  - **Head**: דודו מנצור (Dudu Mantsour)
  - **Municipality page**: https://www.rishonlezion.muni.il/EvacuationAndConstruction/Pages/default.aspx
  - **Facebook**: https://www.facebook.com/p/מנהלת-פינוי-ובינוי-רמת-אליהו-עיריית-ראשון-לציון-100069241096745/
- **City-wide urban-renewal administration**: המינהלת להתחדשות עירונית — ראשל"צ
  - **Head**: אמיר סבהט (Amir Sabhat) — תושב העיר
  - **Address**: רוטשילד 7 (בית קנר), ראשון לציון
  - **Phone**: 03-9547087 / 03-9547641 / 03-9547185 · mobile 054-9678818
  - **Email**: `Rurban@rishonlezion.muni.il`
  - **Hours**: א׳ 14:00–16:00 · ג׳ 10:00–16:30 (בתיאום) · ה׳ 13:00–17:00
  - **Contact page**: https://www.urban-rlz.co.il/צור-קשר/
- **Engineering & planning** (file inquiries): כרמל 20, קומות 2–3 · 03-9547534
- **Recommended primary contact for community-facing route**: the city-wide email `Rurban@rishonlezion.muni.il` (single inbox, monitored).

### Geographic boundary

- **Center (OSM, node 278478056)**: `31.9823499, 34.7898073`
- **Polygon**: ❌ No polygon currently in OpenStreetMap (the OSM record is a node, plus a separate "Ramat Eliyahu Industrial Area" polygon — `way 286754913` — which should NOT be used as the residential boundary).
- Use the **gov.il urban-renewal page** (https://www.gov.il/he/pages/hanhala-5172) and the GovMap layer 200720 for the official planning polygon. Approximate bounding box for placeholder map (replace before launch):
  ```geojson
  [
    [
      34.782,
      31.978
    ],
    [
      34.796,
      31.978
    ],
    [
      34.796,
      31.987
    ],
    [
      34.782,
      31.987
    ],
    [
      34.782,
      31.978
    ]
  ]
  ```

### Sources

- עיריית ראשון לציון — מנהלת פינוי בינוי רמת אליהו: https://www.rishonlezion.muni.il/EvacuationAndConstruction/Pages/default.aspx
- עיריית ראשון לציון — התחדשות עירונית: https://www.rishonlezion.muni.il/Residents/Construction/UrbanRenewal/Pages/default.aspx
- gov.il — בינוי-פינוי-בינוי ברמת אליהו: https://www.gov.il/he/pages/hanhala-5172
- המינהלת להתחדשות עירונית ראשל"צ — צור קשר: https://www.urban-rlz.co.il/צור-קשר/
- אורבנולוגיה (TAU) — case study: https://urbanologia.tau.ac.il/urban-renewal-ramat-eliyahu/
- מגדילים — דיירים ראשונים נכנסים לדירותיהם החדשות: https://magdilim.co.il/201220231303/
- TheMarker — שכונת רמת אליהו (background): https://www.themarker.com/realestate/2023-02-10/ty-article-magazine/00000186-3531-d2f5-a5ce-bd73bfbe0000

---

## 3. רמת ידין / דורה — נתניה (Ramat Yadin / Dora, Netanya)

### Status

- **Background**: Established 1949 on a former British military camp; absorbed Yemenite, Moroccan and Iraqi olim. Long classified as a periphery neighborhood; now in a wholesale renewal cycle. Neighborhood is informally known as "דורה".
- **First filed plan**: 88 existing units → 352 new units in towers replacing אדרכלות "רכבת" (linear walk-up) buildings — first urban-renewal plan in the neighborhood, led by the municipality with national funding.
- **Reported pipeline**: ~450+ additional new units announced; Prashkovsky and others active in דורה מערב.
- **Phase**: First plan deposited; subsequent plans at varying stages from עקרונות → הפקדה.

### Administration

- **Name**: מינהלת התחדשות עירונית חברתית, עיריית נתניה
- **Scope**: covers **רמת ידין + נאות שקד + קריית נורדאו** (the three Tedros-priority Netanya neighborhoods) under one social-renewal administration, jointly with משרד הבינוי והשיכון and הרשות הממשלתית להתחדשות עירונית.
- **City-wide head (Urban Renewal Department)**: עו"ד הדס גבע-מדליה (Hadas Geva-Madalia) — מנהלת מחלקת התחדשות עירונית
- **Email**: `hit.ironit@netanya.muni.il`
- **Hotline**: 106 / 09-8604400 (24/7) · WhatsApp 052-6333106
- **Municipality page**: https://www.netanya.muni.il/CityHall/Engineering/UrbanRenewal/

### Geographic boundary

- **Center (OSM, node 2392639424)**: `32.2973883, 34.8570189`
- **Polygon (OSM, way 897967327)** — usable for first-pass map render:
  ```json
  [
    [34.8546711, 32.3024927],
    [34.862847, 32.3011729],
    [34.8588016, 32.2909429],
    [34.8585201, 32.2918301],
    [34.8581268, 32.2930698],
    [34.8570958, 32.2946675],
    [34.8561302, 32.293968],
    [34.8543524, 32.2941001],
    [34.8537193, 32.2933012],
    [34.8526484, 32.2931441],
    [34.8529525, 32.2949189],
    [34.8538085, 32.2992106],
    [34.8544749, 32.3026383],
    [34.8552905, 32.3026312],
    [34.8546711, 32.3024927]
  ]
  ```
  _Coordinates in `[lon, lat]` (GeoJSON convention)._

### Sources

- עיריית נתניה — שכונת רמת ידין (דורה): https://www.netanya.muni.il/City/NB/Neighborhoods/Pages/RamatYadin.aspx
- עיריית נתניה — התחדשות עירונית רמת ידין: https://www.netanya.muni.il/Residents/UNSRA/Pages/RamatYadin.aspx
- gov.il — נתניה שוברת שיאים בהתחדשות: https://www.gov.il/he/pages/spokesman-26062023-renewal
- מגדילים — שכונת דורה מצטרפת: https://magdilim.co.il/060620230849/
- מרכז הנדל"ן — 352 יח"ד במקום 88: https://www.nadlancenter.co.il/article/7774
- Mynet נתניה — מהפך בשכונה: https://netanya.mynet.co.il/real_estate/article/hj3qtrp3c
- Walla נדל"ן — מגדלים בני 40 קומות יחליפו רכבת: https://nadlan.walla.co.il/item/3777336

---

## 4. נאות שקד — נתניה (Neot Shaked, Netanya)

### Status

- **Background**: Established 1964; named "אזורים" after the developer; renamed 1977 for משה שקד (former mayor).
- **Largest active permit batch in Netanya**: עיריית נתניה approved building permits for **1,558 dwellings in 11 buildings up to 40 floors**, replacing **392 existing units**. Plus ~11,000 m² for retail / employment / public buildings. Permits issued **less than a year after plan approval** — אאורה (Aura) is the lead developer.
- **Phase**: Building-permit / pre-construction.

### Administration

- Same as Ramat Yadin (above) — מינהלת התחדשות עירונית חברתית, עיריית נתניה. Use the same contact channel.

### Geographic boundary

- **Center (OSM, node 2392639415)**: `32.2958474, 34.8505601`
- **Polygon (OSM, way 430591165)** — usable for first-pass map render:
  ```json
  [
    [34.8484846, 32.2935459],
    [34.8426336, 32.293684],
    [34.8396806, 32.2945202],
    [34.8411693, 32.298974],
    [34.8426712, 32.3015674],
    [34.8433767, 32.3010453],
    [34.8436894, 32.3008719],
    [34.8439897, 32.3007247],
    [34.8440477, 32.3007041],
    [34.8441431, 32.3006605],
    [34.8450084, 32.3004154],
    [34.8454878, 32.3002901],
    [34.8455702, 32.300323],
    [34.8485158, 32.2996387],
    [34.8533481, 32.2982848],
    [34.8523449, 32.2932061],
    [34.8487439, 32.2932687],
    [34.8485726, 32.2932717],
    [34.8485639, 32.2932987],
    [34.8484846, 32.2935459]
  ]
  ```
  _Coordinates in `[lon, lat]`. OSM tag includes `fixme: not accurate` — replace with planning-authority polygon before launch._

### Sources

- עיריית נתניה — שכונת נאות שקד (אזורים): https://www.netanya.muni.il/City/NB/Neighborhoods/Pages/NeotShaked.aspx
- עיריית נתניה — התחדשות נאות שקד: https://www.netanya.muni.il/Residents/UNSRA/Pages/NeotShaked.aspx
- מרכז הנדל"ן — היתרים לתוכנית הפינוי-בינוי הגדולה: https://www.nadlancenter.co.il/article/10621
- מגדילים — פוטנציאל ל-30,000 דירות בנתניה: https://magdilim.co.il/010520230902-2/
- Mynet נתניה — שלוש שכונות בפרויקט ארצי: https://netanya.mynet.co.il/local_news/article/m_432442

---

## 5. קריית נורדאו — נתניה (Kiryat Nordau, Netanya)

### Status

- **Background**: Founded April 1957 by "דיור לעולה" with 400 בטונדות (concrete shacks); renamed 1960s for מקס נורדאו. Long the city's weakest neighborhood; now Netanya's hottest urban-renewal market.
- **Master plan**: tabled urban-renewal master plan adds **~5,000 new dwellings** over time.
- **Active sub-plan 408-0413930**: deposited — demolish 256 existing units, build **973 new units** (717 marketable).
- **ש"י עגנון plan**: phase A construction 2023 → 2026; phase B (remaining units) 2025 → 2028.
- **Reported aggregated pipeline**: ~872+ new units in pinui-binui across additional sub-plans, including a ₪1.75B program for ~1,000 units.
- **Phase**: Active construction (multiple sub-plans).

### Administration

- Same as Ramat Yadin (above) — מינהלת התחדשות עירונית חברתית, עיריית נתניה. Use the same contact channel.

### Geographic boundary

- **Center (OSM, node 1671800962)**: `32.2839532, 34.8561016`
- **Polygon (OSM, way 139424122)** — usable for first-pass map render:
  ```json
  [
    [34.8498411, 32.2786185],
    [34.8502741, 32.2781667],
    [34.8503792, 32.278057],
    [34.8520411, 32.2792135],
    [34.8562094, 32.2781213],
    [34.8589989, 32.2867836],
    [34.8556236, 32.2875568],
    [34.8547932, 32.2875001],
    [34.8542031, 32.2869378],
    [34.8518857, 32.2855319],
    [34.8507707, 32.2851942],
    [34.8505982, 32.2851419],
    [34.8464032, 32.2826294],
    [34.8487529, 32.2797994],
    [34.8498411, 32.2786185]
  ]
  ```
  _Coordinates in `[lon, lat]`. Cross-check against plan 408-0413930 nispach: https://apps.land.gov.il/IturTabotData/nispachim/merkaz/4052354/1_1.pdf_

### Sources

- עיריית נתניה — שכונת קריית נורדאו: https://www.netanya.muni.il/City/NB/Neighborhoods/Pages/KiryatNordau.aspx
- עיריית נתניה — התחדשות קריית נורדאו: https://www.netanya.muni.il/Residents/UNSRA/Pages/KiryatNordau.aspx
- עיריית נתניה — מתאר נורדאו: https://www.netanya.muni.il/CityHall/Engineering/UrbanRenewal/Pages/mitarnordo.aspx
- רמ"י — נספח תכנית 408-0413930: https://apps.land.gov.il/IturTabotData/nispachim/merkaz/4052354/1_1.pdf
- מרכז הנדל"ן — הסינדרלה מנתניה: https://www.nadlancenter.co.il/article/7080
- מגדילים — אלף דירות, ₪1.75 מיליארד: https://magdilim.co.il/080120251346-2/
- Mynet נתניה — 872 דירות חדשות: https://netanya.mynet.co.il/real_estate/article/hyp7v00lzj
- Bizportal — סיפורה של קריית נורדאו: https://www.bizportal.co.il/realestates/news/article/822262

---

## Cross-cutting findings

### Shared resources

- **GovMap urban-renewal layer**: https://www.govmap.gov.il/?lay=200720 — ground-truth for all five planning polygons (and more). Layer ID `200720`.
- **רמ"י תכניות (land tenders / plans)** lookup: https://apps.land.gov.il/IturTabotData/ — search by תמ"ל / 408 plan number.
- **הרשות הממשלתית להתחדשות עירונית** (Government Authority for Urban Renewal): https://www.gov.il/he/Departments/government_authority_for_urban_renewal — official funding body for all five.
- **דו"ח התחדשות עירונית 2022 (April 2023)** — national reference data: https://www.gov.il/BlobFolder/reports/urban_renewal_report_2022/he/hithadshut_ironit_documents_urban_renewal_report_2022.pdf

### Polygon source recommendation (for Engineer)

1. **First pass**: use the OSM polygons embedded above for the three Netanya neighborhoods. They are good enough for an interactive map outline.
2. **Before launch**: replace all five with **GovMap layer 200720** boundaries OR the official תמ"ל/408 plan polygons from `apps.land.gov.il`. These are the legally-authoritative planning areas and will match what residents see on the official portal.
3. **Kiryat Moshe + Ramat Eliyahu** must be replaced — only approximate bounding boxes are provided here.

### Recommendations for Engineer (UI + map)

- **Map library**: stick with **MapLibre** per ADR-001 v3 — Mapbox costs money. Free alternatives: vector tiles via [MapTiler free tier](https://www.maptiler.com/cloud/) or self-hosted [protomaps](https://protomaps.com/).
- **Marker / popup content**: pull from this doc — name (HE/EN/AM), 1-line status, "מינהלת" name + email/phone, "פתח דף שכונה" CTA.
- **For the three Netanya pages**: render the same "Contact the Netanya Urban Renewal Administration" block (single email + hotline). Don't duplicate the data per page — extract a `NetanyaContactCard` component.
- **For Kiryat Moshe + Ramat Eliyahu**: each page gets its own contact block (different administrations, different phones).

### Recommendations for Content & SEO

- **Slugs (HE-friendly transliteration)**: as proposed in the table above. All in lowercase, hyphens, no diacritics.
- **`og:title` template**: `התחדשות עירונית בשכונת {neighborhood} ({city}) — מינהלת, פרויקטים, איש קשר`
- **`description` template (≤155 chars HE)**: `סטטוס פינוי-בינוי בשכונת {neighborhood}, {city}: {N} יח"ד חדשות, מינהלת אחת, איש קשר אחד. נקודת המידע של הקהילה האתיופית.`
- **JSON-LD**: combine `Place` (with `geo` polygon centroid) + `GovernmentService` for the מינהלת. The "areaServed" field can use the GeoJSON polygon directly.
- **EN/AM mirrors**: keep the מינהלת contact details bilingual; phone numbers + email do not translate, but role titles and addresses must.

### Open questions / next research

1. **Authoritative polygons** — needs DevOps or Engineer to either ingest the GovMap layer 200720 (GeoJSON export possible via WFS) or download the תמ"ל/408 nispach PDFs and trace polygons manually.
2. **Ethiopian-Israeli population estimate per neighborhood** — CBS does not publish at neighborhood granularity, but local school registration / מתנ"ס data may exist (e.g., מתנ"ס רמת אליהו at אבא הלל סילבר 2). Worth a follow-up research issue if community personalisation is needed for the lead form.
3. **Bilingual signage / language access in each מינהלת** — none of the five public pages explicitly offer EN/AM. Worth flagging on a community-impact brief.

---

## Verification log

| Date       | What was verified                                                           | Source type                       |
| ---------- | --------------------------------------------------------------------------- | --------------------------------- |
| 2026-04-27 | All five neighborhoods have an active מינהלת + named lead + contact channel | Municipality + ynet + מגדילים     |
| 2026-04-27 | Plan numbers (תמ"ל/1086 + 408-0413930) traced to apps.land.gov.il PDFs      | רמ"י primary docs                 |
| 2026-04-27 | OSM polygons fetched via Overpass for the three Netanya neighborhoods       | OpenStreetMap (ODbL)              |
| 2026-04-27 | Center coordinates for all five fetched via Overpass `place` nodes          | OpenStreetMap (ODbL)              |
| 2026-04-27 | Netanya social UR administration covers all three Netanya neighborhoods     | netanya.muni.il search results    |
| 2026-04-27 | רמת אליהו first families moved into new buildings (December 2023)           | מגדילים, oltimer.co.il references |

**Owner of next handoff**: this document is ready for **Tedros Engineer** to consume for the `/{lang}/urban-renewal` map and per-neighborhood pages. Polygon refresh task should be picked up by Engineer or DevOps before launch (see "Open questions" above).
