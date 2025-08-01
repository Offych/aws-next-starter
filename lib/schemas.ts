import { z } from "zod";
import { sanitizeString, sanitizeUrl, sanitizeJson, sanitizeDate } from "./utils";

// Environment enum for better type safety
export const EnvironmentEnum = z.enum(["test", "production", "development", "staging", "preprod"] as const);
export type Environment = z.infer<typeof EnvironmentEnum>;

export const stepOneSchema = z.object({
    projectName: z.string()
        .min(5, { message: "Project Name must be at least 5 characters long" })
        .max(50, { message: "Project name must be maximum 50 characters" })
        .transform(sanitizeString),
    team: z.string()
        .min(1, { message: "Team is required" })
        .max(20, { message: "Team must be at most 20 characters" })
        .transform(sanitizeString),
    link: z.string()
        .url({ message: "Must be a valid URL" })
        .transform(sanitizeUrl),
    projectDescription: z.string()
        .max(300, { message: "Project Description must be at most 300 characters" })
        .transform(sanitizeString)
        .optional()
        .or(z.literal("")),
    environment: EnvironmentEnum,
});

export const stepTwoSchema = z.object({
    modelName: z.string()
        .min(1, { message: "Model name is required" })
        .max(50, { message: "Model name must be at most 50 characters" })
        .transform(sanitizeString),
    provider: z.string()
        .min(1, { message: "Provider is required" })
        .max(30, { message: "Provider must be at most 30 characters" })
        .transform(sanitizeString),
    modelType: z.string()
        .min(5, { message: "Type must be at least 5 characters" })
        .max(100, { message: "Type must be at most 100 characters" })
        .transform(sanitizeString),
    modelFamily: z.string()
        .min(1, { message: "Family is required" })
        .max(30, { message: "Family must be at most 30 characters" })
        .transform(sanitizeString),
    launchDate: z.string()
        .min(1, { message: "Launch Date is required" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Launch Date must be in YYYY-MM-DD format" })
        .transform(sanitizeDate),
    discontinuationDate: z.string()
        .optional()
        .refine((date) => !date || /^\d{4}-\d{2}-\d{2}$/.test(date), {
            message: "Discontinuation date must be in YYYY-MM-DD format"
        }),
    contextWindow: z.string()
        .min(1, { message: "Context Window is required" })
        .regex(/^\d+$/, { message: "Context Window must be a whole number" })
        .transform(sanitizeString),
    params: z.string()
        .min(1, { message: "JSON Params are required" })
        .refine((val) => {
            try {
                JSON.parse(val);
                return true;
            } catch {
                return false;
            }
        }, { message: "Must be valid JSON format" })
        .transform(sanitizeJson),
    priceMlnInput: z.string()
        .min(1, { message: "Price per Mln token input is required" })
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number (up to 2 decimal places)" })
        .transform(sanitizeString),
    priceMlnOutput: z.string()
        .min(1, { message: "Price per Mln token output is required" })
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number (up to 2 decimal places)" })
        .transform(sanitizeString),
});

export const stepThreeSchema = z.object({
    apiKeyValue: z.array(z.string().min(1, { message: "API key name is required" })
        .max(50, { message: "API key name must be at most 50 characters" })
        .transform(sanitizeString))
        .max(6, 'Maximum 6 Api keys allowed...')
        .refine((keys) => new Set(keys.map(e => e.toLowerCase())).size === keys.length, 
            {message: 'Api Key Value must be unique'}),
        enabled: z.boolean()
    });


// Combined schema for the entire project
export const newProjectSchema = z.object({
    ...stepOneSchema.shape,
    ...stepTwoSchema.shape,
    ...stepThreeSchema.shape,
});



// Type exports
export type StepOne = z.infer<typeof stepOneSchema>;
export type StepTwo = z.infer<typeof stepTwoSchema>;
export type StepThree = z.infer<typeof stepThreeSchema>;
export type NewProject = z.infer<typeof newProjectSchema>;
