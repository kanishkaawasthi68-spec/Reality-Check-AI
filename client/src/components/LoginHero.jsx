function LoginHero({ darkMode }) {
  return (
    <section
      className={`py-20 text-center ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-gray-900"
      }`}
    >
      <h1 className="text-5xl font-black">Welcome Back 👋</h1>

      <p className="mt-5 text-lg text-gray-500">
        Sign in to continue using Reality Check AI.
      </p>
    </section>
  );
}

export default LoginHero;