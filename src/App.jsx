import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#8E090B";
const FORM_ENDPOINT = "https://formspree.io/f/mwvyvvpb";
const CommandEnvironment = lazy(() => import("./CommandEnvironment.jsx"));
const BRAND_LOGO = "/assets/brand/method-one-logo.png";
const BRAND_SUN_LOGO = "/assets/brand/method-one-sun-logo.png";

const performance = [
  {
    code: "VA",
    agency: "Department of Veteran Affairs",
    value: "$3,500,000",
    detail: "Time-critical overnight delivery of high-demand medical expendables for facility-wide use in all departments.",
    logo: "/assets/departments/veterans-affairs.png",
    logoAlt: "Department of Veterans Affairs seal",
  },
  {
    code: "USAF",
    agency: "Department of United States Air Force",
    value: "$2,900,000",
    detail: "Time-critical delivery of high-demand, hard-to-source medical, dental, and lab supplies to support medical logistics.",
    logo: "/assets/departments/air-force.png",
    logoAlt: "Department of the Air Force seal",
  },
  {
    code: "NAVY",
    agency: "Department of Navy",
    value: "$2,750,000",
    detail: "Time-sensitive logistics support of critical medical, dental, and lab supplies and PPE supporting naval mission continuity.",
    logo: "/assets/departments/navy.png",
    logoAlt: "Department of the Navy seal",
  },
  {
    code: "ARMY",
    agency: "Department of Army",
    value: "$2,700,000",
    detail: "Mission-critical supply support of medical, dental, and laboratory items and PPE in support of S4 readiness objectives.",
    logo: "/assets/departments/army.png",
    logoAlt: "Department of the Army seal",
  },
  {
    code: "IHS",
    agency: "Department of Indian Health Services",
    value: "$2,600,000",
    detail: "Expedited delivery of mission-essential medical, dental, and laboratory supplies and PPE for IHS healthcare facilities.",
    logo: "/assets/departments/ihs-white.png",
    logoAlt: "Indian Health Service mark",
  },
  {
    code: "DHS",
    agency: "Department of Homeland Security",
    value: "$2,300,000",
    detail: "Priority sustainment delivery of high-demand inks, toners, office supplies, electronics, and PPE supporting DHS operations.",
    logo: "/assets/departments/homeland-security.png",
    logoAlt: "Department of Homeland Security seal",
  },
];

const capabilities = [
  "High Demand Medical, Dental, and Lab Supplies",
  "Medical Disposables and Durable Medical Equipment",
  "Personal Protective Equipment (PPEs)",
  "Environmental: Hospital Janitorial / Sanitation Supplies",
  "Mobility, Health, and Safety Equipment",
  "OR/ER: Surgical Supplies and Instruments",
  "Rx Pharmaceuticals",
  "Toner and Ink Cartridges with Lifetime Warranty",
  "Admin/Office Supplies",
  "Electronics, I.T. Equipment, and Technology Products",
];

const differentiators = [
  "Account representatives available from 4AM PST",
  "Emails responded to within minutes",
  "Same-day results for urgent requirements",
  "Stock verified before quotes",
  "Delivery timeframes of 1 to 3 business days",
  "Free overnight shipping during emergency situations",
  "Performance during shortages, backorders, and nationwide disruptions",
  "No lead-time supplies. No backorders. No delays.",
];

const processSteps = [
  "RFQ received",
  "Requirement reviewed",
  "Stock verified",
  "Supplier/channel checked",
  "Quote prepared",
  "Documentation confirmed",
  "Delivery coordinated",
  "Client updated",
];

