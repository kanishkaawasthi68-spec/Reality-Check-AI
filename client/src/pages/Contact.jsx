import ContactHero from "../components/ContactHero";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import ContactMap from "../components/ContactMap";
import Footer from "../components/Footer";

function Contact({ darkMode }) {
  return (
    <>
      <ContactHero darkMode={darkMode} />
      <ContactInfo darkMode={darkMode} />
      <ContactForm darkMode={darkMode} />
      <ContactMap darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </>
  );
}

export default Contact;