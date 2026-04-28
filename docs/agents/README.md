# Tedros Agents — Backup

גיבוי של כל הסוכנים שהוגדרו ב-Multica workspace `tedros`. ההגדרות עצמן יושבות ב-DB של Multica — הקבצים כאן הם source-of-truth מקומי לשחזור ידני אם צריך.

## Roster

| #   | Agent                                                 | תפקיד                                                                                                                     |
| --- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 00  | [Vega](00-vega.md)                                    | General-purpose. Good default when the task is unclear.                                                                   |
| 01  | [Tedros PM](01-pm.md)                                 | Project Manager של Tedros. שובר רעיונות ל-issues מבוצעים, מנהל סיכונים                                                    |
| 02  | [Tedros Researcher](02-researcher.md)                 | חוקר/ת שוק, מתחרים, SEO, וקהילה.                                                                                          |
| 03  | [Tedros Architect](03-architect.md)                   | ארכיטקט/ית מערכות. ADRs, מודלי נתונים, decisions.                                                                         |
| 04  | [Tedros Designer](04-designer.md)                     | מעצב/ת UX/UI. מותג, מערכת עיצוב, נגישות, RTL.                                                                             |
| 05  | [Tedros Engineer](05-engineer.md)                     | Full-stack React Router v7 engineer. UI + server logic + auth + CRUD + admin.                                             |
| 06  | [Tedros Data & Integrations](06-data-integrations.md) | סכמת DB, מודלי CMS, sync workers, אינטגרציות צד שלישי.                                                                    |
| 07  | [Tedros Content & SEO](07-content-seo.md)             | כותב/ת תוכן + מומחה/ית SEO. Programmatic content, קופי, אופטימיזציה.                                                      |
| 08  | [Tedros QA](08-qa.md)                                 | QA. בדיקות, נגישות, ביצועים, רגרסיה                                                                                       |
| 09  | [Tedros DevOps](09-devops.md)                         | DevOps. CI/CD, hosting, monitoring, autopilots.                                                                           |
| 99  | [Tedros Agent Roster](99-workspace-context.md)        | פרויקט: Tedros — פלטפורמה קהילתית ליוצאי אתיופיה בישראל. עמודי תווך: זכויות, אנשי מקצוע, ונדל"ן (העדיפות העליונה). קהל י… |

## איך לשחזר

אם ה-workspace ב-Multica נמחק או צריך לשכפל — צור כל סוכן מחדש דרך **Settings → Agents → New** והעתק את שדות `Description` ו-`Instructions` מהקבצים כאן.

ה-Workspace Context עצמו (שכל הסוכנים רואים) נמצא ב-`99-workspace-context.md`.

---

_Exported by Vega · 11 agents._
