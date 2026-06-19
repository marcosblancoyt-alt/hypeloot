/* ═══════════════════════════════════════════════════
   HypeLooT — Alec Monopoly Style Interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Toggle menu
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Artwork parallax on scroll
    const artworks = document.querySelectorAll('.artwork-svg');
    
    window.addEventListener('scroll', () => {
        artworks.forEach(art => {
            const rect = art.getBoundingClientRect();
            const scrollPercent = rect.top / window.innerHeight;
            if (scrollPercent > -1 && scrollPercent < 1) {
                art.style.transform = `translateY(${scrollPercent * 20}px)`;
            }
        });
    });

    // Hero logo animation
    const heroSvg = document.querySelector('.hero-logo-svg');
    if (heroSvg) {
        heroSvg.addEventListener('mouseenter', () => {
            heroSvg.style.filter = 'drop-shadow(0 0 50px rgba(255, 45, 155, 0.6))';
        });
        heroSvg.addEventListener('mouseleave', () => {
            heroSvg.style.filter = 'drop-shadow(0 0 30px rgba(255, 45, 155, 0.3))';
        });
    }
});
