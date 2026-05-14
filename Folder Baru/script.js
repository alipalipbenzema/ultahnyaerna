// DOM Elements
const loader = document.getElementById('loader');
const progressFill = document.getElementById('progressFill');
const mainContent = document.getElementById('mainContent');
const canvas = document.getElementById('canvas');

// Canvas context
let canvasCtx;
let particles = [];
let loveRain = [];
let animationId;

// Optimized counts
const particleCount = 35;
const loveRainCount = 140;

// Fast loading (1.8-2.5s)
function initLoading() {
    let progress = 0;
    const increment = 16;
    
    const interval = setInterval(() => {
        progress += Math.random() * increment + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(hideLoader, 250);
        }
        progressFill.style.width = `${Math.min(progress, 100)}%`;
    }, 65);
}

// Initialize canvas
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCtx = canvas.getContext('2d');
    
    // Floating particles (background)
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: Math.random() * 2.5 + 1.5,
            alpha: Math.random() * 0.5 + 0.3,
            hue: 310 + Math.random() * 50 // Pink-purple
        });
    }
    
    // 🔥 LOVE RAIN (foreground)
    initLoveRain();
    
    // Start animation
    animate();
}

function initLoveRain() {
    for (let i = 0; i < loveRainCount; i++) {
        loveRain.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height * 0.6,
            speed: 2.2 + Math.random() * 3.8,
            length: 10 + Math.random() * 20,
            hearts: generateHearts(),
            phase: Math.random() * Math.PI * 2,
            alpha: 0.88
        });
    }
}

function generateHearts() {
    const hearts = ['💖','💕','💗','💓','💞','💝','❤️','💘','💟','🩷','🌸','✨','💫'];
    let result = '';
    const len = Math.floor(Math.random() * 7) + 4;
    for (let i = 0; i < len; i++) {
        result += hearts[Math.floor(Math.random() * hearts.length)];
    }
    return result;
}

// 🔥 MAIN ANIMATION LOOP
function animate() {
    // Dark trail effect
    canvasCtx.fillStyle = 'rgba(26, 0, 51, 0.18)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    const time = Date.now() * 0.01;
    
    // 1. BACKGROUND PARTICLES
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Boundary wrap
        if (particle.x < -30) particle.x = canvas.width + 30;
        if (particle.x > canvas.width + 30) particle.x = -30;
        if (particle.y < -30) particle.y = canvas.height + 30;
        if (particle.y > canvas.height + 30) particle.y = -30;
        
        // Draw glowing particles
        const gradient = canvasCtx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 3);
        gradient.addColorStop(0, `hsla(${particle.hue}, 85%, 65%, ${particle.alpha})`);
        gradient.addColorStop(0.6, `hsla(${particle.hue}, 85%, 65%, ${particle.alpha * 0.3})`);
        gradient.addColorStop(1, 'transparent');
        
        canvasCtx.fillStyle = gradient;
        canvasCtx.beginPath();
        canvasCtx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        canvasCtx.fill();
    });
    
    // 2. 🔥 LOVE RAIN (TERATAS CONTENT!)
    canvasCtx.shadowColor = '#ff1493';
    canvasCtx.shadowBlur = 15;
    
    loveRain.forEach(drop => {
        drop.y += drop.speed;
        drop.phase += 0.1;
        
        // Reset column
        if (drop.y > canvas.height + drop.length * 28) {
            drop.y = Math.random() * -200;
            drop.x = Math.random() * canvas.width;
            drop.hearts = generateHearts();
            drop.phase = Math.random() * Math.PI * 2;
        }
        
        // Draw each heart in column
        for (let i = 0; i < drop.length; i++) {
            const fade = 1 - (i / drop.length);
            const size = 0.65 + fade * 0.55;
            const sway = Math.sin(time * 3 + drop.phase + i * 0.4) * 12;
            
            canvasCtx.save();
            canvasCtx.globalAlpha = drop.alpha * fade * 0.95;
            canvasCtx.font = `bold ${22 * size}px Arial, sans-serif`;
            canvasCtx.textAlign = 'center';
            canvasCtx.textBaseline = 'middle';
            
            canvasCtx.fillText(
                drop.hearts[i % drop.hearts.length],
                drop.x + sway,
                drop.y + i * 26
            );
            canvasCtx.restore();
        }
    });
    
    // Reset shadow
    canvasCtx.shadowBlur = 0;
    
    // Continue animation
    animationId = requestAnimationFrame(animate);
}

