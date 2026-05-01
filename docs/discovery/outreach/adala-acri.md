# Outreach Drafts — Adala Center + ACRI (substitute path for Tebeka)

**Status**: DRAFT — substitute path for Tebeka per ADR-011 Amendment 1.
**From**: Or Hazan (orosh87@gmail.com)
**Subject**: ייעוץ אדריכלי — תהליך דיווח גזענות והתנהלות משטרתית בפלטפורמת טדרוס
**Coverage**: Two parallel emails — one to Adala (Arab-Israeli rights org with strong police-conduct track record), one to ACRI (האגודה לזכויות האזרח). Send both same week.

---

## Context (for owner — read before sending)

ADR-011 Amendment 1 added a substitute-path option for Phase 8 (Voice) — when Tebeka is silent, the gate becomes "co-design validated by Adala OR ACRI on report-flow architecture (anonymization, routing, retention, advisor flow)".

**Critical constraint:** Voice (Phase 8) is the only pillar where I (Researcher/Architect) recommend **NOT** softening the security gate even with the substitute path. The substitute is for **co-design**, not for **case routing**. Case routing must still flow to Tebeka or to user-of-choice — not to Adala/ACRI by default. Reason: Tebeka has the only Ethiopian-Israeli community-trust footprint on police-conduct work; Adala/ACRI provide architectural review, not lived-community placement.

This means the email asks for **architectural review** specifically, not for case routing.

---

## Email A — Adala Center (طبيب)

**To**: info@adalah.org (verify on website)
**Alt channels**: LinkedIn — director, head of police-conduct unit

### Email body (Hebrew)

> שלום רב,
>
> שמי אור חזן. אני בונה פלטפורמה דיגיטלית בשם **טדרוס** — פורטל קהילתי לקהילה האתיופית-ישראלית, תלת-לשוני (עברית/אנגלית/אמהרית). אחד מ-10 עמודי התווך הוא **קול ופעולה** — תהליך מובנה לדיווח על גזענות מערכתית והתנהלות משטרתית כלפי בני הקהילה.
>
> זה החלק הרגיש ביותר בפלטפורמה. **אני לא בונה אותו לבד.** Tebeka הוא הפרטנר הראשי לעיצוב הזרם הזה (יש להם 1,000+ פניות בשנה, ניסיון מוכח בעבודה משטרתית). אבל לא רוצה לחכות 60 יום על מענה — אני מחפש **co-designer שני** עם ניסיון אדריכלי בתהליכי דיווח על אכיפה.
>
> Adala הוא הארגון הישראלי עם הניסיון העמוק ביותר בעיצוב תהליכי דיווח/ליטיגציה אסטרטגית בנושאי משטרה ושוויון. אם תוכלו לעבור על האדריכלות שלנו — אנונימיזציה, ניתוב למח"ש מול הצנעת זהות, שימור מידע, זרם ייעוץ למתלוננים — אני אאמץ את ההערות באופן ישיר.
>
> ספציפית, ההצעה:
>
> 1. **review של תרשים זרם** (יישלח לפני הפגישה) — 90 דק' של architect שלכם, אסינכרוני
> 2. **פגישה אחת של 60 דק'** לדיון בהמלצות (online, פתוחה לכל מי שתרצו לצרף)
> 3. **אזכור Adala כיועצים אדריכליים** ב-disclaimer של עמוד ה-Voice (לא co-author, לא קרדיט מטעה — רק "with architectural input from Adala")
>
> אין בקשה לקבלת case-routing — Tebeka או ארגון לפי בחירת המתלונן ימשיכו להיות נקודות הקצה. אין בקשת בלעדיות. אין משאבים נוספים מצדכם מעבר ל-2.5 שעות סך-הכל.
>
> אני ער לכך ש-Adala עובדת בעיקר עם הקהילה הערבית, ולא רוצה להיתפס כ"קונה" את שמכם. אם זה לא מתאים לכם, אבין לחלוטין. אני מחפש אנשים שיש להם dna מקצועי על תהליכי דיווח רגישים — אתם הראשונים בישראל ברשימה הזאת.
>
> אשמח לפגישה ראשונית של 30 דקות לבחון.
>
> תודה,
> אור חזן
> orosh87@gmail.com
> [Tedros · GitHub project link]

