import { Check, X } from "lucide-react";

export default function FeaturesTable() {
  const features = [
    { name: "Robot Control Interface", included: true, description: "Intuitive controls for various robot platforms" },
    { name: "AI Model Training", included: true, description: "Train your own robotics AI models" },
    { name: "AI Model Deployment", included: true, description: "Deploy and test your trained models" },
    {
      name: "VR Learning Experience", 
      included: true, 
      description: "Immersive VR robotics with Meta Quest support",
      link: "https://www.meta.com/en-gb/experiences/edubotics-learning/8873978782723478/",
      linkText: "EduBotics VR App"
    },
    { name: "Educational Resources", included: true, description: "Comprehensive tutorials and learning materials" },
    { name: "Community Support", included: true, description: "Active Discord community for learners" },
    { name: "Open Source Platform", included: true, description: "Contribute and customize for your needs" },
    { name: "Multi-Platform Support", included: true, description: "Works on Windows, macOS, and Linux" },
  ];

  const renderFeatureValue = (included: boolean) => {
    return included ? (
      <Check className="w-5 h-5 text-primary-blue" />
    ) : (
      <X className="w-5 h-5 text-medium-gray" />
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.1)] overflow-hidden border border-light-gray">
        {/* Header Row */}
        <div className="grid grid-cols-3 items-center bg-white border-b border-light-gray">
          <div className="p-6 font-bold text-dark-gray">EduBotics Features</div>
          <div className="p-6 text-center font-bold text-dark-gray">Included</div>
          <div className="p-6 text-center font-bold text-dark-gray bg-blue-50">
            Description
          </div>
        </div>

        {/* Feature Rows */}
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={
              "grid grid-cols-3 items-center border-b border-light-gray " +
              (idx === features.length - 1 ? "border-b-0" : "")
            }
          >
            <div className="p-4 flex flex-col justify-center min-h-[60px]">
              <div className="font-medium">{feature.name}</div>
              {feature.link && (
                <a
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-blue hover:text-primary-blue-dark underline transition-colors mt-1"
                >
                  {feature.linkText}
                </a>
              )}
            </div>
            <div className="p-4 text-center flex justify-center items-center min-h-[60px]">
              {renderFeatureValue(feature.included)}
            </div>
            <div className="p-4 bg-blue-50 text-center flex justify-center items-center min-h-[60px] h-full">
              <span className="text-sm text-medium-gray">{feature.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