// Hide loader
function hideLoader() {
    loader.classList.add('hidden');
    setTimeout(() => {
        loader.style.display = 'none';
        if (mainContent) mainContent.style.opacity = '1';
    }, 300);
}

// Resize handler
function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Event listeners
window.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initLoading();
});

window.addEventListener('resize', handleResize, { passive: true });

window.addEventListener('visibilitychange', () => {
    if (document.hidden && animationId) {
        cancelAnimationFrame(animationId);
    }
});

window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});
// Canvas hujan love sama persis
const canvas = document.getElementById('canvas');
let canvasCtx;
let particles = [];
let loveRain = [];
let animationId;

const particleCount = 35;
const loveRainCount = 140;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCtx = canvas.getContext('2d');
    
    // Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: Math.random() * 2.5 + 1.5,
            alpha: Math.random() * 0.5 + 0.3,
            hue: 310 + Math.random() * 50
        });
    }
    
    initLoveRain();
    animate();
}

// Copy fungsi yang sama dari index.js
function initLoveRain() {
    for (let i = 0; i < loveRainCount; i++) {
        loveRain.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height * 0.6,
            speed: 2.2 + Math.random() * 3.8,
            length: 10 + Math.random() * 20,
            hearts: generateHearts(),
            phase: Math.random() * Math.PI * 2,
            alpha: 0.88
        });
    }
}

function generateHearts() {
    const hearts = ['💖','💕','💗','💓','💞','💝','❤️','💘','💟','🩷','🌸','✨','💫'];
    let result = '';
    const len = Math.floor(Math.random() * 7) + 4;
    for (let i = 0; i < len; i++) {
        result += hearts[Math.floor(Math.random() * hearts.length)];
    }
    return result;
}

function animate() {
    // Tambah di function animate(), SEBELUM loveRain loop:
let floatingHearts = [];

// Di initCanvas(), tambah:
for (let i = 0; i < 12; i++) {
    floatingHearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: Math.random() * 30 + 20,
        speed: Math.random() * 1 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.4 + 0.2
    });
}

