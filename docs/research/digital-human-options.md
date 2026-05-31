# Digital Human Options — Real-Time Avatar Chatbot

**תאריך:** 2026-05-12
**חוקר:** Tedros Researcher
**בקשה:** השוואת פתרונות ליצירת Digital Human מסרטון של אדם אמיתי — לצ'אטבוט AI בזמן אמת עם Claude API

---

## Executive Summary

שוק ה-Digital Human APIs בשלב בגרות בשנת 2026. קיימות שתי קטגוריות עיקריות:

1. **SaaS מנוהל** (D-ID, HeyGen LiveAvatar, Tavus CVI, Simli) — קל לאינטגרציה, WebRTC מובנה, תמיכה ב-React SDK, אך עלות חודשית ריאלית של $50–200+ לשימוש קהילתי בינוני.
2. **Open-Source Self-Hosted** (LiveTalking/MuseTalk, Wav2Lip, SadTalker) — עלות אפס בתוכנה, אך דורש GPU RTX 3080Ti ומעלה, התקנה מורכבת, latency גבוה יחסית.

**המלצה ראשית לפרויקט קהילתי בתקציב נמוך:** Simli.ai — 50 דקות חינם בחודש + pay-as-you-go, React SDK קיים, latency <300ms, תמיכה ב-clone של פנים אמיתיות. לחלופין: HeyGen LiveAvatar אם נדרשת איכות גבוהה יותר עם סרטון מלא של האדם.

---

## Findings

### 1. D-ID Streaming API

| פרמטר | פרטים |
|--------|--------|
| **Free Tier** | ניסיון 14 יום — 20 קרדיטים = 3 דקות וידאו / 10 דקות streaming |
| **עלות** | Lite: $5.90/חודש (10 דקות), Plus: ~$16/חודש, Pro: ~$48/חודש; מחיר API ריאלי: $5.90/דקה streaming |
| **Latency** | תוצאות סותרות: מסמכים מציינים sub-200ms, ביקורות עצמאיות מדווחות על 3–5 שניות בפועל |
| **WebRTC** | כן — WebRTC מובנה, HTTP/2 + gRPC בתשתית Azure |
| **העלאת וידאו של אדם** | כן — ניתן להעלות תמונה או סרטון של אדם ספציפי |
| **React SDK** | JavaScript/Node.js SDK קיים; אין חבילת React רשמית נפרדת אך integration ישיר אפשרי |
| **עבודה בדפדפן** | כן — ללא plugin |
| **הערות** | דיווחים על חוסר שקיפות מחיר בתשלום בפועל; ביקורת ניטרלית: ממשק טוב לא-טכניים |

