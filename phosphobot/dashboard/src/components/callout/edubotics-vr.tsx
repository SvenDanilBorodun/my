import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RectangleGoggles, TestTubeDiagonal } from "lucide-react";

const EDUBOTICS_PRO_SUBSCRIBE_URL = "https://edubotics.ai/pro";

export function EduBoticsVRCallout({ className }: { className?: string }) {
  return (
    <Card className={cn("border-blue-500 border-2", className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <RectangleGoggles className="text-blue-500 size-8" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-semibold text-xl mb-2">
                Unlock immersive VR learning
              </h3>
              <p className="text-muted-foreground">
                Experience robotics education like never before. Subscribe to EduBotics Pro
                for full VR classroom access, or try the Meta Store app for basic VR
                interaction. Choose the learning experience that fits your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Primary option - Subscription */}
              <div className="relative p-4 border-2 border-blue-500 rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                {/* <div className="absolute -top-2 left-3 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                  RECOMMENDED
                </div> */}
                <div className="flex items-center gap-2 mb-2">
                  <TestTubeDiagonal className="size-5 text-blue-600" />
                  <span className="font-semibold">Unlock with EduBotics Pro</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete VR learning environment, advanced AI training models, 
                  collaborative classrooms, and premium educational content
                </p>
                <Button asChild className="w-full">
                  <a
                    href={`${EDUBOTICS_PRO_SUBSCRIBE_URL}?utm_source=edubotics_app`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe to Pro
                  </a>
                </Button>
              </div>

              {/* Alternative option - Meta Store */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RectangleGoggles className="size-5 text-muted-foreground" />
                  <span className="font-semibold">
                    Alternative: Try the EduBotics VR app on the Meta Store
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Basic VR robotics interaction (limited educational features)
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <a
                    href="https://www.meta.com/en-gb/experiences/edubotics-learning/8873978782723478/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Free trial on the Meta Store
                  </a>
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 w-full">
              <p className="text-sm">
                <strong>Educational institution?</strong> Contact us for special 
                classroom licensing and bulk access to VR learning tools.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
