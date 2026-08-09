import { motion } from "framer-motion";
import { FiDownload, FiMail, FiArrowDown } from "react-icons/fi";
import { usePortfolioData } from "../context/PortfolioDataContext";
import MagneticButton from "./MagneticButton";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const { personal, heroSubtitle, dashboardMetrics, resumeUrl } = usePortfolioData();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="text-highlight font-medium tracking-wide mb-4">
            Hello,
          </motion.p>
          <motion.h1
            variants={item}
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6"
          >
            I'm <span className="gradient-text">{personal.name}</span>
          </motion.h1>
          <motion.div variants={item} className="mb-6 space-y-1">
            <p className="text-lg sm:text-xl text-white/85 font-medium">Business Administration Graduate</p>
            <p className="text-base sm:text-lg text-white/55">Operations & Business Development Enthusiast</p>
          </motion.div>
          <motion.p variants={item} className="text-white/60 leading-relaxed mb-10 max-w-lg">
            {heroSubtitle}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <MagneticButton
              as="a"
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-highlight px-6 py-3.5 text-sm font-semibold text-white glow-hover"
            >
              <FiDownload /> Download Resume
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              <FiMail /> Contact Me
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("about")}
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-white/70 hover:text-white"
            >
              Explore My Journey <FiArrowDown className="animate-float" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="absolute -inset-8 bg-gradient-to-tr from-accent/20 to-highlight/10 blur-3xl rounded-full" />
          <div className="relative glass rounded-3xl p-6 shadow-2xl shadow-black/40 animate-float">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-white/70">Business Dashboard</span>
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </span>
            </div>
            <div className="space-y-4">
              {dashboardMetrics.map((m, i) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="flex items-center gap-2 text-white/70">
                      <m.icon className="text-highlight" /> {m.label}
                    </span>
                    <span className="text-white/50">{m.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-highlight"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute -bottom-6 -left-8 glass rounded-2xl px-4 py-3 shadow-xl animate-floatSlow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-[11px] text-white/50">Growth Rate</p>
            <p className="text-lg font-bold gradient-text">+27%</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
