const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

const cursor = document.createElement("div");
const cursorRing = document.createElement("div");
cursor.className = "custom-cursor";
cursorRing.className = "custom-cursor-ring";
document.body.appendChild(cursor);
document.body.appendChild(cursorRing);

let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + "px";
  cursorRing.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();

document
  .querySelectorAll(
    "a, button, .faq-question, .program-card, .trainer-card, .plan-card, .blog-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2)";
      cursorRing.style.transform = "translate(-50%,-50%) scale(1.5)";
      cursorRing.style.borderColor = "rgba(239,83,80,.7)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      cursorRing.style.transform = "translate(-50%,-50%) scale(1)";
      cursorRing.style.borderColor = "rgba(239,83,80,.4)";
    });
  });

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  document
    .getElementById("backToTop")
    .classList.toggle("visible", window.scrollY > 400);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 100;
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link)
      link.classList.toggle("active", scrollY >= top && scrollY < top + height);
  });
});

const titleEl = document.getElementById("gymTitle");
const text = "ENGAGE GYM";
let index = 0,
  deleting = false,
  pause = false;

function type() {
  if (pause) return;
  if (!deleting) {
    titleEl.textContent = text.slice(0, index + 1);
    index++;
    if (index === text.length) {
      pause = true;
      setTimeout(() => {
        pause = false;
        deleting = true;
      }, 2500);
    }
  } else {
    titleEl.textContent = text.slice(0, index - 1);
    index--;
    if (index === 0) {
      pause = true;
      setTimeout(() => {
        pause = false;
        deleting = false;
      }, 600);
    }
  }
}
setInterval(type, 120);

const particleContainer = document.getElementById("particles");
function createParticle() {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 3 + 1;
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = Math.random() * 8 + 5 + "s";
  p.style.animationDelay = Math.random() * 4 + "s";
  p.style.opacity = Math.random() * 0.6 + 0.1;
  particleContainer.appendChild(p);
  setTimeout(() => p.remove(), 14000);
}
setInterval(createParticle, 600);

function animateCounters() {
  document.querySelectorAll(".stat-num").forEach((el) => {
    const target = +el.dataset.target;
    const dur = 2000;
    const step = target / (dur / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (target >= 100 ? "+" : "+");
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

const heroObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  },
  { threshold: 0.5 },
);
const heroSection = document.getElementById("home");
if (heroSection) heroObserver.observe(heroSection);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

document
  .querySelectorAll(".reveal-up, .reveal-left, .reveal-right")
  .forEach((el) => {
    revealObserver.observe(el);
  });

let currentSlide = 0;
const track = document.getElementById("testimonialsTrack");
const dotsEl = document.getElementById("sliderDots");
let totalSlides = 0;
let visibleCards = 3;

function initSlider() {
  if (!track) return;
  const cards = track.querySelectorAll(".testimonial-card");
  totalSlides = Math.max(0, cards.length - visibleCards);
  dotsEl.innerHTML = "";
  for (let i = 0; i <= totalSlides; i++) {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goToSlide(i));
    dotsEl.appendChild(dot);
  }
}

function goToSlide(n) {
  currentSlide = Math.max(0, Math.min(n, totalSlides));
  const cardWidth = track.querySelector(".testimonial-card").offsetWidth + 24;
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  dotsEl
    .querySelectorAll(".dot")
    .forEach((d, i) => d.classList.toggle("active", i === currentSlide));
}

document
  .getElementById("sliderNext")
  ?.addEventListener("click", () => goToSlide(currentSlide + 1));
document
  .getElementById("sliderPrev")
  ?.addEventListener("click", () => goToSlide(currentSlide - 1));

window.addEventListener("resize", initSlider);
initSlider();

let bmiUnit = "metric";

window.switchUnit = function (unit) {
  bmiUnit = unit;
  document
    .getElementById("metricFields")
    .classList.toggle("hidden", unit !== "metric");
  document
    .getElementById("imperialFields")
    .classList.toggle("hidden", unit !== "imperial");
  document
    .getElementById("btnMetric")
    .classList.toggle("active", unit === "metric");
  document
    .getElementById("btnImperial")
    .classList.toggle("active", unit === "imperial");
  document.getElementById("bmiResult").classList.add("hidden");
};

window.calculateBMI = function () {
  let height_m, weight_kg;

  if (bmiUnit === "metric") {
    const hcm = parseFloat(document.getElementById("heightCm").value);
    const wkg = parseFloat(document.getElementById("weightKg").value);
    if (!hcm || !wkg) return;
    height_m = hcm / 100;
    weight_kg = wkg;
  } else {
    const ft = parseFloat(document.getElementById("heightFt").value) || 0;
    const ins = parseFloat(document.getElementById("heightIn").value) || 0;
    const lbs = parseFloat(document.getElementById("weightLbs").value);
    if (!lbs || (!ft && !ins)) return;
    height_m = (ft * 12 + ins) * 0.0254;
    weight_kg = lbs * 0.453592;
  }

  const bmi = weight_kg / (height_m * height_m);
  const bmiRounded = bmi.toFixed(1);

  let category, advice, color, fillPct;
  if (bmi < 18.5) {
    category = "UNDERWEIGHT";
    advice =
      "Consider working with a nutritionist to build lean mass safely. Our trainers can help.";
    color = "#4fc3f7";
    fillPct = 15;
  } else if (bmi < 25) {
    category = "NORMAL WEIGHT";
    advice =
      "Great work! Maintain your healthy weight with balanced training and nutrition.";
    color = "#66bb6a";
    fillPct = 42;
  } else if (bmi < 30) {
    category = "OVERWEIGHT";
    advice =
      "Our HIIT and cardio programs combined with nutrition coaching can help you reach your goals.";
    color = "#ffa726";
    fillPct = 68;
  } else {
    category = "OBESE";
    advice =
      "Our trainers specialize in helping members make safe, sustainable lifestyle changes. Start today.";
    color = "#ef5350";
    fillPct = 90;
  }

  const result = document.getElementById("bmiResult");
  const scoreEl = document.getElementById("bmiScore");
  const catEl = document.getElementById("bmiCategory");
  const fillEl = document.getElementById("bmiBarFill");
  const adviceEl = document.getElementById("bmiAdvice");

  result.classList.remove("hidden");
  scoreEl.textContent = bmiRounded;
  scoreEl.style.color = color;
  catEl.textContent = category;
  fillEl.style.background = color;
  setTimeout(() => {
    fillEl.style.width = fillPct + "%";
  }, 50);
  adviceEl.textContent = advice;
};

window.toggleFaq = function (el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item.open")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
};

window.submitForm = function (e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  btn.textContent = "SENDING...";
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById("formSuccess").classList.remove("hidden");
    btn.textContent = "SEND MESSAGE";
    btn.disabled = false;
    e.target.reset();
  }, 1200);
};

window.subscribeNewsletter = function () {
  const input = document.querySelector(".newsletter-form input");
  if (!input.value || !input.value.includes("@")) {
    input.style.borderColor = "var(--red)";
    return;
  }
  input.style.borderColor = "#66bb6a";
  input.value = "✓ You're subscribed!";
  input.disabled = true;
  setTimeout(() => {
    input.style.borderColor = "";
    input.value = "";
    input.disabled = false;
  }, 3000);
};
