import Loader from "../components/Loader";
import Cursor from "../components/Cursor";
import Background from "../components/Background";
import ScrollProgress from "../components/ScrollProgress";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certification from "../components/Certification";
import Languages from "../components/Languages";
import Attributes from "../components/Attributes";
import WhyHireMe from "../components/WhyHireMe";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import useLenis from "../hooks/useLenis";

export default function PortfolioSite() {
  useLenis();

  return (
    <div className="relative font-body text-white">
      <Loader />
      <Cursor />
      <Background />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certification />
        <Languages />
        <Attributes />
        <WhyHireMe />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
