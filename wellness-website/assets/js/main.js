/**
 * Holistic Wellness Practice - Main JavaScript
 * Features: GSAP animations, 3D interactions, scroll effects, multilingual support
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initPreloader();
    initNavigation();
    initScrollAnimations();
    init3DEffects();
    initCookieConsent();
    initSmoothScroll();
    initCounters();
    initTestimonialCarousel();
});

/**
 * Preloader Animation
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    // Check if user has already visited
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
        preloader.classList.add('hidden');
    } else {
        sessionStorage.setItem('hasVisited', 'true');
        
        // Hide preloader after animation
        setTimeout(() => {
            preloader.classList.add('hidden');
            
            // Trigger hero animations after preloader
            setTimeout(() => {
                document.body.classList.add('page-loaded');
            }, 300);
        }, 2500);
    }
}

/**
 * Navigation - Sticky header and mobile menu
 */
function initNavigation() {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    // Sticky header on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMobile.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu on overlay click
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.php';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Parallax effect for hero images
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, { passive: true });
    }
}

/**
 * 3D Effects - TV Frame and iPhone interactions
 */
function init3DEffects() {
    // 3D TV Frame mouse interaction
    const tvFrame = document.querySelector('.tv-frame');
    if (tvFrame && !window.matchMedia('(pointer: coarse)').matches) {
        const container = tvFrame.parentElement;
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const rotateY = -15 + (x * 10);
            const rotateX = 5 + (y * -10);
            
            tvFrame.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            tvFrame.style.animation = 'none';
        });
        
        container.addEventListener('mouseleave', () => {
            tvFrame.style.transform = '';
            tvFrame.style.animation = '';
        });
    }
    
    // 3D iPhone mouse interaction
    const iphoneFrame = document.querySelector('.iphone-frame');
    if (iphoneFrame && !window.matchMedia('(pointer: coarse)').matches) {
        const container = iphoneFrame.parentElement;
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const rotateY = 15 + (x * 15);
            const rotateX = y * -10;
            
            iphoneFrame.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            iphoneFrame.style.animation = 'none';
        });
        
        container.addEventListener('mouseleave', () => {
            iphoneFrame.style.transform = '';
            iphoneFrame.style.animation = '';
        });
    }
    
    // Service card 3D tilt effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        if (!window.matchMedia('(pointer: coarse)').matches) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                card.style.transform = `perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }
    });
    
    // Magnetic button effect
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    
    magneticBtns.forEach(btn => {
        if (!window.matchMedia('(pointer: coarse)').matches) {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        }
    });
}

/**
 * Cookie Consent Banner
 */
function initCookieConsent() {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-btn-accept');
    const declineBtn = document.querySelector('.cookie-btn-decline');
    
    if (!cookieBanner) return;
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('active');
        }, 2000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('active');
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('active');
        });
    }
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Animated Counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = parseInt(counter.dataset.duration) || 2000;
                const suffix = counter.dataset.suffix || '';
                
                animateCounter(counter, target, duration, suffix);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target, duration, suffix) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

/**
 * Testimonial Carousel
 */
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.testimonial-carousel-item');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    let currentIndex = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    function nextSlide() {
        showSlide((currentIndex + 1) % items.length);
    }
    
    function prevSlide() {
        showSlide((currentIndex - 1 + items.length) % items.length);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });
    
    // Start autoplay
    startAutoplay();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
}

/**
 * GSAP Animations (if GSAP is loaded)
 */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero text reveal animation
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.7,
        ease: 'power3.out'
    });
    
    // Service cards stagger animation
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Testimonial cards animation
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Method sections animation
    gsap.from('.method-content', {
        scrollTrigger: {
            trigger: '.method-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.method-image', {
        scrollTrigger: {
            trigger: '.method-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Parallax background blobs
    gsap.to('.bg-blob-1', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        },
        y: 200,
        ease: 'none'
    });
    
    gsap.to('.bg-blob-2', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        },
        y: -200,
        ease: 'none'
    });
}

/**
 * Form Validation
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Add error message if not exists
            let errorMsg = input.parentElement.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'This field is required';
                input.parentElement.appendChild(errorMsg);
            }
        } else {
            input.classList.remove('error');
            const errorMsg = input.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
        }
    }
    
    return isValid;
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

/**
 * Star Rating Animation
 */
function animateStars(container) {
    const stars = container.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.transform = 'scale(1.2)';
            star.style.fill = '#D4AF37';
            
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Animate stars when they come into view
const starContainers = document.querySelectorAll('.testimonial-stars');
const starObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStars(entry.target);
            starObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

starContainers.forEach(container => starObserver.observe(container));
