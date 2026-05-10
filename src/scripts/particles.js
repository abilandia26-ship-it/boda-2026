export function initParticles() {
    function createParticlesForSlide(slideId) {
        const slide = document.getElementById(slideId);
        if (!slide) return;

        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1'; // Detrás del texto pero delante del fondo
        canvas.style.pointerEvents = 'none'; // No interfiere con clics
        slide.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = slide.clientWidth;
            height = slide.clientHeight;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3; // Movimiento extra lento
                this.speedY = (Math.random() - 0.5) * 0.3 - 0.1; // Ligeramente hacia arriba
                this.opacity = Math.random() * 0.5 + 0.1; // Sutil
                this.fadeSpeed = (Math.random() * 0.005) + 0.001;
                this.fadingOut = Math.random() > 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Pulso de opacidad (Bokeh)
                if (this.fadingOut) {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0.1) this.fadingOut = false;
                } else {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 0.6) this.fadingOut = true;
                }

                // Reposicionar si sale de la pantalla
                if (this.y < -10) this.y = height + 10;
                if (this.x < -10) this.x = width + 10;
                if (this.x > width + 10) this.x = -10;
                if (this.y > height + 10) this.y = -10;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(197, 168, 128, ${this.opacity})`; // color-primary
                ctx.fill();

                // Efecto de resplandor sutil
                ctx.shadowBlur = 5;
                ctx.shadowColor = `rgba(197, 168, 128, ${this.opacity})`;
            }
        }

        function init() {
            particles = [];
            const particleCount = window.innerWidth > 768 ? 60 : 30; // Menos partículas en móvil para rendimiento
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
        }

        init();
        animate();
    }

    // Inicializamos las partículas en los slides deseados
    createParticlesForSlide('slide2');
    createParticlesForSlide('slide10');
}
