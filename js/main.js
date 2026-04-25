/* ================= LOADER ================= */
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";

  // hero reveal
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = 1;
    hero.style.transform = "translateY(0)";
  }
});

/* ================= TYPING ================= */
const text = "Eugene aka Kenyankrabz";
const typingEl = document.getElementById("typing");

let i = 0;

function typing() {
  if (!typingEl) return;

  if (i < text.length) {
    typingEl.textContent += text.charAt(i); // ✅ FIX (no duplication)
    i++;
    setTimeout(typing, 80);
  }
}

/* 🔥 RESET BEFORE START */
if (typingEl) {
  typingEl.textContent = "";
  typing();
}

/* ================= NAV SYSTEM ================= */
const menuToggle = document.getElementById("menuToggle") || document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar") || document.querySelector(".sidebar");
const navLinks = document.querySelectorAll(".sidebar li");

let isOpen = false;

/* TOGGLE MENU */
if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    isOpen = !isOpen;

    sidebar.classList.toggle("active");
    menuToggle.classList.toggle("active");
    document.body.classList.toggle("nav-open");
  });
}

/* AUTO CLOSE + SCROLL */
navLinks.forEach(link => {
  link.addEventListener("click", () => {

    const section = document.getElementById(link.dataset.section);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    closeNav();
  });
});

function closeNav() {
  isOpen = false;

  if (sidebar) sidebar.classList.remove("active");
  if (menuToggle) menuToggle.classList.remove("active");

  document.body.classList.remove("nav-open");
}

/* ================= SWIPE NAV ================= */
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = endX - startX;

  // swipe right → open
  if (diff > 80 && !isOpen) {
    isOpen = true;

    if (sidebar) sidebar.classList.add("active");
    document.body.classList.add("nav-open");
  }

  // swipe left → close
  if (diff < -80 && isOpen) {
    closeNav();
  }
}

/* ================= CLICK OUTSIDE CLOSE ================= */
document.addEventListener("click", (e) => {
  if (
    isOpen &&
    sidebar &&
    menuToggle &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    closeNav();
  }
});

/* ================= LAB MODE ================= */
const labBtn = document.getElementById("labMode");

if (labBtn) {
  labBtn.addEventListener("click", () => {
    document.body.classList.toggle("lab-mode");
  });
}