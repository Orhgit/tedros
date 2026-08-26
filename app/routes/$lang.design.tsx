import { useState, type ReactNode } from "react";
import type { Route } from "./+types/$lang.design";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  DataTable,
  Dialog,
  DialogFooter,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Label,
  LangSwitcher,
  NavMenu,
  Pagination,
  Radio,
  Select,
  Separator,
  Sheet,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toast,
  ToastViewport,
  Tooltip,
} from "~/components/ui";
import {
  Hero,
  LeadForm,
  ListingCard,
  ProfileTemplate,
  SiteFooter,
  SiteHeader,
} from "~/components/sections";
import { ArticleTemplate } from "~/components/sections/article-template";
import { useEffect } from "react";
import { useRef } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  return { locale };
}

export const meta: Route.MetaFunction = () => [
  { title: "Tedros — Design System Playground" },
  { name: "robots", content: "noindex" },
];

export default function DesignPlayground({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PlaygroundHeader locale={locale} dark={dark} setDark={setDark} />

      <main id="main-content" className="container-default space-y-16 py-10">
        <Section id="brand" title="1 · Brand">
          <BrandShowcase />
        </Section>

        <Section id="palette" title="2 · Color tokens">
          <Palette />
        </Section>

        <Section id="typography" title="3 · Typography (HE / EN / AM)">
          <Typography />
        </Section>

        <Section id="buttons" title="4 · Button">
          <ButtonShowcase />
        </Section>

        <Section id="badges" title="5 · Badge">
          <BadgeShowcase />
        </Section>

        <Section id="alerts" title="6 · Alert">
          <AlertShowcase />
        </Section>

        <Section id="inputs" title="7 · Input · Textarea · Select · Combobox">
          <InputsShowcase />
        </Section>

        <Section id="form" title="8 · Form composition">
          <FormShowcase />
        </Section>

        <Section id="checkbox" title="9 · Checkbox · Radio · Switch">
          <ChoicesShowcase />
        </Section>

        <Section id="card" title="10 · Card">
          <CardShowcase />
        </Section>

        <Section id="tabs" title="11 · Tabs">
          <TabsShowcase />
        </Section>

        <Section id="tooltip" title="12 · Tooltip">
          <TooltipShowcase />
        </Section>

        <Section id="dialog" title="13 · Dialog · Sheet">
          <OverlayShowcase />
        </Section>

        <Section id="avatar" title="14 · Avatar">
          <AvatarShowcase />
        </Section>

        <Section id="breadcrumb" title="15 · Breadcrumb">
          <BreadcrumbShowcase locale={locale} />
        </Section>

        <Section id="nav" title="16 · NavMenu · LangSwitcher">
          <NavShowcase locale={locale} />
        </Section>

        <Section id="pagination" title="17 · Pagination">
          <PaginationShowcase />
        </Section>

        <Section id="table" title="18 · Table · DataTable">
          <TableShowcase />
        </Section>

        <Section id="skeleton" title="19 · Skeleton · Separator">
          <SkeletonShowcase />
        </Section>

        <Section id="toast" title="20 · Toast">
          <ToastShowcase />
        </Section>

        <Section id="icons" title="21 · Icons (RTL flip-aware)">
          <IconShowcase />
        </Section>

        <Section id="header" title="22 · Page template — SiteHeader">
          <SiteHeader locale={locale} currentPath={`/${locale}/listings`} />
        </Section>

        <Section id="hero" title="23 · Page template — Hero">
          <Hero locale={locale} />
        </Section>

        <Section id="listing" title="24 · Page template — Listing card grid">
          <ListingShowcase />
        </Section>

        <Section id="article" title="25 · Page template — Article">
          <ArticleShowcase />
        </Section>

        <Section id="profile" title="26 · Page template — Profile">
          <ProfileShowcase />
        </Section>

        <Section id="lead" title="27 · Page template — Lead / Contact form">
          <div className="container-narrow">
            <LeadForm topic="listing" topicLabel="דירת 4 חדרים, נתניה — דורה" />
          </div>
        </Section>

        <Section id="footer" title="28 · Page template — SiteFooter">
          <SiteFooter locale={locale} />
        </Section>
      </main>
    </div>
  );
}

