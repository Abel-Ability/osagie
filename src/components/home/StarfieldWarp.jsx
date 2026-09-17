import React, { useEffect, useRef } from 'react';

const COLORS = [
  [255, 234, 170],
  [255, 214, 120],
  [255, 255, 240],
  [196, 150, 255],
  [150, 200, 255]
];

function StarfieldWarp() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let raf = 0;
    let stars = [];

    const random = (() => {
      let seed = 424242;
      return () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
    })();

    const spawn = (initial = false) => ({
      x: random() * 2 - 1,
      y: random() * 2 - 1,
      z: initial ? Math.max(0.15, random()) : 1,
      speed: 0.06 + random() * 0.22,
      size: 2 + random() * 3.6,
      color: COLORS[Math.floor(random() * COLORS.length)]
    });

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const isSmall = window.matchMedia('(max-width: 640px)').matches;
      const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.max(
        isSmall ? 45 : 60,
        Math.floor((width * height) / (isSmall ? 12000 : 9000))
      );
      stars = Array.from({ length: target }, () => spawn(true));
    };

    resize();

    let last = performance.now();
    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now * 0.00008;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      const cx = width / 2 + Math.sin(t) * width * 0.12;
      const cy = height / 2 + Math.cos(t * 0.7) * height * 0.1;
      const zoom = Math.min(width, height) * 0.9;

      for (const s of stars) {
        s.z -= s.speed * dt;
        if (s.z < 0.05) {
          Object.assign(s, spawn());
          s.z = 1;
          continue;
        }
        const invZ = 1 - s.z;
        const alpha = 0.05 + invZ * 0.65;
        const lineW = s.size * (0.55 + invZ * 2.2);
        const [r, g, b] = s.color;

        const px = cx + (s.x * zoom) / s.z;
        const py = cy + (s.y * zoom) / s.z;
        const pz = Math.min(2, s.z + s.speed * dt);
        const tx = cx + (s.x * zoom) / pz;
        const ty = cy + (s.y * zoom) / pz;

        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = lineW;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

export default StarfieldWarp;