import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
const COMPANY_NAME = "Method One Solutions";
const WEBSITE_URL = "https://www.methodonesolutions.com";
let activeLenis = null;
const isProgrammaticScrollRef = { current: false };
let navScrollFrame = 0;
let navScrollRun = 0;
let navScrollFallbackTimeout = 0;

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

const capabilityPodPositions = [
  [50, 8],
  [72, 13],
  [89, 34],
  [87, 62],
  [69, 82],
  [50, 88],
  [31, 82],
  [13, 62],
  [11, 34],
  [28, 13],
];

const capabilityParticles = [
  [50, 50, -128, -84],
  [50, 50, 116, -98],
  [50, 50, 158, 18],
  [50, 50, 112, 116],
  [50, 50, -92, 138],
  [50, 50, -164, 28],
  [50, 50, -34, -148],
  [50, 50, 42, 152],
  [50, 50, 178, -54],
  [50, 50, -178, -42],
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

function MethodLogo({ legalPage = false }) {
  return (
    <a className="brand" href={legalPage ? "/" : "#top"} onClick={legalPage ? undefined : (event) => scrollToScene(event, "top")} aria-label="Method One Solutions home">
      <img className="brand-logo" src={BRAND_LOGO} alt="Method One Solutions" width="230" height="53" decoding="async" />
    </a>
  );
}

function easeInOutQuart(progress) {
  return progress < 0.5 ? 8 * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 4) / 2;
}

function getNavTargetY(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return window.scrollY;

  const trigger = ScrollTrigger.getAll().find((item) => item.trigger === target);
  const sectionTop = trigger ? trigger.start : target.getBoundingClientRect().top + window.scrollY;
  const sectionDistance = trigger ? trigger.end - trigger.start : target.offsetHeight;
  const headerOffset = document.querySelector(".site-header")?.offsetHeight ?? 0;

  if (sectionId === "performance") return sectionTop + sectionDistance * 0.55;
  if (sectionId === "capabilities") return sectionTop + sectionDistance * 0.48;
  if (sectionId === "process") return sectionTop + sectionDistance * 0.5;
  if (sectionId === "rfq") return sectionTop + sectionDistance * 0.45;
  if (sectionId === "contact") return sectionTop - headerOffset;

  return sectionTop - headerOffset;
}

function refreshAfterNavigation() {
  ScrollTrigger.update();
  navScrollFrame = window.requestAnimationFrame(() => {
    ScrollTrigger.update();
    navScrollFrame = 0;
  });
}

function cancelNavScroll() {
  if (navScrollFrame) window.cancelAnimationFrame(navScrollFrame);
  if (navScrollFallbackTimeout) window.clearTimeout(navScrollFallbackTimeout);
  navScrollFrame = 0;
  navScrollFallbackTimeout = 0;
  navScrollRun += 1;
  isProgrammaticScrollRef.current = false;
  activeLenis?.start?.();
}

function scrollToY(targetY) {
  cancelNavScroll();
  const run = ++navScrollRun;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const destination = Math.max(0, Math.min(targetY, maxScroll));
  isProgrammaticScrollRef.current = true;

  return new Promise((resolve) => {
    const finish = () => {
      if (run !== navScrollRun) {
        resolve(false);
        return;
      }

      isProgrammaticScrollRef.current = false;
      navScrollFallbackTimeout = 0;
      refreshAfterNavigation();
      resolve(true);
    };

    if (activeLenis) {
      activeLenis.start();
      activeLenis.scrollTo(destination, {
        duration: 1.05,
        easing: easeInOutQuart,
        onComplete: finish,
      });
      return;
    }

    window.scrollTo({ top: destination, behavior: "smooth" });
    navScrollFallbackTimeout = window.setTimeout(finish, 1100);
  });
}

function scrollToScene(event, id) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  ScrollTrigger.update();
  scrollToY(getNavTargetY(id)).then((completed) => {
    if (completed) window.history.pushState(null, "", `#${id}`);
  });
}

function SiteHeader({ legalPage = false }) {
  const linkProps = (id) => ({
    href: legalPage ? `/#${id}` : `#${id}`,
    onClick: legalPage ? undefined : (event) => scrollToScene(event, id),
  });

  return (
    <header className="site-header">
      <MethodLogo legalPage={legalPage} />
      <nav aria-label="Primary navigation">
        <a {...linkProps("performance")}>Performance</a>
        <a {...linkProps("capabilities")}>Capabilities</a>
        <a {...linkProps("process")}>Process</a>
        <a {...linkProps("rfq")}>RFQ</a>
        <a {...linkProps("contact")}>Contact Us</a>
      </nav>
    </header>
  );
}

