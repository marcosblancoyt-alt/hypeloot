/* ═══════════════════════════════════════════════════
   HypeLooT — Interactive Script
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Navbar Scroll Effect ───
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ─── Mobile Menu Toggle ───
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Scroll Reveal Animation ───
    const revealElements = document.querySelectorAll(
        '.about-grid, .stream-embed-wrapper, .stream-schedule, ' +
        '.clip-card, .social-card, .section-header'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ─── Parallax Effect on Hero ───
    const hero = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    const splatters = document.querySelectorAll('.paint-splatter');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrollY < heroHeight) {
            const parallaxSpeed = scrollY * 0.3;
            if (heroLogo) {
                heroLogo.style.transform = `rotate(-1deg) translateY(${parallaxSpeed}px)`;
            }
            splatters.forEach((splatter, i) => {
                const speed = (i + 1) * 0.1;
                splatter.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
    });

    // ─── Glitch Effect on Hover for Section Titles ───
    document.querySelectorAll('.section-title').forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                title.style.animation = '';
            }, 300);
        });
    });

    // ─── Dynamic Neon Cursor Trail ───
    const createTrailDot = (x, y) => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: ${Math.random() > 0.5 ? '#FF2D9B' : '#39FF14'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
            transition: all 0.8s ease;
            box-shadow: 0 0 6px currentColor;
        `;
        document.body.appendChild(dot);
        
        requestAnimationFrame(() => {
            dot.style.opacity = '0';
            dot.style.transform = `scale(0) translateY(${Math.random() * 20 - 10}px)`;
        });
        
        setTimeout(() => dot.remove(), 800);
    };

    let trailThrottle = 0;
    document.addEventListener('mousemove', (e) => {
        trailThrottle++;
        if (trailThrottle % 4 === 0) {
            createTrailDot(e.clientX, e.clientY);
        }
    });

    // ─── Active nav link highlight on scroll ───
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ─── Smooth scroll for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('%c🎨 HypeLooT by HypeKLK', 
        'color: #FF2D9B; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #FF2D9B;');
    console.log('%c🎮 Gallego • 26 años • Streamer', 
        'color: #39FF14; font-size: 14px;');
});
