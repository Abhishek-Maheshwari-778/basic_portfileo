document.addEventListener('DOMContentLoaded', () => {
    // --- Canvas Background Effect ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
                this.color = Math.random() > 0.5 ? '#00f2ea' : '#ff0050'; // Cyan or Pink
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const numberOfParticles = Math.floor((width * height) / 15000);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            particles.forEach((a, index) => {
                for (let j = index + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        resize();
        initParticles();
        animateParticles();
    }

    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (window.matchMedia("(min-width: 769px)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

            // Add a slight delay for the follower
            setTimeout(() => {
                follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }, 50);
        });

        const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-category');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-target');
                follower.style.transform += ' scale(1.5)';
                follower.style.borderColor = 'transparent';
                follower.style.background = 'rgba(0, 242, 234, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-target');
                follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
                follower.style.borderColor = 'var(--primary)';
                follower.style.background = 'transparent';
            });
        });
    }

    // --- Typewriter Effect ---
    const words = ["Data Analyst", "Python Developer", "Data Visualization", "Problem Solver"];
    let i = 0;
    let timer;

    function typeWriter() {
        const heading = document.querySelector('.typewriter');
        if (!heading) return;

        const text = words[i];
        let charIndex = 0;

        function type() {
            if (charIndex < text.length) {
                heading.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                heading.textContent = text.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                i = (i + 1) % words.length;
                type();
            }
        }

        type();
    }
    typeWriter();

    // --- Drawer Toggle ---
    const drawerToggle = document.getElementById('drawerToggle');
    const drawer = document.getElementById('drawer');

    if (drawerToggle && drawer) {
        drawerToggle.addEventListener('click', () => {
            drawer.classList.toggle('open');
            // Change icon
            const icon = drawerToggle.querySelector('i');
            if (drawer.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close drawer when clicking a link
    document.querySelectorAll('.drawer-links a').forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            const icon = drawerToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

// Global function for onclick in HTML (though event listeners are better)
window.toggleDrawer = function () {
    const drawer = document.getElementById('drawer');
    const drawerToggle = document.getElementById('drawerToggle');
    if (drawer) {
        drawer.classList.toggle('open');
        const icon = drawerToggle.querySelector('i');
        if (drawer.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
};