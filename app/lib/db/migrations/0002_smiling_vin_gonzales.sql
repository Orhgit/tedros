CREATE TABLE IF NOT EXISTS "subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"locale" "locale" DEFAULT 'he' NOT NULL,
	"user_id" uuid,
	"confirmed_at" timestamp with time zone,
	"confirmation_token" text,
	"unsubscribe_token" text NOT NULL,
	"interests" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "subscribers_email_unique" ON "subscribers" USING btree ("email") WHERE "subscribers"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "subscribers_confirmation_token_unique" ON "subscribers" USING btree ("confirmation_token") WHERE "subscribers"."confirmation_token" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "subscribers_unsubscribe_token_unique" ON "subscribers" USING btree ("unsubscribe_token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscribers_user_idx" ON "subscribers" USING btree ("user_id");