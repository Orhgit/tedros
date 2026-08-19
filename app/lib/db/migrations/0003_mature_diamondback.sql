CREATE TABLE IF NOT EXISTS "professional_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"profession" varchar(40) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"email" varchar(320),
	"license_number" varchar(64),
	"publish_license_number" boolean DEFAULT false NOT NULL,
	"primary_regions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"secondary_regions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"nationwide_remote" boolean DEFAULT false NOT NULL,
	"bio" text,
	"languages" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"locale" varchar(2) NOT NULL,
	"consent_to_publish" boolean DEFAULT false NOT NULL,
	"status" "verification_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "professional_applications_status_idx" ON "professional_applications" USING btree ("status");