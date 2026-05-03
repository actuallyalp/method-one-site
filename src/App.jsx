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
  const opacity = useTransform(progress, [0.24, 0.42], [0, 1]);
  const supplyX = useTransform(progress, [0.28, 0.72], [0, x]);
  const supplyY = useTransform(progress, [0.28, 0.72], [0, y]);
  const supplyRotate = useTransform(progress, [0.28, 0.72], [0, rotate]);
  const supplyScale = useTransform(progress, [0.28, 0.5, 0.9], [0.55, 1.08, 1]);

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
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });

  const caseRotateY = useTransform(scrollYProgress, [0, 0.22, 0.42, 1], [-18, 372, 382, 390]);
  const caseRotateX = useTransform(scrollYProgress, [0, 0.28, 0.48, 1], [4, -8, -2, 0]);
  const caseScale = useTransform(scrollYProgress, [0, 0.24, 0.65, 1], [0.82, 1, 0.86, 0.72]);
  const caseY = useTransform(scrollYProgress, [0, 0.45, 1], [60, 0, -80]);
  const lidRotate = useTransform(scrollYProgress, [0.22, 0.42], [0, -112]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.42, 0.75], [0.1, 0.75, 0.25]);
  const captionOpacity = useTransform(scrollYProgress, [0, 0.18, 0.74, 1], [1, 1, 0.65, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.74, 0.92], [0, 1]);

  const supplies = [
    { label: "Surgical", type: "box", x: -330, y: -170, rotate: -16 },
    { label: "Dental", type: "syringe", x: 270, y: -125, rotate: 18 },
    { label: "PPE", type: "mask", x: -250, y: 140, rotate: 12 },
    { label: "Lab", type: "bottle", x: 285, y: 135, rotate: -12 },
  ];

  return (
    <section id="briefcase" ref={targetRef} className="relative z-10 h-[420vh] bg-[#07090f]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5 py-24 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(142,9,11,0.26),transparent_34%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#07090f,#0b111d,#07090f)]" />
        <motion.div
          aria-hidden="true"
          style={{ opacity: glowOpacity }}
          className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8E090B] blur-[120px]"
        />

        <motion.div style={{ opacity: captionOpacity }} className="absolute left-5 top-28 z-30 max-w-md md:left-12">
          <div className="text-sm font-semibold uppercase tracking-[0.32em] text-[#8E090B]">Pinned Fulfillment Sequence</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">Scroll into the supply case.</h2>
          <p className="mt-5 text-base leading-7 text-red-100/65">The briefcase spins, opens, and releases the core supply categories before the page continues.</p>
        </motion.div>

        <motion.div style={{ opacity: finalOpacity }} className="absolute bottom-16 left-1/2 z-30 w-full max-w-3xl -translate-x-1/2 px-5 text-center">
          <div className="rounded-[2rem] border border-red-950/60 bg-black/35 p-6 backdrop-blur-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8E090B]">Unlocked</div>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">Every request leaves the case organized.</h3>
          </div>
        </motion.div>

        <div className="relative z-20 h-[620px] w-full max-w-6xl [perspective:1600px]">
          <motion.div
            style={{ rotateY: caseRotateY, rotateX: caseRotateX, scale: caseScale, y: caseY }}
            className="absolute left-1/2 top-1/2 h-[260px] w-[440px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
          >
            <motion.div
              style={{ rotateX: lidRotate, transformOrigin: "50% 100%" }}
              className="absolute left-0 top-[-132px] h-[150px] w-full rounded-t-[2rem] border border-red-900/60 bg-gradient-to-br from-zinc-800 via-zinc-950 to-black shadow-2xl shadow-black/40 [transform-style:preserve-3d]"
            >
              <div className="absolute inset-5 rounded-t-[1.4rem] border border-white/8 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_24%)]" />
              <div className="absolute left-1/2 top-[-44px] h-16 w-44 -translate-x-1/2 rounded-t-3xl border border-red-900/60 bg-zinc-950" />
            </motion.div>

            <div className="absolute inset-0 rounded-b-[2rem] border border-red-900/60 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-2xl shadow-black/60">
              <div className="absolute inset-5 rounded-b-[1.4rem] border border-white/8 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-red-800/80" />
              <div className="absolute left-1/2 top-[-18px] h-12 w-24 -translate-x-1/2 rounded-xl border border-red-900/70 bg-[#8E090B] shadow-[0_0_44px_rgba(142,9,11,0.8)]" />
              <div className="absolute bottom-7 left-7 right-7 grid grid-cols-4 gap-3 opacity-70">
                {Array.from({ length: 12 }, (_, index) => (
                  <div key={index} className="h-2 rounded-full bg-white/10" />
                ))}
              </div>
            </div>
          </motion.div>

          {supplies.map((supply) => (
            <MedicalSupply key={supply.label} {...supply} progress={scrollYProgress} />
          ))}
        </div>
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
