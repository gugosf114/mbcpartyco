/* ══════════════════════════════════
   MBC Party Co. — Main JS
══════════════════════════════════ */

// ── Mobile nav toggle ──
(function () {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
        links.classList.toggle('open');
        toggle.textContent = links.classList.contains('open') ? '\u2715' : '\u2630';
    });

    // Close nav on link click
    links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            links.classList.remove('open');
            toggle.textContent = '\u2630';
        });
    });
})();

// ── Particle animation ──
(function () {
    var canvas = document.getElementById('partyParticles');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var particles = [];
    var count = 40;

    function Particle() {
        this.reset();
    }

    Particle.prototype.reset = function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
    };

    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
        ctx.fill();
    };

    for (var i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < 140) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(255,255,255,' + (0.08 * (1 - d / 140)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        drawLines();
        requestAnimationFrame(loop);
    }
    loop();
})();

// ── Pre-fill service from URL params ──
(function () {
    var params = new URLSearchParams(window.location.search);
    var service = params.get('service');
    if (!service) return;

    var serviceMap = {
        'castle-bouncer': 'bounce-house',
        'slide-combo': 'bounce-house',
        'toddler-zone': 'bounce-house',
        'essentials': 'tableware',
        'full-setup': 'full-setup',
        'bounce-plus-setup': 'bounce-plus-setup',
        'corporate': 'corporate',
        'custom': 'custom'
    };

    var selectValue = serviceMap[service] || 'custom';
    var selectEl = document.getElementById('services');
    if (selectEl) {
        selectEl.value = selectValue;
    }
})();
