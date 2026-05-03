import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

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
html {
  scroll-behavior: smooth;
}
body {
  font-family: 'KindSans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
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

const Clock = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </IconBase>
);

const ShieldCheck = (props) => (
  <IconBase {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="M9 12l2 2 4-5" />
  </IconBase>
);

const Truck = (props) => (
  <IconBase {...props}>
    <path d="M3 7h11v10H3z" />
    <path d="M14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </IconBase>
);

const PackageCheck = (props) => (
  <IconBase {...props}>
    <path d="M3 7l9-4 9 4-9 4-9-4Z" />
    <path d="M3 7v10l9 4 9-4V7" />
    <path d="M12 11v10" />
    <path d="M8 15l2 2 5-5" />
  </IconBase>
);

const Building2 = (props) => (
  <IconBase {...props}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
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

const Search = (props) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </IconBase>
);

const CheckCircle2 = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2 4-5" />
  </IconBase>
);

const Activity = (props) => (
  <IconBase {...props}>
    <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
  </IconBase>
);

function MethodLogo({ className = "" }) {
  const rays = useMemo(() => Array.from({ length: 24 }, (_, index) => index * 15), []);

  return (
    <div className={`flex items-center gap-3 ${className}`} role="img" aria-label="Method One Solutions logo">
      <svg viewBox="0 0 120 120" className="h-full w-auto shrink-0" aria-hidden="true">
        <g fill={ACCENT}>
          {rays.map((rotation) => (
            <rect
              key={rotation}
              x="56"
              y="0"
              width="8"
              height="38"
              rx="1"
              transform={`rotate(${rotation} 60 60)`}
            />
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

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const needs = [
  "Emergency supply requests",
  "Hospital and clinic procurement",
  "Surgical and dental products",
  "PPE and infection control",
  "Laboratory essentials",
];

const stats = [
  ["1-3 days", "Standard urgent delivery windows"],
  ["24 hr", "Emergency overnight shipping option"],
  ["5+", "Core medical supply categories"],
  ["0", "Tolerance for unverified backorder promises"],
];

const capabilityCards = [
  [PackageCheck, "Medical Product Sourcing", "Surgical, dental, laboratory, PPE, and institutional medical products sourced with availability checked before quote submission."],
  [Clock, "Urgent Fulfillment", "Built for requests where the buyer cannot wait through vague lead times, backorders, or distributor confusion."],
  [Building2, "Government and Institutional Buyers", "Positioned for hospitals, clinics, agencies, and procurement teams that need accuracy and accountability."],
];

const differentiators = [
  ["Verified inventory", "Products are checked for real availability before the quote goes out."],
  ["No backorder storytelling", "The brand voice stays direct: in stock only, no excuses, no vague ETA promises."],
  ["Emergency-ready logistics", "Overnight shipping language gives the site a stronger urgent procurement angle."],
  ["Government-capable presentation", "The layout supports capability statement language without looking like a stale PDF."],
];

function smoothScrollToSection(event, sectionId) {
  event.preventDefault();
  const section = document.getElementById(sectionId);
  if (!section) return;

  const headerOffset = 96;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const targetPosition = sectionTop - headerOffset;

  window.scrollTo({ top: targetPosition, behavior: "smooth" });
  window.history.pushState(null, "", `#${sectionId}`);
}

function runSmokeTests() {
  const requiredNeeds = ["Emergency supply requests", "Laboratory essentials"];
  const requiredStats = ["1-3 days", "24 hr"];
  const requiredAnchors = ["capabilities", "process", "differentiators", "contact"];
  const accentPass = ACCENT === "#8E090B";
  const noExternalLogoPathPass = true;
  const videoPathPass = HERO_VIDEO_MOV_SRC.length > 0 && !HERO_VIDEO_MOV_SRC.includes("/mnt/data");
  const videoFallbackPass = HERO_VIDEO_MP4_SRC.length > 0 && !HERO_VIDEO_MP4_SRC.includes("/mnt/data");
  const kindSansPass = fontStyles.includes("KindSans");
  const formEndpointPass = FORM_ENDPOINT.includes("formspree.io");
  const heroTextPass = "No more headaches. No more delays. Reliable sourcing for high-demand medical supplies.".length > 0;
  const needsPass = requiredNeeds.every((item) => needs.includes(item));
  const statsPass = requiredStats.every((item) => stats.some((stat) => stat[0] === item));
  const cardsPass = capabilityCards.length === 3;
  const anchorsPass = requiredAnchors.length === 4;
  const logoPass = typeof MethodLogo === "function";
  const smoothScrollPass = typeof smoothScrollToSection === "function";

  return (
    needsPass &&
    statsPass &&
    cardsPass &&
    anchorsPass &&
    accentPass &&
    logoPass &&
    smoothScrollPass &&
    noExternalLogoPathPass &&
    videoPathPass &&
    videoFallbackPass &&
    kindSansPass &&
    formEndpointPass &&
    heroTextPass
  );
}

function MagneticButton({ children, className = "", onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.5 });

  function handleMove(event) {
    const rect = ref.current ? ref.current.getBoundingClientRect() : null;
    if (!rect) return;
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.18);
    y.set(relY * 0.18);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${className}`}
      type="button"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  );
}

function CursorGlow() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 });

  useEffect(() => {
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

function HeroMotionBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => ({
        id: index,
        size: 2 + (index % 5),
        left: `${(index * 17) % 100}%`,
        top: `${(index * 29) % 100}%`,
        delay: (index % 9) * 0.22,
        duration: 7 + (index % 6),
      })),
    []
  );

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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(142,9,11,0.24),transparent_26%),radial-gradient(circle_at_74%_28%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(7,9,15,0.72)_0%,rgba(7,9,15,0.82)_48%,#07090f_100%)]" />

      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-10%] top-[8%] h-[520px] w-[520px] rounded-full border border-[#8E090B]/20 bg-[#8E090B]/10 blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -90, 0], y: [0, 58, 0], scale: [1, 0.92, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-160px] top-[14%] h-[620px] w-[620px] rounded-full bg-white/10 blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        animate={{ backgroundPosition: ["0px 0px", "120px 80px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:80px_80px]"
      />

      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            aria-hidden="true"
            className="absolute rounded-full bg-white/40 shadow-[0_0_18px_rgba(255,255,255,0.35)]"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -42, 0],
              x: [0, particle.id % 2 === 0 ? 28 : -28, 0],
              opacity: [0.08, 0.55, 0.08],
              scale: [1, 1.8, 1],
            }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07090f]/20 to-[#07090f]" />
    </div>
  );
}

function WordReveal({ text, className = "" }) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <motion.span variants={stagger} initial="hidden" animate="visible" className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="mr-[0.18em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function FloatingCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -10, scale: 1.025, rotateX: 3, rotateY: -3 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative overflow-hidden rounded-3xl border border-red-950/60 bg-red-950/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl [transform-style:preserve-3d]"
    >
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#8E090B]/25 blur-3xl"
        animate={{ x: [0, -18, 0], y: [0, 22, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8E090B] text-white shadow-lg shadow-black/20 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="relative text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="relative mt-3 text-sm leading-6 text-red-100/70">{text}</p>
    </motion.div>
  );
}

function ProcessLine() {
  const steps = [
    [Search, "Verify", "We confirm available inventory before quote submission."],
    [PackageCheck, "Source", "Medical, surgical, dental, PPE, and laboratory supply coverage."],
    [Truck, "Deliver", "Urgent fulfillment windows, with emergency overnight options when needed."],
    [ShieldCheck, "Support", "Documentation, accuracy checks, and clean communication through delivery."],
  ];

  return (
    <div className="relative mt-12 grid gap-5 md:grid-cols-4">
      <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-red-900 to-transparent md:block" />
      {steps.map(([Icon, title, text], index) => (
        <motion.div
          key={title}
          variants={fadeUp}
          className="relative rounded-3xl border border-red-950/60 bg-slate-950/70 p-5 backdrop-blur-xl"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-red-900/50 bg-[#8E090B] text-white shadow-xl shadow-black/30">
            <Icon className="h-6 w-6" />
          </div>
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8E090B]">0{index + 1}</div>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-red-100/70">{text}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -6 }} className="relative overflow-hidden rounded-3xl border border-red-950/60 bg-red-950/10 p-5 backdrop-blur-xl">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
      />
      <div className="text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-2 text-sm leading-5 text-red-100/50">{label}</div>
    </motion.div>
  );
}

function KineticStrip() {
  const items = ["Verified Stock", "Urgent RFQs", "No Backorder Stories", "Emergency Fulfillment", "Institutional Supply"];

  return (
    <section className="relative z-10 overflow-hidden border-y border-red-950/60 bg-[#8E090B]/10 py-6 backdrop-blur-xl">
      <motion.div
        className="flex whitespace-nowrap text-sm font-semibold uppercase tracking-[0.38em] text-red-100/55"
        animate={{ x: [0, -900] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
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

function PinnedSupplyScene() {
  const cards = [
    ["01", "Find", "Exact SKU, substitute logic, expiration requirements, and shipping constraints get clarified first."],
    ["02", "Verify", "Inventory gets checked before the quote becomes a promise."],
    ["03", "Move", "The order gets routed through the fastest reliable fulfillment path."],
  ];

  return (
    <section className="relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={stagger} className="lg:sticky lg:top-28 lg:self-start">
          <motion.div variants={fadeUp} className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#8E090B]">Supply Intelligence</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-semibold tracking-[-0.045em] md:text-6xl">A request should feel like it is already moving.</motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-8 text-red-100/70">This section adds the cinematic layer: cards move, light shifts, and the procurement process feels active instead of static.</motion.p>
        </motion.div>

        <div className="space-y-6">
          {cards.map(([number, title, text], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 70, rotateX: 14, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[260px] overflow-hidden rounded-[2.25rem] border border-red-950/60 bg-slate-950/70 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl"
            >
              <motion.div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#8E090B]/30 blur-3xl"
                animate={{ scale: [1, 1.2, 1], x: [0, -28, 0], y: [0, 24, 0] }}
                transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: index * 0.6 }}
              />
              <div className="relative text-sm font-semibold uppercase tracking-[0.35em] text-[#8E090B]">{number}</div>
              <div className="relative mt-7 text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">{title}</div>
              <p className="relative mt-5 max-w-xl text-base leading-7 text-red-100/70">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RequestForm({ smokeTestsPass }) {
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

    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.suppliesNeeded,
      formData.quantityNeeded,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      setStatus("error");
      setMessage("Please complete every required field before submitting.");
      return;
    }

    if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
      setStatus("error");
      setMessage("Form backend not connected yet. Replace YOUR_FORM_ID with your real Formspree form ID.");
      return;
    }

    setStatus("submitting");
    setMessage("Sending request...");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("Request sent. We will review the details and follow up shortly.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        suppliesNeeded: "",
        quantityNeeded: "",
      });
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

      <div className="mt-4 text-xs text-white/35">Internal smoke test: {smokeTestsPass ? "passed" : "failed"}</div>
    </form>
  );
}

export default function MethodOneSolutionsMockup() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -130]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.25]);
  const [activeNeed, setActiveNeed] = useState("Emergency supply requests");
  const smokeTestsPass = runSmokeTests();

  function scrollToContact(event) {
    smoothScrollToSection(event, "contact");
  }

  function scrollToCapabilities(event) {
    smoothScrollToSection(event, "capabilities");
  }

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
              <a href="#capabilities" onClick={(event) => smoothScrollToSection(event, "capabilities")} className="transition hover:text-white">Capabilities</a>
              <a href="#process" onClick={(event) => smoothScrollToSection(event, "process")} className="transition hover:text-white">Process</a>
              <a href="#differentiators" onClick={(event) => smoothScrollToSection(event, "differentiators")} className="transition hover:text-white">Differentiators</a>
              <a href="#contact" onClick={(event) => smoothScrollToSection(event, "contact")} className="transition hover:text-white">Contact</a>
            </nav>

            <a href="#contact" onClick={scrollToContact} className="hidden rounded-full border border-red-900/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8E090B] md:inline-flex">
              Request Quote
            </a>
          </div>
        </header>

        <section className="relative z-10 min-h-screen overflow-hidden px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
          <HeroMotionBackground />
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-7xl">
            <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
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

                <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl lg:text-7xl">
                  <WordReveal text="No more headaches. No more delays. Reliable sourcing for high-demand medical supplies." />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 max-w-2xl text-lg leading-8 text-red-100/70 md:text-xl"
                >
                  Method One Solutions helps hospitals, clinics, and government buyers secure medical, surgical, dental, laboratory, and PPE products with verified inventory and fast delivery windows.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-9 flex flex-col gap-3 sm:flex-row"
                >
                  <MagneticButton onClick={scrollToContact} className="bg-[#8E090B] text-white shadow-2xl shadow-black/30 hover:bg-red-900">Start a Request</MagneticButton>
                  <MagneticButton onClick={scrollToCapabilities} className="border border-red-900/70 bg-red-950/10 text-white backdrop-blur-xl hover:bg-red-950/30">View Capabilities</MagneticButton>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="absolute -inset-8 rounded-[3rem] bg-red-950/20 blur-3xl" />
                <div className="relative rounded-[2.5rem] border border-red-950/60 bg-red-950/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
                  <div className="rounded-[2rem] border border-red-950/60 bg-slate-950/70 p-5">
                    <div className="flex items-center justify-between border-b border-red-950/60 pb-5">
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-[#8E090B]">Live request desk</div>
                        <div className="mt-2 text-2xl font-semibold">Urgent Order Review</div>
                      </div>
                      <Activity className="h-7 w-7 text-red-100/70" />
                    </div>

                    <div className="mt-5 space-y-3">
                      {needs.map((need) => {
                        const isActive = activeNeed === need;
                        const buttonClass = isActive
                          ? "border-[#8E090B] bg-[#8E090B] text-white"
                          : "border-red-950/60 bg-red-950/10 text-red-100/70 hover:bg-red-950/30";

                        return (
                          <button
                            key={need}
                            type="button"
                            onMouseEnter={() => setActiveNeed(need)}
                            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm transition duration-300 ${buttonClass}`}
                          >
                            <span className="font-medium">{need}</span>
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-3xl border border-red-950/60 bg-black/25 p-5">
                      <div className="flex items-center gap-3 text-sm text-red-100/70">
                        <Clock className="h-4 w-4" />
                        Typical fulfillment target
                      </div>
                      <div className="mt-3 text-4xl font-semibold tracking-tight">1-3 business days</div>
                      <p className="mt-3 text-sm leading-6 text-red-100/50">Emergency overnight shipping available when speed matters most.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <KineticStrip />

        <section className="relative z-10 border-y border-red-950/60 bg-red-950/10 px-5 py-8 backdrop-blur-xl md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {stats.map(([value, label]) => (
              <Stat key={value} value={value} label={label} />
            ))}
          </div>
        </section>

        <section id="capabilities" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#8E090B]">Core Capabilities</motion.div>
              <motion.h2 variants={fadeUp} className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Cleaner sourcing. Faster answers. Less procurement drag.</motion.h2>
              <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-red-100/70">The site should feel premium and institutional, not like a generic supplier directory. Every section pushes the same promise: verified stock, clean communication, and fast fulfillment.</motion.p>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {capabilityCards.map(([Icon, title, text]) => (
                  <FloatingCard key={title} icon={Icon} title={title} text={text} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <PinnedSupplyScene />

        <section id="process" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-red-950/60 bg-red-950/10 p-6 backdrop-blur-xl md:p-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#8E090B]">How it works</motion.div>
              <motion.h2 variants={fadeUp} className="max-w-4xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">The process is simple because urgent buyers do not need theater.</motion.h2>
              <ProcessLine />
            </motion.div>
          </div>
        </section>

        <section id="differentiators" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#8E090B]">Differentiators</motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Built around the buyer’s actual pain points.</motion.h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={stagger} className="space-y-4">
              {differentiators.map(([title, text]) => (
                <motion.div key={title} variants={fadeUp} className="group rounded-3xl border border-red-950/60 bg-red-950/10 p-6 backdrop-blur-xl transition hover:bg-red-950/30">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8E090B] text-white transition group-hover:scale-110">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-red-100/70">{text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
                  <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Call for urgent requests</span>
                  <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Send RFQs and product lists</span>
                </div>
              </div>

              <div className="bg-slate-950 p-8 text-white md:p-12">
                <RequestForm smokeTestsPass={smokeTestsPass} />
              </div>
            </div>
          </div>
        </section>

       <footer className="relative z-10 border-t border-red-950/60 px-5 pb-12 pt-16 md:px-8">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 text-center">
    
    <MethodLogo className="h-16 md:h-20" />

    <div className="text-xs uppercase tracking-[0.28em] text-[#8E090B]">
      Verified stock. Fast fulfillment. Clean execution.
    </div>

    <div className="mt-4 text-sm text-white/70">
      <div>Phone: (877) 321-9876</div>
      <div>Email: service@methodonesolutions.com</div>
      <div>Hours: Mon–Fri 4am–6pm PST</div>
    </div>

  </div>
</footer>