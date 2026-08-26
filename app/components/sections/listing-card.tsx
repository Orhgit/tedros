import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Icon } from "../ui/icon";
import { formatRooms } from "~/lib/listings/display";
import { cn } from "~/lib/utils";

export interface ListingCardProps {
  href: string;
  title: string;
  city: string;
  neighborhood?: string;
  pricePerMonthILS?: number;
  priceILS?: number;
  rooms: number;
  sizeM2: number;
  imageSrc?: string;
  imageAlt?: string;
  badges?: { label: string; variant?: "primary" | "success" | "warning" | "default" }[];
  className?: string;
  /** Accessible label for the favorite button. */
  favoriteLabel?: string;
  /** Accessible label for the share button. */
  shareLabel?: string;
  /** Accessible label for the contact-broker button. */
  contactLabel?: string;
}

const formatNumber = (n: number) => new Intl.NumberFormat("he-IL").format(n);

export function ListingCard({
  href,
  title,
  city,
  neighborhood,
  pricePerMonthILS,
  priceILS,
  rooms,
  sizeM2,
  imageSrc,
  imageAlt,
  badges = [],
  className,
  favoriteLabel = "הוסף למועדפים",
  shareLabel = "שתף",
  contactLabel = "פנייה למתווך",
}: ListingCardProps) {
  return (
    <Card
      className={cn(
        "group/card overflow-hidden transition-shadow hover:shadow-md",
        className,
      )}
    >
      <Link to={href} className="block focus-visible:outline-none">
        <div className="relative aspect-[16/10] bg-muted">
          {/* Placeholder always rendered underneath: source photos can vanish
              (e.g. removed from merkaz-h.co.il) and the <img> then hides
              itself via onError instead of showing a broken-image icon. */}
          <div className="grid h-full place-items-center text-muted-foreground">
            <Icon name="home" className="size-10" />
          </div>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt ?? ""}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 size-full object-cover transition-transform duration-(--motion-base) group-hover/card:scale-[1.02]"
            />
          )}
          {badges.length > 0 && (
            <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
              {badges.map((b, i) => (
                <Badge key={i} variant={b.variant ?? "primary"}>
                  {b.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link
          to={href}
          className="block rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <h3 className="text-lg leading-tight font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {city}
            {neighborhood && <> · {neighborhood}</>}
          </p>
        </Link>
        <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">חדרים</dt>
            <dd className="font-medium">
              <bdi>{formatRooms(rooms) ?? "—"}</bdi>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{'מ"ר'}</dt>
            <dd className="font-medium">
              <bdi>{sizeM2}</bdi>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">
              {pricePerMonthILS ? 'שכ"ד / ח׳' : "מחיר"}
            </dt>
            <dd className="font-semibold text-primary">
              <bdi>
                ₪{formatNumber(priceILS ?? pricePerMonthILS ?? 0)}
                {pricePerMonthILS && (
                  <span className="text-xs font-normal text-muted-foreground">
                    {" "}
                    / חודש
                  </span>
                )}
              </bdi>
            </dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter className="border-t border-border px-4 pt-3">
        <button
          type="button"
          aria-label={favoriteLabel}
          className="inline-flex size-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-destructive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Icon name="heart" />
        </button>
        <button
          type="button"
          aria-label={shareLabel}
          className="inline-flex size-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Icon name="share" />
        </button>
        <button
          type="button"
          className="ms-auto inline-flex h-9 items-center gap-1.5 rounded-sm bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-earth-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Icon name="phone" className="size-4" />
          {contactLabel}
        </button>
      </CardFooter>
    </Card>
  );
}
