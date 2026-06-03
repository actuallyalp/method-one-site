# Method One Solutions Site Instructions

## Project
This repo powers the Method One Solutions front page.

Live references:
- Primary website: methodonesolutions.com
- Vercel deployment: method-one-site.vercel.app

## Stack
This is a React + Vite project.
Use the existing structure unless there is a strong reason to change it.
Prefer modular React components, Tailwind CSS, and production-ready animation code.

## Main files to inspect first
- src/
- public/
- index.html
- package.json
- vite.config.js

## Brand direction
Method One Solutions should feel serious, premium, federal-supplier, medical-logistics, fast, verified, and reliable.

Avoid:
- Generic SaaS template design
- Playful startup visuals
- Childish effects
- Slow portfolio-style over-animation
- Endless scrolling with low information density

## Animation rules
Use GSAP ScrollTrigger for major scroll-driven sections.
Use Lenis for smooth scrolling.
Synchronize Lenis with ScrollTrigger.
Pinned sections must not be skippable.
Scroll progress should drive the animation timeline.
Keep animations crisp and responsive, not delayed or floaty.
Support prefers-reduced-motion.

## Content rules
Use the attached Method One capability statement as the factual source.
Use methodonesolutions.com as the current live brand/content reference.
Do not invent certifications, clients, awards, or capabilities.

## Required homepage sections
1. Cinematic hero
2. Scroll-driven past performance command-board section
3. Core capabilities section
4. Pinned 3D or faux-3D briefcase capability reveal
5. Differentiators section
6. Process section
7. Vendor/NAICS section
8. Final RFQ inquiry CTA

## Quality checks
After edits, run:
- npm install if dependencies changed
- npm run lint if available
- npm run build

Fix all errors before finishing.
