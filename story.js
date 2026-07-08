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

/* ---- Scroll Progress Bar ---- */
ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    document.querySelector(".scroll-progress-bar").style.width =
      (self.progress * 100) + "%";
  },
});

/* ================================================================
   Section 1: Opening — Full-bleed hero, pinned text sequence,
   image zoom scrub (1.2 -> 1.0)
   ================================================================ */
const openingTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#opening",
    start: "top top",
    end: "+=2500",
    pin: true,
    scrub: 1,
  },
});

openingTl
  .fromTo("#opening .bg-img", { scale: 1.2 }, { scale: 1.0, duration: 4, ease: "none" }, 0)
  .to(".opening-line-1", { opacity: 1, duration: 0.8 }, 0.2)
  .to({}, { duration: 0.4 })
  .to(".opening-line-2", { opacity: 1, duration: 0.8 })
  .to({}, { duration: 0.5 })
  .to(".opening-content", { opacity: 0, y: -40, duration: 0.6 });

/* ================================================================
   Section 2: The Crisis — Stats counter over darkened team photo
   ================================================================ */
const crisisTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#crisis",
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: 1,
  },
});

crisisTl
  .fromTo("#crisis .bg-img", { scale: 1.1 }, { scale: 1.0, duration: 4, ease: "none" }, 0)
  .to(".crisis-title", { opacity: 1, duration: 0.5 }, 0.2)
  .to(".stat-card:nth-child(1)", { opacity: 1, y: 0, duration: 0.8 }, 0.6)
  .to(".stat-card:nth-child(2)", { opacity: 1, y: 0, duration: 0.8 }, 0.9)
  .to(".stat-card:nth-child(3)", { opacity: 1, y: 0, duration: 0.8 }, 1.2);

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

/* ================================================================
   Section 3: Horizontal Scroll — Day in Care cards over background
   ================================================================ */
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

document.querySelectorAll(".day-card").forEach((card) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: card.closest(".day-panel"),
      containerAnimation: dayTween,
      start: "left 80%",
      toggleActions: "play none none reverse",
    },
  });
});

/* ================================================================
   Section 4: The Gap — Split screen wipe with SVG divider
   ================================================================ */
const gapTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#gap",
    start: "top top",
    end: "+=2500",
    pin: true,
    scrub: 1,
  },
});

gapTl
  .to(".gap-line", { strokeDashoffset: 0, duration: 1.5, ease: "none" }, 0)
  .fromTo(".gap-left .gap-panel-content", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 }, 0.2);

document.querySelectorAll(".note-line").forEach((line, i) => {
  gapTl.to(line, { opacity: 1, x: 0, duration: 0.25 }, 0.4 + i * 0.12);
});

gapTl
  .fromTo(".gap-right .gap-panel-content", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8 }, 0.8)
  .to(".gap-text", { opacity: 1, duration: 0.6 }, 2);

/* ================================================================
   Section 5: Connection — Clip-path circle reveal
   ================================================================ */
const connectionTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#connection",
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: 1,
  },
});

connectionTl
  .to(".connection-question", { opacity: 1, y: 0, duration: 0.8 }, 0)
  .to({}, { duration: 0.3 })
  .to(".connection-reveal-bg", {
    clipPath: "circle(75% at 50% 50%)",
    duration: 2,
    ease: "power2.inOut",
  }, 0.5)
  .fromTo(".connection-reveal-bg .bg-img", { scale: 1.15 }, { scale: 1.0, duration: 2.5, ease: "none" }, 0.5)
  .to(".kc-logo-text", { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 1.2)
  .to({}, { duration: 0.5 });

/* ================================================================
   Section 6: How It Works — Cards sequence over dashboard
   ================================================================ */
const howTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#how",
    start: "top top",
    end: "+=2500",
    pin: true,
    scrub: 1,
  },
});

howTl
  .fromTo("#how .bg-img", { scale: 1.1 }, { scale: 1.0, duration: 4, ease: "none" }, 0)
  .to(".how-title", { opacity: 1, duration: 0.5 }, 0.2)
  .to(".cap-card-1", { opacity: 1, y: 0, duration: 0.8 }, 0.7)
  .to(".cap-card-2", { opacity: 1, y: 0, duration: 0.8 }, 1.1)
  .to(".cap-card-3", { opacity: 1, y: 0, duration: 0.8 }, 1.5);

/* ================================================================
   Section 7: Impact — Parallax at different depths
   ================================================================ */
const impactTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#impact",
    start: "top top",
    end: "+=2500",
    pin: true,
    scrub: 1,
  },
});

impactTl
  .fromTo(".impact-parallax-img", { scale: 1.15 }, { scale: 1.0, duration: 4, ease: "none" }, 0)
  .to(".impact-stat.layer-1", { opacity: 1, y: 0, duration: 0.8 }, 0.4)
  .to(".impact-stat.layer-2", { opacity: 1, y: 0, duration: 0.8 }, 0.8)
  .to(".impact-stat.layer-3", { opacity: 1, y: 0, duration: 0.8 }, 1.2);

gsap.to(".impact-stat.layer-1", {
  yPercent: -20,
  scrollTrigger: {
    trigger: "#impact",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

gsap.to(".impact-stat.layer-2", {
  yPercent: -10,
  scrollTrigger: {
    trigger: "#impact",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

gsap.to(".impact-stat.layer-3", {
  yPercent: 5,
  scrollTrigger: {
    trigger: "#impact",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

/* ================================================================
   Section 8: Three Experiences — Clip-path wipe reveal
   ================================================================ */
document.querySelectorAll(".exp-panel").forEach((panel) => {
  gsap.to(panel, {
    clipPath: "inset(0 0% 0 0)",
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
      end: "top 30%",
      scrub: 1,
    },
  });
});

/* ================================================================
   Section 9: The Future — Ken Burns + blur reveal
   ================================================================ */
const futureTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#future",
    start: "top top",
    end: "+=2000",
    pin: true,
    scrub: 1,
  },
});

futureTl
  .fromTo(".future-ken-burns", { scale: 1.15 }, { scale: 1.0, duration: 3, ease: "none" }, 0)
  .to(".future-line-1", { opacity: 1, filter: "blur(0px)", duration: 1 }, 0.3)
  .to({}, { duration: 0.3 })
  .to(".future-line-2", { opacity: 1, filter: "blur(0px)", duration: 1 }, 1.2);

/* ================================================================
   Section 10: CTA
   ================================================================ */
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