**מקור:** [D-ID API Pricing](https://www.d-id.com/pricing/api/), [D-ID Review 2026 — HeyFish](https://heyfish.ai/d-id-review)

---

### 2. Simli.ai

| פרמטר | פרטים |
|--------|--------|
| **Free Tier** | $10 קרדיטים בהרשמה + 50 דקות בחודש |
| **עלות** | Pay-as-you-go עם volume discounts; לא פורסם מחיר מדויק לדקה |
| **Latency** | <300ms (Speech-to-Video בלבד) — בפועל עם LLM + TTS: ~1–2 שניות end-to-end |
| **WebRTC** | כן |
| **העלאת וידאו של אדם** | "Clone your face" — העלאת תמונת פנים ויצירת אווטאר; לא ברור אם מלא-גוף |
| **React SDK** | קיים SDK ל-JavaScript/React (ראה docs.simli.com) |
| **עבודה בדפדפן** | כן |
| **ארכיטקטורה** | 3D neural architecture מבוסס Gaussian splatting — לא וידאו-lip-sync אלא אנימציה תלת-ממדית |
| **הערות** | הנמוכה בעלות ביחס לאיכות; architecture חדשני יותר מהמתחרים |

**מקור:** [Simli.com](https://www.simli.com/), [Simli — AI Agent Store](https://aiagentstore.ai/ai-agent/simli)

---

### 3. HeyGen LiveAvatar API

| פרמטר | פרטים |
|--------|--------|
| **Free Tier** | אין מאז פברואר 2026 — חייב לרכוש קרדיטים |
| **עלות** | $19 = 150 LA Credits; 1 LA Credit = 30 שניות streaming (Full mode) או 60 שניות (Lite mode). עלות אפקטיבית: ~$3.80/דקה Full, ~$1.90/דקה Lite |
| **Latency** | <300ms audio; מוצגת כ"fastest on market" |
| **WebRTC** | כן — WebRTC + LiveKit |
| **העלאת וידאו של אדם** | כן — דרישות ברורות: סרטון מינימום 2 דקות רצוף, 1080p, 3 sections: Listening/Talking/Idling |
| **React SDK** | React Native demo רשמי + Pipecat integration; SDK ל-JS |
| **עבודה בדפדפן** | כן |
| **הערות** | הממשק הטוב ביותר לשימוש בסרטון אמיתי של אדם; דורש הכנת סרטון מסודרת |

**מקור:** [HeyGen LiveAvatar Help](https://help.heygen.com/en/articles/12758516-introducing-liveavatar), [LiveAvatar Custom Creation Guide](https://help.heygen.com/en/articles/9612935-liveavatar-custom-liveavatar-creation-guide), [HeyGen API Pricing](https://www.heygen.com/api-pricing)

---

### 4. Tavus CVI

| פרמטר | פרטים |
|--------|--------|
| **Free Tier** | 25 דקות conversational video + 5 דקות video generation |
| **עלות** | Starter: $59/חודש (כולל 3 custom replicas); Growth: $397/חודש; Enterprise: custom |
| **Latency** | ~500–600ms end-to-end (מוצג בהשוואת מתחרים של Tavus עצמם) |
| **WebRTC** | כן — מבוסס על Daily.co |
| **העלאת וידאו של אדם** | כן — סרטון של 2 דקות ליצירת replica; ב-Free tier: stock replicas בלבד |
| **React SDK** | React components + iframe + Daily SDK |
| **עבודה בדפדפן** | כן |
| **הערות** | Tavus בנו stack שלם: Phoenix-3 (lip sync), Raven-0 (body language perception), Sparrow-0 (turn-taking). מודל הפרייסינג יקר לשימוש קהילתי עם אנשים אמיתיים (custom replica = $59+) |

**מקור:** [Tavus CVI Docs](https://docs.tavus.io/sections/conversational-video-interface/overview-cvi), [Tavus Pricing](https://www.tavus.io/pricing), [Tavus Cost Comparison](https://www.tavus.io/post/conversational-video-ai-cost-comparison)

---

### 5. פתרונות Open-Source Self-Hosted

#### 5a. LiveTalking (lipku/LiveTalking — GitHub)

הפתרון הכי מלא ל-self-hosted real-time digital human עם WebRTC.

| פרמטר | פרטים |
|--------|--------|
| **מודלים נתמכים** | MuseTalk, Wav2Lip256, ERNeRF, Ultralight-Digital-Human |
| **GPU מינימלי** | RTX 3060 (לWav2Lip256); RTX 3080Ti (לMuseTalk) |
| **VRAM** | לא מצוין במדויק — VRAM לא גדל עם concurrent streams (efficient) |
| **FPS** | Wav2Lip256 על 3060: 60fps; MuseTalk על 3080Ti: 42fps; 4090: 72fps |
| **WebRTC** | כן — דפדפן בכתובת `http://serverip:8010/webrtcapi.html` |
| **העלאת וידאו של אדם** | חלקי — idle video loop (אדם שקט) תמיכה; avatar ספציפי דורש הכנה |
| **Latency** | לא מצוין; תלוי GPU + מודל; בפועל ~500ms–2s |
| **עלות** | $0 תוכנה; עלות שרת GPU בענן: $1–5/שעה (Vast.ai, RunPod) |
| **מורכבות התקנה** | Python 3.10, CUDA 12.4, PyTorch 2.5.0; Docker option קיים |

**מקור:** [LiveTalking GitHub](https://github.com/lipku/LiveTalking), [LiveTalking Docs](https://livetalking-doc.readthedocs.io/en/latest/usage.html)

#### 5b. MuseTalk (TMElyralab — Tencent Music)

| פרמטר | פרטים |
|--------|--------|
| **יכולת** | Real-time lip sync בזמן אמת; 30fps+ על V100/3090 |
| **VRAM** | מינימום ~8GB VRAM (V100 16GB לביצועים טובים) |
| **Real-time** | כן — latent diffusion-based, לא GAN |
| **Browser** | לא ישיר — צריך wrapper כמו LiveTalking |
| **איכות** | "noticeably sharper" ממודלי GAN כמו Wav2Lip |

**מקור:** [MuseTalk GitHub](https://github.com/TMElyralab/MuseTalk), [MuseTalk ArXiv](https://arxiv.org/html/2410.10122v2)

#### 5c. SadTalker / LivePortrait / Wav2Lip

| מודל | Real-Time? | איכות | הערות |
|------|-----------|-------|-------|
| **Wav2Lip** | לא | בינונית | blurry mouth; sync מדויק; GPU סביר |
| **SadTalker** | לא | טובה | full-face animation ממצלמה אחת; איטי |
| **LivePortrait** | חלקי | מצוינת | identity retention טוב; 8GB VRAM |
| **LatentSync** | מהיר | טובה | diffusion-based |

**מקור:** [Open Source Lip Sync 2026 — lipsync.com](https://lipsync.com/blog/open-source-lip-sync), [Pixazo 8 Best Open Source](https://www.pixazo.ai/blog/best-open-source-lip-sync-models)

#### 5d. daVinci-MagiHuman (Sand.ai, 2026)

| פרמטר | פרטים |
|--------|--------|
| **גודל מודל** | 15B parameters |
| **מהירות** | 2 שניות על H100 GPU אחד |
| **רישיון** | Apache 2.0 (open source) |
| **הערות** | הכי חדשני ב-2026; עדיין לא real-time בדיוק אבל מגמה ברורה |

**מקור:** [WaveSpeed Blog — daVinci-MagiHuman](https://wavespeed.ai/blog/posts/davinci-magihuman-open-source-digital-human-lip-sync-2026/)

---

## Comparison Table

| פתרון | Free Tier | עלות חודשית ריאלית | Latency (E2E) | אדם אמיתי מסרטון | React SDK | Browser | מורכבות |
|-------|-----------|-------------------|---------------|------------------|-----------|---------|---------|
| **D-ID Streaming** | 14 יום / 10 דקות | ~$48–200+ | 3–5 שניות (בפועל) | כן (תמונה/קליפ) | JS SDK | כן | נמוכה |
| **Simli.ai** | 50 דק'/חודש | Pay-as-you-go | <300ms (STV) / ~1–2s E2E | clone פנים | כן (React) | כן | נמוכה |
| **HeyGen LiveAvatar** | אין (מפברואר 2026) | ~$30–80 לשימוש קהילתי | <300ms | כן (סרטון מלא) | JS/React Native | כן | נמוכה–בינונית |
| **Tavus CVI** | 25 דקות/חודש | $59/חודש+ לcustom | ~500–600ms | $59+ לreplica | React components | כן | נמוכה |
| **LiveTalking (OSS)** | חינם | $0 תוכנה + GPU | ~500ms–2s | חלקי (idle loop) | לא | WebRTC | גבוהה |
| **MuseTalk standalone** | חינם | $0 + GPU | ~200–500ms | לא ישיר | לא | לא | גבוהה מאד |

---

## Recommendations

### לפרויקט קהילתי — תקציב נמוך + איכות גבוהה

**מקום ראשון: Simli.ai**
- 50 דקות חינם בחודש — מספיק לשימוש קהילתי מוגבל
- React SDK מלא
- ארכיטקטורה 3D Gaussian Splatting — לא תלוי בוידאו קיים, אבל clone מפנים עובד
- Pay-as-you-go — לא מחויב מנוי יקר
- Limitation: לא ידוע אם ניתן להעלות סרטון מלא של גוף

**מקום שני: HeyGen LiveAvatar (Lite mode)**
- המתאים ביותר לשימוש עם סרטון אמיתי של אדם (2 דקות = replica מלאה)
- Lite mode עולה ~$1.90/דקה = 50 דקות = ~$95/חודש — סביר לפרויקט קהילתי
- React/JS SDK קיים
- Limitation: אין free tier בכלל מ-2026

**מקום שלישי (עתיד): LiveTalking Self-Hosted**
- אם קיים שרת GPU (RTX 3080Ti ומעלה) — עלות $0
- WebRTC לדפדפן
- Limitation: מורכבות התקנה, CUDA dependencies, לא trivial לproduction

### גישת Idle Loop + Lip Sync

**גישה מעשית לחיסכון בעלות:**
1. מצלמים סרטון 30–60 שניות של האדם (idle — לא מדבר, מחייך, מהנהן)
2. הסרטון מתנגן בלופ כשהמשתמש מקליד
3. כשהתשובה מ-Claude מגיעה → מזינים לHeyGen LiveAvatar / Simli רק את קטע הדיבור
4. חוסכים קרדיטים של streaming ב-idle time

HeyGen תומך מפורשות ב-"Idling section" בסרטון ה-replica — זאת בדיוק הגישה המומלצת.

### Integration עם Claude API (Architecture מומלצת)

```
[User text input]
       ↓
[Claude API → תשובה טקסט]
       ↓
[TTS (ElevenLabs / Azure Speech)]
       ↓
[Digital Human API (Simli / HeyGen) ← audio stream]
       ↓
[WebRTC → Browser video stream]
```

ה-latency הכולל: ~1–3 שניות end-to-end (LLM: ~500ms, TTS: ~300ms, Avatar: ~300ms).

---

## Sources

- [D-ID API Pricing](https://www.d-id.com/pricing/api/)
- [D-ID Review 2026 — HeyFish](https://heyfish.ai/d-id-review)
- [D-ID Talks Streams Overview — Docs](https://docs.d-id.com/reference/talks-streams-overview)
- [Simli.com Official](https://www.simli.com/)
- [Simli — How Cost-Efficient Inference Works](https://verda.com/blog/how-simli-achieved-cost-efficient-real-time-inference-for-interactive-ai)
- [HeyGen LiveAvatar Introduction](https://help.heygen.com/en/articles/12758516-introducing-liveavatar)
- [HeyGen LiveAvatar Custom Creation Guide](https://help.heygen.com/en/articles/9612935-liveavatar-custom-liveavatar-creation-guide)
- [HeyGen API Pricing](https://www.heygen.com/api-pricing)
- [Tavus CVI Overview](https://docs.tavus.io/sections/conversational-video-interface/overview-cvi)
- [Tavus Pricing](https://www.tavus.io/pricing)
- [Tavus Cost Comparison](https://www.tavus.io/post/conversational-video-ai-cost-comparison)
- [LiveTalking GitHub](https://github.com/lipku/LiveTalking)
- [LiveTalking Documentation](https://livetalking-doc.readthedocs.io/en/latest/usage.html)
- [MuseTalk GitHub](https://github.com/TMElyralab/MuseTalk)
- [MuseTalk ArXiv Paper](https://arxiv.org/html/2410.10122v2)
- [5 Best Open Source Lip Sync Tools 2026 — lipsync.com](https://lipsync.com/blog/open-source-lip-sync)
- [8 Best Open Source Lip Sync Models — Pixazo](https://www.pixazo.ai/blog/best-open-source-lip-sync-models)
- [daVinci-MagiHuman 2026 — WaveSpeed](https://wavespeed.ai/blog/posts/davinci-magihuman-open-source-digital-human-lip-sync-2026/)
- [AI Avatar Pricing Guide 2026 — Percify](https://percify.io/blog/ai-avatar-pricing-guide-2026-what-every-tool-actually-costs)
- [HeyGen Streaming API React Native Demo](https://github.com/agmmnn/streaming-api-react-native)

---

_Next: @Tedros PM — לשקול האם להוסיף Digital Human כ-TED issue חדש ולהגדיר scope (prototype vs production)._
