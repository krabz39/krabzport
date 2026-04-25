window.addEventListener("DOMContentLoaded", () => {

  /* ================= CANVAS ================= */
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");

  let particles = [];
  let particleCount = window.innerWidth < 768 ? 35 : 80;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 0.5
      });
    }
  }

  initParticles();

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = `rgba(212,175,55,${1 - dist / 120})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  let mouse = { x: null, y: null };

  window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  function attractParticles() {
    particles.forEach(p => {
      if (mouse.x === null) return;

      let dx = mouse.x - p.x;
      let dy = mouse.y - p.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        p.x += dx * 0.01;
        p.y += dy * 0.01;
      }
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    attractParticles();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.fillStyle = "rgba(212,175,55,0.8)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    drawLines();

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    particleCount = window.innerWidth < 768 ? 35 : 80;
    initParticles();
  });

  /* ================= BACKGROUND IMAGE ================= */

  const bg = document.getElementById("bgImage");

  if (!bg) {
    console.log("❌ bgImage div missing in HTML");
    return;
  }

  const sections = [
    { id: "home", img: "assets/images/IMG_3935.JPEG" },
    { id: "about", img: "assets/images/798A0C55-91D8-4B55-8BF9-09C5DBB9D5D3.JPEG" },
    { id: "work", img: "assets/images/IMG_3935.JPEG" },
    { id: "projects", img: "assets/images/IMG_3935.JPEG" },
    { id: "lab", img: "assets/images/IMG_3935.JPEG" },
    { id: "contact", img: "assets/images/IMG_3935.JPEG" }
  ];

  /* SET INITIAL BACKGROUND */
  bg.style.backgroundImage = `url(${sections[0].img})`;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        let section = sections.find(s => s.id === entry.target.id);

        if (section) {
          bg.style.backgroundImage = `url(${section.img})`;

          bg.classList.remove("zoom-bg");
          setTimeout(() => bg.classList.add("zoom-bg"), 50);
        }
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(sec => {
    let el = document.getElementById(sec.id);
    if (el) observer.observe(el);
  });

  /* ================= SCROLL BLUR ================= */

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    if (Math.abs(currentScroll - lastScroll) > 20) {
      bg.classList.add("blur-bg");

      setTimeout(() => {
        bg.classList.remove("blur-bg");
      }, 250);
    }

    lastScroll = currentScroll;
  });

  /* ================= CINEMATIC DRIFT ================= */

  function cinematicDrift() {
    let x = Math.sin(Date.now() * 0.0002) * 10;
    let y = Math.cos(Date.now() * 0.0002) * 10;

    bg.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;

    requestAnimationFrame(cinematicDrift);
  }

  cinematicDrift();

});