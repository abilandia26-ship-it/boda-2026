export function initAnimations() {
    const mainContainer = document.getElementById('main-container');
    const sections = document.querySelectorAll('section');

    if (mainContainer) {
        mainContainer.addEventListener('scroll', function () {
            let currentSection = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (mainContainer.scrollTop >= sectionTop - 100) {
                    currentSection = section.id;
                }
            });

            sections.forEach(section => {
                if (section.id === currentSection) {
                    section.classList.add('active-slide');
                }
            });

            const hint = document.getElementById('scroll-hint');
            if (hint) {
                hint.classList.toggle('visible', currentSection !== 'slide11');
            }
        });
    }

    const revealOptions = {
        root: mainContainer, 
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.fade-in-element').forEach(el => {
        revealObserver.observe(el);
    });
}
