// Hero Fluid Wave Canvas — Dark obsidian blend with luminous ripples behind the terminal
(function () {
  function initHeroCanvas() {
    const canvas = document.getElementById('heroFluidCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const wrap = canvas.parentElement || document.querySelector('.hero-landscape-wrap');

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId = null;
    let isVisible = true;

    // Interactive pointer state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false
    };

    // Expanding ripple waves triggered by movement or ambient pulse
    const ripples = [];

    function addRipple(x, y, maxRadius = 160, strength = 1.0, color = 'emerald') {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius,
        strength,
        color,
        alpha: 1.0,
        speed: 2.2 + Math.random() * 1.5
      });
      if (ripples.length > 18) {
        ripples.shift();
      }
    }

    function resize() {
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      width = Math.floor(rect.width) || 1200;
      height = Math.max(Math.floor(rect.height), 420);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize);
    resize();

    // Pointer events
    if (wrap) {
      wrap.addEventListener('pointermove', (e) => {
        const rect = wrap.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;

        if (Math.random() < 0.22) {
          addRipple(
            mouse.targetX,
            mouse.targetY,
            120 + Math.random() * 80,
            0.8,
            Math.random() < 0.2 ? 'magenta' : 'emerald'
          );
        }
      });

      wrap.addEventListener('pointerleave', () => {
        mouse.active = false;
      });

      wrap.addEventListener('click', (e) => {
        const rect = wrap.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        addRipple(clickX, clickY, 240, 1.2, 'emerald');
        addRipple(clickX, clickY, 180, 0.9, 'magenta');
      });
    }

    // Auto ambient ripples
    let lastAmbientTime = 0;

    let time = 0;

    function render(timestamp) {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Smooth mouse follow
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      }

      // Trigger ambient breathing pulse every ~2.5s
      if (timestamp - lastAmbientTime > 2400) {
        lastAmbientTime = timestamp;
        const ambientX = width * (0.2 + Math.random() * 0.6);
        const ambientY = height * (0.3 + Math.random() * 0.5);
        addRipple(ambientX, ambientY, 200, 0.75, Math.random() < 0.25 ? 'magenta' : 'emerald');
      }

      // 1. Dark Obsidian base background
      ctx.clearRect(0, 0, width, height);

      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#070709');
      baseGrad.addColorStop(0.5, '#0a0a0e');
      baseGrad.addColorStop(1, '#060608');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle radial dark obsidian vignette
      const radGrad = ctx.createRadialGradient(
        width / 2, height * 0.45, 80,
        width / 2, height * 0.45, width * 0.7
      );
      radGrad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      radGrad.addColorStop(0.4, 'rgba(10, 10, 14, 0.4)');
      radGrad.addColorStop(1, 'rgba(4, 4, 6, 0.95)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Computational Flow Grid (Fine dot-matrix + isometric perspective guide)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      const step = 28;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          // Displace subtly based on wave
          const waveD = Math.sin(x * 0.015 + time) * Math.cos(y * 0.015 + time);
          if (waveD > 0.4) {
            ctx.fillRect(x + waveD * 2, y, 1.2, 1.2);
          }
        }
      }

      // 3. Fluid Wave Contours (Obsidian fluid ribbon waves)
      const numWaves = 7;
      const baseHeight = height * 0.45;

      for (let w = 0; w < numWaves; w++) {
        ctx.beginPath();

        const progress = w / (numWaves - 1);
        const yOffset = baseHeight + (w - numWaves / 2) * 36;
        const speed = 0.8 + w * 0.2;
        const amp = 24 + w * 7;
        const freq = 0.0035 + (w % 3) * 0.001;

        // Wave color: alternate between glowing emerald and subtle magenta accent
        const isMagenta = w === 4;
        let strokeStyle;
        if (isMagenta) {
          strokeStyle = `rgba(255, 47, 214, ${0.28 + progress * 0.35})`;
          ctx.lineWidth = 1.6;
        } else {
          strokeStyle = `rgba(16, 185, 129, ${0.22 + progress * 0.45})`;
          ctx.lineWidth = 1.4;
        }

        ctx.strokeStyle = strokeStyle;

        for (let x = 0; x <= width; x += 12) {
          let y = yOffset + Math.sin(x * freq + time * speed) * amp;
          y += Math.cos(x * (freq * 1.6) - time * (speed * 0.7)) * (amp * 0.45);

          // Pointer interaction disturbance
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const push = (1 - dist / 180) * 32 * Math.sin(dist * 0.08 - time * 6);
              y += push;
            }
          }

          // Active ripples perturbation
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const rdx = x - rip.x;
            const rdist = Math.abs(rdx);
            if (Math.abs(rdist - rip.radius) < 36) {
              const rippleFactor = (1 - Math.abs(rdist - rip.radius) / 36) * rip.alpha * rip.strength;
              y += Math.sin((rdist - rip.radius) * 0.15) * 16 * rippleFactor;
            }
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      // 4. Expanding Luminous Ripple Rings
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.alpha = Math.max(0, 1 - rip.radius / rip.maxRadius);

        if (rip.alpha <= 0.01) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        const col = rip.color === 'magenta'
          ? `rgba(255, 47, 214, ${rip.alpha * 0.45})`
          : `rgba(16, 185, 129, ${rip.alpha * 0.55})`;
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Dark Obsidian Horizon Vignette (soft top and bottom fade so terminal sits cleanly)
      const topGrad = ctx.createLinearGradient(0, 0, 0, 90);
      topGrad.addColorStop(0, '#09090b');
      topGrad.addColorStop(1, 'rgba(9, 9, 11, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, 90);

      const bottomGrad = ctx.createLinearGradient(0, height - 120, 0, height);
      bottomGrad.addColorStop(0, 'rgba(9, 9, 11, 0)');
      bottomGrad.addColorStop(1, '#09090b');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, height - 120, width, 120);

      animationFrameId = requestAnimationFrame(render);
    }

    // Visibility observer to pause animation when offscreen
    if ('IntersectionObserver' in window && wrap) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(wrap);
    }

    animationFrameId = requestAnimationFrame(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroCanvas);
  } else {
    initHeroCanvas();
  }
})();
