import { Link } from "react-router-dom";

function AboutCTA({ darkMode }) {
  return (
    <section
      className={`py-24 transition-all duration-300 ${darkMode ? "bg-slate-900" : "bg-white"
        }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div
          className={`rounded-3xl p-12 text-center shadow-2xl transition-all duration-300 ${darkMode
              ? "bg-slate-800 border border-slate-700"
              : "bg-blue-600"}`}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Ready to Verify Information?
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-100">
            Stop believing misinformation. Verify news, social media posts and
            online claims instantly using AI-powered analysis backed by trusted
            sources.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/"
              className="px-8 py-4 rounded-2xl bg-white text-blue-600 font-bold shadow-xl hover:scale-105 transition-all duration-300"
            >
              🔍 Start Verifying
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              📩 Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;