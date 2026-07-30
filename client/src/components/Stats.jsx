function Stats({ darkMode }) {
  const stats = [
    {
      number: "10K+",
      title: "Claims Verified",
    },
    {
      number: "95%",
      title: "AI Accuracy",
    },
    {
      number: "50+",
      title: "Trusted Sources",
    },
    {
      number: "<2s",
      title: "Average Response",
    },
  ];

  return (
    <section
      className={`py-24 transition-all duration-300 ${
        darkMode ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          className={`text-4xl font-black ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Reality Check AI in Numbers
        </h2>

        <p
          className={`mt-4 max-w-2xl mx-auto ${
            darkMode ? "text-slate-300" : "text-gray-600"
          }`}
        >
          Delivering fast, reliable and AI-powered fact checking with trusted
          information.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                darkMode
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-slate-50 shadow-lg"
              }`}
            >
              <h3 className="text-5xl font-black text-blue-600">
                {item.number}
              </h3>

              <p
                className={`mt-4 font-semibold ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;