import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RectangleGoggles, Download } from "lucide-react";

const EDUBOTICS_VR_DOCS_URL = "https://docs.edubotics.ai/vr-setup";

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
                Experience VR Robotics Learning
              </h3>
              <p className="text-muted-foreground">
                Transform your robotics education with immersive VR experiences. 
                Control robots in virtual environments and learn through hands-on interaction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Primary option - Setup Guide */}
              <div className="relative p-4 border-2 border-blue-500 rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                <div className="absolute -top-2 left-3 bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                  RECOMMENDED
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Download className="size-5 text-blue-600" />
                  <span className="font-semibold">Setup VR Learning</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Follow our step-by-step guide to set up VR robotics on your 
                  Meta Quest headset. Free for all students!
                </p>
                <Button asChild className="w-full">
                  <a
                    href={`${EDUBOTICS_VR_DOCS_URL}?utm_source=edubotics_app`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Setup Guide
                  </a>
                </Button>
              </div>

              {/* Alternative option - Meta Store */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RectangleGoggles className="size-5 text-muted-foreground" />
                  <span className="font-semibold">
                    Try the EduBotics VR app
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Download our educational VR app from the Meta Store and start 
                  learning robotics in virtual reality.
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
                    Download from Meta Store
                  </a>
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 w-full">
              <p className="text-sm">
                <strong>Need help?</strong> Join our Discord community for VR setup support 
                and connect with other students learning robotics in VR.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
