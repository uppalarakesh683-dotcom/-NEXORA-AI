/**  * MULTI-AGENT AI SYSTEM — SPACIOUS CINEMATIC OPENING (PART 1)
 * Composition:
 * - Spacious, uncluttered deep galaxy background
 * - Single AI entity clearly visible high above falling to center
 * - Center detonation with crisp, refined impact (reduced particles)
 * - 6 realistic futuristic AI agents spreading into a WIDE, spacious 3D formation
 * - Center kept clear with subtle quantum nexus core
 * - Thin, elegant synaptic connection lines with depth scaling
 * - Title and Enter button reveal ONLY AFTER all 6 agents finish forming
 */

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const openingContent = document.getElementById("openingContent");

let W = window.innerWidth;
let H = window.innerHeight;
let animRunning = true;
let startTime = performance.now();

// =====================================================
// 1. REFINED GALAXY & COSMOS CONFIGURATION
// =====================================================

const STAR_COUNT = 240;
const NEBULA_COUNT = 4;
const DUST_COUNT = 35;

let stars = [];
let nebulae = [];
let cosmicDust = [];

const STAR_COLORS = [
    "rgba(255, 255, 255, ",
    "rgba(186, 230, 253, ",
    "rgba(199, 210, 254, ",
    "rgba(254, 240, 199, "
];

function initCosmos() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    // Clean, multi-depth starfield
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            size: Math.random() * 1.4 + 0.3,
            colorPrefix: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
            twinkleSpeed: Math.random() * 0.02 + 0.008,
            twinkleOffset: Math.random() * Math.PI * 2,
            baseAlpha: Math.random() * 0.65 + 0.25
        });
    }

    // Soft, deep, non-intrusive cosmic nebulae
    nebulae = [
        { x: W * 0.25, y: H * 0.3, r: Math.max(W, H) * 0.4,  color: "rgba(14, 35, 90, ",  driftX: 0.05, driftY: -0.03 },
        { x: W * 0.75, y: H * 0.7, r: Math.max(W, H) * 0.45, color: "rgba(28, 12, 70, ",  driftX: -0.04, driftY: 0.03 },
        { x: W * 0.5,  y: H * 0.5, r: Math.max(W, H) * 0.35, color: "rgba(3, 40, 85, ",   driftX: 0.03, driftY: 0.04 },
        { x: W * 0.8,  y: H * 0.2, r: Math.max(W, H) * 0.3,  color: "rgba(30, 10, 60, ",  driftX: -0.03, driftY: -0.02 }
    ];

    // Minimal floating cosmic dust
    cosmicDust = [];
    for (let i = 0; i < DUST_COUNT; i++) {
        cosmicDust.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.3 + 0.08,
            pulseSpeed: Math.random() * 0.015 + 0.005
        });
    }
}

// =====================================================
// 2. DETONATION & SPARK SYSTEM (CLEAN & REFINED)
// =====================================================

let explosionSparks = [];
let shockwaves = [];
let lightRays = [];
let neuralPackets = [];

function createDetonation(cx, cy) {
    // 8 sleek volumetric light rays
    lightRays = [];
    const rayCount = 10;
    for (let i = 0; i < rayCount; i++) {
        lightRays.push({
            angle: (i / rayCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.15,
            length: Math.max(W, H) * 0.65,
            width: Math.random() * 14 + 6,
            alpha: 0.8,
            rotationSpeed: (Math.random() - 0.5) * 0.008
        });
    }

    // 2 crisp expanding shockwave rings
    shockwaves = [
        { radius: 10, maxRadius: Math.max(W, H) * 0.65, speed: 14, alpha: 0.85, width: 3, color: "rgba(186, 230, 253," },
        { radius: 2,  maxRadius: Math.max(W, H) * 0.45, speed: 8,  alpha: 0.7,  width: 8, color: "rgba(99, 102, 241," }
    ];

    // 70 high-velocity glowing embers (uncluttered)
    explosionSparks = [];
    for (let i = 0; i < 70; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 2;
        explosionSparks.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 2.5 + 1.0,
            alpha: 1.0,
            decay: Math.random() * 0.02 + 0.012,
            friction: 0.955,
            colorHue: Math.random() > 0.4 ? (195 + Math.random() * 30) : (250 + Math.random() * 30)
        });
    }
}

