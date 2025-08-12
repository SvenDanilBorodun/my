"use client";

import { Button } from "@/components/ui/button";

export default function FinalCTASection() {
  return (
    <section className="py-16 px-8 bg-gray-background">
      <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-card">
        <h2 className="text-3xl font-headline font-bold text-dark-gray mb-4">
          Start learning robotics today.
        </h2>

        <p className="text-medium-gray mb-8">
          Join thousands of students learning robotics and AI. Completely free.
        </p>

        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-4xl font-bold text-blue-600">Free</span>
          <span className="text-medium-gray">forever</span>
        </div>

        <Button
          className="w-full bg-primary-blue hover:bg-primary-blue-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          onClick={() =>
            window.open(
              "https://docs.edubotics.ai/getting-started",
              "_blank"
            )
          }
        >
          Get Started →
        </Button>
      </div>
    </section>
  );
}
