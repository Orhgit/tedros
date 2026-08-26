import { Form, Link } from "react-router";
import type { Route } from "./+types/$lang.dashboard";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { requireUser } from "~/lib/auth/guards";
import { CitizenInbox } from "~/components/ui/citizen-inbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);
  return { locale, user };
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: t(data?.locale ?? DEFAULT_LOCALE, "dashboard_title") },
  { name: "robots", content: "noindex" },
];

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { locale, user } = loaderData;
  const displayName = user.name ?? user.email;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Top bar */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white">
              {t(locale, "dashboard_title")}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {t(locale, "dashboard_welcome", { name: displayName })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/${locale}`}
              className="text-sm text-zinc-400 underline underline-offset-4 hover:text-zinc-200"
            >
              {t(locale, "nav_home")}
            </Link>
            <Form method="post" action="/auth/signout">
              <input type="hidden" name="callbackUrl" value={`/${locale}`} />
              <button
                type="submit"
                className="rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800"
              >
                {t(locale, "nav_logout")}
              </button>
            </Form>
          </div>
        </header>

        {/* Tabs — Overview/Reports were empty "coming soon" shells; hidden
            until they carry real content (TED-130). Restore the TabsTrigger +
            TabsContent pairs when they do. */}
        <Tabs defaultValue="citizen-inbox">
          <TabsList className="mb-6 border border-zinc-800 bg-zinc-900 text-zinc-400">
            <TabsTrigger value="citizen-inbox">Citizen Inbox</TabsTrigger>
          </TabsList>

          <TabsContent value="citizen-inbox">
            <CitizenInbox />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
