import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from 'react-router-dom'
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <Navbar title="Reality Check AI"
        buttonText="login"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

  );
}

export default App;