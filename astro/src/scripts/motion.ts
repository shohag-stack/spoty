// Every scroll and pointer animation on the site, driven by data attributes that the
// components in components/animation/ render. Loaded once from the base layout.
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const all = <T extends HTMLElement = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));

// Smooth scrolling: Lenis runs on GSAP's ticker so ScrollTrigger stays in sync
function smoothScroll() {
  if (reducedMotion()) return;
  const lenis = new Lenis({ duration: 1.1, anchors: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// <Reveal>: fade up, or open like a window ("clip"), as it scrolls into view
function reveals() {
  for (const el of all("[data-reveal]")) {
    const delay = Number(el.dataset.delay ?? 0);
    const scrollTrigger = { trigger: el, start: "top 88%", once: true };
    if (el.dataset.reveal === "clip") {
      gsap.from(el, { clipPath: "inset(14% 10% 14% 10% round 1.5rem)", duration: 1.4, delay, ease: "expo.out", scrollTrigger });
      gsap.from(el.querySelectorAll("img"), { scale: 1.25, duration: 1.6, delay, ease: "expo.out", scrollTrigger });
      continue;
    }
    const stagger = el.dataset.stagger !== undefined;
    gsap.from(stagger ? Array.from(el.children) : el, {
      y: 40,
      opacity: 0,
      duration: 1,
      delay,
      ease: "expo.out",
      stagger: stagger ? 0.08 : 0,
      scrollTrigger,
    });
  }
}

// <Parallax>: scroll-linked drift
function parallax() {
  for (const el of all("[data-parallax]")) {
    const speed = Number(el.dataset.parallax);
    gsap.fromTo(
      el,
      { yPercent: -speed / 2 },
      { yPercent: speed / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
    );
  }
}

// <SplitHeading>: words rise into place on page load
function splitHeadings() {
  for (const el of all("[data-split]")) {
    gsap.from(el.querySelectorAll("[data-word]"), {
      yPercent: 110,
      duration: 1.1,
      delay: Number(el.dataset.split),
      ease: "expo.out",
      stagger: 0.06,
    });
  }
}

// Splits "1,200+" into prefix "", number 1200, suffix "+", keeping commas and decimals.
function parseFigure(value: string) {
  const match = value.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const number = Number(digits.replace(/,/g, ""));
  // Years ("2012") read oddly when counted, so leave them static
  if (!digits.includes(",") && !digits.includes(".") && number >= 1900 && number <= 2100) return null;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  const format = (n: number) =>
    prefix +
    n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: digits.includes(",") }) +
    suffix;
  return { number, format };
}

// <CountUp>: figures count up from zero when they scroll into view
function countUps() {
  for (const el of all("[data-countup]")) {
    const parsed = parseFigure(el.dataset.countup!);
    if (!parsed) continue;
    const counter = { n: 0 };
    el.textContent = parsed.format(0);
    gsap.to(counter, {
      n: parsed.number,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = parsed.format(counter.n);
      },
    });
  }
}

// <Tilt>: 3D tilt toward the cursor
function tilts() {
  for (const el of all("[data-tilt]")) {
    const max = Number(el.dataset.tilt);
    el.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || reducedMotion()) return;
      const box = el.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      gsap.to(el, { rotateY: x * max, rotateX: -y * max, transformPerspective: 900, duration: 0.5, ease: "power3.out" });
    });
    el.addEventListener("pointerleave", () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" }));
  }
}

// <Magnetic>: the marked element follows the cursor while the area is hovered
function magnetics() {
  for (const el of all("[data-magnetic-area]")) {
    const strength = Number(el.dataset.magneticArea);
    const target = el.querySelector("[data-magnetic]") ?? el.firstElementChild;
    if (!target) continue;
    el.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || reducedMotion()) return;
      const box = el.getBoundingClientRect();
      gsap.to(target, {
        x: (event.clientX - box.left - box.width / 2) * strength,
        y: (event.clientY - box.top - box.height / 2) * strength,
        duration: 0.6,
        ease: "power3.out",
      });
    });
    el.addEventListener("pointerleave", () => gsap.to(target, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" }));
  }
}

// <Spotlight>: glow position follows the cursor
function spotlights() {
  for (const el of all("[data-spotlight]")) {
    el.addEventListener("pointermove", (event) => {
      const box = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
    });
  }
}

// Pointer effects check reduced motion on each move; scroll effects only run when motion is allowed
tilts();
magnetics();
spotlights();
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  smoothScroll();
  reveals();
  parallax();
  splitHeadings();
  countUps();
});
