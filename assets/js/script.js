// Promo Banner Functionality
const promoBanner = document.querySelector('.promo-banner');    
const promoClose = document.querySelector('.promo-close');
// const promoDismissed = localStorage.getItem('promoDismissed');

// console.log('Promo dismissed:', promoDismissed);

// Check if promo banner was dismissed
// if (!promoDismissed) {
//     promoBanner.style.display = 'flex';
// }
// Close promo banner
promoClose.addEventListener('click', () => {
    promoBanner.style.display = 'none';
    // localStorage.setItem('promoDismissed', 'true');
});

// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = (n + totalSlides) % totalSlides;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto-advance slides
setInterval(nextSlide, 5000);

// Indicator click handlers
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
});

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

function updateActiveNav() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Testimonial Slider
let currentTestimonial = 0;
const testimonialTrack = document.querySelector('.testimonial-track');
const totalTestimonials = document.querySelectorAll('.testimonial-card').length;

function changeTestimonial(direction) {
    currentTestimonial += direction;

    if (currentTestimonial >= totalTestimonials) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = totalTestimonials - 1;
    }

    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
}

// Auto-advance testimonials
setInterval(() => changeTestimonial(1), 6000);

// Service Details Modal
const modal = document.getElementById('serviceModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

const serviceDetails = {
    website: {
        title: 'Website Design',
        description: 'Custom, responsive websites that convert visitors into customers.',
        features: [
            'Mobile-first responsive design',
            'Lightning-fast loading speeds',
            'SEO-optimized structure',
            'Content Management System',
            'Contact forms and integrations',
            '30 days of free support'
        ],
        timeline: '2-4 weeks',
        price: 'Starting at $2,500'
    },
    branding: {
        title: 'Brand Identity',
        description: 'Complete brand identity packages that make you unforgettable.',
        features: [
            'Logo design and variations',
            'Color palette and typography',
            'Brand guidelines document',
            'Business card design',
            'Social media templates',
            'Brand strategy consultation'
        ],
        timeline: '1-3 weeks',
        price: 'Starting at $3,000'
    },
    social: {
        title: 'Social Media Setup',
        description: 'Professional social media presence across all platforms.',
        features: [
            'Profile optimization on 5+ platforms',
            'Custom branded graphics',
            'Content strategy development',
            '30 pieces of initial content',
            'Hashtag research and strategy',
            'Analytics setup and training'
        ],
        timeline: '1-2 weeks',
        price: 'Starting at $1,500'
    },
    seo: {
        title: 'SEO Optimization',
        description: 'Comprehensive SEO strategy to dominate search rankings.',
        features: [
            'Keyword research and analysis',
            'On-page optimization',
            'Technical SEO audit',
            'Local SEO setup',
            'Content optimization',
            '3 months of monitoring and adjustments'
        ],
        timeline: '2-4 weeks setup + ongoing',
        price: 'Starting at $2,000'
    },
    combo1: {
        title: 'Brand + Web Combo',
        description: 'Perfect synergy between visual identity and digital presence.',
        features: [
            'Complete brand identity package',
            'Custom responsive website',
            'Brand-website integration',
            'SEO-ready structure',
            '45 days of support',
            'Priority project timeline'
        ],
        timeline: '3-5 weeks',
        price: 'Starting at $4,800'
    },
    combo2: {
        title: 'Digital Marketing Suite',
        description: 'Perfect foundation for online visibility and customer acquisition.',
        features: [
            'Custom responsive website',
            'Complete SEO optimization',
            'Social media setup and strategy',
            'Google Business Profile setup',
            'Analytics and tracking setup',
            '60 days of optimization support'
        ],
        timeline: '3-6 weeks',
        price: 'Starting at $5,500'
    },
    combo3: {
        title: 'Growth Accelerator',
        description: 'Everything you need to accelerate your market entry.',
        features: [
            'Complete brand identity',
            'Custom responsive website',
            'SEO optimization',
            'Social media setup',
            '1 month of content creation',
            '1 month of social media management'
        ],
        timeline: '4-6 weeks',
        price: 'Starting at $8,000'
    },
    complete: {
        title: 'Complete Launch Ecosystem',
        description: 'Everything you need to dominate your market from day one.',
        features: [
            'Complete brand identity package',
            'Premium responsive website',
            'Full SEO optimization',
            'Social media setup and strategy',
            'Paid advertising campaigns setup',
            '3 months of full digital management',
            'Performance analytics and reporting',
            'Dedicated account manager'
        ],
        timeline: '6-8 weeks',
        price: 'Starting at $15,000'
    }
};

document.querySelectorAll('.view-service').forEach(button => {
    button.addEventListener('click', function () {
        const serviceKey = this.getAttribute('data-service');
        const service = serviceDetails[serviceKey];

        if (service) {
            modalContent.innerHTML = `
                        <h2 style="font-family: 'Orbitron', monospace; color: var(--primary-color); margin-bottom: 1rem;">${service.title}</h2>
                        <p style="color: var(--text-light); margin-bottom: 2rem; font-size: 1.1rem;">${service.description}</p>
                        
                        <h3 style="color: var(--neutral-white); margin-bottom: 1rem;">What's Included:</h3>
                        <ul style="color: var(--text-light); margin-bottom: 2rem;">
                            ${service.features.map(feature => `<li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--primary-color); margin-right: 0.5rem;"></i>${feature}</li>`).join('')}
                        </ul>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                            <div>
                                <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">Timeline</h4>
                                <p style="color: var(--text-light);">${service.timeline}</p>
                            </div>
                            <div>
                                <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">Investment</h4>
                                <p style="color: var(--text-light); font-weight: 600;">${service.price}</p>
                            </div>
                        </div>
                        
                        <div style="text-align: center;">
                            <a href="#contact" class="btn-primary" style="display: inline-block; margin-right: 1rem;">Get Started</a>
                            <button class="btn-secondary" onclick="modal.style.display='none'">Close</button>
                        </div>
                    `;

            modal.style.display = 'block';
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simple form validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Simulate form submission
    alert('Thank you for your interest! We\'ll get back to you within 24 hours.');
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all service cards and other animated elements
document.querySelectorAll('.service-card, .testimonial-card, .about-stats, .contact-item').forEach(el => {
    observer.observe(el);
});

// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});