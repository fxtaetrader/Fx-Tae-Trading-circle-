document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const bars = navToggle.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navToggle.click();
            }
        });
    });
    
    // Course Tabs
    const courseTabs = document.querySelectorAll('.course-tab');
    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            courseTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // You would add logic here to show different courses based on tab
        });
    });
    
    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe hero section for counter animation
    const heroSection = document.querySelector('.hero');
    observer.observe(heroSection);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Live Signal Updates
    function updateLiveSignals() {
        const signalStatus = document.querySelector('.signal-status .status');
        if (signalStatus && signalStatus.textContent === 'Live') {
            // Randomly update the profit
            const profitElement = document.querySelector('.signal-result .profit');
            if (profitElement) {
                const currentProfit = parseInt(profitElement.textContent.replace('+$', ''));
                const newProfit = currentProfit + Math.floor(Math.random() * 5) + 1;
                profitElement.textContent = `+$${newProfit}`;
            }
        }
    }
    
    // Update signals every 5 seconds
    setInterval(updateLiveSignals, 5000);
    
    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 46, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', () => {
        animateOnScroll();
        
        // Trigger animations after page load
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            heroTitle.classList.add('animate__animated', 'animate__fadeInUp');
        }, 300);
    });
    
    // Live Support Button Interaction
    const supportBtn = document.querySelector('.support-btn');
    if (supportBtn) {
        supportBtn.addEventListener('click', () => {
            alert('Live support is coming soon! For now, please email us at support@fxtaecharts.com');
        });
    }
    
    // Course Enrollment Button Effects
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    enrollButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseName = this.closest('.course-card').querySelector('h3').textContent;
            alert(`You are enrolling in: ${courseName}\n\nThis feature is for demonstration. In a real site, this would redirect to payment.`);
        });
    });
    
    // Fake Chart Animation
    const chartLines = document.querySelectorAll('.chart-line');
    chartLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Auto-update hero stats every 30 seconds
    setInterval(() => {
        const stats = document.querySelectorAll('.hero-stats .stat-number');
        stats.forEach(stat => {
            const current = parseInt(stat.textContent);
            const isPips = stat.closest('.stat').querySelector('.stat-label').textContent.includes('Pips');
            
            if (isPips) {
                const increment = Math.floor(Math.random() * 10) + 5;
                stat.textContent = current + increment;
                stat.setAttribute('data-count', current + increment);
            }
        });
    }, 30000);
});
const candleContainer = document.querySelector(".candlestick-bg");

function createCandle() {
    const candle = document.createElement("div");
    const isBullish = Math.random() > 0.5;

    candle.classList.add("candle");
    candle.classList.add(isBullish ? "green" : "red");

    const height = Math.random() * 80 + 40;
    const left = Math.random() * window.innerWidth;
    const duration = Math.random() * 6 + 4;

    candle.style.height = `${height}px`;
    candle.style.left = `${left}px`;
    candle.style.animationDuration = `${duration}s`;

    candleContainer.appendChild(candle);

    setTimeout(() => {
        candle.remove();
    }, duration * 1000);
}

/* Generate candles continuously */
setInterval(createCandle, 300);
