import type { ReactNode } from "react";
import { Avatar } from "../ui/avatar";
import { Breadcrumb, type BreadcrumbItem } from "../ui/breadcrumb";
import { Separator } from "../ui/separator";

export interface ArticleAuthor {
  name: string;
  bio?: string;
  initials?: string;
  avatarSrc?: string;
}

export interface ArticleTemplateProps {
  title: string;
  subtitle?: string;
  author: ArticleAuthor;
  publishedAt: string;
  readTimeMin?: number;
  breadcrumbs?: BreadcrumbItem[];
  body: ReactNode;
  toc?: ReactNode;
}

export function ArticleTemplate({
  title,
  subtitle,
  author,
  publishedAt,
  readTimeMin,
  breadcrumbs,
  body,
  toc,
}: ArticleTemplateProps) {
  return (
    <article className="container-narrow py-10">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} className="mb-6" />
      )}
      <header>
        <h1 className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-xl leading-relaxed text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-6 flex items-center gap-3">
          <Avatar src={author.avatarSrc} initials={author.initials} alt={author.name} />
          <div>
            <p className="text-sm font-medium text-foreground">{author.name}</p>
            <p className="text-xs text-muted-foreground">
              <time dateTime={publishedAt}>{publishedAt}</time>
              {readTimeMin && (
                <>
                  {" · "}
                  <bdi>{readTimeMin} דק׳ קריאה</bdi>
                </>
              )}
            </p>
          </div>
        </div>
      </header>

      <Separator className="my-8" />

      {toc && (
        <aside
          aria-label="תוכן עניינים"
          className="mb-8 rounded-md border border-border bg-surface p-4 text-sm"
        >
          {toc}
        </aside>
      )}

      <div className="container-prose prose-tedros space-y-5 text-base leading-relaxed text-foreground">
        {body}
      </div>
    </article>
  );
}
