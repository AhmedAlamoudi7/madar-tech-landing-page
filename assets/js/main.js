document.addEventListener('DOMContentLoaded', function () {
    const heroCarousel = document.getElementById('heroCarousel');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroCarousel && window.bootstrap) {
        new bootstrap.Carousel(heroCarousel, {
            interval: prefersReducedMotion ? false : 6500,
            ride: prefersReducedMotion ? false : 'carousel',
            pause: false,
            touch: true,
            wrap: true
        });
    }

    const revealElements = document.querySelectorAll(
        'main section:not(#hero) .text-center.mb-5, ' +
        'main section:not(#hero) .row > [class*="col-"], ' +
        '#contact form, footer .container > .row > [class*="col-"]'
    );

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        document.body.classList.add('motion-ready');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element, index) => {
            element.classList.add('reveal');
            element.style.transitionDelay = `${(index % 4) * 90}ms`;
            revealObserver.observe(element);
        });
    }

    const whatsappForm = document.getElementById('whatsappForm');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const madarPhone = '970590000000';
            const fullText = `مرحباً مدار تك، أود التواصل معكم.%0A%0A` +
                `*الاسم:* ${encodeURIComponent(name)}%0A` +
                `*البريد الإلكتروني:* ${encodeURIComponent(email)}%0A` +
                `*رقم الهاتف:* ${encodeURIComponent(phone)}%0A` +
                `*الرسالة:* ${encodeURIComponent(message)}`;

            const whatsappUrl = `https://wa.me/${madarPhone}?text=${fullText}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach((link) => {
        link.addEventListener('click', function () {
            navLinks.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');

            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
});
