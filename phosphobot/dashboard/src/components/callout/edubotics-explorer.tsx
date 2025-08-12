import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles, Rocket, Brain } from "lucide-react";

const EDUBOTICS_EXPLORE_URL = "https://docs.edubotics.ai/advanced-features";

export function EduBoticsExplorerCallout({ className }: { className?: string }) {
  return (
    <Card className={cn("border-gradient bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-2 py-2 px-4", className)}>
      <CardContent className="flex items-center p-2">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Rocket className="text-purple-500 size-10" />
              <Sparkles className="absolute -top-1 -right-1 text-blue-500 size-4" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-lg mb-1.5 flex items-center gap-2">
              Unlock Advanced Features!{" "}
              <Brain className="text-blue-500 size-5" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                Explorer Mode
              </span>
            </div>
            <div className="mb-3 text-muted-foreground">
              Access cutting-edge AI models, advanced training tools, and experimental features. 
              Perfect for students ready to push the boundaries of robotics and AI learning.
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button 
              asChild 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              <a
                href={`${EDUBOTICS_EXPLORE_URL}?utm_source=edubotics_app`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Now
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}