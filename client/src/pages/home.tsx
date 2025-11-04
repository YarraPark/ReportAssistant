import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Eraser, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [studentInfo, setStudentInfo] = useState("");
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Placeholder function for future LLM integration
  const generateReport = async () => {
    if (!studentInfo.trim()) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: "Please enter student information to generate a report.",
      });
      return;
    }

    setIsGenerating(true);

    // TODO: LLM Integration will go here
    // This is where we'll connect to an LLM API (OpenAI, Anthropic, etc.)
    // to generate actual school reports based on the student information
    // For now, this is just a placeholder implementation
    console.log("🚀 LLM Integration Point:");
    console.log("Input:", studentInfo);
    console.log("Next step: Connect to LLM API to generate report");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Placeholder report for demonstration
    const placeholderReport = `STUDENT REPORT PREVIEW
Generated on: ${new Date().toLocaleString()}

[This is where the AI-generated report will appear]

Student Information Received:
${studentInfo}

---
Next Steps:
• Integrate LLM API (OpenAI GPT-4, Anthropic Claude, etc.)
• Define report structure and formatting
• Add report templates and customization options
• Implement error handling and validation
• Add export/download functionality`;

    setGeneratedReport(placeholderReport);
    setIsGenerating(false);

    toast({
      title: "Report Generated",
      description: "This is a placeholder. LLM integration coming soon!",
    });
  };

  const handleClear = () => {
    setStudentInfo("");
    setGeneratedReport(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-medium text-foreground">
              School Report Generator
            </h1>
          </div>
          <p className="text-base text-muted-foreground">
            Enter student information to generate a comprehensive report
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <Textarea
              id="student-info"
              data-testid="input-student-info"
              placeholder="Enter student information here...&#10;&#10;Example:&#10;Name: John Smith&#10;Grade: 10&#10;Subject: Mathematics&#10;Performance: Excellent in algebra, needs improvement in geometry"
              value={studentInfo}
              onChange={(e) => setStudentInfo(e.target.value)}
              className="min-h-48 text-base resize-none focus:ring-2 focus:ring-primary/20 border-2"
              aria-label="Student information input"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              data-testid="button-generate"
              onClick={generateReport}
              disabled={isGenerating}
              size="lg"
              className="px-8"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
            <Button
              data-testid="button-clear"
              onClick={handleClear}
              variant="secondary"
              size="lg"
              className="px-8"
            >
              <Eraser className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* Report Display Area */}
        {generatedReport && (
          <Card className="p-8 mt-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-medium text-foreground">
                  Generated Report
                </h2>
              </div>
              <div
                data-testid="text-report-content"
                className="whitespace-pre-wrap text-base leading-relaxed text-foreground"
              >
                {generatedReport}
              </div>
            </div>
          </Card>
        )}

        {/* Empty State Placeholder */}
        {!generatedReport && (
          <div className="mt-16 text-center">
            <div className="bg-muted/30 border border-border rounded-lg p-8 min-h-64 flex items-center justify-center">
              <p className="text-muted-foreground italic">
                Generated reports will appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
