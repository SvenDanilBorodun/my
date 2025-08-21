import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GraduationCap, Users } from "lucide-react";

export function EduBoticsExplorerCallout({ className }: { className?: string }) {
  return (
    <Card className={cn("glass bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-200/30 hover:border-blue-300/40 transition-all duration-300 py-4 px-6 rounded-2xl", className)}>
      <CardContent className="flex items-center p-0">
        <div className="flex flex-row items-center gap-6 w-full">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-green-600 text-white shadow-lg">
              <GraduationCap className="size-8" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-bold text-xl mb-2 flex items-center gap-3">
              <span className="text-foreground">Welcome to EduBotics!</span>
              <Users className="text-green-500 size-5" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 font-extrabold">
                Learn & Create
              </span>
            </div>
            <div className="text-muted-foreground leading-relaxed">
              Your educational robotics platform is ready! Start learning robotics with real hardware, 
              build AI models, and explore the exciting world of autonomous systems.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}