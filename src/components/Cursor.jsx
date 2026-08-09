import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    let ringX = 0,
      ringY = 0,
      mouseX = 0,
      mouseY = 0;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const raf = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      requestAnimationFrame(raf);
    };

    const grow = () => ringRef.current?.classList.add("!w-12", "!h-12", "!bg-highlight/10");
    const shrink = () => ringRef.current?.classList.remove("!w-12", "!h-12", "!bg-highlight/10");

    window.addEventListener("mousemove", move);
    document
      .querySelectorAll("a, button, .cursor-hover")
      .forEach((el) => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });

    const id = requestAnimationFrame(raf);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(id);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
