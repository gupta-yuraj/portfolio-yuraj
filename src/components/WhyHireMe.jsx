import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
<<<<<<< HEAD
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function WhyHireMe() {
  const { whyHireMe } = usePortfolioData();
=======
import { whyHireMe } from "../data/portfolioData";

export default function WhyHireMe() {
>>>>>>> 3e28ed9 (fix vercel deployment issue)
  return (
    <section id="why-hire-me" className="section-pad relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="The Case for Me" title="Why Hire Me" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyHireMe.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="gradient-border glow-hover p-6 text-center"
            >
              <span className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-xl text-white mb-4 shadow-lg shadow-accent/30">
                <item.icon />
              </span>
              <h3 className="font-heading font-semibold text-white text-sm">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
