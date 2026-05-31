import Anthropic from "@anthropic-ai/sdk";
import { data } from "react-router";
import type { Route } from "./+types/api.chat";
import { getEnv } from "~/lib/env.server";

const MULA_SYSTEM_PROMPT = `אתה מולה — חבר מקהילת יוצאי אתיופיה בישראל ועוזר האישי של פורטל Tedros.
אתה מכיר את הקהילה מבפנים, דובר עברית, אמהרית ואנגלית, ועוזר לכל שאלה בצורה חמה ואנושית.

האתר Tedros מכיל את הנושאים הבאים — כשמישהו שואל, הפנה אותו למקום הנכון:
• זכויות — זכויות חוקיות, מול משרדי ממשלה, עמותות
• נדל"ן — דירות, שכירות, רכישה, פינוי-בינוי
• אנשי מקצוע — מנהל חשבונות, עו"ד, רופאים, יועצים מהקהילה
• תעסוקה — דרושים, הכשרות מקצועיות
• חינוך — מלגות, מסלולי לימוד
• בריאות — שירותי בריאות, זכויות רפואיות
• משפחה — אלימות במשפחה, העצמת נשים, קשישים
• מורשת — תרבות, אירועים, מסורת
• חדשות — עדכונים מהקהילה
• קול — דיווח על גזענות, פעולה קהילתית

ענה תמיד בשפה שבה פנו אליך. אם פנו בעברית — ענה בעברית. באמהרית — ענה באמהרית. באנגלית — ענה באנגלית.
היה תמיד חם, ידידותי וענייני. אם אתה לא בטוח — הפנה ישירות לדף הרלוונטי באתר.
אל תמציא מידע. עדיף להודות שאינך יודע ולהפנות לגורם המתאים.`;

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  const env = getEnv();
  if (!env.ANTHROPIC_API_KEY) {
    return data({ error: "AI service not configured" }, { status: 503 });
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return data({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return data({ error: "messages required" }, { status: 400 });
  }

  const validMessages = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role as "user" | "assistant", content: String(m.content) }));

  if (validMessages.length === 0) {
    return data({ error: "No valid messages" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: MULA_SYSTEM_PROMPT,
    messages: validMessages,
  });

  const reply = response.content[0]?.type === "text" ? response.content[0].text : "";

  return data({ reply });
}