---

## Email B — ACRI (האגודה לזכויות האזרח)

**To**: mail@acri.org.il
**Alt channels**: LinkedIn — head of equality program

### Email body (Hebrew)

> שלום רב,
>
> שמי אור חזן. אני בונה פלטפורמה דיגיטלית בשם **טדרוס** — פורטל קהילתי לקהילה האתיופית-ישראלית, תלת-לשוני (עברית/אנגלית/אמהרית). העמוד הרגיש ביותר הוא **קול ופעולה** — תהליך דיווח מובנה על גזענות מוסדית והתנהלות משטרתית כלפי בני הקהילה.
>
> Tebeka הוא הפרטנר הראשי לעיצוב הזרם, אבל אני מחפש **review אדריכלי שני** — וב-ACRI יש את הניסיון הרוחבי בעבודה מול אכיפה ישראלית: דו"חות 7302 (התנהלות מח"ש), עתירות בנושא ייצוג הולם, סקירות מדיניות.
>
> ההצעה (זהה ל-Adala — אני שולח לשני הארגונים במקביל):
>
> 1. **review של תרשים זרם** (יישלח אסינכרוני) — 90 דק' של architect/legal-ops שלכם
> 2. **פגישה אחת של 60 דק'** לדיון בהמלצות
> 3. **אזכור ACRI ב-disclaimer של ה-Voice** — לא co-author, רק "with architectural input"
>
> ספציפית מעניין אותי:
>
> - **אנונימיזציה** — איך לעצב כך שהמידע הקריטי לתחקיר נשמר אבל ה-PII של המתלונן לא דליף
> - **ניתוב** — מתי להעביר ל-מח"ש, מתי להשאיר דיווח אצל הארגון, מתי לדחות בלי-לפעול לבקשת המתלונן
> - **שימור מידע** — מה להחזיק, לכמה זמן, מי ניגש
> - **זרם ייעוץ** — איך מציעים מסלולי המשך (משפטי, רפואי, תמיכה) בלי להיות פטרנליסטיים
>
> זמן כולל מצדכם: ~2.5 שעות. אין בקשת case-routing, אין בלעדיות. אם לא מתאים לכם או רוחב יד מצומצם, אבין לחלוטין.
>
> תודה,
> אור חזן
> orosh87@gmail.com
> [Tedros · GitHub project link]

---

## Notes for the owner before sending

- **Send both same week.** Adala and ACRI work in adjacent but non-competing space — there's no conflict in approaching both. Whichever responds first becomes the architectural reviewer; the other is a fallback.
- **The framing is "architectural input only"** — not case routing, not anchor relationship. Keep this consistent in any reply. Drift to "anchor partner" framing would step on Tebeka's space and complicate the relationship.
- **English versions not needed** for these specifically — both orgs operate primarily in Hebrew.
- If both respond positively, you can have **either** of them do the review. No need for two separate reviews — one well-done architectural review is enough.
- **If Tebeka engages later (e.g., week 4), update the disclaimer** on the Voice page to credit Tebeka as co-designer + Adala/ACRI as architectural input. Both relationships compound, don't compete.
- Expected response window: 2–4 weeks (NGO baseline).

## Follow-up template (if no response after 14 days)

> שלום,
>
> תזכורת קצרה לפנייה על review אדריכלי לזרם דיווח גזענות בטדרוס. הצעד הזה לא חסום על תגובה שלכם — אבל אם זה משהו שאפשר לעשות, אשמח לראות איך מתאמים. אם לא רלוונטי, מספיק שתאמרו.
>
> תודה,
> אור
