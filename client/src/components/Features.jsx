import { ShieldCheck, Zap, Globe } from "lucide-react";

function Features({ darkMode }) {
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
    <section
      className={`py-24 transition-all duration-300 ${darkMode ? "bg-slate-950" : "bg-slate-50"
        }`}>
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2
          className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"
            }`}
        >
          Why Choose Reality Check AI?
        </h2>


        <p
          className={`mt-4 ${darkMode ? "text-slate-300" : "text-gray-600"
            }`}
        >
          Verify information confidently with AI-powered fact checking.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${darkMode
                ? "bg-slate-900 border border-slate-700 shadow-slate-900"
                : "bg-white shadow-lg"
                }`}            >
              {feature.icon}

              <h3
                className={`text-2xl font-bold mt-6 ${darkMode ? "text-white" : "text-gray-900"
                  }`}
              >{feature.title}
              </h3>

              <p
                className={`mt-3 ${darkMode ? "text-slate-300" : "text-gray-600"
                  }`}
              >
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