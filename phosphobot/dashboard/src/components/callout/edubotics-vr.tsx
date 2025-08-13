import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Construction } from "lucide-react";

export function EduBoticsVRCallout({ className }: { className?: string }) {
  return (
    <Card className={cn("border-orange-500 border-2", className)}>
      <CardContent className="p-8">
        <div className="flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Construction className="text-orange-500 size-12" />
            </div>
            <div>
              <h3 className="font-semibold text-2xl mb-2 text-orange-600 dark:text-orange-400">
                VR Experience Under Development
              </h3>
              <p className="text-muted-foreground text-lg">
                We're crafting an amazing VR robotics experience.
                <br />
                This feature will be available soon!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
