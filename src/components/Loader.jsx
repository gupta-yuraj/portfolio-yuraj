import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 18;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 350);
          return 100;
        }
        return next;
      });
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] loader-bg flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-6"
          >
            Yuraj Gupta
          </motion.div>
          <div className="w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-highlight"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="mt-3 text-xs tracking-[0.3em] text-white/40 font-body">
            {Math.min(Math.floor(progress), 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
