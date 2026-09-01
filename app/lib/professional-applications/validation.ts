// Zod schema for the "join the directory" self-serve professional
// application form (TED-26). Pure — no DB/env access.

import { z } from "zod";

import { isWeddingSupplierProfession } from "../heritage/wedding-categories";
import { isProfession } from "../professionals/categories";

/**
 * The intake pipeline is shared by two directories (TED-143): the licensed
 * professionals directory (`Profession` values) and the Ethiopian wedding
 * & henna supplier directory (`wedding-*` values). Only the professionals
 * vertical ever reads `Profession` back, so the namespaced supplier values
 * cannot leak into it.
 */
function isAcceptedProfession(value: string): boolean {
  return isProfession(value) || isWeddingSupplierProfession(value);
}

const PHONE_RE = /^\+?[\d\s\-()]{7,20}$/;

const regionsList = z
  .array(z.string().trim().min(1))
  .max(8, "regions_too_many")
  .default([]);

export const professionalApplicationSchema = z
  .object({
    name: z.string().trim().min(2, "name_too_short").max(200, "name_too_long"),
    profession: z.string().refine(isAcceptedProfession, "profession_invalid"),
    phone: z.string().trim().regex(PHONE_RE, "phone_invalid").max(32, "phone_too_long"),
    email: z
      .string()
      .trim()
      .email("email_invalid")
      .max(320, "email_too_long")
      .optional()
      .or(z.literal("").transform(() => undefined)),
    licenseNumber: z
      .string()
      .trim()
      .max(64, "license_too_long")
      .optional()
      .or(z.literal("").transform(() => undefined)),
    publishLicenseNumber: z
      .union([z.literal("on"), z.literal("true"), z.literal("")])
      .optional()
      .transform((v) => v === "on" || v === "true"),
    primaryRegions: regionsList,
    secondaryRegions: regionsList,
    nationwideRemote: z
      .union([z.literal("on"), z.literal("true"), z.literal("")])
      .optional()
      .transform((v) => v === "on" || v === "true"),
    bio: z.string().trim().max(1000, "bio_too_long").optional(),
    languages: z.array(z.string().trim().min(1)).min(1, "languages_required"),
    locale: z.enum(["he", "en", "am"]).default("he"),
    consentToPublish: z
      .union([z.literal("on"), z.literal("true")])
      .transform(() => true)
      .refine((v) => v === true, "consent_required"),
    // Honeypot — must be empty. Bots fill it; real users never see it.
    website: z.string().max(0, "honeypot_filled").optional(),
    turnstileToken: z.string().optional(),
  })
  .refine((v) => v.nationwideRemote || v.primaryRegions.length > 0, {
    message: "regions_required",
    path: ["primaryRegions"],
  })
  .refine((v) => v.primaryRegions.length <= 2, {
    message: "primary_regions_max_two",
    path: ["primaryRegions"],
  });

export type ProfessionalApplicationInput = z.infer<typeof professionalApplicationSchema>;