const naicsCodes = [
  ["423450", "Medical, Dental, and Hospital Equipment and Supplies Merchant Wholesalers"],
  ["622110", "General Medical and Surgical Hospitals"],
  ["423490", "Other Professional Equipment and Supplies Merchant Wholesalers"],
  ["423860", "Transportation Equipment and Supplies Merchant Wholesalers"],
  ["423410", "Photographic Equipment and Supplies Merchant Wholesalers"],
  ["339113", "Surgical Appliance and Supplies Manufacturing"],
  ["339940", "Office Supplies Manufacturing"],
  ["339114", "Dental Equipment and Supplies Manufacturing"],
  ["453210", "Office Supplies and Stationery Stores"],
  ["446199", "All Other Health and Personal Care Stores"],
  ["424110", "Printing and Writing Paper Merchant Wholesalers"],
  ["424120", "Stationery and Office Supplies Merchant Wholesalers"],
  ["325130", "Synthetic Dye and Pigment Manufacturing"],
  ["325992", "Photographic Film, Paper, Plate, and Chemical Manufacturing"],
  ["315990", "Apparel Accessories and Other Apparel Manufacturing"],
  ["334111", "Electronic Computer Manufacturing"],
  ["423430", "Computer, Computer Peripheral Equipment, Software Merchant Wholesalers"],
];

function MethodLogo() {
  return (
    <a className="brand" href="#top" onClick={(event) => scrollToScene(event, "top")} aria-label="Method One Solutions home">
      <img className="brand-logo" src={BRAND_LOGO} alt="Method One Solutions" width="230" height="53" decoding="async" />
    </a>
  );
}

function scrollToScene(event, id) {
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  const trigger = ScrollTrigger.getAll().find((item) => item.trigger === target);
  const top = trigger ? trigger.start : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", `#${id}`);
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useScrollSystems(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) {
      ScrollTrigger.refresh();
      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.62,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1,
      lerp: 0.14,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timeout = window.setTimeout(refresh, 220);
    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh).catch(() => {});
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("load", refresh);
    };
  }, []);
}

