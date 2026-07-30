import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  return (
    <div
      className={
        darkMode
          ? "bg-slate-950 text-white min-h-screen"
          : "bg-slate-50 text-black min-h-screen"
      }
    >
      <Navbar
        title="Reality Check AI"
        buttonText="Login"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Routes>
        <Route
          path="/"
          element={<Home darkMode={darkMode} />}
        />

        <Route
          path="/about"
          element={<About darkMode={darkMode} />}
        />

        <Route
          path="/contact"
          element={<Contact darkMode={darkMode} />}
        />

        <Route
          path="/login"
          element={<Login darkMode={darkMode} />}
        />
      </Routes>
    </div>
  );
}

export default App;