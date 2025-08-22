"use client";

interface PricingCardProps {
  userEmail?: string | null;
}

export default function CommunityCard({ }: PricingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.1)] p-6 sm:p-8 max-w-sm mx-auto lg:mx-0 lg:ml-8">
      <h2 className="text-2xl sm:text-4xl font-headline text-gray-900 mb-2">
        Join our learning community.
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        Connect with fellow students, get help, and share your robotics projects.
      </p>
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-2xl sm:text-3xl font-bold text-blue-600">
            Free
          </span>
          <span className="text-gray-600 ml-1">forever</span>
        </div>
      </div>
      <button 
        onClick={() => window.open('https://discord.gg', '_blank')}
        className="w-full bg-primary-blue hover:bg-primary-blue-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Join Discord Community
      </button>
    </div>
  );
}
