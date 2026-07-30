import { useState } from "react";

function ContactForm({ darkMode }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been sent.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      className={`py-20 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="max-w-3xl mx-auto px-6">
        <div
          className={`rounded-3xl shadow-xl p-8 ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white"
          }`}
        >
          <h2
            className={`text-3xl font-bold text-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Send us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className={`w-full rounded-xl px-5 py-4 outline-none border transition-all ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-gray-50 border-gray-300"
              } focus:ring-2 focus:ring-blue-500`}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className={`w-full rounded-xl px-5 py-4 outline-none border transition-all ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-gray-50 border-gray-300"
              } focus:ring-2 focus:ring-blue-500`}
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={`w-full rounded-xl px-5 py-4 outline-none border transition-all ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-gray-50 border-gray-300"
              } focus:ring-2 focus:ring-blue-500`}
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              required
              className={`w-full rounded-xl px-5 py-4 outline-none border resize-none transition-all ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-gray-50 border-gray-300"
              } focus:ring-2 focus:ring-blue-500`}
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;