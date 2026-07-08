gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

var sections = document.querySelectorAll(".section");
var dots = document.querySelectorAll(".progress-dot");

/* ---- Progress Bar ---- */
ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  onUpdate: function (self) {
    document.querySelector(".scroll-progress-bar").style.width =
      (self.progress * 100) + "%";
  },
});

/* ---- Dot Nav ---- */
sections.forEach(function (section, i) {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: function () { setActiveDot(i); },
    onEnterBack: function () { setActiveDot(i); },
  });
});

function setActiveDot(index) {
  dots.forEach(function (d, i) {
    d.classList.toggle("active", i === index);
  });
}

dots.forEach(function (dot) {
  dot.addEventListener("click", function () {
    var idx = parseInt(dot.dataset.section);
    gsap.to(window, {
      scrollTo: sections[idx],
      duration: 1,
      ease: "power2.inOut",
    });
  });
});

/* ---- Section 1: Opening (pinned, scrubbed text) ---- */
var openingTl = gsap.timeline({
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
  .to(".opening-line-2", { opacity: 1, duration: 1 }, ">")
  .to({}, { duration: 0.5 })
  .to(".opening-line-1", { opacity: 0, y: -30, duration: 0.8 })
  .to(".opening-line-2", { opacity: 0, y: -30, duration: 0.8 }, "<0.1");

/* ---- Section 2: The Crisis (pinned, counter scrub) ---- */
var crisisTl = gsap.timeline({
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

document.querySelectorAll(".stat-number").forEach(function (el) {
  var target = parseFloat(el.dataset.target);
  var suffix = el.dataset.suffix || "";
  var prefix = el.dataset.prefix || "";
  var format = el.dataset.format;
  var obj = { val: 0 };

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
    onUpdate: function () {
      var display;
      if (format === "abbr") {
        var v = Math.round(obj.val);
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
var dayWrapper = document.querySelector(".day-wrapper");
var dayTrack = document.querySelector(".day-track");

function getDayScrollAmount() {
  return -(dayTrack.scrollWidth - window.innerWidth);
}

var dayTween = gsap.to(dayWrapper, {
  x: getDayScrollAmount,
  ease: "none",
  scrollTrigger: {
    trigger: "#day",
    start: "top top",
    end: function () { return "+=" + dayTrack.scrollWidth; },
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  },
});

document.querySelectorAll(".day-card").forEach(function (card) {
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

/* ---- Section 4: The Gap (split screen, SVG stroke-dashoffset) ---- */
var gapTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#gap",
    start: "top top",
    end: "+=2000",
    pin: true,
    scrub: 1,
  },
});

gapTl.to(".gap-line", { strokeDashoffset: 0, duration: 2 }, 0);

document.querySelectorAll(".note-line").forEach(function (line, i) {
  gapTl.to(line, { opacity: 1, x: 0, duration: 0.3 }, 0.2 + i * 0.15);
});

gapTl.to(".gap-text", { opacity: 1, duration: 0.8 }, ">0.2");

/* ---- Section 5: Connection (clip-path circle reveal, pinned) ---- */
var connectionTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#connection",
    start: "top top",
    end: "+=2000",
    pin: true,
    scrub: 1,
  },
});

connectionTl
  .to(".connection-reveal-bg", {
    clipPath: "circle(80% at 50% 50%)",
    duration: 2,
    ease: "power2.inOut",
  })
  .to(".connection-question", { opacity: 1, duration: 0.8 }, 0.5)
  .to(".kc-logo-text", {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "power3.out",
  }, 1);

/* ---- Section 6: How It Works (pinned, sequential card fly-in) ---- */
var howTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#how",
    start: "top top",
    end: "+=2500",
    pin: true,
    scrub: 1,
  },
});

howTl
  .to(".how-title", { opacity: 1, duration: 0.5 })
  .to(".cap-card-1", { opacity: 1, y: 0, duration: 0.8 })
  .to(".cap-card-2", { opacity: 1, y: 0, duration: 0.8 }, ">-0.3")
  .to(".cap-card-3", { opacity: 1, y: 0, duration: 0.8 }, ">-0.3");

/* ---- Section 7: Impact (parallax bg, floating stat cards at different depths) ---- */
gsap.to(".impact-parallax-img", {
  y: "-20%",
  scrollTrigger: {
    trigger: "#impact",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

gsap.to(".layer-1", {
  y: -80,
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 70%",
    end: "bottom top",
    scrub: 1,
  },
});

gsap.to(".layer-2", {
  y: -40,
  opacity: 1,
  scrollTrigger: {
    trigger: "#impact",
    start: "top 60%",
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

/* ---- Section 8: Three Experiences (clip-path inset reveals) ---- */
document.querySelectorAll(".exp-panel").forEach(function (panel, i) {
  gsap.to(panel, {
    clipPath: "inset(0% 0 0 0)",
    duration: 1,
    scrollTrigger: {
      trigger: "#experiences",
      start: "top 70%",
      end: "top 20%",
      scrub: 1,
    },
    delay: i * 0.15,
  });
});

/* ---- Section 9: The Future (ken-burns zoom, blur-reveal text) ---- */
gsap.to(".future-ken-burns", {
  scale: 1.25,
  scrollTrigger: {
    trigger: "#future",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

var futureTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#future",
    start: "top 50%",
    end: "center center",
    scrub: 1,
  },
});

futureTl
  .to(".future-line-1", { opacity: 1, filter: "blur(0px)", duration: 1 })
  .to(".future-line-2", { opacity: 1, filter: "blur(0px)", duration: 1 }, ">-0.4");

/* ---- Section 10: CTA ---- */
var ctaTl = gsap.timeline({
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

/* ---- Image scale transitions on all bg images ---- */
document.querySelectorAll(".bg-img").forEach(function (img) {
  if (img.classList.contains("impact-parallax-img") ||
      img.classList.contains("future-ken-burns")) return;

  gsap.fromTo(img,
    { scale: 1.1 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: img.closest(".section"),
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
});
