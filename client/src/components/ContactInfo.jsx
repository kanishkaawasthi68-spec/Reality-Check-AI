function ContactInfo({ darkMode }) {
  const contactDetails = [
    {
      icon: "📧",
      title: "Email",
      value: "kanishkaawasthi68@gmail.com",
      link: "mailto:kanishkaawasthi68@gmail.com",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "www.linkedin.com/in/kanishka-awasthi-81b98a291",
      link: "https://www.linkedin.com/in/kanishka-awasthi-81b98a291",
    },
    {
      icon: "💻",
      title: "GitHub",
      value: "github.com/kanishkaawasthi68-spec",
      link: "https://github.com/kanishkaawasthi68-spec",
    },
    {
      icon: "📍",
      title: "Location",
      value: "Kanpur, Uttar Pradesh, India",
    },
  ];

  return (
    <section
      className={`py-20 transition-all duration-300 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                darkMode
                  ? "bg-slate-900 border border-slate-700"
                  : "bg-white"
              }`}
            >
              <div className="text-5xl mb-5">{item.icon}</div>

              <h3
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h3>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 block break-all hover:text-blue-500 transition-colors duration-300 ${
                    darkMode ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  {item.value}
                </a>
              ) : (
                <p
                  className={`mt-3 ${
                    darkMode ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;