function usePageAnimations(reducedMotion) {
  useEffect(() => {
    const contexts = [];
    const isCompact = window.matchMedia("(max-width: 760px)").matches;

    if (reducedMotion) {
      gsap.set(".reveal, .agency-node, .capability-item, .principle, .vendor-card, .rfq-panel", {
        opacity: 1,
        y: 0,
        clearProps: "transform",
      });
      return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }

    contexts.push(
      gsap.context(() => {
        gsap.utils.toArray(".reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 34, filter: "blur(12px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
              },
            },
          );
        });
      }),
    );

    if (isCompact) {
      gsap.set(".agency-node, .award-card, .module, .doc-layer, .briefcase-exit, .process-step, .document-stack span", {
        opacity: 1,
        y: 0,
        x: 0,
        clearProps: "transform",
      });
      ScrollTrigger.refresh();
      return () => {
        contexts.forEach((context) => context.revert());
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    contexts.push(
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "+=1800",
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
          },
        });

        tl.set(".hero-content, .hero-content .eyebrow, .hero-content h1, .hero-content p, .hero-actions a, .hero-telemetry, .hero-telemetry span", {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath: "inset(0 0 0% 0)",
        })
          .to(".hero-grid", { backgroundPosition: "0 180px", duration: 0.75 }, 0)
          .to(".hero-content", { y: -72, scale: 0.965, opacity: 0.76, duration: 0.82 }, 0.18)
          .to(".hero-telemetry", { y: -96, opacity: 0.28, duration: 0.82 }, 0.18);
      }),
    );

    contexts.push(
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: ".performance-pin",
            start: "top top",
            end: "+=2600",
            pin: true,
            scrub: 0.38,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.from(".agency-node", { opacity: 0, scale: 0.74, y: 62, stagger: 0.13, duration: 0.75 })
          .fromTo(".command-board", { rotateX: 10, z: -180 }, { rotateX: 0, z: 0, duration: 1.1 }, "<")
          .from(".network-line", { scaleX: 0, opacity: 0, transformOrigin: "left center", stagger: 0.08, duration: 0.65 }, "<0.15")
          .from(".award-card", { opacity: 0, y: 38, stagger: 0.15, duration: 0.7 }, "<0.25")
          .to(".board-sweep", { xPercent: 120, duration: 1.1 }, "<")
          .fromTo(".agency-node strong", { scale: 0.82, opacity: 0.35 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.6 }, "<0.1")
          .to(".agency-node", { y: (index) => (index % 2 === 0 ? -18 : 18), duration: 1.2 }, ">")
          .to(".network-core", { scale: 1.12, boxShadow: "0 0 80px rgba(142,9,11,.55)", duration: 0.9 }, "<")
          .to(".command-board", { rotateX: -6, y: -70, opacity: 0.35, duration: 0.75 }, ">");
      }),
    );

    contexts.push(
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".capabilities-section",
            start: "top top",
            end: "+=2400",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        tl.fromTo(".capabilities-section .section-copy", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.5 })
          .fromTo(".capability-grid", { rotateX: 16, rotateY: -9, y: 120, scale: 0.86 }, { rotateX: 0, rotateY: 0, y: 0, scale: 1, duration: 0.8 }, "<0.15")
          .fromTo(".capability-item", { opacity: 0, z: -120, y: 70 }, { opacity: 1, z: 0, y: 0, stagger: 0.08, duration: 0.9 }, "<0.1")
          .to(".capability-item", { x: (index) => (index % 5 - 2) * 9, y: (index) => (Math.floor(index / 5) - 0.5) * 18, stagger: 0.04, duration: 0.7 }, ">")
          .to(".capability-grid", { scale: 0.92, y: -85, opacity: 0.35, duration: 0.65 }, ">");
      }),
    );

    contexts.push(
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".briefcase-pin",
            start: "top top",
            end: "+=3600",
            pin: true,
            scrub: 0.42,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(".briefcase-unit", { y: 180, rotateX: 24, rotateY: -38, rotateZ: -2, scale: 0.7 }, { y: 8, rotateX: 10, rotateY: -16, rotateZ: 0, scale: 1, duration: 0.9 })
          .fromTo(".case-shadow", { opacity: 0, scale: 0.62, y: 90 }, { opacity: 0.72, scale: 1, y: 0, duration: 0.9 }, "<")
          .to(".briefcase-unit", { rotateY: 24, rotateX: 2, y: -8, duration: 0.68 })
          .to(".briefcase-lid", { rotateX: -118, y: -22, z: -22, duration: 1.05 })
          .to(".briefcase-body", { rotateX: 4, duration: 0.75 }, "<0.1")
          .to(".case-light", { opacity: 0.86, scale: 1.18, duration: 0.48 }, "<0.05")
          .from(".module", { opacity: 0, y: 44, z: -90, rotateX: 14, scale: 0.78, stagger: 0.09, duration: 0.78 }, "<0.22")
          .from(".doc-layer", { opacity: 0, x: 84, z: -80, rotateY: -16, rotate: 6, stagger: 0.12, duration: 0.76 }, "<0.12")
          .to(".module", { x: (index) => [-340, 320, -292, 292, -160, 168][index], y: (index) => [-162, -140, 122, 148, -8, 16][index], z: (index) => [96, 74, 66, 88, 118, 118][index], rotate: (index) => [-7, 6, 5, -6, 0, 0][index], duration: 1.08 }, ">")
          .to(".doc-layer", { x: 0, y: (index) => index * 22, z: (index) => index * 22, rotateY: 0, rotate: 0, duration: 0.86 }, "<")
          .to(".briefcase-unit", { y: -104, rotateX: 7, rotateY: 0, scale: 0.82, duration: 0.88 }, ">")
          .to(".case-light", { opacity: 0.38, scale: 0.9, duration: 0.72 }, "<")
          .from(".briefcase-exit", { opacity: 0, y: 42, duration: 0.66 }, "<0.18")
          .to(".briefcase-stage", { scale: 0.94, opacity: 0.48, duration: 0.68 }, ">");
      }),
    );

    contexts.push(
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".principles-section",
            start: "top top",
            end: "+=1900",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(".principles-section .section-copy", { opacity: 0, x: -90 }, { opacity: 1, x: 0, duration: 0.55 })
          .fromTo(".principle", { opacity: 0, rotateX: 16, y: 70 }, { opacity: 1, rotateX: 0, y: 0, stagger: 0.08, duration: 0.9 }, "<0.12")
          .to(".principle", { z: (index) => (index % 2 ? 48 : -28), y: (index) => (index % 2 ? -18 : 18), duration: 0.9 }, ">")
          .to(".principles-grid", { opacity: 0.28, scale: 0.92, duration: 0.65 }, ">");
      }),
    );

    contexts.push(
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".process-pin",
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(".process-progress", { scaleX: 1, duration: 1 })
          .from(".process-step", { opacity: 0.25, y: 22, stagger: 0.12, duration: 0.9 }, "<")
          .to(".process-step", { opacity: 1, y: 0, stagger: 0.12, duration: 0.9 }, "<")
          .from(".document-stack span", { opacity: 0, x: 120, rotate: 8, stagger: 0.12, duration: 0.7 }, "<0.2");
      }),
    );

    contexts.push(
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".vendor-section",
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(".vendor-section .section-copy", { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.5 })
          .fromTo(".vendor-card", { opacity: 0, y: 80, rotateX: 18 }, { opacity: 1, y: 0, rotateX: 0, stagger: 0.12, duration: 0.7 }, "<0.12")
          .fromTo(".naics-panel div", { opacity: 0, x: -32 }, { opacity: 1, x: 0, stagger: 0.035, duration: 0.9 }, ">-0.1")
          .to(".naics-panel div", { y: (index) => (index % 3 - 1) * 10, stagger: 0.02, duration: 0.75 }, ">")
          .to(".vendor-layout", { scale: 0.92, y: -70, opacity: 0.34, duration: 0.75 }, ">");
      }),
    );

    contexts.push(
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".rfq-section",
            start: "top top",
            end: "+=1600",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(".rfq-panel", { opacity: 0, y: 110, scale: 0.9, rotateX: 12 }, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.75 })
          .fromTo(".rfq-form label", { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.55 }, "<0.2")
          .to(".rfq-panel", { boxShadow: "0 0 120px rgba(142,9,11,.28)", duration: 0.7 }, ">")
          .to(".rfq-panel", { scale: 0.96, duration: 0.5 }, ">");
      }),
    );

    ScrollTrigger.refresh();

    return () => {
      contexts.forEach((context) => context.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content reveal">
        <div className="eyebrow">Federal medical logistics and procurement supplier</div>
        <h1>Mission-Critical Supplies. Delivered Without Delay.</h1>
        <p>
          Method One Solutions sources, verifies, and delivers high-demand medical, surgical, dental,
          laboratory, PPE, office, technology, and operational supplies for federal, government, and
          institutional buyers.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#rfq" onClick={(event) => scrollToScene(event, "rfq")}>Send RFQ</a>
          <a className="secondary-action" href="#performance" onClick={(event) => scrollToScene(event, "performance")}>View Past Performance</a>
        </div>
      </div>
      <aside className="hero-telemetry reveal" aria-label="Operating standards">
        <span>Stock verified before quote</span>
        <span>1 to 3 business day delivery windows</span>
        <span>4AM PST representative coverage</span>
      </aside>
    </section>
  );
}

