CREATE TYPE "public"."locale" AS ENUM('he', 'en', 'am');--> statement-breakpoint
CREATE TYPE "public"."agency_member_status" AS ENUM('invited', 'active', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'agency_member', 'agency_admin', 'admin');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('pending', 'verified', 'rejected', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('pending', 'assigned', 'contacted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('draft', 'active', 'sold', 'rented', 'archived');--> statement-breakpoint
CREATE TYPE "public"."listing_type" AS ENUM('sale', 'rent', 'urban_renewal', 'investment', 'gov_program', 'commercial');--> statement-breakpoint
CREATE TYPE "public"."media_kind" AS ENUM('image', 'video', 'floorplan', 'tour_3d');--> statement-breakpoint
CREATE TYPE "public"."actor_type" AS ENUM('user', 'agency', 'admin', 'agent', 'system');--> statement-breakpoint
CREATE TYPE "public"."audit_action" AS ENUM('create', 'update', 'delete', 'restore', 'publish', 'unpublish', 'verify', 'reject', 'login', 'logout', 'consent_grant', 'consent_revoke');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "agencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"owner_user_id" uuid NOT NULL,
	"verification_status" "verification_status" DEFAULT 'pending' NOT NULL,
	"legal_id" varchar(32),
	"license_number" varchar(64),
	"description" jsonb,
	"contact_email" varchar(320),
	"contact_phone" varchar(32),
	"website_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "agency_members" (
	"user_id" uuid NOT NULL,
	"agency_id" uuid NOT NULL,
	"role_in_agency" text NOT NULL,
	"status" "agency_member_status" DEFAULT 'invited' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "agency_members_user_id_agency_id_pk" PRIMARY KEY("user_id","agency_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"email_verified" timestamp with time zone,
	"name" text,
	"image" text,
	"phone" varchar(32),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"preferred_locale" "locale" DEFAULT 'he' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid,
	"agency_id" uuid NOT NULL,
	"submitted_by_user_id" uuid,
	"assigned_to_user_id" uuid,
	"status" "lead_status" DEFAULT 'pending' NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(320),
	"phone" varchar(32),
	"message" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listing_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"kind" "media_kind" DEFAULT 'image' NOT NULL,
	"r2_key" text NOT NULL,
	"width" integer,
	"height" integer,
	"lqip" text,
	"alt_text" jsonb NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listing_translations" (
	"listing_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"body" text NOT NULL,
	"body_vec" "tsvector",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "listing_translations_listing_id_locale_pk" PRIMARY KEY("listing_id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agency_id" uuid NOT NULL,
	"type" "listing_type" NOT NULL,
	"status" "listing_status" DEFAULT 'draft' NOT NULL,
	"title" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"price" numeric(14, 2),
	"attributes" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"city_id" uuid NOT NULL,
	"neighborhood_id" uuid,
	"search_vec" "tsvector",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "neighborhoods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"city_id" uuid NOT NULL,
	"name" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_translations" (
	"program_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"body" text NOT NULL,
	"body_vec" "tsvector",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "program_translations_program_id_locale_pk" PRIMARY KEY("program_id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "programs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"provider" jsonb NOT NULL,
	"eligibility_summary" jsonb NOT NULL,
	"application_url" text,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "right_translations" (
	"right_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"body" text NOT NULL,
	"body_vec" "tsvector",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "right_translations_right_id_locale_pk" PRIMARY KEY("right_id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"gov_url" text,
	"eligibility_summary" jsonb NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professional_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professional_category_links" (
	"professional_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "professional_category_links_professional_id_category_id_pk" PRIMARY KEY("professional_id","category_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professional_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"professional_id" uuid NOT NULL,
	"reviewer_user_id" uuid,
	"rating" integer NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"published_at" timestamp with time zone,
	CONSTRAINT "professional_reviews_rating_check" CHECK ("professional_reviews"."rating" BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professionals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"display_name" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"headline" jsonb,
	"city_id" uuid NOT NULL,
	"license_number" varchar(64),
	"contact_email" varchar(320),
	"contact_phone" varchar(32),
	"website_url" text,
	"verification_status" "verification_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_translations" (
	"article_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"body" text NOT NULL,
	"body_vec" "tsvector",
	"word_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "article_translations_article_id_locale_pk" PRIMARY KEY("article_id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" jsonb NOT NULL,
	"slug" jsonb NOT NULL,
	"excerpt" jsonb NOT NULL,
	"cover_r2_key" text,
	"author_user_id" uuid,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "programmatic_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template" varchar(64) NOT NULL,
	"slug" jsonb NOT NULL,
	"title" jsonb NOT NULL,
	"meta_description" jsonb NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"word_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_log" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"actor_id" uuid,
	"actor_type" "actor_type" NOT NULL,
	"action" "audit_action" NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"agency_id" uuid,
	"before" jsonb,
	"after" jsonb,
	"diff" jsonb,
	"request_id" text,
	"ip" "inet",
	"user_agent" text,
	CONSTRAINT "audit_log_id_occurred_at_pk" PRIMARY KEY("id","occurred_at")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "slug_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"old_slug" text NOT NULL,
	"scope_id" uuid,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agencies" ADD CONSTRAINT "agencies_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agency_members" ADD CONSTRAINT "agency_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agency_members" ADD CONSTRAINT "agency_members_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leads" ADD CONSTRAINT "leads_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leads" ADD CONSTRAINT "leads_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leads" ADD CONSTRAINT "leads_submitted_by_user_id_users_id_fk" FOREIGN KEY ("submitted_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_to_user_id_users_id_fk" FOREIGN KEY ("assigned_to_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listing_media" ADD CONSTRAINT "listing_media_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listing_translations" ADD CONSTRAINT "listing_translations_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listings" ADD CONSTRAINT "listings_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listings" ADD CONSTRAINT "listings_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listings" ADD CONSTRAINT "listings_neighborhood_id_neighborhoods_id_fk" FOREIGN KEY ("neighborhood_id") REFERENCES "public"."neighborhoods"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "neighborhoods" ADD CONSTRAINT "neighborhoods_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_translations" ADD CONSTRAINT "program_translations_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "right_translations" ADD CONSTRAINT "right_translations_right_id_rights_id_fk" FOREIGN KEY ("right_id") REFERENCES "public"."rights"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professional_category_links" ADD CONSTRAINT "professional_category_links_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."professionals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professional_category_links" ADD CONSTRAINT "professional_category_links_category_id_professional_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."professional_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professional_reviews" ADD CONSTRAINT "professional_reviews_professional_id_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."professionals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professional_reviews" ADD CONSTRAINT "professional_reviews_reviewer_user_id_users_id_fk" FOREIGN KEY ("reviewer_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professionals" ADD CONSTRAINT "professionals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professionals" ADD CONSTRAINT "professionals_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_translations" ADD CONSTRAINT "article_translations_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_author_user_id_users_id_fk" FOREIGN KEY ("author_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "agencies_owner_idx" ON "agencies" USING btree ("owner_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "agencies_verification_idx" ON "agencies" USING btree ("verification_status");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "agencies_legal_id_unique" ON "agencies" USING btree ("legal_id") WHERE "agencies"."deleted_at" IS NULL AND "agencies"."legal_id" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "agencies_license_number_unique" ON "agencies" USING btree ("license_number") WHERE "agencies"."deleted_at" IS NULL AND "agencies"."license_number" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "agencies_slug_he_unique" ON "agencies" USING btree (("slug" ->> 'he')) WHERE "agencies"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "agencies_slug_en_unique" ON "agencies" USING btree (("slug" ->> 'en')) WHERE "agencies"."deleted_at" IS NULL AND ("agencies"."slug" ->> 'en') IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "agencies_slug_am_unique" ON "agencies" USING btree (("slug" ->> 'am')) WHERE "agencies"."deleted_at" IS NULL AND ("agencies"."slug" ->> 'am') IS NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "agency_members_agency_idx" ON "agency_members" USING btree ("agency_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "cities_slug_he_unique" ON "cities" USING btree (("slug" ->> 'he'));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_listing_idx" ON "leads" USING btree ("listing_id","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_agency_idx" ON "leads" USING btree ("agency_id","status","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_submitted_by_idx" ON "leads" USING btree ("submitted_by_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_assigned_to_idx" ON "leads" USING btree ("assigned_to_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listing_media_listing_idx" ON "listing_media" USING btree ("listing_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "listings_city_slug_he_unique" ON "listings" USING btree ("city_id",("slug" ->> 'he')) WHERE "listings"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "listings_city_slug_en_unique" ON "listings" USING btree ("city_id",("slug" ->> 'en')) WHERE "listings"."deleted_at" IS NULL AND ("listings"."slug" ->> 'en') IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "listings_city_slug_am_unique" ON "listings" USING btree ("city_id",("slug" ->> 'am')) WHERE "listings"."deleted_at" IS NULL AND ("listings"."slug" ->> 'am') IS NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_agency_idx" ON "listings" USING btree ("agency_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_city_idx" ON "listings" USING btree ("city_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_neighborhood_idx" ON "listings" USING btree ("neighborhood_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_type_idx" ON "listings" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_status_idx" ON "listings" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_live_published_idx" ON "listings" USING btree ("published_at") WHERE "listings"."deleted_at" IS NULL AND "listings"."published_at" IS NOT NULL AND "listings"."status" = 'active';--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "neighborhoods_city_idx" ON "neighborhoods" USING btree ("city_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "neighborhoods_city_slug_he_unique" ON "neighborhoods" USING btree ("city_id",("slug" ->> 'he'));--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "programs_slug_he_unique" ON "programs" USING btree (("slug" ->> 'he')) WHERE "programs"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "programs_slug_en_unique" ON "programs" USING btree (("slug" ->> 'en')) WHERE "programs"."deleted_at" IS NULL AND ("programs"."slug" ->> 'en') IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "programs_slug_am_unique" ON "programs" USING btree (("slug" ->> 'am')) WHERE "programs"."deleted_at" IS NULL AND ("programs"."slug" ->> 'am') IS NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "programs_live_published_idx" ON "programs" USING btree ("published_at") WHERE "programs"."deleted_at" IS NULL AND "programs"."published_at" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "rights_slug_he_unique" ON "rights" USING btree (("slug" ->> 'he')) WHERE "rights"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "rights_slug_en_unique" ON "rights" USING btree (("slug" ->> 'en')) WHERE "rights"."deleted_at" IS NULL AND ("rights"."slug" ->> 'en') IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "rights_slug_am_unique" ON "rights" USING btree (("slug" ->> 'am')) WHERE "rights"."deleted_at" IS NULL AND ("rights"."slug" ->> 'am') IS NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rights_live_published_idx" ON "rights" USING btree ("published_at") WHERE "rights"."deleted_at" IS NULL AND "rights"."published_at" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "professional_categories_slug_he_unique" ON "professional_categories" USING btree (("slug" ->> 'he'));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "professional_category_links_cat_idx" ON "professional_category_links" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "professional_reviews_pro_idx" ON "professional_reviews" USING btree ("professional_id","published_at") WHERE "professional_reviews"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "professionals_slug_he_unique" ON "professionals" USING btree (("slug" ->> 'he')) WHERE "professionals"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "professionals_slug_en_unique" ON "professionals" USING btree (("slug" ->> 'en')) WHERE "professionals"."deleted_at" IS NULL AND ("professionals"."slug" ->> 'en') IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "professionals_slug_am_unique" ON "professionals" USING btree (("slug" ->> 'am')) WHERE "professionals"."deleted_at" IS NULL AND ("professionals"."slug" ->> 'am') IS NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "professionals_city_idx" ON "professionals" USING btree ("city_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "professionals_verification_idx" ON "professionals" USING btree ("verification_status");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "articles_slug_he_unique" ON "articles" USING btree (("slug" ->> 'he')) WHERE "articles"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "articles_slug_en_unique" ON "articles" USING btree (("slug" ->> 'en')) WHERE "articles"."deleted_at" IS NULL AND ("articles"."slug" ->> 'en') IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "articles_slug_am_unique" ON "articles" USING btree (("slug" ->> 'am')) WHERE "articles"."deleted_at" IS NULL AND ("articles"."slug" ->> 'am') IS NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "articles_live_published_idx" ON "articles" USING btree ("published_at") WHERE "articles"."deleted_at" IS NULL AND "articles"."published_at" IS NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "articles_author_idx" ON "articles" USING btree ("author_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "programmatic_pages_template_idx" ON "programmatic_pages" USING btree ("template");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "programmatic_pages_slug_he_unique" ON "programmatic_pages" USING btree (("slug" ->> 'he')) WHERE "programmatic_pages"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "programmatic_pages_live_published_idx" ON "programmatic_pages" USING btree ("published_at") WHERE "programmatic_pages"."deleted_at" IS NULL AND "programmatic_pages"."published_at" IS NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_log_occurred_at_idx" ON "audit_log" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_log_actor_idx" ON "audit_log" USING btree ("actor_id","occurred_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_log_entity_idx" ON "audit_log" USING btree ("entity_type","entity_id","occurred_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_log_agency_idx" ON "audit_log" USING btree ("agency_id","occurred_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_log_request_idx" ON "audit_log" USING btree ("request_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "slug_history_redirect_unique" ON "slug_history" USING btree ("entity_type","locale","scope_id","old_slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_history_entity_idx" ON "slug_history" USING btree ("entity_type","entity_id");