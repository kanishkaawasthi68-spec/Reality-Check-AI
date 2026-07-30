function ContactMap({ darkMode }) {
  return (
    <section
      className={`py-20 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`rounded-3xl h-96 flex items-center justify-center shadow-xl ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <div className="text-center">
            <div className="text-6xl">📍</div>

            <h2
              className={`mt-4 text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Location
            </h2>

            <p
              className={`mt-3 ${
                darkMode ? "text-slate-300" : "text-gray-600"
              }`}
            >
              Kanpur, Uttar Pradesh, India
            </p>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Google Maps integration coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMap;