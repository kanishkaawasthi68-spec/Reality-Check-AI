import {
  FileText,
  SearchCheck,
  Brain,
  BadgeCheck,
} from "lucide-react";

function HowItWorks({ darkMode }) {
  const steps = [
    {
      icon: <FileText className="w-10 h-10 text-blue-600" />,
      title: "Enter a Claim",
      description:
        "Type or paste any news, statement, article, or URL that you want to verify.",
    },
    {
      icon: <SearchCheck className="w-10 h-10 text-green-600" />,
      title: "AI Analysis",
      description:
        "Reality Check AI analyzes the claim using trusted sources and intelligent verification.",
    },
    {
      icon: <Brain className="w-10 h-10 text-purple-600" />,
      title: "Confidence Score",
      description:
        "Our AI evaluates the reliability of the claim and assigns a confidence percentage.",
    },
    {
      icon: <BadgeCheck className="w-10 h-10 text-orange-500" />,
      title: "Get Verified Result",
      description:
        "Receive the final verdict along with reasons and trusted references.",
    },
  ];

  return (
    <section
      className={`py-24 transition-all duration-300 ${
        darkMode ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-black ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            How It Works
          </h2>

          <p
            className={`mt-4 max-w-2xl mx-auto text-lg ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Verify information in just four simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${
                darkMode
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-slate-50 shadow-lg"
              }`}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>

              <div className="flex justify-center mt-8 mb-6">
                {step.icon}
              </div>

              <h3
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {step.title}
              </h3>

              <p
                className={`mt-4 leading-7 ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;