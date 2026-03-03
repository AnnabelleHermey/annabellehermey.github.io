$(document).ready(function () {
  // ===== Fade-in on scroll =====
  $(window).on("scroll", function () {
    $("section").each(function () {
      const top = $(this).offset().top - $(window).scrollTop();
      if (top < window.innerHeight - 100) $(this).addClass("visible");
    });
  });

  // ===== Modal open =====
  $(".timeline-item").click(function () {
    const modalId = $(this).data("modal");
    $("#" + modalId).fadeIn().css("display", "flex");
  });

  // ===== Modal close =====
  $(".close-btn").click(function () {
    const modalId = $(this).data("modal");
    $("#" + modalId).fadeOut();
  });

  // ===== Close modal on click outside =====
  $(window).click(function (e) {
    if ($(e.target).hasClass("modal")) $(e.target).fadeOut();
  });
});


// ===== Smart Section Highlighting =====
const navLinks = document.querySelectorAll("header nav a");
const trackedSections = [...document.querySelectorAll("section[id]")];

function updateActiveNav() {
  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 0;
  const probeY = window.scrollY + headerHeight + 24;

  let currentSection = trackedSections[0] || null;

  trackedSections.forEach((section) => {
    if (section.offsetTop <= probeY) currentSection = section;
  });

  const activeId = currentSection ? currentSection.getAttribute("id") : null;

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
window.addEventListener("load", updateActiveNav);
updateActiveNav();


// ===== Animated Background for About Section =====
const canvas = document.getElementById("about-bg");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let balls = [];
  let colors = ["#2C1A12", "#3A2619", "#A6C48A"];
  let numBalls = 25;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 25 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    });
  }

  function animate() {
    ctx.fillStyle = "#FAF3E0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach((b) => {
      b.x += b.dx;
      b.y += b.dy;
      if (b.x + b.r > canvas.width || b.x - b.r < 0) b.dx *= -1;
      if (b.y + b.r > canvas.height || b.y - b.r < 0) b.dy *= -1;

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}
