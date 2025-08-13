import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, Users } from "lucide-react";

export function EduBoticsExplorerCallout({ className }: { className?: string }) {
  return (
    <Card className={cn("glass border-gradient-animated bg-gradient-to-r from-blue-500/20 to-green-500/20 border-2 hover-lift py-3 px-6", className)}>
      <CardContent className="flex items-center p-3">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <div className="relative">
              <GraduationCap className="text-blue-500 size-10" />
              <BookOpen className="absolute -top-1 -right-1 text-green-500 size-4" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-lg mb-1.5 flex items-center gap-2">
              Welcome to EduBotics!{" "}
              <Users className="text-green-500 size-5" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                Learn & Create
              </span>
            </div>
            <div className="mb-3 text-muted-foreground">
              Your educational robotics platform is ready! Start learning robotics with real hardware, 
              build AI models, and explore the exciting world of autonomous systems.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}