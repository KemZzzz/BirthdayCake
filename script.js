// Confetti animation
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
const confettiColors = ['#ffb3c6', '#f9f871', '#b5ead7', '#ffdac1', '#cdb4db', '#a0c4ff', '#fdffb6', '#baffc9', '#ffc6ff', '#ffd6a5'];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti() {
  confettiParticles = [];
  const count = Math.floor(window.innerWidth / 12);
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height,
      r: 4 + Math.random() * 4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      speed: 1 + Math.random() * 2,
      drift: (Math.random() - 0.5) * 1.2,
      opacity: 0.7 + Math.random() * 0.3,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.1
    });
  }
}
createConfetti();
window.addEventListener('resize', createConfetti);

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let p of confettiParticles) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.beginPath();
    ctx.arc(0, 0, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
    // Move
    p.y += p.speed;
    p.x += p.drift;
    p.angle += p.spin;
    if (p.y > confettiCanvas.height + 10) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
    if (p.x < -10) p.x = confettiCanvas.width + 10;
    if (p.x > confettiCanvas.width + 10) p.x = -10;
  }
}
function animate() {
  drawConfetti();
  requestAnimationFrame(animate);
}
animate();

// Remove cursor after typing animation
window.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('.birthday-text');
  if (text) {
    const typingDuration = 2000 + 1000; // 2s animation + 1s delay
    setTimeout(() => {
      text.classList.add('typed');
    }, typingDuration);
  }
}); 