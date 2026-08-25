CREATE TYPE "public"."news_draft_locale_status" AS ENUM('machine_draft', 'human_reviewed', 'skipped');--> statement-breakpoint
CREATE TYPE "public"."news_draft_promotion_method" AS ENUM('manual_pr', 'fast_track');--> statement-breakpoint
CREATE TYPE "public"."news_draft_status" AS ENUM('pending', 'approved', 'rejected', 'promoted');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news_drafts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_url" text NOT NULL,
	"source_name" text NOT NULL,
	"published_at_source" timestamp with time zone,
	"raw_snapshot" text NOT NULL,
	"relevance_score" numeric(3, 2),
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"he_title" jsonb,
	"he_excerpt" jsonb,
	"he_body" text,
	"en_title" jsonb,
	"en_excerpt" jsonb,
	"en_body" text,
	"en_status" "news_draft_locale_status" DEFAULT 'machine_draft' NOT NULL,
	"am_title" jsonb,
	"am_excerpt" jsonb,
	"am_body" text,
	"am_status" "news_draft_locale_status" DEFAULT 'machine_draft' NOT NULL,
	"am_urgent_override" boolean DEFAULT false NOT NULL,
	"am_urgent_override_reason" text,
	"am_urgent_override_by_user_id" uuid,
	"am_urgent_override_at" timestamp with time zone,
	"status" "news_draft_status" DEFAULT 'pending' NOT NULL,
	"reviewer_user_id" uuid,
	"reviewed_at" timestamp with time zone,
	"promoted_slug" text,
	"promotion_method" "news_draft_promotion_method",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news_drafts" ADD CONSTRAINT "news_drafts_am_urgent_override_by_user_id_users_id_fk" FOREIGN KEY ("am_urgent_override_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news_drafts" ADD CONSTRAINT "news_drafts_reviewer_user_id_users_id_fk" FOREIGN KEY ("reviewer_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "news_drafts_source_url_unique" ON "news_drafts" USING btree ("source_url");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_drafts_status_idx" ON "news_drafts" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_drafts_pending_idx" ON "news_drafts" USING btree ("created_at") WHERE "news_drafts"."status" = 'pending';--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_drafts_am_override_at_idx" ON "news_drafts" USING btree ("am_urgent_override_by_user_id","am_urgent_override_at") WHERE "news_drafts"."am_urgent_override" = true;