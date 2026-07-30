import LoginHero from "../components/LoginHero";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function Login({ darkMode }) {
  return (
    <>
      <LoginHero darkMode={darkMode} />
      <LoginForm darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </>
  );
}

export default Login;