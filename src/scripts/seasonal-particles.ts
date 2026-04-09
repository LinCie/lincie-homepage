import { getCursor, isCursorActive } from "./meadow";

type Season = "spring" | "summer" | "autumn" | "winter";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  wobblePhase: number;
  wobbleSpeed: number;
  wobbleAmplitude: number;
  color: string;
}

interface Firefly {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  life: number;
  maxLife: number;
}

type SeasonConfig = {
  count: number;
  sizeRange: [number, number];
  speedYRange: [number, number];
  speedXRange: [number, number];
  wobbleAmplitudeRange: [number, number];
};

const SEASON_CONFIGS: Record<Season, SeasonConfig> = {
  spring: {
    count: 15,
    sizeRange: [6, 12],
    speedYRange: [0.3, 0.8],
    speedXRange: [-0.2, 0.2],
    wobbleAmplitudeRange: [30, 60],
  },
  summer: {
    count: 12,
    sizeRange: [3, 6],
    speedYRange: [-0.5, -0.1],
    speedXRange: [0.3, 0.8],
    wobbleAmplitudeRange: [20, 40],
  },
  autumn: {
    count: 18,
    sizeRange: [8, 16],
    speedYRange: [0.5, 1.2],
    speedXRange: [-0.2, 0.2],
    wobbleAmplitudeRange: [40, 80],
  },
  winter: {
    count: 20,
    sizeRange: [3, 7],
    speedYRange: [0.3, 0.9],
    speedXRange: [-0.2, 0.2],
    wobbleAmplitudeRange: [15, 35],
  },
};

function readCurrentSeason(): Season {
  const season = document.documentElement.getAttribute("data-season");
  if (season === "spring" || season === "summer" || season === "autumn" || season === "winter") {
    return season;
  }
  return "spring";
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function readParticleColors(): string[] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--particle-colors').trim();
  if (!raw) return ['#999999'];
  return raw.split(',').map(c => c.trim()).filter(Boolean);
}

function createParticle(
  config: SeasonConfig,
  canvasWidth: number,
  canvasHeight: number,
  startFromTop = false,
): Particle {
  const colors = readParticleColors()
  const color = colors[Math.floor(Math.random() * colors.length)];
  return {
    x: rand(0, canvasWidth),
    y: startFromTop ? rand(-50, -10) : rand(0, canvasHeight),
    size: rand(config.sizeRange[0], config.sizeRange[1]),
    speedY: rand(config.speedYRange[0], config.speedYRange[1]),
    speedX: rand(config.speedXRange[0], config.speedXRange[1]),
    rotation: rand(0, 360),
    rotationSpeed: rand(-1, 1),
    opacity: rand(0.3, 0.7),
    wobblePhase: rand(0, Math.PI * 2),
    wobbleSpeed: rand(0.005, 0.02),
    wobbleAmplitude: rand(
      config.wobbleAmplitudeRange[0],
      config.wobbleAmplitudeRange[1],
    ),
    color,
  };
}

