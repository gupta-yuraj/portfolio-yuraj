import { useEffect, useRef } from "react";

/* Animated gradient + floating particles + blur blobs, mouse-reactive */
export default function Background() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles;
    const COUNT = 55;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.5 + 0.15,
    }));

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x -= dx * 0.0025;
          p.y -= dy * 0.0025;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-primary">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(37,99,235,0.18), transparent 45%), radial-gradient(circle at 85% 75%, rgba(96,165,250,0.16), transparent 50%), linear-gradient(180deg, #0F172A 0%, #111827 100%)",
        }}
      />
      <div className="blob w-[26rem] h-[26rem] bg-accent/40 top-[-6rem] left-[-6rem] animate-blob" />
      <div className="blob w-[22rem] h-[22rem] bg-highlight/30 bottom-[-4rem] right-[-4rem] animate-blob [animation-delay:4s]" />
      <div className="blob w-[18rem] h-[18rem] bg-accent/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-blob [animation-delay:8s]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