// Di animate(), tambah SEBELUM loveRain:
floatingHearts.forEach(heart => {
    heart.y -= heart.speed;
    heart.rotation += heart.rotSpeed;
    heart.alpha *= 0.995;
    
    if (heart.y < -heart.size) {
        heart.y = canvas.height + heart.size;
        heart.x = Math.random() * canvas.width;
        heart.alpha = Math.random() * 0.4 + 0.2;
    }
    
    canvasCtx.save();
    canvasCtx.globalAlpha = heart.alpha;
    canvasCtx.shadowColor = '#ff1493';
    canvasCtx.shadowBlur = 20;
    canvasCtx.translate(heart.x, heart.y);
    canvasCtx.rotate(heart.rotation);
    canvasCtx.font = `bold ${heart.size}px Arial`;
    canvasCtx.textAlign = 'center';
    canvasCtx.textBaseline = 'middle';
    canvasCtx.fillText('💖', 0, 0);
    canvasCtx.restore();
});
    canvasCtx.fillStyle = 'rgba(26, 0, 51, 0.18)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    const time = Date.now() * 0.01;
    
    // Particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;
        if (p.y < -30) p.y = canvas.height + 30;
        if (p.y > canvas.height + 30) p.y = -30;
        
        const gradient = canvasCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 85%, 65%, ${p.alpha})`);
        gradient.addColorStop(0.6, `hsla(${p.hue}, 85%, 65%, ${p.alpha * 0.3})`);
        gradient.addColorStop(1, 'transparent');
        
        canvasCtx.fillStyle = gradient;
        canvasCtx.beginPath();
        canvasCtx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        canvasCtx.fill();
    });
    
    // Love rain
    canvasCtx.shadowColor = '#ff1493';
    canvasCtx.shadowBlur = 15;
    
    loveRain.forEach(drop => {
        drop.y += drop.speed;
        drop.phase += 0.1;
        
        if (drop.y > canvas.height + drop.length * 28) {
            drop.y = Math.random() * -200;
            drop.x = Math.random() * canvas.width;
            drop.hearts = generateHearts();
            drop.phase = Math.random() * Math.PI * 2;
        }
        
        for (let i = 0; i < drop.length; i++) {
            const fade = 1 - (i / drop.length);
            const size = 0.65 + fade * 0.55;
            const sway = Math.sin(time * 3 + drop.phase + i * 0.4) * 12;
            
            canvasCtx.save();
            canvasCtx.globalAlpha = drop.alpha * fade * 0.95;
            canvasCtx.font = `bold ${22 * size}px Arial, sans-serif`;
            canvasCtx.textAlign = 'center';
            canvasCtx.textBaseline = 'middle';
            
            canvasCtx.fillText(
                drop.hearts[i % drop.hearts.length],
                drop.x + sway,
                drop.y + i * 26
            );
            canvasCtx.restore();
        }
    });
    
    canvasCtx.shadowBlur = 0;
    animationId = requestAnimationFrame(animate);
}

window.addEventListener('load', initCanvas);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// ============================================
// 🎉 HAPPY BIRTHDAY ERNA - PERFECT VERSION
// Loading 2s + Hujan Love 140 + Floating Hearts
// ============================================

const loader = document.getElementById('loader');
const progressFill = document.getElementById('progressFill');
const mainContent = document.getElementById('mainContent');
const canvas = document.getElementById('canvas');

let canvasCtx, particles = [], loveRain = [], floatingHearts = [], animationId;
const particleCount = 35, loveRainCount = 140, floatingHeartCount = 12;

// 🔥 LOADING FIXED - 2.2s MAX
function initLoading() {
    let progress = 0;
    const animateProgress = () => {
        progress += (100 - progress) * 0.13;
        progressFill.style.width = `${Math.min(progress, 100)}%`;
        if (progress < 99.9) requestAnimationFrame(animateProgress);
        else setTimeout(hideLoader, 150);
    };
    requestAnimationFrame(animateProgress);
}

function hideLoader() {
    loader.classList.add('hidden');
    loader.style.display = 'none';
    mainContent.style.display = 'flex';
    mainContent.style.opacity = '1';
}

// Canvas init
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCtx = canvas.getContext('2d');
    
    // Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: Math.random() * 2.5 + 1.5,
            alpha: Math.random() * 0.5 + 0.3,
            hue: 310 + Math.random() * 50
        });
    }
    
    initLoveRain();
    initFloatingHearts();
    animate();
}

function initLoveRain() {
    for (let i = 0; i < loveRainCount; i++) {
        loveRain.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height * 0.6,
            speed: 2.2 + Math.random() * 3.8,
            length: 10 + Math.random() * 20,
            hearts: generateHearts(),
            phase: Math.random() * Math.PI * 2,
            alpha: 0.88
        });
    }
}

function initFloatingHearts() {
    for (let i = 0; i < floatingHeartCount; i++) {
        floatingHearts.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            size: Math.random() * 30 + 20,
            speed: Math.random() * 1 + 0.5,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.05,
            alpha: Math.random() * 0.4 + 0.2
        });
    }
}

function generateHearts() {
    const hearts = ['💖','💕','💗','💓','💞','💝','❤️','💘','💟','🩷','🌸','✨','💫'];
    let result = '';
    const len = Math.floor(Math.random() * 7) + 4;
    for (let i = 0; i < len; i++) {
        result += hearts[Math.floor(Math.random() * hearts.length)];
    }
    return result;
}

// 🔥 ANIMATION LOOP
function animate() {
    canvasCtx.fillStyle = 'rgba(26, 0, 51, 0.18)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    const time = Date.now() * 0.01;
    
    // Particles
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vx *= 0.98; p.vy *= 0.98;
        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;
        if (p.y < -30) p.y = canvas.height + 30;
        if (p.y > canvas.height + 30) p.y = -30;
        
        const gradient = canvasCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 85%, 65%, ${p.alpha})`);
        gradient.addColorStop(0.6, `hsla(${p.hue}, 85%, 65%, ${p.alpha * 0.3})`);
        gradient.addColorStop(1, 'transparent');
        canvasCtx.fillStyle = gradient;
        canvasCtx.beginPath();
        canvasCtx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        canvasCtx.fill();
    });
    
    // Floating hearts
    floatingHearts.forEach(h => {
        h.y -= h.speed; h.rotation += h.rotSpeed; h.alpha *= 0.995;
        if (h.y < -h.size) {
            h.y = canvas.height + h.size;
            h.x = Math.random() * canvas.width;
            h.alpha = Math.random() * 0.4 + 0.2;
        }
        canvasCtx.save();
        canvasCtx.globalAlpha = h.alpha;
        canvasCtx.shadowColor = '#ff1493'; canvasCtx.shadowBlur = 25;
        canvasCtx.translate(h.x, h.y); canvasCtx.rotate(h.rotation);
        canvasCtx.font = `bold ${h.size}px Arial`;
        canvasCtx.textAlign = 'center'; canvasCtx.textBaseline = 'middle';
        canvasCtx.fillText('💖', 0, 0);
        canvasCtx.restore();
    });
    
    // Love rain
    canvasCtx.shadowColor = '#ff1493'; canvasCtx.shadowBlur = 18;
    loveRain.forEach(d => {
        d.y += d.speed; d.phase += 0.1;
        if (d.y > canvas.height + d.length * 28) {
            d.y = Math.random() * -200;
            d.x = Math.random() * canvas.width;
            d.hearts = generateHearts();
            d.phase = Math.random() * Math.PI * 2;
        }
        for (let i = 0; i < d.length; i++) {
            const fade = 1 - (i / d.length);
            const size = 0.65 + fade * 0.55;
            const sway = Math.sin(time * 3 + d.phase + i * 0.4) * 12;
            canvasCtx.save();
            canvasCtx.globalAlpha = d.alpha * fade * 0.95;
            canvasCtx.font = `bold ${22 * size}px Arial`;
            canvasCtx.textAlign = 'center'; canvasCtx.textBaseline = 'middle';
            canvasCtx.fillText(d.hearts[i % d.hearts.length], d.x + sway, d.y + i * 26);
            canvasCtx.restore();
        }
    });
    canvasCtx.shadowBlur = 0;
    animationId = requestAnimationFrame(animate);
}

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 🔥 EVENTS - BULLETPROOF
document.addEventListener('DOMContentLoaded', () => canvas.style.opacity = '1');
window.addEventListener('load', () => {
    initCanvas();
    initLoading();
    setTimeout(() => { if (loader?.style.display !== 'none') hideLoader(); }, 3000);
});
window.addEventListener('resize', handleResize, { passive: true });
window.addEventListener('visibilitychange', () => document.hidden && animationId && cancelAnimationFrame(animationId));
window.addEventListener('beforeunload', () => animationId && cancelAnimationFrame(animationId));
// 🔥 ULTRA-SIMPLE - LOADING 1.5s + CANVAS INSTANT
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const progressFill = document.getElementById('progressFill');
    const mainContent = document.getElementById('mainContent');
    const canvas = document.getElementById('canvas');
    
    let ctx, particles = [], animationId;
    
    // Canvas setup IMMEDIATE
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');
        
        // 50 simple particles
        for (let i = 0; i < 50; i++) {
            particles[i] = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                r: Math.random() * 3 + 1
            };
        }
        animate();
    }
    
    // Simple animation
    function animate() {
        ctx.fillStyle = 'rgba(26, 0, 51, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.shadowColor = '#ff1493';
        ctx.shadowBlur = 10;
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${320 + Math.random() * 40}, 80%, 60%)`;
            ctx.fill();
        });
        
        ctx.shadowBlur = 0;
        animationId = requestAnimationFrame(animate);
    }
    
    // Loading super fast
    let progress = 0;
    function loadingAnim() {
        progress += 8;
        progressFill.style.width = progress + '%';
        if (progress < 100) {
            requestAnimationFrame(loadingAnim);
        } else {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.display = 'none';
                mainContent.style.opacity = '1';
                mainContent.style.display = 'flex';
            }, 200);
        }
    }
    
    // START EVERYTHING
    initCanvas();
    loadingAnim();
    
    // Safety net
    setTimeout(() => {
        if (loader.style.display !== 'none') {
            loader.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.display = 'flex';
        }
    }, 2000);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});