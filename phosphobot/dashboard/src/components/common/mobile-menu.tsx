import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  BrainCircuit,
  Camera,
  Code,
  Dumbbell,
  FileCog,
  FolderOpen,
  Home,
  Network,
  Play,
  Sliders,
} from "lucide-react";
import { Menu } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export function MobileMenu() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4 w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-left">Navigation Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground px-2">
              Navigation
            </h3>
            <Link
              to="/"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/" ? "bg-accent" : "hover:bg-accent/50"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground px-2">
              Control & Record
            </h3>
            <Link
              to="/control"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/control" ? "bg-accent" : "hover:bg-accent/50"
              }`}
            >
              <Play className="h-4 w-4 text-blue-600" />
              Control Robot
            </Link>
            <Link
              to="/browse"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath.startsWith("/browse")
                  ? "bg-accent"
                  : "hover:bg-accent/50"
              }`}
            >
              <FolderOpen className="h-4 w-4" />
              Browse Datasets
            </Link>
            <Link
              to="/calibration"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/calibration"
                  ? "bg-accent"
                  : "hover:bg-accent/50"
              }`}
            >
              <Sliders className="h-4 w-4" />
              Calibration
            </Link>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground px-2">
              AI & Training
            </h3>
            <Link
              to="/train"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/train" ? "bg-accent" : "hover:bg-accent/50"
              }`}
            >
              <Dumbbell className="h-4 w-4" />
              AI Training
            </Link>
            <Link
              to="/inference"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/inference"
                  ? "bg-accent"
                  : "hover:bg-accent/50"
              }`}
            >
              <BrainCircuit className="h-4 w-4" />
              AI Control
            </Link>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground px-2">
              Advanced Settings
            </h3>
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/admin" ? "bg-accent" : "hover:bg-accent/50"
              }`}
            >
              <FileCog className="h-4 w-4" />
              Admin Configuration
            </Link>
            <Link
              to="/docs"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/docs" ? "bg-accent" : "hover:bg-accent/50"
              }`}
            >
              <Code className="h-4 w-4" />
              API Documentation
            </Link>
            <Link
              to="/viz"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/viz" ? "bg-accent" : "hover:bg-accent/50"
              }`}
            >
              <Camera className="h-4 w-4" />
              Camera Overview
            </Link>
            <Link
              to="/network"
              className={`flex items-center gap-3 px-2 py-1.5 rounded-md ${
                currentPath === "/network" ? "bg-accent" : "hover:bg-accent/50"
              }`}
            >
              <Network className="h-4 w-4" />
              Network Management
            </Link>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground px-2">
              Preferences
            </h3>
            <div className="flex items-center gap-3 px-2 py-1.5">
              <ThemeToggle />
              <span className="text-sm">Theme</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