// =====================================================
// 3. SIX AGENTS DEFINITIONS & SPACIOUS LAYOUT
// =====================================================

const AGENT_NODES = [
    {
        name: "General AI",
        tag: "OMNI CORE",
        layoutPos: "top",
        angle: -Math.PI / 2,         // Top center
        depthScale: 0.86,            // Farther in perspective
        depthAlpha: 0.88,
        primaryColor: "#38bdf8",
        type: "omni"
    },
    {
        name: "Coding Agent",
        tag: "SYNTAX MATRIX",
        layoutPos: "top-right",
        angle: -Math.PI / 6,         // Top right
        depthScale: 0.95,
        depthAlpha: 0.92,
        primaryColor: "#2dd4bf",
        type: "code"
    },
    {
        name: "Study Agent",
        tag: "SYNAPTIC KNOWLEDGE",
        layoutPos: "mid-right",
        angle: Math.PI / 6,          // Mid/Bottom right
        depthScale: 1.08,            // Closer in perspective
        depthAlpha: 1.0,
        primaryColor: "#fbbf24",
        type: "study"
    },
    {
        name: "Research Agent",
        tag: "SPECTRUM SCANNER",
        layoutPos: "bottom",
        angle: Math.PI / 2,          // Bottom center
        depthScale: 0.98,
        depthAlpha: 0.95,
        primaryColor: "#60a5fa",
        type: "research"
    },
    {
        name: "Creative Agent",
        tag: "AURORA GENESIS",
        layoutPos: "mid-left",
        angle: (5 * Math.PI) / 6,    // Mid/Bottom left
        depthScale: 1.08,            // Closer in perspective
        depthAlpha: 1.0,
        primaryColor: "#e879f9",
        type: "creative"
    },
    {
        name: "Data Agent",
        tag: "TESSERACT GRID",
        layoutPos: "top-left",
        angle: (-5 * Math.PI) / 6,   // Top left
        depthScale: 0.95,
        depthAlpha: 0.92,
        primaryColor: "#22d3ee",
        type: "data"
    }
];

let fallingEntityTrail = [];

// =====================================================
// 4. MAIN RENDER LOOP & SPACIOUS ORCHESTRATION
// =====================================================

