import { ShieldCheck, Zap, Globe } from "lucide-react";

function Mission({ darkMode }) {
  const missions = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      title: "Accuracy First",
      description:
        "We use AI and trusted sources to deliver reliable fact-checking results with high confidence.",
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "Fast Verification",
      description:
        "Verify news, claims, and online information within seconds using intelligent AI analysis.",
    },
    {
      icon: <Globe className="w-12 h-12 text-green-600" />,
      title: "Trusted Sources",
      description:
        "Our AI references reliable sources so users can make informed decisions confidently.",
    },
  ];

  return (
    <section
      id="mission"
      className={`py-24 transition-all duration-300 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-black ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Our Mission
          </h2>

          <p
            className={`mt-4 max-w-2xl mx-auto text-lg ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            We believe everyone deserves access to accurate information.
            Reality Check AI helps fight misinformation with intelligent,
            transparent, and trustworthy verification.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {missions.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${
                darkMode
                  ? "bg-slate-900 border border-slate-700"
                  : "bg-white shadow-lg"
              }`}
            >
              <div className="flex justify-center mb-6">
                {item.icon}
              </div>

              <h3
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`mt-4 leading-7 ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mission;