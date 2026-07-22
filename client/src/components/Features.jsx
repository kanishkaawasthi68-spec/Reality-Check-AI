import { ShieldCheck, Zap, Globe } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      title: "Reliable Verification",
      description:
        "AI analyzes claims using trusted information and provides an evidence-based verdict.",
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-500" />,
      title: "Fast Results",
      description:
        "Get AI-powered verification within seconds with confidence scores.",
    },
    {
      icon: <Globe className="w-10 h-10 text-green-600" />,
      title: "Trusted Sources",
      description:
        "View reliable references and sources to understand why a claim is true or false.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Why Choose Reality Check AI?
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Verify information confidently with AI-powered fact checking.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
            >
              {feature.icon}

              <h3 className="text-xl font-bold mt-5">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;