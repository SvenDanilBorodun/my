import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

const EDUBOTICS_DOCS_URL = "https://docs.edubotics.ai";

export function EduBoticsHelpCallout({ className }: { className?: string }) {
  return (
    <Card className={cn("border-blue-500 border-2 py-2 px-4", className)}>
      <CardContent className="flex items-center p-2">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <div>
            <GraduationCap className="text-blue-500 size-10" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-lg mb-1.5">
              New to robotics?{" "}
              <span className="text-blue-500">Start Learning Here!</span>
            </div>
            <div className="mb-3 text-muted-foreground">
              Explore our step-by-step tutorials, educational resources, and community 
              projects to master robotics and AI. Perfect for students and beginners.
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button asChild>
              <a
                href={`${EDUBOTICS_DOCS_URL}?utm_source=edubotics_app`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Learning
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
