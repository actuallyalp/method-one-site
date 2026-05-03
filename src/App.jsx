import React, { useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const ACCENT = "#8E090B";
const DARK = "#07090f";
const HERO_VIDEO_MOV_SRC = "/Method 1.mov";
const HERO_VIDEO_MP4_SRC = "/Method 1.mp4";
const FORM_ENDPOINT = "https://formspree.io/f/mwvyvvpb";

const fontStyles = `
@font-face {
  font-family: 'KindSans';
  src: local('Kind Sans'), local('KindSans');
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;
}
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: #07090f;
  font-family: 'KindSans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
* { box-sizing: border-box; }
`;

function IconBase({ children, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

const ArrowRight = (props) => (
  <IconBase {...props}>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </IconBase>
);

const Phone = (props) => (
  <IconBase {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8 9.69a16 16 0 0 0 6.31 6.31l1.25-1.25a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92Z" />
  </IconBase>
);

const Mail = (props) => (
  <IconBase {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </IconBase>
);

const Clock = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </IconBase>
);

const CheckCircle = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2 4-5" />
  </IconBase>
);

const Shield = (props) => (
  <IconBase {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="M9 12l2 2 4-5" />
  </IconBase>
);

function MethodLogo({ className = "" }) {
  const rays = useMemo(() => Array.from({ length: 24 }, (_, index) => index * 15), []);

  return (
    <div className={`flex items-center gap-3 ${className}`} role="img" aria-label="Method One Solutions logo">
      <svg viewBox="0 0 120 120" className="h-full w-auto shrink-0" aria-hidden="true">
        <g fill={ACCENT}>
          {rays.map((rotation) => (
            <rect key={rotation} x="56" y="0" width="8" height="38" rx="1" transform={`rotate(${rotation} 60 60)`} />
          ))}
          <circle cx="60" cy="60" r="31" fill={DARK} />
        </g>
      </svg>
      <div className="leading-none">
        <div className="text-[28px] font-black tracking-[-0.08em] text-[#8E090B] md:text-[36px]">method1</div>
        <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.72em] text-[#8E090B] md:text-[11px]">solutions</div>
      </div>
    </div>
  );
}

function smoothScrollToSection(event, sectionId) {
  event.preventDefault();
  const section = document.getElementById(sectionId);
  if (!section) return;

  const headerOffset = 96;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: sectionTop - headerOffset, behavior: "smooth" });
  window.history.pushState(null, "", `#${sectionId}`);
}

function CursorGlow() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 });

  React.useEffect(() => {
    function handleMouseMove(event) {
      mouseX.set(event.clientX - 190);
      mouseY.set(event.clientY - 190);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed z-0 h-[380px] w-[380px] rounded-full bg-red-950/30 blur-3xl"
    />
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35 blur-[1px]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={HERO_VIDEO_MP4_SRC} type="video/mp4" />
        <source src={HERO_VIDEO_MOV_SRC} type="video/quicktime" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_22%,rgba(142,9,11,0.26),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(7,9,15,0.76)_0%,rgba(7,9,15,0.88)_62%,#07090f_100%)]" />
      <motion.div
        aria-hidden="true"
        animate={{ backgroundPosition: ["0px 0px", "120px 80px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:80px_80px]"
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 min-h-screen overflow-hidden px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
      <HeroBackground />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-red-950/60 bg-red-950/20 px-4 py-2 text-sm text-red-100/70 backdrop-blur-xl"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8E090B] opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8E090B]" />
            </span>
            Verified stock before quote. No guessing.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl lg:text-7xl"
          >
            No more headaches. No more delays. Reliable sourcing for high-demand medical supplies.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-lg leading-8 text-red-100/70 md:text-xl"
          >
            Method One Solutions helps hospitals, clinics, and government buyers secure medical, surgical, dental, laboratory, and PPE products with verified inventory and fast delivery windows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#contact" onClick={(event) => smoothScrollToSection(event, "contact")} className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#8E090B] px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/30 transition hover:bg-red-900">
              Start a Request <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#briefcase" onClick={(event) => smoothScrollToSection(event, "briefcase")} className="group inline-flex items-center justify-center gap-2 rounded-full border border-red-900/70 bg-red-950/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-red-950/30">
              Watch the Process <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-12 rounded-full bg-[#8E090B]/20 blur-3xl" />
          <BriefcaseScenePreview />
        </motion.div>
      </div>
    </section>
  );
}

function BriefcaseScenePreview() {
  return (
    <div className="relative mx-auto h-[460px] w-[520px] [perspective:1200px]">
      <motion.div
        animate={{ rotateY: [-8, 8, -8], y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-red-900/60 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-2xl shadow-black/50"
      >
        <div className="absolute inset-x-10 top-[-34px] h-16 rounded-t-[2rem] border border-red-900/60 bg-zinc-950" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-red-900/70" />
        <div className="absolute left-1/2 top-1/2 h-10 w-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-red-900/70 bg-[#8E090B] shadow-[0_0_40px_rgba(142,9,11,0.7)]" />
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%)]" />
      </motion.div>
      {[
        ["Syringes", "left-[8%] top-[12%]"],
        ["PPE", "right-[7%] top-[22%]"],
        ["Surgical", "left-[5%] bottom-[16%]"],
      ].map(([label, className], index) => (
        <motion.div
          key={label}
          animate={{ y: [0, -14, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 4 + index, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
          className={`absolute ${className} rounded-2xl border border-red-950/60 bg-red-950/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-red-100/80 backdrop-blur-xl`}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

function MedicalSupply({ label, type, style, x, y, rotate, progress }) {
  const opacity = useTransform(progress, [0.58, 0.72], [0, 1]);
  const supplyX = useTransform(progress, [0.6, 0.86], [0, x]);
  const supplyY = useTransform(progress, [0.6, 0.86], [0, y]);
  const supplyRotate = useTransform(progress, [0.6, 0.86], [0, rotate]);
  const supplyScale = useTransform(progress, [0.58, 0.74, 0.92], [0.45, 1.1, 1]);

  return (
    <motion.div
      style={{ x: supplyX, y: supplyY, rotate: supplyRotate, opacity, scale: supplyScale, ...style }}
      className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3"
    >
      {type === "bottle" && (
        <div className="relative h-28 w-16 rounded-b-2xl rounded-t-lg border border-white/20 bg-gradient-to-b from-red-100/90 via-white/80 to-red-100/50 shadow-2xl shadow-black/40">
          <div className="absolute left-1/2 top-[-22px] h-8 w-9 -translate-x-1/2 rounded-t-lg border border-white/20 bg-zinc-300" />
          <div className="absolute inset-x-3 top-10 h-8 rounded-lg bg-[#8E090B]/90" />
        </div>
      )}
      {type === "box" && (
        <div className="relative h-24 w-32 rounded-2xl border border-white/15 bg-gradient-to-br from-white/90 via-red-100/70 to-zinc-300/80 shadow-2xl shadow-black/40">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-black/20" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-black/20" />
          <div className="absolute bottom-3 left-3 h-3 w-16 rounded-full bg-[#8E090B]" />
        </div>
      )}
      {type === "syringe" && (
        <div className="relative h-8 w-44 rounded-full border border-white/20 bg-white/85 shadow-2xl shadow-black/40">
          <div className="absolute right-[-28px] top-1/2 h-px w-32 -translate-y-1/2 bg-white/70" />
          <div className="absolute left-3 top-1/2 h-12 w-3 -translate-y-1/2 rounded-full bg-zinc-300" />
          <div className="absolute left-12 top-1/2 h-3 w-20 -translate-y-1/2 rounded-full bg-[#8E090B]/70" />
        </div>
      )}
      {type === "mask" && (
        <div className="relative h-20 w-32 rounded-[2rem] border border-white/20 bg-gradient-to-b from-white/90 to-zinc-300/70 shadow-2xl shadow-black/40">
          <div className="absolute left-3 right-3 top-6 h-px bg-black/20" />
          <div className="absolute left-3 right-3 top-10 h-px bg-black/20" />
          <div className="absolute -left-8 top-8 h-8 w-8 rounded-full border border-white/40" />
          <div className="absolute -right-8 top-8 h-8 w-8 rounded-full border border-white/40" />
        </div>
      )}
      <div className="rounded-full border border-red-950/60 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-red-100/80 backdrop-blur-xl">
        {label}
      </div>
    </motion.div>
  );
}

function ScrollBriefcaseExperience() {
  const sectionRef = React.useRef(null);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 120, damping: 26, mass: 0.55 });
  const lockState = React.useRef({ active: false, locked: false, progress: 0, releaseDirection: null });
  const [, forceRender] = useState(0);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function isSectionCentered() {
      const rect = section.getBoundingClientRect();
      const midpoint = window.innerHeight * 0.5;
      return rect.top <= midpoint && rect.bottom >= midpoint;
    }

    function lockBody() {
      if (lockState.current.locked) return;
      lockState.current.locked = true;
      document.body.style.overflow = "hidden";
      forceRender((value) => value + 1);
    }

    function unlockBody(direction) {
      if (!lockState.current.locked) return;
      lockState.current.locked = false;
      lockState.current.releaseDirection = direction;
      document.body.style.overflow = "";
      forceRender((value) => value + 1);
    }

    function onScroll() {
      if (lockState.current.locked) return;
      if (!isSectionCentered()) return;

      if (lockState.current.releaseDirection === "down" && lockState.current.progress >= 1) return;
      if (lockState.current.releaseDirection === "up" && lockState.current.progress <= 0) return;

      const rect = section.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top;
      window.scrollTo({ top: targetTop, behavior: "auto" });
      lockBody();
    }

    function onWheel(event) {
      if (!lockState.current.locked) return;
      event.preventDefault();

      const delta = event.deltaY / 1800;
      const next = Math.max(0, Math.min(1, lockState.current.progress + delta));
      lockState.current.progress = next;
      progress.set(next);

      if (next >= 1 && event.deltaY > 0) {
        unlockBody("down");
        window.scrollBy({ top: window.innerHeight * 0.72, behavior: "smooth" });
      }

      if (next <= 0 && event.deltaY < 0) {
        unlockBody("up");
        window.scrollBy({ top: -window.innerHeight * 0.72, behavior: "smooth" });
      }
    }

    function onKeyDown(event) {
      if (!lockState.current.locked) return;
      const downKeys = ["ArrowDown", "PageDown", " "];
      const upKeys = ["ArrowUp", "PageUp"];
      if (![...downKeys, ...upKeys].includes(event.key)) return;
      event.preventDefault();

      const delta = downKeys.includes(event.key) ? 0.08 : -0.08;
      const next = Math.max(0, Math.min(1, lockState.current.progress + delta));
      lockState.current.progress = next;
      progress.set(next);

      if (next >= 1 && delta > 0) {
        unlockBody("down");
        window.scrollBy({ top: window.innerHeight * 0.72, behavior: "smooth" });
      }

      if (next <= 0 && delta < 0) {
        unlockBody("up");
        window.scrollBy({ top: -window.innerHeight * 0.72, behavior: "smooth" });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
    onScroll();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [progress]);

  const sceneScale = useTransform(smoothProgress, [0, 0.1, 0.82, 1], [0.96, 1, 1.03, 0.92]);
  const sceneOpacity = useTransform(smoothProgress, [0, 0.04, 0.93, 1], [0, 1, 1, 0.88]);
  const sceneBlur = useTransform(smoothProgress, [0, 0.08, 0.9, 1], ["blur(18px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  const caseRotateY = useTransform(smoothProgress, [0, 0.2, 0.42, 0.68, 1], [-32, 90, 360, 382, 396]);
  const caseRotateX = useTransform(smoothProgress, [0, 0.24, 0.52, 0.84, 1], [14, -10, -4, 6, 0]);
  const caseRotateZ = useTransform(smoothProgress, [0, 0.2, 0.46, 1], [-3, 2, 0, 0]);
  const caseScale = useTransform(smoothProgress, [0, 0.24, 0.6, 0.86, 1], [0.78, 1.12, 1, 0.84, 0.66]);
  const caseY = useTransform(smoothProgress, [0, 0.25, 0.7, 1], [150, 0, -40, -160]);
  const caseZ = useTransform(smoothProgress, [0, 0.3, 0.62, 1], [0, 190, 80, -220]);

  const lidRotate = useTransform(smoothProgress, [0.46, 0.64, 0.82], [0, -126, -118]);
  const lidZ = useTransform(smoothProgress, [0.46, 0.68], [0, -60]);
  const lidGlow = useTransform(smoothProgress, [0.38, 0.64, 0.86], [0, 1, 0.35]);
  const innerLightOpacity = useTransform(smoothProgress, [0.44, 0.66, 0.9], [0, 0.95, 0.18]);

  const introOpacity = useTransform(smoothProgress, [0.02, 0.22, 0.42], [1, 1, 0]);
  const unlockOpacity = useTransform(smoothProgress, [0.82, 0.94], [0, 1]);
  const nextSectionReveal = useTransform(smoothProgress, [0.86, 1], [80, 0]);
  const tunnelY = useTransform(smoothProgress, [0, 1], [0, -260]);
  const tunnelScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.35, 1.85]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.36, 0.8, 1], [0.08, 0.22, 0.12, 0]);

  const supplies = [
    { label: "Surgical", type: "box", x: -390, y: -190, rotate: -20, z: 160 },
    { label: "Dental", type: "syringe", x: 345, y: -145, rotate: 19, z: 240 },
    { label: "PPE", type: "mask", x: -320, y: 160, rotate: 14, z: 210 },
    { label: "Lab", type: "bottle", x: 340, y: 155, rotate: -14, z: 190 },
  ];

  return (
    <section id="briefcase" ref={sectionRef} className="relative z-10 h-screen bg-[#07090f]">
      <div className="relative h-screen overflow-hidden px-5 md:px-8">
        <motion.div style={{ opacity: sceneOpacity, scale: sceneScale, filter: sceneBlur }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(142,9,11,0.34),transparent_32%),radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.1),transparent_20%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#07090f_0%,#101827_48%,#07090f_100%)]" />
          <motion.div aria-hidden="true" style={{ y: tunnelY, scale: tunnelScale, opacity: gridOpacity }} className="absolute inset-[-20%] [background-image:linear-gradient(to_right,rgba(255,255,255,0.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:90px_90px] [transform:rotateX(64deg)_translateY(220px)]" />
          <motion.div aria-hidden="true" style={{ opacity: lidGlow }} className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8E090B] blur-[130px]" />
          <motion.div aria-hidden="true" animate={{ rotate: [0, 360] }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-950/40" />
          <motion.div aria-hidden="true" animate={{ rotate: [360, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        </motion.div>

        <motion.div style={{ opacity: introOpacity }} className="absolute left-5 top-28 z-30 max-w-md md:left-12">
          <div className="text-sm font-semibold uppercase tracking-[0.32em] text-[#8E090B]">Locked Fulfillment Sequence</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">The request enters the case.</h2>
          <p className="mt-5 text-base leading-7 text-red-100/65">Your scroll is captured here. Wheel movement advances the briefcase instead of moving the page.</p>
        </motion.div>

        <motion.div style={{ opacity: unlockOpacity, y: nextSectionReveal }} className="absolute bottom-12 left-1/2 z-30 w-full max-w-4xl -translate-x-1/2 px-5 text-center">
          <div className="rounded-[2rem] border border-red-950/60 bg-black/45 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8E090B]">Sequence Complete</div>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">Supplies are sorted. The workflow is unlocked.</h3>
          </div>
        </motion.div>

        <div className="absolute inset-0 z-20 flex items-center justify-center [perspective:2200px]">
          <motion.div style={{ rotateY: caseRotateY, rotateX: caseRotateX, rotateZ: caseRotateZ, scale: caseScale, y: caseY, z: caseZ }} className="relative h-[290px] w-[480px] [transform-style:preserve-3d]">
            <motion.div style={{ rotateX: lidRotate, z: lidZ, transformOrigin: "50% 100%" }} className="absolute left-0 top-[-158px] h-[176px] w-full rounded-t-[2.25rem] border border-red-900/70 bg-gradient-to-br from-zinc-700 via-zinc-950 to-black shadow-2xl shadow-black/50 [transform-style:preserve-3d]">
              <div className="absolute inset-5 rounded-t-[1.65rem] border border-white/10 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_24%)]" />
              <div className="absolute left-1/2 top-[-52px] h-20 w-52 -translate-x-1/2 rounded-t-3xl border border-red-900/70 bg-zinc-950 shadow-2xl shadow-black/40" />
              <div className="absolute inset-x-0 bottom-0 h-3 bg-[#8E090B]/80 shadow-[0_0_35px_rgba(142,9,11,0.7)]" />
            </motion.div>
            <div className="absolute inset-0 rounded-b-[2.25rem] border border-red-900/70 bg-gradient-to-br from-zinc-800 via-zinc-950 to-black shadow-2xl shadow-black/70 [transform:translateZ(42px)]">
              <motion.div style={{ opacity: innerLightOpacity }} className="absolute inset-8 rounded-[1.4rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.78),rgba(142,9,11,0.42)_34%,transparent_70%)] blur-sm" />
              <div className="absolute inset-5 rounded-b-[1.65rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-red-700/90" />
              <div className="absolute left-1/2 top-[-22px] h-14 w-28 -translate-x-1/2 rounded-xl border border-red-900/70 bg-[#8E090B] shadow-[0_0_48px_rgba(142,9,11,0.95)]" />
              <div className="absolute bottom-7 left-7 right-7 grid grid-cols-4 gap-3 opacity-70">
                {Array.from({ length: 12 }, (_, index) => <div key={index} className="h-2 rounded-full bg-white/10" />)}
              </div>
            </div>
            <div className="absolute inset-y-4 left-[-18px] w-8 rounded-l-2xl bg-gradient-to-b from-zinc-700 to-black [transform:rotateY(90deg)_translateZ(-4px)]" />
            <div className="absolute inset-y-4 right-[-18px] w-8 rounded-r-2xl bg-gradient-to-b from-zinc-700 to-black [transform:rotateY(90deg)_translateZ(4px)]" />
          </motion.div>

          {supplies.map((supply) => <MedicalSupply key={supply.label} {...supply} progress={smoothProgress} />)}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 bg-gradient-to-t from-[#07090f] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-40 bg-gradient-to-b from-[#07090f] to-transparent" />
      </div>
    </section>
  );
}

function KineticStrip() {
  const items = ["Verified Stock", "Urgent RFQs", "No Backorder Stories", "Emergency Fulfillment", "Institutional Supply"];

  return (
    <section className="relative z-10 overflow-hidden border-y border-red-950/60 bg-[#8E090B]/10 py-6 backdrop-blur-xl">
      <motion.div className="flex whitespace-nowrap text-sm font-semibold uppercase tracking-[0.38em] text-red-100/55" animate={{ x: [0, -900] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="mx-8 inline-flex items-center gap-8">
            {item}
            <span className="h-2 w-2 rounded-full bg-[#8E090B] shadow-[0_0_20px_rgba(142,9,11,0.9)]" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function CapabilityCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10, scale: 1.025, rotateX: 3, rotateY: -3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-red-950/60 bg-red-950/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl [transform-style:preserve-3d]"
    >
      <motion.div aria-hidden="true" className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#8E090B]/25 blur-3xl" animate={{ x: [0, -18, 0], y: [0, 22, 0], scale: [1, 1.18, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8E090B] text-white shadow-lg shadow-black/20 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="relative text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="relative mt-3 text-sm leading-6 text-red-100/70">{text}</p>
    </motion.div>
  );
}

function RequestForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    suppliesNeeded: "",
    quantityNeeded: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const requiredFields = [formData.firstName, formData.lastName, formData.email, formData.phone, formData.suppliesNeeded, formData.quantityNeeded];

    if (requiredFields.some((field) => !field.trim())) {
      setStatus("error");
      setMessage("Please complete every required field before submitting.");
      return;
    }

    setStatus("submitting");
    setMessage("Sending request...");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          subject: "New Method One Solutions Urgent Request",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          suppliesNeeded: formData.suppliesNeeded,
          quantityNeeded: formData.quantityNeeded,
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setMessage("Request sent. We will review the details and follow up shortly.");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", suppliesNeeded: "", quantityNeeded: "" });
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please email service@methodonesolutions.com directly or try again.");
    }
  }

  const inputClass = "w-full rounded-2xl border border-red-950/60 bg-black/25 px-4 py-4 text-sm text-white placeholder:text-red-100/35 outline-none transition focus:border-[#8E090B] focus:bg-black/35";
  const labelClass = "text-sm font-semibold text-white";
  const hintClass = "mt-2 text-xs leading-5 text-red-100/55";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-red-950/60 bg-red-950/10 p-5 backdrop-blur-xl">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8E090B]">Submit an Urgent Request</div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>First Name <span className="text-red-100/50">(required)</span></label>
          <input className={`${inputClass} mt-2`} name="firstName" value={formData.firstName} onChange={updateField} autoComplete="given-name" />
        </div>
        <div>
          <label className={labelClass}>Last Name <span className="text-red-100/50">(required)</span></label>
          <input className={`${inputClass} mt-2`} name="lastName" value={formData.lastName} onChange={updateField} autoComplete="family-name" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Email <span className="text-red-100/50">(required)</span></label>
          <input className={`${inputClass} mt-2`} name="email" value={formData.email} onChange={updateField} type="email" autoComplete="email" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Phone <span className="text-red-100/50">(required)</span></label>
          <input className={`${inputClass} mt-2`} name="phone" value={formData.phone} onChange={updateField} type="tel" autoComplete="tel" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Supplies Needed <span className="text-red-100/50">(required)</span></label>
          <p className={hintClass}>Please include all part numbers and other identifying information for all supplies needed. We got you.</p>
          <textarea className={`${inputClass} mt-3 min-h-28 resize-none`} name="suppliesNeeded" value={formData.suppliesNeeded} onChange={updateField} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Quantity Needed <span className="text-red-100/50">(required)</span></label>
          <p className={hintClass}>Example: BD #367342, 10 cases. Ethicon #636H, 20 boxes. Zimmer #60707015500, 5 eaches.</p>
          <textarea className={`${inputClass} mt-3 min-h-28 resize-none`} name="quantityNeeded" value={formData.quantityNeeded} onChange={updateField} />
        </div>
      </div>

      <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8E090B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Submit Request"} <ArrowRight className="h-4 w-4" />
      </button>

      {message && (
        <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100" : "border-red-500/30 bg-red-500/10 text-red-100"}`}>
          {message}
        </div>
      )}
    </form>
  );
}

export default function MethodOneSolutionsMockup() {
  const capabilities = [
    [Shield, "Verified Inventory", "Availability is checked before quotes go out, so urgent buyers avoid vague lead times."],
    [Clock, "Emergency Fulfillment", "Built around fast windows, clean handoffs, and practical overnight options."],
    [CheckCircle, "Institutional Supply", "Medical, surgical, dental, laboratory, and PPE categories under one clear workflow."],
  ];

  return (
    <>
      <style>{fontStyles}</style>
      <main className="min-h-screen overflow-hidden bg-[#07090f] text-white" style={{ fontFamily: "KindSans, ui-sans-serif, system-ui, sans-serif" }}>
        <CursorGlow />
        <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(142,9,11,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,#07090f_0%,#0b111d_42%,#07090f_100%)]" />

        <header className="fixed left-0 right-0 top-0 z-50 border-b border-red-950/60 bg-[#07090f]/80 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
            <MethodLogo className="h-11" />
            <nav className="hidden items-center gap-7 text-sm text-red-100/70 md:flex">
              <a href="#briefcase" onClick={(event) => smoothScrollToSection(event, "briefcase")} className="transition hover:text-white">Experience</a>
              <a href="#capabilities" onClick={(event) => smoothScrollToSection(event, "capabilities")} className="transition hover:text-white">Capabilities</a>
              <a href="#contact" onClick={(event) => smoothScrollToSection(event, "contact")} className="transition hover:text-white">Contact</a>
            </nav>
            <a href="#contact" onClick={(event) => smoothScrollToSection(event, "contact")} className="hidden rounded-full border border-red-900/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8E090B] md:inline-flex">Request Quote</a>
          </div>
        </header>

        <Hero />
        <KineticStrip />
        <ScrollBriefcaseExperience />

        <section id="capabilities" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#8E090B]">Core Capabilities</div>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Cleaner sourcing. Faster answers. Less procurement drag.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-red-100/70">Every section pushes the same promise: verified stock, clean communication, and fast fulfillment without procurement theater.</p>
            </motion.div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {capabilities.map(([Icon, title, text]) => (
                <CapabilityCard key={title} icon={Icon} title={title} text={text} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative z-10 px-5 pb-20 pt-10 md:px-8 md:pb-28">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-red-950/60 bg-[#8E090B] text-white shadow-2xl shadow-black/30">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 md:p-12">
                <div className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">Request Support</div>
                <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Send the item. Get a serious answer.</h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">Built for buyers who need exact SKUs, delivery confidence, and a supplier that can move without turning the order into a research project.</p>
                <div className="mt-8 flex flex-col gap-3 text-sm font-medium text-white/75 sm:flex-row sm:items-center sm:gap-6">
                  <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> (877) 321-9876</span>
                  <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> service@methodonesolutions.com</span>
                </div>
              </div>
              <div className="bg-slate-950 p-8 text-white md:p-12">
                <RequestForm />
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-10 border-t border-red-950/60 px-5 pb-12 pt-16 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 text-center">
            <MethodLogo className="h-16 md:h-20" />
            <div className="text-xs uppercase tracking-[0.28em] text-[#8E090B]">Verified stock. Fast fulfillment. Clean execution.</div>
            <div className="mt-4 flex flex-col items-center gap-2 text-sm text-white/70 md:flex-row md:gap-6">
              <span>Phone: (877) 321-9876</span>
              <span>Email: service@methodonesolutions.com</span>
              <span>Hours: Mon-Fri 4am-6pm PST</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
