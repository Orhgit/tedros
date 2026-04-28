CREATE TYPE "public"."lead_eligibility_outcome" AS ENUM('eligible', 'ineligible');--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "eligibility_outcome" "lead_eligibility_outcome";--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "eligibility_reasons" text[] DEFAULT ARRAY[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "self_reported_monthly_income" numeric(10, 2);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_eligible_agency_idx" ON "leads" USING btree ("agency_id","created_at") WHERE "leads"."eligibility_outcome" = 'eligible';