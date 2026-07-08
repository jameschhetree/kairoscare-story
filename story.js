gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".progress-dot");

/* ---- Progress Nav ---- */
sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => setActiveDot(i),
    onEnterBack: () => setActiveDot(i),
  });
});

function setActiveDot(index) {
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const idx = parseInt(dot.dataset.section);
    sections[idx].scrollIntoView({ behavior: "smooth" });
  });
});

/* ---- Section 1: Opening (pinned) ---- */
const openingTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#opening",
    start: "top top",
    end: "+=2000",
    pin: true,
    scrub: 1,
  },
});

openingTl
  .to(".opening-line-1", { opacity: 1, duration: 1 })
  .to(".opening-line-1", { opacity: 1, duration: 0.5 })
  .to(".opening-line-1", { opacity: 0, duration: 0.8 })
  .to(".opening-line-2", { opacity: 1, duration: 1 })
  .to(".opening-line-2", { opacity: 1, duration: 0.5 })
  .to(".blue-glow", { opacity: 1, scale: 3, duration: 1.5 }, "<0.3")
  .to(".opening-line-2", { opacity: 0, duration: 0.5 }, ">0.3");

/* ---- Section 2: The Invisible Crisis (pinned) ---- */
const crisisTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#crisis",
    start: "top top",
    end: "+=2500",
    pin: true,
    scrub: 1,
  },
});

crisisTl
  .to(".crisis-title", { opacity: 1, duration: 0.5 })
  .to(".stat-card:nth-child(1)", { opacity: 1, y: 0, duration: 0.8 })
  .to(".stat-card:nth-child(2)", { opacity: 1, y: 0, duration: 0.8 }, ">-0.3")
  .to(".stat-card:nth-child(3)", { opacity: 1, y: 0, duration: 0.8 }, ">-0.3");

/* Counter animation tied to scroll */
document.querySelectorAll(".stat-number").forEach((el) => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  const format = el.dataset.format;
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el.closest(".stat-card"),
      start: "top 80%",
      end: "top 30%",
      scrub: 1,
    },
    onUpdate: () => {
      let display;
      if (format === "abbr") {
        const v = Math.round(obj.val);
        if (v >= 1000000) display = (v / 1000000).toFixed(1) + "M";
        else if (v >= 1000) display = (v / 1000).toFixed(0) + "K";
        else display = v.toString();
      } else {
        display = Math.round(obj.val).toString();
      }
      el.textContent = prefix + display + suffix;
    },
  });
});

/* ---- Section 3: Horizontal Scroll (Day in Care) ---- */
const dayWrapper = document.querySelector(".day-wrapper");
const dayTrack = document.querySelector(".day-track");

function getDayScrollAmount() {
  return -(dayTrack.scrollWidth - window.innerWidth);
}

const dayTween = gsap.to(dayWrapper, {
  x: getDayScrollAmount,
  ease: "none",
  scrollTrigger: {
    trigger: "#day",
    start: "top top",
    end: () => "+=" + dayTrack.scrollWidth,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  },
});

document.querySelectorAll(".day-card").forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: card,
      containerAnimation: dayTween,
      start: "left 80%",
      toggleActions: "play none none reverse",
    },
  });
});

/* ---- Section 4: The Gap ---- */
const gapTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#gap",
    start: "top 60%",
    end: "center center",
    scrub: 1,
  },
});

document.querySelectorAll(".note-line").forEach((line, i) => {
  gapTl.to(
    line,
    { opacity: 1, x: 0, duration: 0.3 },
    i * 0.15
  );
});

gsap.to(".gap-line", {
  strokeDashoffset: 0,
  scrollTrigger: {
    trigger: "#gap",
    start: "top 50%",
    end: "bottom 60%",
    scrub: 1,
  },
});

gsap.to(".gap-text", {
  opacity: 1,
  scrollTrigger: {
    trigger: ".gap-text",
    start: "top 85%",
    end: "top 60%",
    scrub: 1,
  },
});

/* ---- Section 5: Enter KairosCare (pinned) ---- */
const enterTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#enter",
    start: "top top",
    end: "+=2500",
    pin: true,
    scrub: 1,
  },
});

enterTl
  .to(".kc-logo-text", { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" })
  .to(".kc-logo-text", { opacity: 1, duration: 0.3 })
  .to(".cap-card-1", { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.8 })
  .to(".cap-card-2", { opacity: 1, y: 0, duration: 0.8 }, "<0.2")
  .to(".cap-card-3", { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.8 }, "<0.2");

/* ---- Section 6: How It Works (pinned) ---- */
const howTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#how",
    start: "top top",
    end: "+=2000",
    pin: true,
    scrub: 1,
  },
});

howTl.to(".how-title", { opacity: 1, duration: 0.5 });

document.querySelectorAll(".flow-step").forEach((step, i) => {
  howTl.to(step, { opacity: 1, y: 0, duration: 0.5 }, 0.6 + i * 0.4);
});

howTl.to(
  ".flow-path",
  { strokeDashoffset: 0, duration: 2, ease: "none" },
  0.6
);

/* ---- Section 7: The Impact (parallax) ---- */
gsap.to(".impact-title", {
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 70%",
    end: "top 40%",
    scrub: 1,
  },
});

gsap.to(".ripple-1", {
  scale: 1,
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 60%",
    end: "center center",
    scrub: 1,
  },
});

gsap.to(".ripple-2", {
  scale: 1,
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 50%",
    end: "center 30%",
    scrub: 1,
  },
});

gsap.to(".ripple-3", {
  scale: 1,
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 40%",
    end: "center 20%",
    scrub: 1,
  },
});

/* Parallax layers at different depths */
gsap.to(".layer-1", {
  y: -60,
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 60%",
    end: "bottom top",
    scrub: 1,
  },
});

gsap.to(".layer-2", {
  y: -30,
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 55%",
    end: "bottom top",
    scrub: 1,
  },
});

gsap.to(".layer-3", {
  y: 0,
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 50%",
    end: "bottom top",
    scrub: 1,
  },
});

/* ---- Section 8: Three Experiences ---- */
document.querySelectorAll(".exp-panel").forEach((panel) => {
  gsap.to(panel, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
      end: "top 40%",
      scrub: 1,
    },
  });
});

/* ---- Section 9: The Future ---- */
const futureTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#future",
    start: "top 60%",
    end: "center center",
    scrub: 1,
  },
});

futureTl
  .to(".future-line-1", { opacity: 1, filter: "blur(0px)", duration: 1 })
  .to(".future-line-2", { opacity: 1, filter: "blur(0px)", duration: 1 }, ">-0.3");

/* Particles */
document.querySelectorAll(".particle").forEach((p, i) => {
  gsap.to(p, {
    opacity: gsap.utils.random(0.2, 0.6),
    y: gsap.utils.random(-40, 40),
    x: gsap.utils.random(-30, 30),
    duration: gsap.utils.random(2, 4),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: i * 0.2,
    scrollTrigger: {
      trigger: "#future",
      start: "top 80%",
      toggleActions: "play pause play pause",
    },
  });
});

/* ---- Section 10: CTA ---- */
const ctaTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#cta",
    start: "top 70%",
    end: "top 30%",
    scrub: 1,
  },
});

ctaTl
  .to(".cta-headline", { opacity: 1, y: 0, duration: 0.6 })
  .to(".cta-button", { opacity: 1, y: 0, duration: 0.6 }, ">-0.2")
  .to(".cta-sub", { opacity: 1, duration: 0.4 }, ">-0.1")
  .to(".cta-footer", { opacity: 1, duration: 0.4 });
