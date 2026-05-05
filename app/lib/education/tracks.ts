// Education tracks — top-level study-path taxonomy (RIN-507 / Phase 5 Wave 2).
// Each track aggregates scholarships (from Wave 1) + programs (from RIN-424)
// by tag/level. V1 ships 3 tracks with real content; Hebrew Ulpan + English
// are deferred to Wave 2b until we have non-thin content for them.

import type { Translatable } from "../db/columns";
import type { ScholarshipLevel } from "./categories";
import type { ProgramTrack } from "../programs/categories";

export type EducationTrackSlug = "academic" | "vocational" | "career-shift";

export const EDUCATION_TRACKS: EducationTrackSlug[] = [
  "academic",
  "vocational",
  "career-shift",
];

const TRACK_GLYPH: Record<EducationTrackSlug, string> = {
  academic: "🎓",
  vocational: "🛠️",
  "career-shift": "🔄",
};

export function glyphForEducationTrack(track: EducationTrackSlug): string {
  return TRACK_GLYPH[track];
}

export interface EducationTrack {
  slug: EducationTrackSlug;
  name: Translatable;
  shortDescription: Translatable;
  /** ~250-word intro rendered above the aggregated lists. */
  intro: Record<"he" | "en" | "am", string>;
  /** Scholarship levels included in this track. */
  scholarshipLevels: ScholarshipLevel[];
  /** Program tracks included from /programs (RIN-424). */
  programTracks: ProgramTrack[];
  /** Optional tag overlay — only items whose `tags` intersect this list pass. */
  scholarshipTagsAny?: string[];
}

