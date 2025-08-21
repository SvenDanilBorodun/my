import { EduBoticsExplorerCallout } from "@/components/callout/edubotics-explorer";
import { AIControlDisclaimer } from "@/components/common/ai-control-disclaimer";
import { HuggingFaceKeyInput } from "@/components/common/huggingface-key";
import { CardContent } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetcher } from "@/lib/utils";
import { AdminTokenSettings, ServerStatus } from "@/types";
import {
  AlertTriangle,
  BrainCircuit,
  Camera,
  Code,
  Dumbbell,
  FileCog,
  FolderOpen,
  Network,
  Play,
  Settings,
  Sliders,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { motion } from "framer-motion";

function RobotStatusAlert({
  serverStatus,
  isLoading,
  robotConnected,
}: {
  serverStatus?: ServerStatus;
  isLoading: boolean;
  robotConnected: boolean;
}) {
  if (isLoading) {
    return (
      <StatusIndicator 
        status="loading" 
        size="md" 
        variant="premium"
        label="Status: Loading"
        description="Loading robot status..."
        showPulse={false}
      />
    );
  }

  if (!serverStatus) {
    return (
      <StatusIndicator 
        status="error" 
        size="md" 
        variant="premium"
        label="Status: Communication Error"
        description="Error fetching robot status. Please check the server connection."
        showPulse={false}
      />
    );
  }

  if (robotConnected) {
    return (
      <StatusIndicator 
        status="connected" 
        size="md" 
        variant="premium"
        label="Status: Connected"
        description="Robot is connected and ready to control."
        showPulse={false}
      />
    );
  } else {
    return (
      <StatusIndicator 
        status="disconnected" 
        size="md" 
        variant="premium"
        label="Status: Disconnected"
        description="Check the robot is plugged to your computer and powered on. Unplug and plug cables again if needed."
        showPulse={false}
      />
    );
  }
}

function AIModelsCard() {
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();

  const { data: adminSettingsTokens, isLoading } = useSWR<AdminTokenSettings>(
    ["/admin/settings/tokens"],
    ([url]) => fetcher(url, "POST"),
  );

  const handleControlByAI = () => {
    if (localStorage.getItem("disclaimer_accepted") === "true") {
      navigate(`/inference`);
      return;
    }
    setShowWarning(true);
  };

  const onProceed = () => {
    setShowWarning(false);
    localStorage.setItem("disclaimer_accepted", true.toString());
    navigate(`/inference`);
  };

  return (
    <>
      <GlassCard 
        variant="premium" 
        gradient="blue" 
        hover="lift" 
        border="animated"
        className="md:min-h-[25vh] relative overflow-hidden"
      >
        <CardContent className="flex flex-col md:flex-row py-8 relative z-10">
          <div className="flex-1 md:flex-1/3 mb-6 md:mb-0">
            <div className="flex items-center gap-4 text-xl font-bold mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover-glow">
                <BrainCircuit className="size-7" />
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent text-2xl font-extrabold">
                  AI Training & Control
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="size-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground font-normal">Next-gen robotics</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Teach your robot new skills with cutting-edge machine learning models.
              Experience the future of human-robot collaboration.
            </div>
          </div>
          <div className="flex-1 md:flex-2/3">
            <div className="flex flex-col gap-y-4">
              {!isLoading && !adminSettingsTokens?.huggingface && (
                <div className="mb-4">
                  <HuggingFaceKeyInput />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ActionButton
                      variant="glass"
                      size="lg"
                      onClick={() => navigate("/train")}
                      disabled={!adminSettingsTokens?.huggingface}
                      icon={<Dumbbell className="size-5" />}
                      iconPosition="left"
                      glow={!!adminSettingsTokens?.huggingface}
                    >
                      Train AI Model
                    </ActionButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      Once you have recorded a dataset, you can train an AI
                      model. Make sure you have a HuggingFace account and a
                      valid API key.
                    </div>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ActionButton
                      variant="gradient"
                      size="lg"
                      gradient="rainbow"
                      onClick={handleControlByAI}
                      disabled={!adminSettingsTokens?.huggingface}
                      icon={<ArrowRight className="size-5" />}
                      iconPosition="right"
                      glow={!!adminSettingsTokens?.huggingface}
                      pulse={!!adminSettingsTokens?.huggingface}
                    >
                      AI Control
                    </ActionButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      After training your AI model, let your AI model control
                      the robot.
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </GlassCard>
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent className="sm:max-w-md border-amber-300 border">
          <DialogHeader className="bg-amber-50 dark:bg-amber-950/20 p-4 -m-4 rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-16 text-red-500 mr-2" />
              <DialogTitle className="text-bold font-bold tracking-tight">
                You are about to surrender control to an artificial intelligence
                system.
              </DialogTitle>
            </div>
          </DialogHeader>

          <AIControlDisclaimer />

          <DialogFooter className="gap-x-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setShowWarning(false)}
              className="border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button variant="default" onClick={onProceed}>
              I Understand the Risks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: serverStatus, isLoading } = useSWR<ServerStatus>(
    ["/status"],
    ([url]) => fetcher(url),
    {
      refreshInterval: 5000,
    },
  );
  const robotConnected =
    serverStatus !== undefined &&
    serverStatus.robots &&
    serverStatus.robots.length > 0;

  return (
    <div className="flex flex-col gap-8 p-1 relative">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-20 pointer-events-none" />
      
      {/* EduBotics Explorer Callout */}
      <EduBoticsExplorerCallout />
      
      {/* Control Section */}
      <GlassCard 
        variant="premium" 
        gradient="emerald" 
        hover="lift" 
        border="glow"
        className="md:min-h-[25vh] relative overflow-hidden"
      >
        <CardContent className="w-full flex flex-col md:flex-row gap-8 py-8 relative z-10">
          <div className="flex-1 md:flex-1/3">
            <div className="flex items-center gap-4 text-xl font-bold mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg hover-float">
                <Play className="size-7" />
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent text-2xl font-extrabold">
                  Control & Record
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Zap className="size-4 text-emerald-500" />
                  <span className="text-sm text-muted-foreground font-normal">Real-time control</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Control the robot with your keyboard, a leader arm, or a VR
              headset. Record and replay movements. Build comprehensive datasets.
            </div>
          </div>

          <div className="flex-1 md:flex-2/3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <RobotStatusAlert
                  serverStatus={serverStatus}
                  isLoading={isLoading}
                  robotConnected={robotConnected}
                />
              </div>

              <div>
                <ActionButton
                  variant="gradient"
                  size="xl"
                  gradient="emerald"
                  disabled={!robotConnected}
                  onClick={() => {
                    if (!robotConnected) return;
                    navigate("/control");
                  }}
                  icon={<Play className="size-5" />}
                  iconPosition="left"
                  glow={robotConnected}
                  pulse={robotConnected}
                  className="w-full h-full min-h-[80px]"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">Control Robot</span>
                    <span className="text-xs opacity-90">Start teleoperation</span>
                  </div>
                </ActionButton>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionButton
                variant="glass"
                size="lg"
                onClick={() => navigate("/browse")}
                icon={<FolderOpen className="size-5" />}
                iconPosition="left"
              >
                Browse Datasets
              </ActionButton>
              <ActionButton
                variant="glass"
                size="lg"
                onClick={() => navigate("/calibration")}
                icon={<Sliders className="size-5" />}
                iconPosition="left"
              >
                Calibration
              </ActionButton>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      {/* AI Models */}
      <div>
        <AIModelsCard />
      </div>

      {/* Advanced Settings */}
      <GlassCard 
        variant="premium" 
        gradient="purple" 
        hover="lift" 
        border="animated"
        className="md:min-h-[25vh] relative overflow-hidden"
      >
        <CardContent className="flex flex-col md:flex-row gap-8 py-8 relative z-10">
          <div className="flex-1 md:flex-1/3">
            <div className="flex items-center gap-4 text-xl font-bold mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg hover-glow">
                <Settings className="size-7" />
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent text-2xl font-extrabold">
                  Advanced Settings
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Settings className="size-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground font-normal">System config</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Configure the server and robot settings. Access API documentation
              and system management tools.
            </div>
          </div>
          <div className="flex-1 md:flex-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ActionButton
                variant="premium"
                size="lg"
                onClick={() => navigate("/admin")}
                icon={<FileCog className="size-5" />}
                iconPosition="left"
                glow
              >
                Admin Configuration
              </ActionButton>
              <ActionButton
                variant="premium"
                size="lg"
                onClick={() => window.open("/docs", "_blank")}
                icon={<Code className="size-5" />}
                iconPosition="left"
                glow
              >
                API Documentation
              </ActionButton>
              <ActionButton
                variant="glass"
                size="lg"
                onClick={() => navigate("/viz")}
                icon={<Camera className="size-5" />}
                iconPosition="left"
              >
                Camera Overview
              </ActionButton>
              <ActionButton
                variant="glass"
                size="lg"
                onClick={() => navigate("/network")}
                icon={<Network className="size-5" />}
                iconPosition="left"
              >
                Network Management
              </ActionButton>
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