function drawScene(now) {
    if (!animRunning || !ctx) return;

    const t = (now - startTime) / 1000;
    const cx = W / 2;
    const cy = H / 2;

    // Subtle screen shake on impact (t = 2.8s -> 3.6s)
    let shakeX = 0;
    let shakeY = 0;
    if (t >= 2.8 && t < 3.8) {
        const shakeTime = t - 2.8;
        const amp = 10 * Math.exp(-shakeTime * 5.0);
        shakeX = (Math.random() - 0.5) * amp;
        shakeY = (Math.random() - 0.5) * amp;
    }

    ctx.save();
    ctx.translate(shakeX, shakeY);

    // -------------------------------------------------
    // A. Clean, Deep Galaxy Background
    // -------------------------------------------------
    ctx.fillStyle = "#01030b";
    ctx.fillRect(-20, -20, W + 40, H + 40);

    // Subtle Nebulae
    nebulae.forEach(neb => {
        const nx = neb.x + Math.sin(t * neb.driftX) * 20;
        const ny = neb.y + Math.cos(t * neb.driftY) * 20;

        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, neb.r);
        grad.addColorStop(0, neb.color + "0.18)");
        grad.addColorStop(0.5, neb.color + "0.06)");
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, neb.r, 0, Math.PI * 2);
        ctx.fill();
    });

    // Realistic Starfield
    stars.forEach(star => {
        const twinkle = Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset);
        const alpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle * 0.3));

        ctx.fillStyle = star.colorPrefix + alpha + ")";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Subtle Cosmic Dust
    cosmicDust.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = W;
        if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = H;

        ctx.fillStyle = `rgba(147, 197, 253, ${d.alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // -------------------------------------------------
    // B. Single AI Entity Falling (0.8s -> 2.8s)
    // -------------------------------------------------
    if (t >= 0.8 && t < 2.8) {
        const fallProgress = (t - 0.8) / 2.0;
        const easeFall = Math.pow(fallProgress, 2.6);
        const startY = -100;
        const currentY = startY + (cy - startY) * easeFall;
        const currentX = cx;

        const energyIntensity = 0.5 + fallProgress * 0.5;

        // Clean, narrow plasma trail
        if (Math.random() < 0.7) {
            fallingEntityTrail.push({
                x: currentX + (Math.random() - 0.5) * (8 + fallProgress * 12),
                y: currentY - Math.random() * 20,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -Math.random() * (3 + fallProgress * 8),
                size: Math.random() * 2.5 + 1.0,
                alpha: 0.8,
                decay: 0.04
            });
        }

        // Draw Motion Streak
        ctx.save();
        const trailGrad = ctx.createLinearGradient(currentX, currentY - (120 * fallProgress), currentX, currentY);
        trailGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
        trailGrad.addColorStop(0.7, `rgba(99, 102, 241, ${0.4 * energyIntensity})`);
        trailGrad.addColorStop(1, `rgba(255, 255, 255, ${0.9 * energyIntensity})`);

        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 6 + 10 * fallProgress;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(currentX, currentY - (80 + fallProgress * 120));
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 2 + 3 * fallProgress;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY - (40 + fallProgress * 60));
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        ctx.restore();

        // Trail sparks
        for (let i = fallingEntityTrail.length - 1; i >= 0; i--) {
            const p = fallingEntityTrail[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            if (p.alpha <= 0) {
                fallingEntityTrail.splice(i, 1);
                continue;
            }
            ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Single futuristic falling entity
        drawFuturisticEntity(currentX, currentY, energyIntensity, t, 30 + fallProgress * 12);
    }

    // -------------------------------------------------
    // C. Center Impact & Clean Detonation (t >= 2.8s)
    // -------------------------------------------------
    if (t >= 2.8) {
        if (explosionSparks.length === 0 && t < 2.9) {
            createDetonation(cx, cy);
        }

        const impactTime = t - 2.8;

        // Flash
        if (impactTime < 0.7) {
            const flashAlpha = Math.pow(Math.max(0, 1 - impactTime / 0.6), 2);
            const flashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.6);
            flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha * 0.9})`);
            flashGrad.addColorStop(0.3, `rgba(186, 230, 253, ${flashAlpha * 0.6})`);
            flashGrad.addColorStop(1, "transparent");

            ctx.fillStyle = flashGrad;
            ctx.fillRect(-20, -20, W + 40, H + 40);
        }

        // Light rays
        if (impactTime < 1.4) {
            const rayFade = Math.max(0, 1 - impactTime / 1.2);
            ctx.save();
            ctx.translate(cx, cy);
            lightRays.forEach(ray => {
                ray.angle += ray.rotationSpeed;
                ctx.save();
                ctx.rotate(ray.angle);

                const rayGrad = ctx.createLinearGradient(0, 0, ray.length, 0);
                rayGrad.addColorStop(0, `rgba(255, 255, 255, ${rayFade * 0.7})`);
                rayGrad.addColorStop(0.4, `rgba(56, 189, 248, ${rayFade * 0.3})`);
                rayGrad.addColorStop(1, "transparent");

                ctx.fillStyle = rayGrad;
                ctx.beginPath();
                ctx.moveTo(0, -ray.width * 0.2);
                ctx.lineTo(ray.length, -ray.width * 0.4);
                ctx.lineTo(ray.length, ray.width * 0.4);
                ctx.lineTo(0, ray.width * 0.2);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });
            ctx.restore();
        }

        // Shockwaves
        shockwaves.forEach(sw => {
            sw.radius += sw.speed;
            sw.alpha = Math.max(0, 1 - (sw.radius / sw.maxRadius));
            if (sw.alpha > 0.01) {
                ctx.save();
                ctx.strokeStyle = sw.color + (sw.alpha * 0.6) + ")";
                ctx.lineWidth = sw.width * sw.alpha;
                ctx.shadowBlur = 15;
                ctx.shadowColor = "#38bdf8";
                ctx.beginPath();
                ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
        });

        // Sparks
        for (let i = explosionSparks.length - 1; i >= 0; i--) {
            const p = explosionSparks[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                explosionSparks.splice(i, 1);
                continue;
            }

            ctx.fillStyle = `hsla(${p.colorHue}, 90%, 70%, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // -------------------------------------------------
    // D. Emergence into WIDE, SPACIOUS Formation (t >= 3.2s)
    // -------------------------------------------------
    if (t >= 3.2) {
        const emergeProgress = Math.min(1, (t - 3.2) / 2.4); // 0 to 1 over 2.4s
        const easeEmerge = cubicEaseOut(emergeProgress);

        // Generous, wide spatial dimensions
        const spreadX = Math.min(W * 0.44, 540) * easeEmerge;
        const spreadY = Math.min(H * 0.38, 360) * easeEmerge;

        // Calculate spacious positions for all 6 agents with 3D perspective
        const agentPositions = AGENT_NODES.map((agent, index) => {
            const floatOffset = Math.sin(t * 1.5 + index * 1.1) * 5;

            // Wide elliptical layout
            const px = cx + Math.cos(agent.angle) * (spreadX + floatOffset);
            const py = cy + Math.sin(agent.angle) * (spreadY + floatOffset * 0.6);

            return {
                x: px,
                y: py,
                agent,
                scale: agent.depthScale,
                alpha: agent.depthAlpha
            };
        });

        // ---------------------------------------------
        // E. Subtle, Thin Synaptic Network Lines (t >= 4.8s)
        // ---------------------------------------------
        if (t >= 4.8) {
            const netAlpha = Math.min(1, (t - 4.8) / 1.6);

            // Draw thin, elegant perimeter mesh
            ctx.save();
            ctx.lineWidth = 1;

            for (let i = 0; i < agentPositions.length; i++) {
                const p1 = agentPositions[i];
                const p2 = agentPositions[(i + 1) % agentPositions.length];

                ctx.strokeStyle = "rgba(147, 197, 253, 0.22)";
                ctx.globalAlpha = netAlpha * 0.45;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();

                // Subtle radial spoke to center
                ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
                ctx.globalAlpha = netAlpha * 0.3;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(cx, cy);
                ctx.stroke();
            }
            ctx.restore();

            // Traveling subtle data pulses
            if (t >= 5.4) {
                if (Math.random() < 0.15) {
                    const fromIdx = Math.floor(Math.random() * 6);
                    const toIdx = (fromIdx + 1) % 6;
                    neuralPackets.push({
                        from: fromIdx,
                        to: toIdx,
                        progress: 0,
                        speed: 0.012 + Math.random() * 0.015,
                        color: AGENT_NODES[fromIdx].primaryColor
                    });
                }

                for (let i = neuralPackets.length - 1; i >= 0; i--) {
                    const pkt = neuralPackets[i];
                    pkt.progress += pkt.speed;
                    if (pkt.progress >= 1.0) {
                        neuralPackets.splice(i, 1);
                        continue;
                    }

                    const p1 = agentPositions[pkt.from];
                    const p2 = agentPositions[pkt.to];
                    const curX = p1.x + (p2.x - p1.x) * pkt.progress;
                    const curY = p1.y + (p2.y - p1.y) * pkt.progress;

                    ctx.save();
                    ctx.fillStyle = "#ffffff";
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = pkt.color;
                    ctx.beginPath();
                    ctx.arc(curX, curY, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }

            // Minimal, clean center nexus pulse (Keeps center spacious)
            drawMinimalNexus(cx, cy, t, netAlpha);
        }

        // Draw each realistic futuristic AI Agent Node with depth scaling
        agentPositions.forEach(({ x, y, agent, scale, alpha }, index) => {
            drawSpaciousAgentNode(x, y, agent, t, emergeProgress, index, scale, alpha);
        });
    }

    // -------------------------------------------------
    // F. Title & Enter System Reveal (ONLY AFTER FORMATION COMPLETE: t >= 6.8s)
    // -------------------------------------------------
    if (t >= 6.8 && openingContent && !openingContent.classList.contains("active")) {
        openingContent.classList.add("active");
    }

    ctx.restore();
    requestAnimationFrame(drawScene);
}

// =====================================================
// 5. REFINED FUTURISTIC ENTITY & AGENT RENDERERS
// =====================================================

function drawFuturisticEntity(x, y, intensity, time, radius) {
    ctx.save();
    ctx.translate(x, y);

    // Gyro Ring 1
    ctx.save();
    ctx.rotate(time * 2.5);
    ctx.strokeStyle = `rgba(186, 230, 253, ${0.75 * intensity})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 1.5);
    ctx.stroke();
    ctx.restore();

    // Gyro Ring 2
    ctx.save();
    ctx.rotate(-time * 3);
    ctx.strokeStyle = `rgba(99, 102, 241, ${0.6 * intensity})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.75, 0, Math.PI * 1.3);
    ctx.stroke();
    ctx.restore();

    // Central Core Glow
    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.5);
    coreGrad.addColorStop(0, "#ffffff");
    coreGrad.addColorStop(0.4, "#7dd3fc");
    coreGrad.addColorStop(0.8, "#38bdf8");
    coreGrad.addColorStop(1, "transparent");

    ctx.fillStyle = coreGrad;
    ctx.shadowBlur = 20 * intensity;
    ctx.shadowColor = "#38bdf8";
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // Glyph
    ctx.fillStyle = "#03081e";
    ctx.font = `bold ${Math.max(9, Math.floor(radius * 0.3))}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowBlur = 0;
    ctx.fillText("AI", 0, 0);

    ctx.restore();
}