export const EDUCATION_TRACK_DEFINITIONS: EducationTrack[] = [
  {
    slug: "academic",
    name: { he: "אקדמי", en: "Academic", am: "አካዳሚክ" },
    shortDescription: {
      he: "תארים ראשונים, שניים ושלישיים — ממכינה ועד דוקטורט.",
      en: "Bachelor's, master's and doctoral degrees — from pre-academic prep to PhD.",
      am: "የመጀመሪያ፣ የሁለተኛና የዶክትሬት ዲግሪዎች — ከቅድመ-አካዳሚክ እስከ ዶክትሬት።",
    },
    intro: {
      he: "המסלול האקדמי מרכז את כל הדרכים להשכלה גבוהה — תכניות מכינה לפני התואר, תארים ראשונים ושניים, ודוקטורטים. כולל מלגות שכר לימוד, סטיפנדיות מחיה, וליווי אקדמי. עם פערים מצטברים בקהילה (כיום ~13% מבוגרי הקהילה הם בעלי תואר אקדמי לעומת ~30% באוכלוסייה הכללית), המסלול הזה הוא נקודת המוצא הקריטית לבני קהילה שרואים בעצמם אקדמאים.",
      en: "The academic track aggregates the higher-education pathway — pre-academic prep programs, undergraduate and graduate degrees, and PhDs. Includes tuition scholarships, living stipends, and academic mentorship. With persistent gaps in the community (~13% of community adults hold an academic degree vs. ~30% in the general population), this track is a critical starting point for community members pursuing academic careers.",
      am: "የአካዳሚክ መንገድ ሁሉንም የከፍተኛ ትምህርት መንገዶች ያሰባስባል — ቅድመ-አካዳሚክ ዝግጅቶች፣ የመጀመሪያና የሁለተኛ ዲግሪዎች፣ ዶክትሬቶች። የትምህርት ክፍያ ድጋፎች፣ የኑሮ ድጋፎችና የአካዳሚክ ምክር ያካትታል። በማህበረሰቡ ውስጥ (\\~13% የማህበረሰብ አዋቂዎች አካዳሚክ ዲግሪ ሲኖራቸው በአጠቃላይ ህዝብ ግን \\~30%) በመኖሩ፣ ይህ መንገድ ለአካዳሚክ ስራ ለሚፈልጉ ወሳኝ መነሻ ነው።",
    },
    scholarshipLevels: ["pre-academic", "undergrad", "masters", "phd"],
    programTracks: ["education"],
  },
  {
    slug: "vocational",
    name: { he: "מקצועי", en: "Vocational", am: "ሙያዊ" },
    shortDescription: {
      he: "תעודות מקצוע, סמכויות, וליווי הסבה תוך-מקצועית.",
      en: "Professional certifications, licenses, and in-profession development support.",
      am: "የሙያ ሰርተፊኬቶች፣ ፈቃዶችና በሙያ ውስጥ ድጋፍ።",
    },
    intro: {
      he: 'המסלול המקצועי מכיל תכניות שאינן דורשות תואר אקדמי — תעודות מקצוע (אחות, רואה חשבון, סוכן נדל"ן), סמכויות, וליווי הכשרה. למספר משמעותי של בני קהילה זהו מסלול עם החזר מהיר יותר על ההשקעה לעומת המסלול האקדמי, ולעיתים שכר נצבר מקביל. כולל מלגות מחיה לתקופת ההכשרה.',
      en: "The vocational track contains programs that don't require an academic degree — professional certifications (nursing, accounting, real estate), licenses, and training mentorship. For many community members, this is a faster ROI pathway than the academic track, often with concurrent earnings. Includes living stipends during training.",
      am: "የሙያ መንገድ የአካዳሚክ ዲግሪ የማይፈልጉ ፕሮግራሞችን ያካትታል — የሙያ ሰርተፊኬቶች (ነርሲንግ፣ አካውንቲንግ፣ ሪል እስቴት)፣ ፈቃዶች፣ የሥልጠና ምክር። ለብዙ የማህበረሰብ አባላት ከአካዳሚክ መንገድ የበለጠ ፈጣን ROI ነው።",
    },
    scholarshipLevels: ["vocational"],
    programTracks: ["career"],
    scholarshipTagsAny: ["vocational", "tech", "career-shift"],
  },
  {
    slug: "career-shift",
    name: {
      he: "הסבה מקצועית",
      en: "Career Shift",
      am: "የስራ ሽግግር",
    },
    shortDescription: {
      he: "מסלולי הסבה למבוגרים — bootcamps, חזרה לתעסוקה, ושינוי תחום.",
      en: "Career-change pathways for adults — bootcamps, return-to-work, and field-switch programs.",
      am: "ለአዋቂዎች የስራ ለውጥ መንገዶች — ቡት ካምፖች፣ ወደ ሥራ መመለስና የመስክ መለወጫ ፕሮግራሞች።",
    },
    intro: {
      he: "המסלול הזה מתמקד באנשים בני 25–50 שמחפשים שינוי מקצועי משמעותי — מי שיצא מאוניברסיטה לתחום אחד ורוצה לעבור לתעסוקת hi-tech, או מי שעזב את שוק העבודה ורוצה לחזור. כולל bootcamps אינטנסיביים (Tech-Career, Net4U), תכניות הכנה ל-MBA (עולים ביחד), וליווי השמה מותאם.",
      en: "This track targets people aged 25–50 seeking significant career change — graduates of one field looking to enter hi-tech, or those who left the workforce and want to return. Includes intensive bootcamps (Tech-Career, Net4U), MBA preparation programs (Olim Beyahad), and tailored placement support.",
      am: "ይህ መንገድ የስራ ለውጥ ለሚፈልጉ የ25–50 ዓመት ሰዎችን ያተኮራል — ከአንድ ዘርፍ የመጡ ወደ hi-tech የሚሄዱ ወይም የሥራ ኃይሉን ለቅቀው የሚመለሱ። ኢንተንሲቭ ቡት ካምፖችን፣ MBA ዝግጅቶችን እና የተበጀ ምደባ ድጋፍን ያካትታል።",
    },
    scholarshipLevels: ["vocational"],
    programTracks: ["career"],
    scholarshipTagsAny: ["career-shift", "tech"],
  },
];

export function getEducationTrack(slug: string): EducationTrack | undefined {
  return EDUCATION_TRACK_DEFINITIONS.find((t) => t.slug === slug);
}
