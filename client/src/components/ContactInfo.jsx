function ContactInfo({ darkMode }) {
  const contactDetails = [
    {
      icon: "📧",
      title: "Email",
      value: "support@realitycheckai.com",
    },
    {
      icon: "📞",
      title: "Phone",
      value: "+91 98765 43210",
    },
    {
      icon: "📍",
      title: "Location",
      value: "Kanpur, Uttar Pradesh, India",
    },
    {
      icon: "⏰",
      title: "Working Hours",
      value: "Mon - Fri | 9:00 AM - 6:00 PM",
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

              <p
                className={`mt-3 ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;