function drawSpringPetal(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size / 2, p.size / 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSummerGlow(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.globalAlpha = p.opacity * 0.6;
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
  gradient.addColorStop(0, p.color);
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, p.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawAutumnLeaf(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  const s = p.size;
  ctx.moveTo(0, -s / 2);
  ctx.bezierCurveTo(s / 2, -s / 3, s / 2.5, s / 3, 0, s / 2);
  ctx.bezierCurveTo(-s / 2.5, s / 3, -s / 2, -s / 3, 0, -s / 2);
  ctx.fill();
  ctx.restore();
}

function drawSnowflake(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.globalAlpha = p.opacity;
  ctx.strokeStyle = p.color;
  ctx.lineWidth = 1;
  ctx.lineCap = "round";

  const arms = 6;
  const r = p.size / 2;
  for (let i = 0; i < arms; i++) {
    const angle = (i * Math.PI * 2) / arms;
    const endX = Math.cos(angle) * r;
    const endY = Math.sin(angle) * r;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(endX, endY);

    const branchLen = r * 0.35;
    const branchStart = 0.55;
    const bx = Math.cos(angle) * r * branchStart;
    const by = Math.sin(angle) * r * branchStart;

    ctx.moveTo(bx, by);
    ctx.lineTo(bx + Math.cos(angle + 0.6) * branchLen, by + Math.sin(angle + 0.6) * branchLen);
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + Math.cos(angle - 0.6) * branchLen, by + Math.sin(angle - 0.6) * branchLen);

    ctx.stroke();
  }

  ctx.restore();
}

function drawFirefly(ctx: CanvasRenderingContext2D, f: Firefly) {
  ctx.save();
  ctx.translate(f.x, f.y);
  
  const pulse = Math.sin(f.pulsePhase) * 0.3 + 0.7;
  const fadeOut = Math.max(0, 1 - f.life / f.maxLife);
  ctx.globalAlpha = f.opacity * pulse * fadeOut;
  
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, f.size * 2);
  gradient.addColorStop(0, 'rgba(255, 250, 200, 0.9)');
  gradient.addColorStop(0.3, 'rgba(255, 240, 150, 0.5)');
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, f.size * 2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'rgba(255, 255, 220, 0.9)';
  ctx.beginPath();
  ctx.arc(0, 0, f.size * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}

function initParticles() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const canvas = document.getElementById(
    "season-particles",
  ) as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let season = readCurrentSeason();
  let config = SEASON_CONFIGS[season];
  let particles: Particle[] = [];
  let fireflies: Firefly[] = [];
  let animationId: number;
  let running = false;
  let lastFireflySpawn = 0;
  const fireflySpawnInterval = 3000;

  function createFirefly(): Firefly {
    const x = rand(0, window.innerWidth);
    const y = window.innerHeight + 20;
    return {
      x,
      y,
      size: rand(3, 6),
      speedY: rand(-0.8, -0.3),
      speedX: rand(-0.15, 0.15),
      opacity: rand(0.5, 0.8),
      pulsePhase: rand(0, Math.PI * 2),
      pulseSpeed: rand(0.03, 0.06),
      life: 0,
      maxLife: rand(4000, 8000),
    };
  }

  function resize() {
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  let resizeTimer: ReturnType<typeof setTimeout>;
  function debouncedResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      spawnAll();
    }, 150);
  }

  function spawnAll() {
    if (!canvas) return;

    const area = window.innerWidth * window.innerHeight;
    const scale = Math.max(0.4, Math.min(1.2, area / (1920 * 1080)));
    const count = Math.round(config.count * scale);

    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(config, window.innerWidth, window.innerHeight));
    }
  }

  function update(p: Particle) {
    if (!canvas) return;

    p.wobblePhase += p.wobbleSpeed;
    p.x += p.speedX + Math.sin(p.wobblePhase) * (p.wobbleAmplitude / 200);
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;

    if (isCursorActive()) {
      const cursor = getCursor();
      const dx = p.x - cursor.x;
      const dy = p.y - cursor.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const scatterRadius = 80;

      if (dist < scatterRadius && dist > 0) {
        const force = (1 - dist / scatterRadius) * 2.5;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }
    }

    if (season === "summer") {
      if (p.y < -20) {
        p.y = window.innerHeight + 10;
        p.x = rand(0, window.innerWidth);
      }
    } else {
      if (p.y > window.innerHeight + 20) {
        p.y = rand(-30, -10);
        p.x = rand(0, window.innerWidth);
      }
    }

    if (p.x > window.innerWidth + 30) p.x = -20;
    if (p.x < -30) p.x = window.innerWidth + 20;
  }

  function draw() {
    if (!canvas) return;
    if (!ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const p of particles) {
      update(p);
      switch (season) {
        case "spring":
          drawSpringPetal(ctx, p);
          break;
        case "summer":
          drawSummerGlow(ctx, p);
          break;
        case "autumn":
          drawAutumnLeaf(ctx, p);
          break;
        case "winter":
          drawSnowflake(ctx, p);
          break;
      }
    }

    const now = performance.now();
    if (now - lastFireflySpawn > fireflySpawnInterval && fireflies.length < 5) {
      fireflies.push(createFirefly());
      lastFireflySpawn = now;
    }

    for (const f of fireflies) {
      f.x += f.speedX;
      f.y += f.speedY;
      f.pulsePhase += f.pulseSpeed;
      f.life += 16.67;

      drawFirefly(ctx, f);
    }

    fireflies = fireflies.filter(f => f.life < f.maxLife);

    animationId = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    spawnAll();
    draw();
  }

  function stop() {
    running = false;
    cancelAnimationFrame(animationId);
    if (ctx && canvas) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  function checkSeason() {
    const newSeason = readCurrentSeason();
    if (newSeason !== season) {
      season = newSeason;
      config = SEASON_CONFIGS[season];
      spawnAll();
    }
  }

  if (!reducedMotion.matches) start();

  window.addEventListener("resize", debouncedResize);
  setInterval(checkSeason, 60000);
  reducedMotion.addEventListener("change", (e) => {
    if (e.matches) stop();
    else start();
  });
}

document.addEventListener("DOMContentLoaded", initParticles);
