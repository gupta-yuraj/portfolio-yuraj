<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioSite from "./pages/PortfolioSite";
import AdminApp from "./admin/AdminApp";
import { PortfolioDataProvider } from "./context/PortfolioDataContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PortfolioDataProvider>
              <PortfolioSite />
            </PortfolioDataProvider>
          }
        />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
=======
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Background from "./components/Background";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certification from "./components/Certification";
import Languages from "./components/Languages";
import Attributes from "./components/Attributes";
import WhyHireMe from "./components/WhyHireMe";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useLenis from "./hooks/useLenis";

function App() {
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
>>>>>>> 3e28ed9 (fix vercel deployment issue)
  );
}

export default App;
