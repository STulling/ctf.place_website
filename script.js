// ===== Matrix Background Effect =====
class MatrixBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.columns = [];
        this.fontSize = 14;
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|;:,.<>?/\\~`CTF.PLACE';
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const columnCount = Math.floor(this.canvas.width / this.fontSize);
        this.columns = Array(columnCount).fill(0).map(() => Math.random() * this.canvas.height);
    }
    
    animate() {
        // Semi-transparent black to create trail effect
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Green text with glow
        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = `${this.fontSize}px JetBrains Mono, monospace`;
        this.ctx.shadowColor = '#00ff88';
        this.ctx.shadowBlur = 2;
        
        for (let i = 0; i < this.columns.length; i++) {
            // Random character
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            
            // Draw character
            const x = i * this.fontSize;
            const y = this.columns[i];
            
            // Vary the color slightly
            if (Math.random() > 0.98) {
                this.ctx.fillStyle = '#00ccff';
            } else {
                this.ctx.fillStyle = `rgba(0, 255, 136, ${Math.random() * 0.5 + 0.5})`;
            }
            
            this.ctx.fillText(char, x, y);
            
            // Reset or advance column
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.columns[i] = 0;
            } else {
                this.columns[i] += this.fontSize;
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== Navigation Toggle =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Add scroll effect to nav
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Intersection Observer for Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .feature-item, .event-card, .contact-method'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS class for animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ===== Typing Effect for Terminal =====
function initTypingEffect() {
    const terminalBody = document.querySelector('.hero .terminal-body');
    if (!terminalBody) return;
    
    const lines = terminalBody.querySelectorAll('.typing-line, .output');
    let delay = 0;
    
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 0.3s ease';
            line.style.opacity = '1';
        }, delay);
        delay += 400;
    });
}

// ===== Hex Grid Animation Enhancement =====
function initHexAnimation() {
    const hexes = document.querySelectorAll('.hex');
    
    hexes.forEach((hex, index) => {
        hex.addEventListener('mouseenter', () => {
            hex.style.background = 'linear-gradient(135deg, #00ff88, #00ccff)';
            hex.style.opacity = '0.5';
        });
        
        hex.addEventListener('mouseleave', () => {
            hex.style.background = '#00ff88';
            hex.style.opacity = '';
        });
    });
}

// ===== Parallax Effect =====
function initParallax() {
    const hero = document.querySelector('.hero');
    const hexGrid = document.querySelector('.hex-grid');
    
    if (hero && hexGrid) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hexGrid.style.transform = `translateY(calc(-50% + ${rate}px))`;
        });
    }
}

// ===== Mouse Follow Effect =====
function initMouseFollow() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        
        const terminal = hero.querySelector('.terminal-window');
        if (terminal) {
            terminal.style.transform = `perspective(1000px) rotateY(${x * 0.1}deg) rotateX(${-y * 0.1}deg)`;
        }
    });
    
    hero.addEventListener('mouseleave', () => {
        const terminal = hero.querySelector('.terminal-window');
        if (terminal) {
            terminal.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            terminal.style.transition = 'transform 0.5s ease';
        }
    });
}

// ===== Console Easter Egg =====
function initConsoleEasterEgg() {
    const asciiArt = `
    ╔═══════════════════════════════════════════════════╗
    ║                                                   ║
    ║   ██████╗████████╗███████╗   ██████╗ ██╗          ║
    ║  ██╔════╝╚══██╔══╝██╔════╝   ██╔══██╗██║          ║
    ║  ██║        ██║   █████╗     ██████╔╝██║          ║
    ║  ██║        ██║   ██╔══╝     ██╔═══╝ ██║          ║
    ║  ╚██████╗   ██║   ██║   ██╗  ██║     ███████╗     ║
    ║   ╚═════╝   ╚═╝   ╚═╝   ╚═╝  ╚═╝     ╚══════╝     ║
    ║                                                   ║
    ║   Professional CTF Hosting & Development          ║
    ║   Looking to collaborate? Get in touch!           ║
    ║                                                   ║
    ╚═══════════════════════════════════════════════════╝
    `;
    
    console.log('%c' + asciiArt, 'color: #00ff88; font-family: monospace;');
    console.log('%c👋 Hey there, fellow hacker!', 'font-size: 16px; color: #00ccff;');
    console.log('%cInterested in hosting a CTF? Contact me at info@ctf.place', 'font-size: 12px; color: #a0a0a0;');
}

// ===== Service Card Hover Effect =====
function initServiceCardEffect() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Background
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        new MatrixBackground(canvas);
    }
    
    // Initialize all features
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initTypingEffect();
    initHexAnimation();
    initParallax();
    initMouseFollow();
    initServiceCardEffect();
    initConsoleEasterEgg();
});

// ===== Preloader (Optional Enhancement) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
