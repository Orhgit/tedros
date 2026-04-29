import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";

export interface LeadFormProps {
  action?: string;
  method?: "post" | "get";
  topic?: "listing" | "right" | "professional";
  topicLabel?: string;
}

/**
 * Page-level lead/contact form. Pure markup — wire submission via React Router
 * <Form> in Phase 3. Already accessible: labels, descriptions, error slots,
 * keyboard nav, native validation.
 */
export function LeadForm({
  action = "/api/leads",
  method = "post",
  topic = "listing",
  topicLabel,
}: LeadFormProps) {
  return (
    <form action={action} method={method} className="grid gap-5">
      <input type="hidden" name="topic" value={topic} />
      {topicLabel && (
        <p className="rounded-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
          הפנייה תעבור לגבי:{" "}
          <span className="font-medium text-foreground">{topicLabel}</span>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField>
          <FormLabel required>שם מלא</FormLabel>
          <FormControl>
            <Input
              name="name"
              autoComplete="name"
              required
              placeholder="שם פרטי ושם משפחה"
            />
          </FormControl>
        </FormField>
        <FormField>
          <FormLabel required>טלפון</FormLabel>
          <FormControl>
            <Input
              name="phone"
              type="tel"
              dir="ltr"
              autoComplete="tel"
              required
              placeholder="050-0000000"
              pattern="^[0-9+\-\s()]{9,}$"
            />
          </FormControl>
          <FormDescription>נשתמש רק כדי ליצור איתך קשר. לעולם לא נמכור.</FormDescription>
        </FormField>
      </div>

      <FormField>
        <FormLabel>אימייל</FormLabel>
        <FormControl>
          <Input
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
          />
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel required>שפה מועדפת</FormLabel>
        <FormControl>
          <Select name="preferred_language" defaultValue="he" required>
            <option value="he">עברית</option>
            <option value="am">አማርኛ</option>
            <option value="en">English</option>
          </Select>
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel>הודעה</FormLabel>
        <FormControl>
          <Textarea name="message" rows={4} placeholder="ספר לנו במה נוכל לעזור..." />
        </FormControl>
        <FormMessage />
      </FormField>

      <label className="inline-flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <span>
          קראתי את{" "}
          <a href="/he/privacy" className="underline hover:text-foreground">
            מדיניות הפרטיות
          </a>{" "}
          ואני מאשר/ת שייצרו איתי קשר.
        </span>
      </label>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="reset" variant="ghost">
          איפוס
        </Button>
        <Button type="submit">שליחה</Button>
      </div>
    </form>
  );
}
