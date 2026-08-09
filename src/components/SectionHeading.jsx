import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-14 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}
    >
      {eyebrow && (
        <span className="text-highlight text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">{title}</h2>
      {subtitle && <p className="text-white/55 leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}
