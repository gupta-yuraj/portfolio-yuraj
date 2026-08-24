import { useRef } from "react";

/* Magnetic + ripple button used across the site */
<<<<<<< HEAD
export default function MagneticButton({ children, onClick, className = "", as = "button", href, type, ...rest }) {
=======
export default function MagneticButton({ children, onClick, className = "", as = "button", href, type }) {
>>>>>>> 3e28ed9 (fix vercel deployment issue)
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  const spawnRipple = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 1.4;
    span.className = "ripple-span";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(span);
    setTimeout(() => span.remove(), 600);
  };

  const Comp = as;

  return (
    <Comp
      ref={ref}
      href={href}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={(e) => {
        spawnRipple(e);
        onClick?.(e);
      }}
      className={`magnetic-btn ripple-el cursor-hover ${className}`}
<<<<<<< HEAD
      {...rest}
=======
>>>>>>> 3e28ed9 (fix vercel deployment issue)
    >
      {children}
    </Comp>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 3e28ed9 (fix vercel deployment issue)