function PerformanceBoard() {
  return (
    <section id="performance" className="performance-pin cinematic-section">
      <div className="section-copy reveal">
        <div className="eyebrow">Past Performance Command Board</div>
        <h2>Federal buying history mapped as an operating network.</h2>
      </div>
      <div className="command-board">
        <div className="board-sweep" aria-hidden="true" />
        <div className="network-core">
          <strong>$1.43M</strong>
          <span>Awarded</span>
        </div>
        <div className="agency-grid">
          {performance.map((item, index) => (
            <article className={`agency-node node-${index + 1}`} key={item.agency}>
              <span className="agency-seal">
                <img src={item.logo} alt={item.logoAlt} loading="lazy" decoding="async" />
              </span>
              <div>
                <span className="agency-code">{item.code}</span>
                <h3>{item.agency}</h3>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, index) => <span className={`network-line line-${index + 1}`} key={index} />)}
        <div className="award-rail">
          <div className="award-card">BPA 75H71022P00407</div>
          <div className="award-card">BPA 75H71024P00002</div>
          <div className="award-card">Stock / channel / documentation verified</div>
        </div>
      </div>
    </section>
  );
}

function CapabilityGrid() {
  return (
    <section id="capabilities" className="content-section capabilities-section">
      <div className="section-copy reveal">
        <div className="eyebrow">Core Capabilities</div>
        <h2>Coverage across critical medical, facility, administrative, and technology supply lines.</h2>
      </div>
      <div className="capability-grid">
        {capabilities.map((item, index) => (
          <article className="capability-item reveal" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function BriefcaseReveal() {
  const modules = ["Medical", "Dental", "Lab", "PPE", "Surgical", "Technology"];

  return (
    <section id="briefcase" className="briefcase-pin cinematic-section">
      <div className="briefcase-copy reveal">
        <div className="eyebrow">Pinned Capability Reveal</div>
        <h2>The RFQ enters a controlled sourcing sequence.</h2>
      </div>
      <div className="briefcase-stage" aria-label="Animated briefcase capability reveal">
        <div className="case-light" aria-hidden="true" />
        <div className="case-shadow" aria-hidden="true" />
        <div className="briefcase-unit">
          <div className="briefcase-handle" />
          <div className="briefcase-lid">
            <span />
          </div>
          <div className="briefcase-body">
            <span className="case-lock">
              <img src={BRAND_SUN_LOGO} alt="" aria-hidden="true" />
            </span>
            <span className="case-rib rib-one" />
            <span className="case-rib rib-two" />
            <span className="case-depth" />
          </div>
        </div>
        <div className="module-field">
          {modules.map((module) => <span className="module" key={module}>{module}</span>)}
        </div>
        <div className="doc-layers">
          <span className="doc-layer">Quote validation</span>
          <span className="doc-layer">Stock confirmation</span>
          <span className="doc-layer">Delivery documentation</span>
        </div>
        <div className="briefcase-exit">
          <strong>Verified package ready</strong>
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  return (
    <section className="content-section principles-section">
      <div className="section-copy reveal">
        <div className="eyebrow">Operating Principles</div>
        <h2>Concise standards for shortage conditions, backorders, and urgent procurement.</h2>
      </div>
      <div className="principles-grid">
        {differentiators.map((item) => (
          <article className="principle reveal" key={item}>
            <span aria-hidden="true">✓</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="process-pin cinematic-section">
      <div className="section-copy reveal">
        <div className="eyebrow">RFQ Workflow</div>
        <h2>Every request moves through a verified logistics path.</h2>
      </div>
      <div className="process-board">
        <div className="process-line"><span className="process-progress" /></div>
        {processSteps.map((step, index) => (
          <article className="process-step" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </article>
        ))}
        <div className="document-stack" aria-hidden="true">
          <span>RFQ</span>
          <span>Inventory</span>
          <span>Quote</span>
          <span>Delivery</span>
        </div>
      </div>
    </section>
  );
}

function VendorProfile() {
  return (
    <section className="content-section vendor-section">
      <div className="section-copy reveal">
        <div className="eyebrow">Vendor Profile</div>
        <h2>Compact federal identifiers and NAICS coverage.</h2>
      </div>
      <div className="vendor-layout">
        <div className="vendor-card reveal">
          <span>UEI</span>
          <strong>MEY8YZXJ5AA7</strong>
        </div>
        <div className="vendor-card reveal">
          <span>D-U-N-S</span>
          <strong>117803955</strong>
        </div>
        <div className="vendor-card reveal">
          <span>Federal CAGE Code</span>
          <strong>8TJT0</strong>
        </div>
        <div className="naics-panel reveal">
          {naicsCodes.map(([code, label]) => (
            <div key={code}>
              <strong>{code}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RFQSection() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    details: "",
    deliveryDate: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function updateField(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.name || !formData.organization || !formData.email || !formData.details) {
      setStatus("error");
      setMessage("Please include name, organization, email, and RFQ details.");
      return;
    }

    setStatus("submitting");
    setMessage("Sending RFQ...");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ subject: "New Method One RFQ", ...formData }),
      });

      if (!response.ok) throw new Error("RFQ submission failed");

      setStatus("success");
      setMessage("RFQ sent. Method One will review the details and respond quickly.");
      setFormData({ name: "", organization: "", email: "", phone: "", details: "", deliveryDate: "" });
    } catch {
      setStatus("error");
      setMessage("Submission failed. Email service@methodonesolutions.com directly with the RFQ details.");
    }
  }

  return (
    <section id="rfq" className="rfq-section">
      <div className="rfq-panel reveal">
        <div className="rfq-copy">
          <div className="eyebrow">RFQ Inquiry</div>
          <h2>Send the RFQ. We’ll verify stock fast.</h2>
          <address>
            <strong>Contact Us</strong>
            <a href="tel:+18773219876">(877) 321-9876</a>
            <a href="mailto:service@methodonesolutions.com">service@methodonesolutions.com</a>
          </address>
        </div>
        <form onSubmit={handleSubmit} className="rfq-form">
          <label>Name<input name="name" value={formData.name} onChange={updateField} autoComplete="name" /></label>
          <label>Organization<input name="organization" value={formData.organization} onChange={updateField} autoComplete="organization" /></label>
          <label>Email<input name="email" value={formData.email} onChange={updateField} type="email" autoComplete="email" /></label>
          <label>Phone<input name="phone" value={formData.phone} onChange={updateField} type="tel" autoComplete="tel" /></label>
          <label className="full">RFQ / item details<textarea name="details" value={formData.details} onChange={updateField} /></label>
          <label>Required delivery date<input name="deliveryDate" value={formData.deliveryDate} onChange={updateField} type="date" /></label>
          <button disabled={status === "submitting"}>{status === "submitting" ? "Sending..." : "Submit RFQ"}</button>
          {message && <p className={`form-message ${status}`}>{message}</p>}
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef(null);

  useScrollSystems(reducedMotion);
  usePageAnimations(reducedMotion);

  return (
    <main ref={rootRef} className="site-shell">
      <Suspense fallback={<div className="command-environment" aria-hidden="true" />}>
        <CommandEnvironment reducedMotion={reducedMotion} />
      </Suspense>
      <header className="site-header">
        <MethodLogo />
        <nav aria-label="Primary navigation">
          <a href="#performance" onClick={(event) => scrollToScene(event, "performance")}>Performance</a>
          <a href="#capabilities" onClick={(event) => scrollToScene(event, "capabilities")}>Capabilities</a>
          <a href="#process" onClick={(event) => scrollToScene(event, "process")}>Process</a>
          <a href="#rfq" onClick={(event) => scrollToScene(event, "rfq")}>RFQ</a>
        </nav>
      </header>
      <Hero />
      <PerformanceBoard />
      <CapabilityGrid />
      <BriefcaseReveal />
      <Differentiators />
      <ProcessSection />
      <VendorProfile />
      <RFQSection />
      <footer className="site-footer">
        <MethodLogo />
        <span>Verified stock. Fast communication. Federal-ready execution.</span>
      </footer>
    </main>
  );
}