function drawSpaciousAgentNode(x, y, agent, time, progress, index, depthScale, depthAlpha) {
    const baseRadius = W < 700 ? 22 : 28;
    const nodeRadius = baseRadius * depthScale;
    const pulse = Math.sin(time * 2.5 + index) * 1.5;

    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = Math.min(1, progress * 1.2) * depthAlpha;

    // 1. Subtle Ambient Glow
    const aura = ctx.createRadialGradient(0, 0, 0, 0, 0, nodeRadius * 1.8);
    aura.addColorStop(0, `${agent.primaryColor}35`);
    aura.addColorStop(0.6, `${agent.primaryColor}08`);
    aura.addColorStop(1, "transparent");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, nodeRadius * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // 2. Fine Targeting Reticle
    ctx.save();
    ctx.rotate(time * (index % 2 === 0 ? 0.9 : -0.9));
    ctx.strokeStyle = agent.primaryColor;
    ctx.lineWidth = 1.2;
    ctx.shadowBlur = 8;
    ctx.shadowColor = agent.primaryColor;

    // Segment 1 & 2
    ctx.beginPath();
    ctx.arc(0, 0, nodeRadius + 6 + pulse, 0, Math.PI * 0.45);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, nodeRadius + 6 + pulse, Math.PI * 0.8, Math.PI * 1.25);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, nodeRadius + 6 + pulse, Math.PI * 1.5, Math.PI * 1.9);
    ctx.stroke();

    // Minimal corner ticks
    for (let a = 0; a < 4; a++) {
        const ang = (a * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * (nodeRadius + 3), Math.sin(ang) * (nodeRadius + 3));
        ctx.lineTo(Math.cos(ang) * (nodeRadius + 9), Math.sin(ang) * (nodeRadius + 9));
        ctx.stroke();
    }
    ctx.restore();

    // 3. Dark Cyber Core
    const baseGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, nodeRadius);
    baseGrad.addColorStop(0, "#1e293b");
    baseGrad.addColorStop(0.7, "#0f172a");
    baseGrad.addColorStop(1, "#020617");

    ctx.fillStyle = baseGrad;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 4. Distinct Futuristic Glyphs
    ctx.save();
    ctx.fillStyle = agent.primaryColor;
    ctx.strokeStyle = agent.primaryColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = agent.primaryColor;

    if (agent.type === "omni") {
        drawHexagon(0, 0, nodeRadius * 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
    } else if (agent.type === "code") {
        ctx.font = `bold ${Math.floor(nodeRadius * 0.6)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("</>", 0, 0);
    } else if (agent.type === "study") {
        drawStarLattice(0, 0, nodeRadius * 0.5);
    } else if (agent.type === "research") {
        ctx.beginPath();
        ctx.arc(0, 0, nodeRadius * 0.48, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-nodeRadius * 0.48, 0);
        ctx.lineTo(nodeRadius * 0.48, 0);
        ctx.moveTo(0, -nodeRadius * 0.48);
        ctx.lineTo(0, nodeRadius * 0.48);
        ctx.stroke();
    } else if (agent.type === "creative") {
        drawTriquetra(0, 0, nodeRadius * 0.45, time * 1.5);
    } else if (agent.type === "data") {
        drawTesseractCube(0, 0, nodeRadius * 0.45);
    }
    ctx.restore();

    // 5. Clean, Spaced Label Badge
    const labelY = nodeRadius + 18;
    ctx.save();
    ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
    ctx.font = "7.5px monospace";
    ctx.letterSpacing = "1.5px";
    ctx.textAlign = "center";
    ctx.fillText(agent.tag, 0, labelY - 5);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 9.5px Arial, sans-serif";
    ctx.letterSpacing = "1px";
    ctx.shadowBlur = 6;
    ctx.shadowColor = agent.primaryColor;
    ctx.fillText(agent.name.toUpperCase(), 0, labelY + 6);
    ctx.restore();

    ctx.restore();
}

function drawMinimalNexus(cx, cy, time, alpha) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.globalAlpha = alpha * 0.7;

    const r = 10 + Math.sin(time * 3) * 2;

    const nexusGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2);
    nexusGrad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    nexusGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.3)");
    nexusGrad.addColorStop(1, "transparent");

    ctx.fillStyle = nexusGrad;
    ctx.beginPath();
    ctx.arc(0, 0, r * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(186, 230, 253, 0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}

// =====================================================
// 6. GEOMETRY HELPERS
// =====================================================

function drawHexagon(x, y, radius) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const hx = x + Math.cos(a) * radius;
        const hy = y + Math.sin(a) * radius;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
}

function drawStarLattice(x, y, radius) {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        const r = i % 2 === 0 ? radius : radius * 0.45;
        const sx = x + Math.cos(a) * r;
        const sy = y + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.stroke();
}

function drawTriquetra(x, y, radius, rot) {
    ctx.save();
    ctx.rotate(rot);
    for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3;
        const ox = x + Math.cos(a) * (radius * 0.5);
        const oy = y + Math.sin(a) * (radius * 0.5);
        ctx.beginPath();
        ctx.arc(ox, oy, radius * 0.5, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.restore();
}

function drawTesseractCube(x, y, radius) {
    const s = radius * 0.7;
    ctx.strokeRect(x - s / 2, y - s / 2, s, s);
    const is = s * 0.45;
    ctx.strokeRect(x - is / 2, y - is / 2, is, is);
    ctx.beginPath();
    ctx.moveTo(x - s / 2, y - s / 2);
    ctx.lineTo(x - is / 2, y - is / 2);
    ctx.moveTo(x + s / 2, y - s / 2);
    ctx.lineTo(x + is / 2, y - is / 2);
    ctx.moveTo(x + s / 2, y + s / 2);
    ctx.lineTo(x + is / 2, y + is / 2);
    ctx.moveTo(x - s / 2, y + s / 2);
    ctx.lineTo(x - is / 2, y + is / 2);
    ctx.stroke();
}

function cubicEaseOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

// =====================================================
// 7. LIFECYCLE
// =====================================================

window.addEventListener("resize", () => {
    initCosmos();
});

initCosmos();
requestAnimationFrame(drawScene);

window.stopCinematicAnimation = function() {
    animRunning = false;
};

    ctx.strokeRect(x - is / 2, y - is / 2, is, is);
    ctx.beginPath();
    ctx.moveTo(x - s / 2, y - s / 2);
    ctx.lineTo(x - is / 2, y - is / 2);
    ctx.moveTo(x + s / 2, y - s / 2);
    ctx.lineTo(x + is / 2, y - is / 2);
    ctx.moveTo(x + s / 2, y + s / 2);
    ctx.lineTo(x + is / 2, y + is / 2);
    ctx.moveTo(x - s / 2, y + s / 2);
    ctx.lineTo(x - is / 2, y + is / 2);
    ctx.stroke();


function cubicEaseOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

// =====================================================
// 7. LIFECYCLE
// =====================================================

window.addEventListener("resize", () => {
    initCosmos();
});

initCosmos();
requestAnimationFrame(drawScene);

window.stopCinematicAnimation = function() {
    animRunning = false;
};

