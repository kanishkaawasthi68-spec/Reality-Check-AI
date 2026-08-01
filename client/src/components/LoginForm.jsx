import { useState } from "react";

function LoginForm({ darkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login feature coming soon!");
  };

  return (
    <section
      className={`py-16 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className={`rounded-2xl p-8 shadow-xl ${
            darkMode ? "bg-slate-900" : "bg-white"
          }`}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;