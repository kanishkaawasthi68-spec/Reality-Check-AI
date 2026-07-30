function ContactHero({ darkMode }) {
  return (
    <section
      className={`py-24 transition-all duration-300 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold">
          📞 Contact Us
        </span>

        <h1
          className={`mt-6 text-5xl md:text-6xl font-black ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          We'd Love to Hear From You
        </h1>

        <p
          className={`mt-6 max-w-3xl mx-auto text-lg leading-8 ${
            darkMode ? "text-slate-300" : "text-gray-600"
          }`}
        >
          Have questions, suggestions or feedback? Our team is here to help.
          Reach out and we'll get back to you as soon as possible.
        </p>
      </div>
    </section>
  );
}

export default ContactHero;