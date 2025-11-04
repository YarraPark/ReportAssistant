import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate school report using OpenRouter API
  app.post("/api/generate-report", async (req, res) => {
    try {
      const { studentInfo } = req.body;

      if (!studentInfo || typeof studentInfo !== "string" || !studentInfo.trim()) {
        return res.status(400).json({
          error: "Student information is required"
        });
      }

      // Check if API key is configured
      if (!process.env.OPENROUTER_API_KEY) {
        return res.status(500).json({
          error: "OpenRouter API key is not configured"
        });
      }

      // Call OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-sonnet",
          messages: [
            {
              role: "system",
              content: `You are an educational professional creating detailed school reports. Format your reports with the following sections:

1. **Academic Performance**: Provide a comprehensive overview of the student's academic achievements, grades, and subject-specific performance.

2. **Behavior and Social Skills**: Describe the student's behavior in class, interactions with peers and teachers, participation, and social development.

3. **Areas for Improvement**: Identify specific areas where the student needs to focus their efforts and develop further.

4. **Recommendations**: Provide actionable recommendations for the student, parents, and teachers to support the student's continued growth and success.

Keep the tone professional yet encouraging. Be specific and provide constructive feedback.`
            },
            {
              role: "user",
              content: `Please generate a comprehensive school report based on the following student information:\n\n${studentInfo}`
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("OpenRouter API error:", errorData);
        return res.status(response.status).json({
          error: "Failed to generate report from AI service",
          details: errorData
        });
      }

      const data = await response.json();
      const generatedReport = data.choices?.[0]?.message?.content;

      if (!generatedReport) {
        return res.status(500).json({
          error: "No report generated from AI service"
        });
      }

      res.json({ report: generatedReport });
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({
        error: "An error occurred while generating the report",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
