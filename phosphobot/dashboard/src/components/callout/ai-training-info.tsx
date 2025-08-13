import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BrainCircuit, Database, Bot } from "lucide-react";

export function AITrainingInfoCallout({ className }: { className?: string }) {
  return (
    <Card className={cn("glass border-gradient-animated bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 hover-lift py-3 px-6", className)}>
      <CardContent className="flex items-center p-3">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <div className="relative">
              <BrainCircuit className="text-blue-500 size-10" />
              <Database className="absolute -top-1 -right-1 text-purple-500 size-4" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-lg mb-1.5 flex items-center gap-2">
              Train Vision Language Action Models{" "}
              <Bot className="text-purple-500 size-5" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                VLA Training
              </span>
            </div>
            <div className="mb-3 text-muted-foreground">
              Transform recorded robot demonstrations into intelligent behavior models. Train custom AI models 
              that learn from your robot's movements and camera data to perform autonomous tasks.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}