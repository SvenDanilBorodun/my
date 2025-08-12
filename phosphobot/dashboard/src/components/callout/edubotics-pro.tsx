import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TestTubeDiagonal } from "lucide-react";

const EDUBOTICS_PRO_SUBSCRIBE_URL = "https://edubotics.ai/pro";

export function EduBoticsProCallout({ className }: { className?: string }) {
  return (
    <Card className={cn("border-blue-500 border-2 py-2 px-4", className)}>
      <CardContent className="flex items-center p-2">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <div>
            <TestTubeDiagonal className="text-blue-500 size-10" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-lg mb-1.5">
              Enhance your learning experience with{" "}
              <span className="text-blue-500">EduBotics Pro</span>
            </div>
            <div className="mb-3 text-muted-foreground">
              Access advanced robotics simulations, cutting-edge AI training models, 
              student collaboration tools, and exclusive educational content.
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button asChild>
              <a
                href={`${EDUBOTICS_PRO_SUBSCRIBE_URL}?utm_source=edubotics_app`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