function SiteFooter({ legalPage = false }) {
  return (
    <footer className="site-footer">
      <MethodLogo legalPage={legalPage} />
      <span>Verified stock. Fast communication. Federal-ready execution.</span>
      <nav className="footer-links" aria-label="Legal pages">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-and-conditions">Terms &amp; Conditions</a>
      </nav>
    </footer>
  );
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

function useScrollSystems(reducedMotion, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      ScrollTrigger.refresh();
      return undefined;
    }

    if (reducedMotion) {
      ScrollTrigger.refresh();
      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.62,
      smoothWheel: true,
      wheelMultiplier: 1.6,
      touchMultiplier: 1,
      lerp: 0.14,
    });
    activeLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      if (activeLenis === lenis) activeLenis = null;
      lenis.destroy();
    };
  }, [enabled, reducedMotion]);

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

function usePageAnimations(reducedMotion, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return undefined;
    }

    const contexts = [];
    const isCompact = window.matchMedia("(max-width: 760px)").matches;

    if (reducedMotion) {
      gsap.set(".reveal, .agency-node, .capability-pod, .vendor-card, .rfq-panel", {
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
          .fromTo(".capability-orbit-stage", { rotateX: 12, y: 64, scale: 0.94 }, { rotateX: 0, y: 0, scale: 1, duration: 0.8 }, "<0.15")
          .to(".capability-energy", { scale: 1.08, opacity: 0.9, duration: 0.9 }, "<0.2")
          .to(".capability-orbit-stage", { scale: 0.98, y: -22, duration: 0.65 }, ">");
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

        tl.fromTo(
          ".principles-section .section-copy",
          { opacity: 0, y: 42, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
        )
          .to(".principles-section .section-copy", { y: -18, duration: 0.9 })
          .to(".principles-section .section-copy", { opacity: 0.78, y: -42, duration: 0.65 }, ">");
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
  }, [enabled, reducedMotion]);
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
      <div className="capability-orbit-stage" aria-label="Method One capabilities orbit">
        <div className="capability-gridlines" aria-hidden="true" />
        <motion.div
          className="capability-energy"
          aria-hidden="true"
          animate={{ scale: [0.9, 1.18, 1.36], opacity: [0.32, 0.16, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeOut" }}
        />
        {capabilityParticles.map(([left, top, x, y], index) => (
          <motion.span
            className="capability-particle"
            aria-hidden="true"
            key={`particle-${index}`}
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ x: [0, x, x * 1.08], y: [0, y, y * 1.08], opacity: [0, 0.5, 0], scale: [0.5, 1, 0.7] }}
            transition={{ duration: 5.8 + index * 0.18, delay: index * 0.24, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <motion.div
          className="capability-sun-core"
          initial={{ opacity: 0, scale: 0.86 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.35, once: false }}
          transition={{ duration: 0.72, ease: "easeOut" }}
        >
          <motion.img
            src={BRAND_SUN_LOGO}
            alt="Method One sun logo"
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            decoding="async"
          />
        </motion.div>
        {capabilities.map((item, index) => (
          <motion.article
            className="capability-pod"
            key={item}
            style={{ left: `${capabilityPodPositions[index][0]}%`, top: `${capabilityPodPositions[index][1]}%` }}
            initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -7 : 7 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.62, delay: index * 0.045, ease: "easeOut" }}
          >
            <motion.div
              className="capability-pod-inner"
              animate={{
                x: [0, index % 2 === 0 ? 5 : -5, 0, index % 2 === 0 ? -4 : 4, 0],
                y: [0, index % 3 === 0 ? -5 : 4, 0, index % 3 === 0 ? 4 : -5, 0],
                rotate: [0, index % 2 === 0 ? 1.2 : -1.2, 0, index % 2 === 0 ? -1 : 1, 0],
              }}
              transition={{ duration: 8 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </motion.div>
          </motion.article>
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
      <div className="section-copy">
        <h2>No lead-time supplies. No backorders. No delays.</h2>
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
    sms_consent: false,
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function updateField(event) {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
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
      setMessage("RFQ sent. We'll reach back out shortly.");
      setFormData({ name: "", organization: "", email: "", phone: "", details: "", deliveryDate: "", sms_consent: false });
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
        </div>
        <form onSubmit={handleSubmit} className="rfq-form">
          <label>Name<input name="name" value={formData.name} onChange={updateField} autoComplete="name" /></label>
          <label>Organization<input name="organization" value={formData.organization} onChange={updateField} autoComplete="organization" /></label>
          <label>Email<input name="email" value={formData.email} onChange={updateField} type="email" autoComplete="email" /></label>
          <label>Phone<input name="phone" value={formData.phone} onChange={updateField} type="tel" autoComplete="tel" /></label>
          <label className="sms-consent full">
            <input name="sms_consent" checked={formData.sms_consent} onChange={updateField} type="checkbox" />
            <span>
              By checking this box, you agree to receive SMS messages from Method One Solutions related to conversational purposes,
              including RFQ updates, procurement communication, order coordination, availability confirmations, service follow-ups,
              and customer support. You may reply STOP to opt out at any time. Reply HELP for assistance. Message and data rates
              may apply. Message frequency may vary. Learn more on our <a href="/privacy-policy">Privacy Policy</a> page and{" "}
              <a href="/terms-and-conditions">Terms &amp; Conditions</a>.
            </span>
          </label>
          <label className="full">RFQ / item details<textarea name="details" value={formData.details} onChange={updateField} /></label>
          <label>Required delivery date<input name="deliveryDate" value={formData.deliveryDate} onChange={updateField} type="date" /></label>
          <button disabled={status === "submitting"}>{status === "submitting" ? "Sending..." : "Submit RFQ"}</button>
          {message && <p className={`form-message ${status}`}>{message}</p>}
        </form>
      </div>
    </section>
  );
}

function ContactSection() {
  const particles = Array.from({ length: 18 }, (_, index) => index);

  return (
    <section id="contact" className="content-section contact-section">
      <div className="contact-particle-bar contact-particle-bar-left" aria-hidden="true">
        {particles.map((index) => <span key={`left-${index}`} />)}
      </div>
      <div className="contact-particle-bar contact-particle-bar-right" aria-hidden="true">
        {particles.map((index) => <span key={`right-${index}`} />)}
      </div>
      <div className="contact-content">
        <h2>Questions? Contact Us.</h2>
        <div className="contact-details" aria-label="Contact information">
          <a href="tel:+18773219876"><span>Phone:</span> (877) 321-9876</a>
          <a href="mailto:service@methodonesolutions.com"><span>Email:</span> service@methodonesolutions.com</a>
          <p><span>Hours:</span> Mon-Fri 4am-6pm PST</p>
          <a href="tel:+17149884222"><span>24-7 Emergency Support:</span> (714) 988-4222</a>
        </div>
      </div>
    </section>
  );
}

function LegalPage({ type }) {
  const isPrivacy = type === "privacy";

  return (
    <main className="site-shell legal-shell">
      <Suspense fallback={<div className="command-environment" aria-hidden="true" />}>
        <CommandEnvironment reducedMotion />
      </Suspense>
      <SiteHeader legalPage />
      {isPrivacy ? <PrivacyPolicyContent /> : <TermsContent />}
      <SiteFooter legalPage />
    </main>
  );
}

function LegalSection({ title, children }) {
  return (
    <section className="legal-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function PrivacyPolicyContent() {
  return (
    <article className="legal-content">
      <header className="legal-hero">
        <div className="eyebrow">Method One Solutions</div>
        <h1>Privacy Policy &amp; SMS Terms of Service</h1>
        <p>Effective Date: April 15, 2026</p>
      </header>

      <LegalSection title="1. Introduction">
        <p>Method One Solutions (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of individuals who interact with our services. This Privacy Policy describes how we collect, use, disclose, and safeguard personal information in connection with our sales and lead generation activities, including our use of SMS/text message communications.</p>
        <p>By providing your contact information or opting into our SMS communications, you agree to the practices described in this Privacy Policy.</p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following categories of personal information:</p>
        <ul>
          <li>Full name</li>
          <li>Phone number (including mobile numbers used for SMS communications)</li>
          <li>Email address</li>
          <li>Communication preferences and opt-in/opt-out status</li>
          <li>Device and usage information collected automatically (e.g., browser type, IP address, pages visited) through cookies and analytics tools</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Collect Information">
        <p>We collect personal information in the following ways:</p>
        <ul>
          <li>Directly from you when you fill out a contact form, request information, or voluntarily provide it</li>
          <li>When you opt in to receive SMS/text message communications from us</li>
          <li>Through our website via cookies and third-party analytics tools (e.g., Google Analytics)</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How We Use Your Information">
        <p>We use the personal information we collect for the following purposes:</p>
        <ul>
          <li>To contact you regarding our products, services, and sales opportunities</li>
          <li>To send you SMS/text messages you have opted into, including promotional, informational, and transactional messages</li>
          <li>To respond to your inquiries and provide customer support</li>
          <li>To improve our website, services, and communications</li>
          <li>To comply with applicable laws and regulations</li>
          <li>To manage and maintain our business operations</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. SMS Communications">
        <p>By opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Method One Solutions. This includes SMS messages for conversations related to our sales and lead generation services.</p>
        <p><strong>Message Frequency:</strong> Message frequency may vary based on your interactions with us.</p>
        <p><strong>Message &amp; Data Rates:</strong> Message and data rates may apply. Please consult your mobile carrier for details.</p>
        <p><strong>Opt-Out:</strong> To opt out at any time, text STOP to any message from us.</p>
        <p><strong>Help:</strong> For assistance, text HELP to any message or visit our website at <a href={WEBSITE_URL}>{WEBSITE_URL}</a>.</p>
        <p>You may also contact us by phone at:</p>
        <p><a href="tel:+18773219876">(877) 321-9876</a></p>
        <p><strong>Privacy Policy:</strong> <a href={`${WEBSITE_URL}/privacy-policy`}>{WEBSITE_URL}/privacy-policy</a></p>
        <p><strong>Terms &amp; Conditions:</strong> <a href={`${WEBSITE_URL}/terms-and-conditions`}>{WEBSITE_URL}/terms-and-conditions</a></p>
        <p>SMS Consent is not shared with third parties or affiliates for marketing or promotional purposes.</p>
        <p>SMS Consent, and phone numbers collected for SMS communication purposes will not be shared with any third party or affiliates for marketing purposes.</p>
      </LegalSection>

      <LegalSection title="6. Sharing of Personal Information">
        <p>We do not sell your personal information.</p>
        <p>We do not share your personal information with third parties for marketing, advertising, or promotional purposes.</p>
        <p>Your information is kept strictly internal and used solely by Method One Solutions for the purposes described in this Privacy Policy.</p>
        <p>We may disclose your information only in the following limited circumstances:</p>
        <ul>
          <li>When required by law, regulation, court order, or government authority</li>
          <li>In connection with a business merger, acquisition, or sale of substantially all assets</li>
          <li>To protect the rights, property, or safety of Method One Solutions, its clients, or others</li>
        </ul>
        <p>Mobile opt-in data, SMS consent, and phone numbers collected for SMS communications will never be shared with any third party under any circumstances.</p>
      </LegalSection>

      <LegalSection title="7. Cookies and Tracking Technologies">
        <p>Our website uses cookies and similar tracking technologies to enhance browsing experience, analyze site traffic, and understand how visitors interact with our site.</p>
        <p>We may use tools such as Google Analytics.</p>
        <p>Users may disable cookies through browser settings.</p>
      </LegalSection>

      <LegalSection title="8. Data Retention">
        <p>We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, comply with legal obligations, and resolve disputes.</p>
        <p>SMS opt-in and opt-out records are retained in accordance with applicable telecommunications regulations.</p>
      </LegalSection>

      <LegalSection title="9. Data Security">
        <p>We implement reasonable administrative, technical, and physical safeguards to protect personal information.</p>
        <p>However, no method of transmission over the internet can be guaranteed as completely secure.</p>
      </LegalSection>

      <LegalSection title="10. Your Privacy Rights">
        <p>Depending on location, users may have rights including:</p>
        <ul>
          <li>Knowing what information is collected</li>
          <li>Requesting deletion</li>
          <li>Opting out of information sharing</li>
          <li>Protection against discrimination for exercising privacy rights</li>
        </ul>
        <p>California residents may have additional rights under CCPA and CalOPPA.</p>
      </LegalSection>

      <LegalSection title="11. Children's Privacy">
        <p>Our services are not directed to individuals under 18 years old.</p>
      </LegalSection>

      <LegalSection title="12. Changes to This Privacy Policy">
        <p>We may update this Privacy Policy periodically.</p>
        <p>Changes will be reflected through an updated effective date.</p>
      </LegalSection>

      <LegalSection title="13. Contact Information">
        <p>{COMPANY_NAME}</p>
        <p><strong>Phone:</strong> <a href="tel:+18773219876">(877) 321-9876</a></p>
        <p><strong>Website:</strong> <a href={WEBSITE_URL}>{WEBSITE_URL}</a></p>
        <p><strong>Email:</strong> <a href="mailto:service@methodonesolutions.com">service@methodonesolutions.com</a></p>
      </LegalSection>
    </article>
  );
}

function TermsContent() {
  return (
    <article className="legal-content">
      <header className="legal-hero">
        <div className="eyebrow">Method One Solutions</div>
        <h1>Terms &amp; Conditions</h1>
        <p>Effective Date: April 15, 2026</p>
      </header>

      <LegalSection title="1. Website Use">
        <p>By using this website, you agree to use it only for lawful business purposes.</p>
      </LegalSection>

      <LegalSection title="2. RFQ & Procurement Communications">
        <p>Submitting an RFQ or contact request does not create a binding agreement.</p>
        <p>Method One Solutions may contact you regarding procurement requests, sourcing inquiries, RFQ clarifications, availability confirmations, logistics coordination, and customer support.</p>
      </LegalSection>

      <LegalSection title="3. SMS Consent Communication">
        <p>The information obtained as part of the SMS consent process will not be shared with third parties for marketing purposes.</p>
      </LegalSection>

      <LegalSection title="4. Types of SMS Communications">
        <p>If you consent to receive SMS messages from Method One Solutions, you may receive messages related to:</p>
        <ul>
          <li>RFQ updates</li>
          <li>Procurement communication</li>
          <li>Order coordination</li>
          <li>Availability confirmations</li>
          <li>Service follow-ups</li>
          <li>Customer support</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Message Frequency">
        <p>Message frequency may vary depending on communication needs.</p>
        <p>Users may receive up to 5 SMS messages per week.</p>
      </LegalSection>

      <LegalSection title="6. Potential Fees">
        <p>Message and data rates may apply depending on the carrier's pricing plan.</p>
      </LegalSection>

      <LegalSection title="7. Opt-In Method">
        <p>Users may opt in through the website form by checking the SMS consent checkbox.</p>
      </LegalSection>

      <LegalSection title="8. Opt-Out Method">
        <p>Users may opt out at any time by replying STOP to any SMS message received from Method One Solutions.</p>
        <p>Users may also request removal by contacting the company directly.</p>
      </LegalSection>

      <LegalSection title="9. Help">
        <p>For assistance:</p>
        <p>Reply HELP to any SMS message.</p>
        <p>Or contact:</p>
        <p><a href="mailto:service@methodonesolutions.com">service@methodonesolutions.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+18773219876">(877) 321-9876</a></p>
      </LegalSection>

      <LegalSection title="10. Standard Messaging Disclosures">
        <ul>
          <li>Message and data rates may apply.</li>
          <li>Text STOP to opt out.</li>
          <li>Text HELP for assistance.</li>
          <li>Message frequency may vary.</li>
          <li>Visit the <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-and-conditions">Terms &amp; Conditions</a> pages for more information.</li>
        </ul>
      </LegalSection>

      <LegalSection title="11. Limitation">
        <p>Nothing on this website guarantees product availability, pricing, delivery schedules, RFQ acceptance, or procurement outcomes.</p>
      </LegalSection>

      <LegalSection title="12. Contact Information">
        <p>{COMPANY_NAME}</p>
        <p><strong>Phone:</strong> <a href="tel:+18773219876">(877) 321-9876</a></p>
        <p><strong>Website:</strong> <a href={WEBSITE_URL}>{WEBSITE_URL}</a></p>
        <p><strong>Email:</strong> <a href="mailto:service@methodonesolutions.com">service@methodonesolutions.com</a></p>
      </LegalSection>
    </article>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef(null);
  const route = typeof window === "undefined" ? "/" : window.location.pathname.replace(/\/$/, "") || "/";
  const isLegalRoute = route === "/privacy-policy" || route === "/terms-and-conditions";

  useScrollSystems(reducedMotion, !isLegalRoute);
  usePageAnimations(reducedMotion, !isLegalRoute);

  if (route === "/privacy-policy") return <LegalPage type="privacy" />;
  if (route === "/terms-and-conditions") return <LegalPage type="terms" />;

  return (
    <main ref={rootRef} className="site-shell">
      <Suspense fallback={<div className="command-environment" aria-hidden="true" />}>
        <CommandEnvironment reducedMotion={reducedMotion} />
      </Suspense>
      <SiteHeader />
      <Hero />
      <PerformanceBoard />
      <CapabilityGrid />
      <BriefcaseReveal />
      <Differentiators />
      <ProcessSection />
      <VendorProfile />
      <RFQSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