// ── Header ─────────────────────────────────────────────────────────────

function PlaygroundHeader({
  locale,
  dark,
  setDark,
}: {
  locale: Locale;
  dark: boolean;
  setDark: (v: boolean) => void;
}) {
  const hrefForLocale = (next: Locale) => `/${next}/design`;
  return (
    <header
      role="banner"
      className="sticky top-0 z-(--z-sticky) border-b border-border bg-background/85 backdrop-blur-md"
    >
      <a href="#brand" className="sr-skip">
        דלג לתוכן
      </a>
      <div className="container-default flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span aria-hidden className="size-2.5 rounded-full bg-primary" />
          <p className="font-display text-lg font-bold">Tedros — Design System</p>
          <Badge variant="primary">v0.1</Badge>
        </div>
        <div className="flex items-center gap-3">
          <LangSwitcher current={locale} hrefFor={hrefForLocale} />
          <label className="inline-flex items-center gap-2 text-sm">
            <Switch
              aria-label="Dark mode"
              checked={dark}
              onChange={(e) => setDark(e.currentTarget.checked)}
            />
            <span className="hidden sm:inline">Dark</span>
          </label>
        </div>
      </div>
    </header>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-h`} id={id} className="scroll-mt-20">
      <h2
        id={`${id}-h`}
        className="mb-6 border-b border-border pb-2 text-2xl font-bold tracking-tight"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

// ── Brand ──────────────────────────────────────────────────────────────

function BrandShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Motto</CardTitle>
          <CardDescription>HE / EN / AM</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg" lang="he" dir="rtl">
            טדרוס — מהמקום שלך, אל המקום שלך.
          </p>
          <p className="text-lg" lang="en" dir="ltr">
            Tedros — From where you are, to where you belong.
          </p>
          <p className="font-ethiopic text-lg" lang="am">
            ቴድሮስ — ካለህበት ወደ መልክህ።
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Flag stripe (cultural moments only)</CardTitle>
          <CardDescription>
            10–20% of section width, never as primary background.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flag-stripe h-2 w-full rounded-full" />
          <div className="flag-stripe h-2 w-2/3 rounded-full" />
          <div className="flag-stripe h-2 w-1/3 rounded-full" />
        </CardContent>
      </Card>
    </div>
  );
}

// ── Palette ────────────────────────────────────────────────────────────

function Palette() {
  const earth = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];
  const ink = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
  const accents: Array<[string, string]> = [
    ["accent-green", "Ethiopian green / success"],
    ["accent-red", "Ethiopian red / destructive"],
    ["accent-yellow", "Ethiopian yellow / highlight"],
    ["accent-sigd", "Sigd ceremonial"],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Earth (brand)
        </h3>
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
          {earth.map((s) => (
            <Swatch key={s} name={`earth-${s}`} className={`bg-earth-${s}`} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Ink (text)
        </h3>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {ink.map((s) => (
            <Swatch key={s} name={`ink-${s}`} className={`bg-ink-${s}`} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Accents
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {accents.map(([name, desc]) => (
            <div key={name} className="overflow-hidden rounded-md border border-border">
              <div className={`h-16 bg-${name}`} />
              <div className="p-3 text-xs">
                <p className="font-mono">{name}</p>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border">
      <div className={`${className} h-12`} />
      <p className="text-2xs bg-card px-1 py-1 text-center font-mono text-muted-foreground">
        {name}
      </p>
    </div>
  );
}

// ── Typography ─────────────────────────────────────────────────────────

function Typography() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Hebrew (RTL)</CardTitle>
          <CardDescription>Heebo · LH 1.6</CardDescription>
        </CardHeader>
        <CardContent lang="he" dir="rtl" className="space-y-2">
          <p className="text-5xl font-bold">טדרוס</p>
          <p className="text-2xl font-semibold">פלטפורמה לקהילה</p>
          <p className="text-base leading-relaxed">
            תוכן בעברית, אנגלית ואמהרית. זכויות שאפשר לדרוש, נכס שאפשר לרכוש, איש מקצוע
            שאפשר לסמוך עליו.
          </p>
          <p className="text-xs text-muted-foreground">font-sans · weight 400/500/700</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>English (LTR)</CardTitle>
          <CardDescription>Inter · LH 1.5</CardDescription>
        </CardHeader>
        <CardContent lang="en" dir="ltr" className="space-y-2">
          <p className="text-5xl font-bold">Tedros</p>
          <p className="text-2xl font-semibold">A community platform</p>
          <p className="text-base leading-relaxed">
            Content in Hebrew, English, and Amharic. Rights you can claim, property you
            can buy, professionals you can trust.
          </p>
          <p className="text-xs text-muted-foreground">font-sans · weight 400/500/700</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{"Amharic (LTR, Ge'ez)"}</CardTitle>
          <CardDescription>Noto Sans Ethiopic · LH 1.7</CardDescription>
        </CardHeader>
        <CardContent lang="am" className="space-y-2 font-ethiopic">
          <p className="text-5xl font-bold">ቴድሮስ</p>
          <p className="text-2xl font-semibold">ለማህበረሰብ መድረክ</p>
          <p className="text-base leading-relaxed">
            ይዘት በዕብራይስጥ፣ በእንግሊዝኛ እና በአማርኛ። መብቶች መጠየቅ ትችላላችሁ፣ ንብረት መግዛት ትችላላችሁ፣ ባለሙያዎችን
            ልታምኑ ትችላላችሁ።
          </p>
          <p className="text-xs text-muted-foreground">
            font-ethiopic · weight 400/500/700
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Buttons ────────────────────────────────────────────────────────────

function ButtonShowcase() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button>פרימרי</Button>
        <Button variant="secondary">משני</Button>
        <Button variant="outline">מתאר</Button>
        <Button variant="ghost">רפאים</Button>
        <Button variant="link">קישור</Button>
        <Button variant="destructive">הרסני</Button>
        <Button variant="success">הצלחה</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="search">
          <Icon name="search" />
        </Button>
        <Button disabled>Disabled</Button>
        <Button>
          <Icon name="plus" />
          With icon
        </Button>
      </div>
    </div>
  );
}

// ── Badge ──────────────────────────────────────────────────────────────

function BadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>ברירת מחדל</Badge>
      <Badge variant="primary">חדש</Badge>
      <Badge variant="success">פעיל</Badge>
      <Badge variant="warning">מוגבל</Badge>
      <Badge variant="destructive">בוטל</Badge>
      <Badge variant="outline">טיוטה</Badge>
      <Badge variant="sigd">סיגד</Badge>
    </div>
  );
}

// ── Alert ──────────────────────────────────────────────────────────────

function AlertShowcase() {
  return (
    <div className="space-y-3">
      <Alert>
        <Icon name="info" />
        <AlertTitle>מידע</AlertTitle>
        <AlertDescription>זהו הודעה אינפורמטיבית רגילה.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <Icon name="check" />
        <AlertTitle>נשמר בהצלחה</AlertTitle>
        <AlertDescription>הפרטים שלך עודכנו.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <Icon name="alert" />
        <AlertTitle>תשומת לב</AlertTitle>
        <AlertDescription>הטופס יישאר פתוח רק 10 דקות.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <Icon name="alert" />
        <AlertTitle>שגיאה</AlertTitle>
        <AlertDescription>לא הצלחנו לשמור. נסו שוב בעוד רגע.</AlertDescription>
      </Alert>
    </div>
  );
}

// ── Inputs ─────────────────────────────────────────────────────────────

function InputsShowcase() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-1.5">
        <Label htmlFor="dx-name">שם</Label>
        <Input id="dx-name" placeholder="הקלד שם" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dx-email">אימייל</Label>
        <Input id="dx-email" type="email" dir="ltr" placeholder="name@example.com" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dx-err">עם שגיאה</Label>
        <Input id="dx-err" aria-invalid="true" defaultValue="לא תקין" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dx-dis">מושבת</Label>
        <Input id="dx-dis" disabled defaultValue="ערך קבוע" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dx-sel">בחירה</Label>
        <Select id="dx-sel" defaultValue="">
          <option value="" disabled>
            בחר עיר
          </option>
          <option>נתניה</option>
          <option>רחובות</option>
          <option>ראשון לציון</option>
          <option>קרית מלאכי</option>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dx-cbx">Combobox (חיפוש חופשי)</Label>
        <Combobox
          id="dx-cbx"
          placeholder="הקלד עיר..."
          options={[
            { value: "Netanya", label: "נתניה" },
            { value: "Rehovot", label: "רחובות" },
            { value: "Rishon", label: "ראשון לציון" },
            { value: "KiryatMalakhi", label: "קרית מלאכי" },
            { value: "Ashkelon", label: "אשקלון" },
          ]}
        />
      </div>
      <div className="space-y-1.5 md:col-span-2">
        <Label htmlFor="dx-ta">הערה</Label>
        <Textarea id="dx-ta" placeholder="ספר לנו..." rows={4} />
      </div>
    </div>
  );
}

// ── Form composition ───────────────────────────────────────────────────

function FormShowcase() {
  return (
    <form className="container-narrow space-y-5">
      <FormField>
        <FormLabel required>שם מלא</FormLabel>
        <FormControl>
          <Input name="name" required placeholder="שם פרטי ושם משפחה" />
        </FormControl>
        <FormDescription>נשתמש כדי לפנות אליך בלבד.</FormDescription>
      </FormField>
      <FormField invalid>
        <FormLabel required>טלפון</FormLabel>
        <FormControl>
          <Input name="phone" dir="ltr" aria-invalid="true" defaultValue="abc" required />
        </FormControl>
        <FormMessage>נא להזין מספר טלפון תקני.</FormMessage>
      </FormField>
      <Button type="submit">שליחה</Button>
    </form>
  );
}

// ── Choices ────────────────────────────────────────────────────────────

function ChoicesShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Checkbox</legend>
        <label className="flex items-center gap-2">
          <Checkbox defaultChecked /> מועדפים
        </label>
        <label className="flex items-center gap-2">
          <Checkbox /> התראות באימייל
        </label>
        <label className="flex items-center gap-2">
          <Checkbox disabled /> מושבת
        </label>
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Radio</legend>
        <label className="flex items-center gap-2">
          <Radio name="r" defaultChecked /> מכירה
        </label>
        <label className="flex items-center gap-2">
          <Radio name="r" /> השכרה
        </label>
        <label className="flex items-center gap-2">
          <Radio name="r" /> השקעה
        </label>
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Switch</legend>
        <label className="flex items-center gap-2">
          <Switch defaultChecked /> מצב כהה
        </label>
        <label className="flex items-center gap-2">
          <Switch /> דיוור
        </label>
      </fieldset>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────

function CardShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>כרטיס בסיסי</CardTitle>
          <CardDescription>תיאור קצר של הכרטיס</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">תוכן הכרטיס. ניתן להוסיף כל מה שרוצים פה.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="info" />
            עם אייקון
          </CardTitle>
          <CardDescription>וגם פוטר עם פעולה</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">מתאים לתקצירים, הוקעת תוכן, וכו׳.</p>
        </CardContent>
        <div className="border-t border-border px-6 py-3 text-end">
          <Button size="sm" variant="outline">
            פרטים
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────

function TabsShowcase() {
  return (
    <Tabs defaultValue="sale">
      <TabsList>
        <TabsTrigger value="sale">מכירה</TabsTrigger>
        <TabsTrigger value="rent">השכרה</TabsTrigger>
        <TabsTrigger value="urban">התחדשות</TabsTrigger>
      </TabsList>
      <TabsContent value="sale">
        <Card>
          <CardContent className="p-6">דירות למכירה — תוכן הטאב</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="rent">
        <Card>
          <CardContent className="p-6">דירות להשכרה — תוכן הטאב</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="urban">
        <Card>
          <CardContent className="p-6">התחדשות עירונית — תוכן הטאב</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// ── Tooltip ────────────────────────────────────────────────────────────

function TooltipShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Tooltip content="פעולה זו מוסיפה למועדפים">
        <Button variant="outline" size="icon" aria-label="favorite">
          <Icon name="heart" />
        </Button>
      </Tooltip>
      <Tooltip content="הסבר נוסף בצד" side="end">
        <Button variant="outline" size="sm">
          העברה לסיוע
        </Button>
      </Tooltip>
    </div>
  );
}

// ── Dialog / Sheet ─────────────────────────────────────────────────────

function OverlayShowcase() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sheetRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => dialogRef.current?.showModal()}>פתח Dialog</Button>
      <Button variant="outline" onClick={() => sheetRef.current?.showModal()}>
        פתח Sheet (צד)
      </Button>

      <Dialog
        ref={dialogRef}
        heading="אישור פעולה"
        description="פעולה זו תמחק את הפנייה לצמיתות."
      >
        <p className="text-sm">אין דרך לבטל לאחר אישור.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => dialogRef.current?.close()}>
            ביטול
          </Button>
          <Button variant="destructive" onClick={() => dialogRef.current?.close()}>
            מחיקה
          </Button>
        </DialogFooter>
      </Dialog>

      <Sheet ref={sheetRef} side="end" heading="סינון מתקדם">
        <p className="text-sm text-muted-foreground">תוכן הסינון לדוגמה.</p>
        <Button className="mt-4" onClick={() => sheetRef.current?.close()}>
          סגור
        </Button>
      </Sheet>
    </div>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────

function AvatarShowcase() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar size="sm" initials="ת" alt="תמר" />
      <Avatar size="md" initials="א" alt="אבי" />
      <Avatar size="lg" initials="ש" alt="שירה" />
      <Avatar size="xl" initials="ב" alt="בני" />
    </div>
  );
}

// ── Breadcrumb ─────────────────────────────────────────────────────────

function BreadcrumbShowcase({ locale }: { locale: Locale }) {
  return (
    <Breadcrumb
      items={[
        { label: t(locale, "nav_home"), href: `/${locale}` },
        { label: t(locale, "nav_listings"), href: `/${locale}/listings` },
        { label: "נתניה", href: `/${locale}/cities/netanya` },
        { label: "דורה" },
      ]}
    />
  );
}

// ── Nav ────────────────────────────────────────────────────────────────

function NavShowcase({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-4">
      <NavMenu
        ariaLabel="ראשי"
        items={[
          { label: 'נדל"ן', href: "#", current: true },
          { label: "זכויות", href: "#" },
          { label: "אנשי מקצוע", href: "#" },
          { label: "מאמרים", href: "#" },
        ]}
      />
      <LangSwitcher current={locale} hrefFor={(l) => `/${l}/design`} />
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────

function PaginationShowcase() {
  const [page, setPage] = useState(4);
  return (
    <div className="space-y-3">
      <Pagination page={page} pageCount={12} hrefFor={(p) => `?page=${p}`} />
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Button size="sm" variant="ghost" onClick={() => setPage(Math.max(1, page - 1))}>
          ← demo prev
        </Button>
        <span>page = {page}</span>
        <Button size="sm" variant="ghost" onClick={() => setPage(Math.min(12, page + 1))}>
          demo next →
        </Button>
      </div>
    </div>
  );
}

// ── Tables ─────────────────────────────────────────────────────────────

interface PropRow {
  id: string;
  city: string;
  rooms: number;
  size: number;
  price: number;
}

const propRows: PropRow[] = [
  { id: "1", city: "נתניה", rooms: 4, size: 95, price: 1850000 },
  { id: "2", city: "רחובות", rooms: 3, size: 78, price: 1620000 },
  { id: "3", city: "ראשון לציון", rooms: 5, size: 130, price: 2750000 },
  { id: "4", city: "קרית מלאכי", rooms: 4, size: 100, price: 1390000 },
];

function TableShowcase() {
  const fmt = (n: number) => "₪" + new Intl.NumberFormat("he-IL").format(n);
  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>עיר</TableHead>
            <TableHead>חדרים</TableHead>
            <TableHead>{'מ"ר'}</TableHead>
            <TableHead className="text-end">מחיר</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propRows.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.city}</TableCell>
              <TableCell>
                <bdi>{r.rooms}</bdi>
              </TableCell>
              <TableCell>
                <bdi>{r.size}</bdi>
              </TableCell>
              <TableCell className="text-end font-medium">
                <bdi>{fmt(r.price)}</bdi>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DataTable<PropRow>
        rowKey={(r) => r.id}
        rows={propRows}
        columns={[
          { id: "city", header: "עיר", cell: (r) => r.city },
          { id: "rooms", header: "חדרים", cell: (r) => <bdi>{r.rooms}</bdi> },
          { id: "size", header: 'מ"ר', cell: (r) => <bdi>{r.size}</bdi> },
          {
            id: "price",
            header: "מחיר",
            align: "end",
            cell: (r) => <bdi>{fmt(r.price)}</bdi>,
          },
        ]}
        caption="DataTable: כותרת, שורות, יישור, ומצב ריק מוכלים."
      />
    </div>
  );
}

// ── Skeleton & Separator ───────────────────────────────────────────────

function SkeletonShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="space-y-3 p-6">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <p className="text-sm">קטע ראשון</p>
          <Separator className="my-3" />
          <p className="text-sm">קטע שני</p>
          <Separator className="my-3" />
          <p className="text-sm">קטע שלישי</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────

function ToastShowcase() {
  const [shown, setShown] = useState<
    { id: number; v: "info" | "success" | "destructive" }[]
  >([]);
  const push = (v: "info" | "success" | "destructive") =>
    setShown((s) => [...s, { id: Date.now(), v }]);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => push("info")}>
          הצג Info
        </Button>
        <Button variant="success" onClick={() => push("success")}>
          הצג Success
        </Button>
        <Button variant="destructive" onClick={() => push("destructive")}>
          הצג Destructive
        </Button>
      </div>
      <ToastViewport>
        {shown.map((s) => (
          <Toast
            key={s.id}
            variant={s.v}
            heading={
              s.v === "info"
                ? "פעולה אינפורמטיבית"
                : s.v === "success"
                  ? "נשמר בהצלחה"
                  : "אירעה שגיאה"
            }
            description="זוהי דוגמת toast."
            onDismiss={() => setShown((cur) => cur.filter((c) => c.id !== s.id))}
          />
        ))}
      </ToastViewport>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────

function IconShowcase() {
  const names = [
    "home",
    "search",
    "heart",
    "share",
    "user",
    "globe",
    "menu",
    "close",
    "check",
    "alert",
    "info",
    "arrow-end",
    "chevron-end",
    "phone",
    "mail",
    "map-pin",
    "sun",
    "moon",
    "star",
    "settings",
    "plus",
  ] as const;
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 md:grid-cols-7">
      {names.map((n) => (
        <div
          key={n}
          className="flex flex-col items-center gap-1 rounded-md border border-border bg-card p-3 text-center text-xs"
        >
          <Icon name={n} title={n} className="text-foreground" />
          <p className="text-2xs font-mono text-muted-foreground">{n}</p>
        </div>
      ))}
    </div>
  );
}

// ── Listing card grid ──────────────────────────────────────────────────

function ListingShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ListingCard
        href="/he/cities/netanya"
        title="דירת 4 חדרים, התחדשות עירונית"
        city="נתניה"
        neighborhood="דורה"
        priceILS={1850000}
        rooms={4}
        sizeM2={95}
        badges={[
          { label: "התחדשות עירונית", variant: "primary" },
          { label: "תוכנית 600K", variant: "success" },
        ]}
      />
      <ListingCard
        href="/he/cities/netanya"
        title="דירת 3 חדרים להשכרה"
        city="רחובות"
        neighborhood="קרית משה"
        pricePerMonthILS={5400}
        rooms={3}
        sizeM2={78}
        badges={[{ label: "השכרה", variant: "default" }]}
      />
      <ListingCard
        href="/he/cities/netanya"
        title="פנטהאוז 5 חדרים"
        city="ראשון לציון"
        neighborhood="רמת אליהו"
        priceILS={2750000}
        rooms={5}
        sizeM2={130}
        badges={[{ label: "ייחודי", variant: "warning" }]}
      />
    </div>
  );
}

// ── Article ────────────────────────────────────────────────────────────

function ArticleShowcase() {
  return (
    <ArticleTemplate
      title="המשכנתא הקהילתית: 600,000 ש״ח, 0% בעשור הראשון"
      subtitle="כל מה שחשוב לדעת על תוכנית הדיור הייעודית לקהילה — תנאים, זכאות, ולוטו."
      author={{
        name: "ד״ר אדמסו אלי",
        bio: "יועצת דיור קהילתית, ENP",
        initials: "א",
      }}
      publishedAt="2026-04-12"
      readTimeMin={7}
      breadcrumbs={[
        { label: "בית", href: "/he" },
        { label: "חדשות", href: "/he/news" },
        { label: "דיור" },
      ]}
      body={
        <>
          <p>
            תוכנית המשכנתא הקהילתית ייחודית: 600 אלף ש״ח, 0% ריבית בעשור הראשון, 5% הון
            עצמי בלבד. כל שנה מוגרלות כ־300 משפחות.
          </p>
          <h2 className="mt-6 text-2xl font-bold">איך נרשמים?</h2>
          <p>
            ההרשמה ב־70 ש״ח בסניף הבנק. רשימת הסניפים, טפסים, ומועדים — עדכניים לחודש
            האחרון.
          </p>
          <h2 className="mt-6 text-2xl font-bold">מי זכאי?</h2>
          <ul className="ms-6 list-disc space-y-1">
            <li>בני קהילת יוצאי אתיופיה</li>
            <li>זוגות צעירים שטרם רכשו דירה</li>
            <li>הוכחת הכנסה לתקופת הזכייה</li>
          </ul>
        </>
      }
    />
  );
}

// ── Profile ────────────────────────────────────────────────────────────

function ProfileShowcase() {
  return (
    <ProfileTemplate
      ctaHref="mailto:info@tedros.co.il"
      name="יוסי טדלה"
      initials="י"
      profession="מתווך דירות בכיר"
      city="נתניה"
      languages={["עברית", "אמהרית", "אנגלית"]}
      rating={4.8}
      reviewCount={42}
      verified
      bio={
        <>
          <p>
            12 שנה בתחום הנדל״ן בנתניה. מתמחה בהתחדשות עירונית והכוונה למשפחות בתוכניות
            הדיור הקהילתיות.
          </p>
          <p>דובר אמהרית רהוטה, מסייע למשפחות שזה הרכש הראשון שלהן.</p>
        </>
      }
      contactPhone="050-1234567"
      contactEmail="yossi@tedros.example"
    />
  );
}
