<<<<<<< HEAD
import {
  FiArrowUp,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";

import {
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import { navLinks } from "../data/portfolioData";
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function Footer() {
  const { personal } = usePortfolioData();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* =====================================================
            MAIN FOOTER
            ===================================================== */}

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

          {/* ===================================================
              BRAND
              =================================================== */}

          <div className="max-w-md">
            <button
              onClick={scrollTop}
              className="text-2xl font-bold text-white cursor-hover"
            >
              Yuraj<span className="text-highlight">.</span>
            </button>

            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Business Administration Graduate — Operations &
              Business Development Enthusiast.
            </p>

            {/* =================================================
                SOCIAL LINKS
                ================================================= */}

            <div className="flex items-center gap-3 mt-6">

              {/* LinkedIn */}

              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:text-highlight transition-all duration-300 glow-hover cursor-hover"
                >
                  <FiLinkedin size={17} />
                </a>
              )}

              {/* GitHub */}

              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:text-highlight transition-all duration-300 glow-hover cursor-hover"
                >
                  <FiGithub size={17} />
                </a>
              )}

              {/* Instagram */}

              {personal.instagram && (
                <a
                  href={personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:text-highlight transition-all duration-300 glow-hover cursor-hover"
                >
                  <FaInstagram size={17} />
                </a>
              )}

              {/* X / Twitter */}

              {personal.twitter && (
                <a
                  href={personal.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:text-highlight transition-all duration-300 glow-hover cursor-hover"
                >
                  <FaXTwitter size={16} />
                </a>
              )}

            </div>
          </div>

          {/* ===================================================
              NAVIGATION
              =================================================== */}

=======
import { FiArrowUp, FiMail, FiPhone } from "react-icons/fi";
import { navLinks, personal } from "../data/portfolioData";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/10 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="font-heading font-bold text-lg text-white mb-2">
              Yuraj<span className="text-highlight">.</span>
            </p>
            <p className="text-white/45 text-sm max-w-xs">
              Business Administration Graduate — Operations & Business Development Enthusiast.
            </p>
          </div>

>>>>>>> 3e28ed9 (fix vercel deployment issue)
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.to}
<<<<<<< HEAD
                onClick={() =>
                  document
                    .getElementById(link.to)
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
=======
                onClick={() => document.getElementById(link.to)?.scrollIntoView({ behavior: "smooth" })}
>>>>>>> 3e28ed9 (fix vercel deployment issue)
                className="text-sm text-white/55 hover:text-white transition-colors cursor-hover"
              >
                {link.label}
              </button>
            ))}
          </nav>

<<<<<<< HEAD
          {/* ===================================================
              CONTACT
              =================================================== */}

          <div className="flex flex-col gap-2">

            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors cursor-hover"
            >
              <FiMail />
              {personal.email}
            </a>

            <a
              href={`tel:${personal.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors cursor-hover"
            >
              <FiPhone />
              {personal.phone}
            </a>

          </div>
        </div>

        {/* =====================================================
            COPYRIGHT
            ===================================================== */}

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-white/35 text-center sm:text-left">
            © {new Date().getFullYear()} Yuraj Gupta. Designed &
            Developed using React + Tailwind CSS.
          </p>

=======
          <div className="flex flex-col gap-2">
            <a href={`mailto:${personal.email}`} className="flex items-center gap-2 text-sm text-white/55 hover:text-white cursor-hover">
              <FiMail /> {personal.email}
            </a>
            <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-white/55 hover:text-white cursor-hover">
              <FiPhone /> {personal.phone}
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Yuraj Gupta. Designed & Developed using React + Tailwind CSS.
          </p>
>>>>>>> 3e28ed9 (fix vercel deployment issue)
          <button
            onClick={scrollTop}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white glow-hover cursor-hover"
            aria-label="Back to top"
          >
            <FiArrowUp />
          </button>
<<<<<<< HEAD

=======
>>>>>>> 3e28ed9 (fix vercel deployment issue)
        </div>
      </div>
    </footer>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 3e28ed9 (fix vercel deployment issue)
