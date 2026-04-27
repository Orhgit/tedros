import type { ReactNode } from "react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Icon } from "../ui/icon";

export interface ProfileTemplateProps {
  name: string;
  initials?: string;
  avatarSrc?: string;
  profession: string;
  city?: string;
  languages?: string[];
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  bio?: ReactNode;
  contactPhone?: string;
  contactEmail?: string;
  ctaLabel?: string;
}

export function ProfileTemplate({
  name,
  initials,
  avatarSrc,
  profession,
  city,
  languages = [],
  rating,
  reviewCount,
  verified,
  bio,
  contactPhone,
  contactEmail,
  ctaLabel = "שליחת פנייה",
}: ProfileTemplateProps) {
  return (
    <article className="container-narrow py-10">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <Avatar size="xl" src={avatarSrc} initials={initials} alt={name} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
                {verified && (
                  <Badge variant="success" className="gap-1">
                    <Icon name="check" className="size-3" />
                    מאומת
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-base text-muted-foreground">
                {profession}
                {city && <> · {city}</>}
              </p>
              {(rating !== undefined || reviewCount !== undefined) && (
                <p className="mt-2 inline-flex items-center gap-1 text-sm text-foreground">
                  <Icon name="star" className="size-4 text-warning" />
                  <bdi>{rating?.toFixed(1) ?? "—"}</bdi>
                  {reviewCount !== undefined && (
                    <span className="text-muted-foreground">
                      {" "}
                      (<bdi>{reviewCount}</bdi> ביקורות)
                    </span>
                  )}
                </p>
              )}
              {languages.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {languages.map((lang) => (
                    <li key={lang}>
                      <Badge>{lang}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto">
              <Button>
                <Icon name="mail" />
                {ctaLabel}
              </Button>
              {contactPhone && (
                <Button asChild variant="outline">
                  <a href={`tel:${contactPhone}`} dir="ltr">
                    <Icon name="phone" />
                    <bdi>{contactPhone}</bdi>
                  </a>
                </Button>
              )}
            </div>
          </div>

          {bio && (
            <div className="mt-8 max-w-prose space-y-3 text-base leading-relaxed text-foreground">
              {bio}
            </div>
          )}

          {contactEmail && (
            <p className="mt-6 text-sm text-muted-foreground">
              <Icon name="mail" className="me-1 inline-block align-text-bottom" />
              <a
                href={`mailto:${contactEmail}`}
                className="rounded-xs text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                dir="ltr"
              >
                {contactEmail}
              </a>
            </p>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
