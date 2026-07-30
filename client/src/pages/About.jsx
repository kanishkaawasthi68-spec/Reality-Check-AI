import AboutHero from "../components/AboutHero";
import Mission from "../components/Mission";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Creator from "../components/Creator";
import AboutCTA from "../components/AboutCTA";
import Footer from "../components/Footer";

function About({ darkMode }) {
  return (
    <>
      <AboutHero darkMode={darkMode} />
      <Mission darkMode={darkMode} />
      <HowItWorks darkMode={darkMode} />
      <Stats darkMode={darkMode} />
      <Creator darkMode={darkMode} />
      <AboutCTA darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </>
  );
}

export default About;