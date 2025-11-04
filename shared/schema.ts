import { z } from "zod";

// No database needed - this is a stateless app
// Schema for report generation request
export const reportRequestSchema = z.object({
  studentInfo: z.string().min(1, "Please enter student information"),
});

export type ReportRequest = z.infer<typeof reportRequestSchema>;

// Schema for report response (placeholder structure for future LLM integration)
export const reportResponseSchema = z.object({
  generatedAt: z.string(),
  content: z.string(),
});

export type ReportResponse = z.infer<typeof reportResponseSchema>;
