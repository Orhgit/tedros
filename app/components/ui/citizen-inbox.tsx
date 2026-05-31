"use client";

import { useState } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

type Category = "Routine" | "High-Urgency" | "Sensitive";
type Status = "New" | "In Progress" | "Resolved" | "Dismissed";

interface InboxMessage {
  id: string;
  time: string;
  snippet: string;
  category: Category;
  status: Status;
}

const MOCK_MESSAGES: InboxMessage[] = [
  {
    id: "1",
    time: "09:12",
    snippet: "השכן שלי מוסיק רעש חזק מאז שעה 6 בבוקר, לא נותן לי לישון...",
    category: "Routine",
    status: "New",
  },
  {
    id: "2",
    time: "09:34",
    snippet: "יש אש בבניין! אנשים לא יכולים לצאת מהקומה השלישית, בבקשה שלחו...",
    category: "High-Urgency",
    status: "New",
  },
  {
    id: "3",
    time: "10:05",
    snippet: "קיבלתי מכתב פינוי היום. אני לבד עם 3 ילדים ואין לי לאן ללכת...",
    category: "Sensitive",
    status: "In Progress",
  },
  {
    id: "4",
    time: "10:22",
    snippet: "האשפה ברחוב הרצל לא נאספה 3 שבועות. גם שכנים מתלוננים, ממש בלתי נסבל",
    category: "Routine",
    status: "New",
  },
  {
    id: "5",
    time: "10:48",
    snippet: "בעלי אלים אתמול בלילה. הילדים פוחדים. אני צריכה עזרה דחופה לא...",
    category: "High-Urgency",
    status: "In Progress",
  },
  {
    id: "6",
    time: "11:03",
    snippet: "הרמזור בצומת בן גוריון לא עובד כבר שעתיים. כמה רכבים כמעט נפגעו",
    category: "Routine",
    status: "Resolved",
  },
  {
    id: "7",
    time: "11:27",
    snippet: "קיבלתי הודעה שאני מפוטר. אני לא מבין את הסיבה ולא קיבלתי פיצויים...",
    category: "Sensitive",
    status: "New",
  },
  {
    id: "8",
    time: "11:55",
    snippet: "צינור מים פרץ בכניסה לבניין, מים שוטפים לרחוב. בבקשה שלחו טכנאי",
    category: "High-Urgency",
    status: "Dismissed",
  },
];

const CATEGORY_BADGE: Record<
  Category,
  { variant: "success" | "destructive" | "warning"; label: string }
> = {
  Routine: { variant: "success", label: "Routine" },
  "High-Urgency": { variant: "destructive", label: "High-Urgency" },
  Sensitive: { variant: "warning", label: "Sensitive" },
};

const STATUS_BADGE: Record<
  Status,
  { variant: "outline" | "primary" | "success" | "default"; label: string }
> = {
  New: { variant: "primary", label: "New" },
  "In Progress": { variant: "default", label: "In Progress" },
  Resolved: { variant: "success", label: "Resolved" },
  Dismissed: { variant: "outline", label: "Dismissed" },
};

function CategoryBadge({ category }: { category: Category }) {
  const { variant, label } = CATEGORY_BADGE[category];
  const dot =
    category === "High-Urgency"
      ? "bg-destructive"
      : category === "Sensitive"
        ? "bg-warning"
        : "bg-success";
  return (
    <Badge variant={variant} className="gap-1.5 font-semibold tracking-wide">
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </Badge>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const { variant, label } = STATUS_BADGE[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function CitizenInbox() {
  const [messages, setMessages] = useState<InboxMessage[]>(MOCK_MESSAGES);

  function updateStatus(id: string, status: Status) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  }

  const counts = {
    total: messages.length,
    urgent: messages.filter(
      (m) =>
        m.category === "High-Urgency" &&
        m.status !== "Dismissed" &&
        m.status !== "Resolved",
    ).length,
    newCount: messages.filter((m) => m.status === "New").length,
  };

  return (
    <section
      className="rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-lg"
      aria-label="Citizen Inbox"
    >
      {/* Header bar */}
      <div className="flex flex-col gap-3 border-b border-zinc-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-lg font-bold tracking-tight text-white">
            Citizen Inbox
          </h2>
          {counts.newCount > 0 && (
            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-300">
              {counts.newCount} new
            </span>
          )}
          {counts.urgent > 0 && (
            <span className="rounded-full bg-destructive/20 px-2.5 py-0.5 text-xs font-bold text-destructive">
              {counts.urgent} urgent
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500">
          {counts.total} messages · live WhatsApp feed
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="w-16 text-zinc-400">Time</TableHead>
              <TableHead className="min-w-[280px] text-zinc-400">
                Resident Message
              </TableHead>
              <TableHead className="w-36 text-zinc-400">AI Category</TableHead>
              <TableHead className="w-28 text-zinc-400">Status</TableHead>
              <TableHead className="w-60 text-zinc-400">Quick Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow
                key={msg.id}
                className="border-zinc-800 hover:bg-zinc-900/60"
                data-state={msg.status === "New" ? "selected" : undefined}
              >
                {/* Time */}
                <TableCell className="font-mono text-xs text-zinc-400 tabular-nums">
                  {msg.time}
                </TableCell>

                {/* Message snippet */}
                <TableCell>
                  <p
                    dir="rtl"
                    lang="he"
                    className="line-clamp-2 max-w-sm text-sm leading-relaxed text-zinc-200"
                    title={msg.snippet}
                  >
                    {msg.snippet}
                  </p>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <CategoryBadge category={msg.category} />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={msg.status} />
                </TableCell>

                {/* Quick Actions */}
                <TableCell>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={msg.status === "Dismissed" || msg.status === "Resolved"}
                      onClick={() => updateStatus(msg.id, "In Progress")}
                      className="h-7 border-zinc-700 bg-zinc-900 px-2 text-xs text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white disabled:opacity-40"
                    >
                      Dispatch to Dept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={msg.status === "Dismissed" || msg.status === "Resolved"}
                      onClick={() => updateStatus(msg.id, "Resolved")}
                      className="h-7 border-zinc-700 bg-zinc-900 px-2 text-xs text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white disabled:opacity-40"
                    >
                      Update Resident
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={msg.status === "Dismissed"}
                      onClick={() => updateStatus(msg.id, "Dismissed")}
                      className="h-7 px-2 text-xs text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 disabled:opacity-30"
                    >
                      Dismiss
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 px-5 py-3 text-xs text-zinc-600">
        Showing {messages.length} messages · Last synced just now
      </div>
    </section>
  );
}
