import { z } from "zod";
import { site } from "@/content/site";

export const matterOptions = [
  ...site.practiceAreas.map((p) => ({ value: p.slug, label: p.title })),
  { value: "other", label: "Other" },
];
const matterValues = matterOptions.map((o) => o.value) as [string, ...string[]];

export const DESCRIPTION_MAX = 1000;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120, "Keep the name within 120 characters."),
  phone: z
    .string()
    .trim()
    .max(25, "Enter a valid phone number.")
    .regex(/^\+?[0-9][0-9\s().-]*$/, "Enter a valid phone number, using digits only.")
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 15;
    }, "Enter a phone number of 10 to 15 digits."),
  email: z.email("Enter a valid email address.").max(200, "Keep the email address within 200 characters."),
  matter: z.enum(matterValues, { error: "Choose the nature of the matter." }),
  deadline: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || (/^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))), "Enter a valid date."),
  description: z
    .string()
    .trim()
    .min(10, "Describe the matter briefly, in at least 10 characters.")
    .max(DESCRIPTION_MAX, `Keep the description within ${DESCRIPTION_MAX.toLocaleString("en-IN")} characters.`),
  documents: z.string().trim().max(DESCRIPTION_MAX, "Keep this within 1,000 characters.").optional(),
  consent: z.literal("on", { error: "Please tick the box to give your consent." }),
  /** Honeypot. Real visitors never see or fill this field. */
  website: z.string().optional(),
});

export type EnquiryField = keyof z.infer<typeof enquirySchema>;
export type EnquiryFieldErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors: EnquiryFieldErrors }
  | { status: "success" };
