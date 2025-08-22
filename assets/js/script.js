// Initialize the scripts when the page loads
document.addEventListener('DOMContentLoaded', () => {

    // Promo Banner Functionality
    const promoBanner = document.querySelector('.promo-banner');
    const promoClose = document.querySelector('.promo-close');

    // Close promo banner
    promoClose.addEventListener('click', () => {
        promoBanner.style.display = 'none';
    });

    // Promo Dismissal after 5 seconds
    setTimeout(() => {
        promoBanner.style.display = 'none';
    }, 5000);


    // Navigation (OOP)
    new NavigationMenu();

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

    // Toggle main list
    document.querySelectorAll(".list-header").forEach(header => {
        header.addEventListener("click", function () {
            const list = this.nextElementSibling;
            const parentList = this.parentElement.parentElement;

            // Close other lists when one is opened (optional)
            const allSubLists = parentList.classList.contains('list') ? parentList.querySelectorAll(".sub-list") : null;

            if (allSubLists) {
                allSubLists.forEach(list => {
                    list.classList.remove("active");
                    list.previousElementSibling.classList.remove("active");
                });
                list.classList.toggle("active");
                this.classList.toggle("active");
            } else {
                if (window.innerWidth <= 500) {
                    // Remove active from all other lists
                    document.querySelectorAll('.service-list > .list').forEach(otherList => {
                        if (otherList !== list) {
                            otherList.classList.remove('active');
                            otherList.previousElementSibling.classList.remove('active');
                        }
                    });
                    // Only toggle on mobile or if not in main list
                    list.classList.toggle("active");
                    this.classList.toggle("active");
                    // // Remove active if on desktop
                    // updateServiceListActive();
                }
            }

            // list.classList.toggle("active");
            // this.classList.toggle("active");

        });
    });

    // Update service list active state based on screen width
    // Initial check
    updateServiceListActive();

    // Update on resize
    window.addEventListener('resize', updateServiceListActive);


    const swiper = new Swiper('.portfolioSwiper', {
        // Basic settings
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

        // Effects
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        // Responsive breakpoints
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
                effect: 'slide',
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
                effect: 'slide',
                centeredSlides: false,
            },
        },

        // Accessibility
        a11y: {
            prevSlideMessage: 'Previous project',
            nextSlideMessage: 'Next project',
            firstSlideMessage: 'This is the first project',
            lastSlideMessage: 'This is the last project',
        },

        // Keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        // Mouse wheel control
        mousewheel: {
            enabled: false,
        },

        // Touch gestures
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,

        // Performance
        watchSlidesProgress: true,
        lazy: {
            loadPrevNext: true,
        },

        // Speed and transitions
        speed: 800,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,

        // Events
        on: {
            init: function () {
                console.log('Portfolio showcase initialized');
                // Add loaded class for animations
                document.querySelector('.portfolio-showcase').classList.add('loaded');
            },
            slideChangeTransitionStart: function () {
                // Add smooth transition effects
                const slides = this.slides;
                slides.forEach((slide, index) => {
                    if (index === this.activeIndex) {
                        slide.style.transform = 'scale(1)';
                        slide.style.opacity = '1';
                    } else {
                        slide.style.transform = 'scale(0.95)';
                        slide.style.opacity = '0.7';
                    }
                });
            },
            transitionEnd: function () {
                // Reset transforms after transition
                const slides = this.slides;
                slides.forEach(slide => {
                    slide.style.transform = '';
                    slide.style.opacity = '';
                });
            },
        }
    });

    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Pause autoplay on hover
            swiper.autoplay.stop();

            // Add enhanced hover state
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            // Resume autoplay
            swiper.autoplay.start();

            // Reset hover state
            this.style.transform = '';
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe section elements
    const elementsToObserve = document.querySelectorAll('.section-header, .swiper-slide');
    elementsToObserve.forEach(el => observer.observe(el));

    // Service Details Modal
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close');

    const serviceDetails = {
        "brand-refresh": {
            title: 'Brand Refresh',
            description: 'Modernize your existing brand identity with updated logo design, color palette adjustments, and refreshed brand guidelines while keeping your brand essence intact.',
            features: [
                'Updated logo design',
                'Color palette adjustments',
                'Refreshed brand guidelines',
                'Business card redesign',
                'Social media asset refresh',
                'Brand essence preservation'
            ],
            timeline: '1-2 weeks',
            priceFrom: '₦2,400,000',
            priceTo: '₦4,800,000'
        },
        "website-revamp": {
            title: 'Website Revamp',
            description: 'A full redesign of your current website with improved UI/UX, mobile optimization, speed enhancements, and SEO upgrades for modern performance and aesthetics.',
            features: [
                'Complete UI/UX redesign',
                'Mobile optimization',
                'Speed enhancements',
                'SEO upgrades',
                'Content restructuring',
                '30 days of post-launch support'
            ],
            timeline: '2-4 weeks',
            priceFrom: '₦3,600,000',
            priceTo: '₦7,200,000'
        },
        "social-revamp": {
            title: 'Social Media Redesign',
            description: 'Revamp your social media profiles with new banners, refreshed content templates, and updated highlight covers for a consistent and attractive digital presence.',
            features: [
                'New profile banners',
                'Refreshed content templates',
                'Updated highlight covers',
                'Profile optimization',
                'Brand consistency across platforms',
                'Content strategy update'
            ],
            timeline: '1 week',
            priceFrom: '₦1,200,000',
            priceTo: '₦2,400,000'
        },
        "complete-revamp": {
            title: 'Complete Brand + Web Revamp',
            description: 'Total redesign of your brand identity and website for a fresh, modern look that aligns with your evolving vision—perfect for rebranding or relaunching your business.',
            features: [
                'Full brand identity redesign',
                'Complete website overhaul',
                'Integrated brand-website experience',
                'SEO and performance upgrades',
                'Social media asset refresh',
                '45 days of support'
            ],
            timeline: '3-5 weeks',
            priceFrom: '₦6,000,000',
            priceTo: '₦12,000,000'
        }
    };

    document.querySelectorAll('.view-service').forEach(button => {
        button.addEventListener('click', function () {
            console.log('Button clicked:', this);

            const serviceKey = this.getAttribute('data-service');
            const service = serviceDetails[serviceKey];

            if (service) {
                modalContent.innerHTML = `
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
    
                    <h3 style="color: var(--neutral-white);">What's Included:</h3>
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
                            <p style="color: var(--text-light); font-weight: 600;">
                                <span style="font-size: var(--font-size-sm);">Range: ${service.priceFrom} - ${service.priceTo}</span>
                            </p>
                        </div>
                    </div>
    
                    <div style="text-align: center;">
                        <a href="#contact" class="btn-primary btn btn-lg" style="width: 100%;">Book Package</a>
                    </div>
                `;
                modal.classList.add('active');
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active')
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active')
        }
    });

    const testimonials = [
        {
            text: "Launch Nest didn’t just build us a website. They gave us a business identity. Our sales tripled within 2 months. I finally feel like we are competing with the big players.",
            name: "Sophia Adams",
            role: "Founder, GreenEdge Organics",
            avatar: "SA"
        },
        {
            text: "We came to Launch Nest with nothing but an idea. Today, that idea is a thriving platform serving thousands of customers. Their team didn’t just deliver, they overdelivered.",
            name: "James Turner",
            role: "Co-Founder, EduLink Hub",
            avatar: "JT"
        },
        {
            text: "Professional. Bold. Unstoppable. Launch Nest pushed us to dream bigger and backed it up with flawless execution. If you want results, this is the team you call.",
            name: "Karen Hughes",
            role: "Managing Director, BrightPath Consulting",
            avatar: "KH"
        }
    ];

    let current = 0;
    const container = document.getElementById("testimonials-container");

    function renderTestimonial(index) {
        const t = testimonials[index];
        container.innerHTML = `
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.avatar}</div>
        <div class="author-info">
          <h4>${t.name}</h4>
          <p>${t.role}</p>
        </div>
      </div>
  `;
    }

    // Initial render
    renderTestimonial(current);

    // Auto switch
    setInterval(() => {
        current = (current + 1) % testimonials.length;
        renderTestimonial(current);
    }, 5000);
});





// // Contact Form
// document.getElementById('contactForm').addEventListener('submit', function (e) {
//     e.preventDefault();

//     // Get form data
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData);

//     // Simple form validation
//     if (!data.name || !data.email || !data.message) {
//         alert('Please fill in all required fields.');
//         return;
//     }

//     // Simulate form submission
//     alert('Thank you for your interest! We\'ll get back to you within 24 hours.');
//     this.reset();
// });

// // Animate elements on scroll
// const observerOptions = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
// };

// const observer = new IntersectionObserver(function (entries) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('fade-in', 'animate-in');
//         }
//     });
// }, observerOptions);

// // Observe all service cards and other animated elements
// document.querySelectorAll('.service-card, .testimonial-card, .about-stats, .contact-item').forEach(el => {
//     observer.observe(el);
// });

// // Mobile menu functionality
// const mobileMenu = document.querySelector('.mobile-menu');
// const navMenu = document.querySelector('.nav-menu');

// mobileMenu.addEventListener('click', function () {
//     navMenu.classList.toggle('active');
//     this.classList.toggle('active');
// });


// // Initialize Swiper with advanced configuration
// const swiper = new Swiper('.portfolioSwiper', {
//     // Basic settings
//     slidesPerView: 1,
//     spaceBetween: 30,
//     loop: true,
//     centeredSlides: true,
//     autoplay: {
//         delay: 5000,
//         disableOnInteraction: false,
//         pauseOnMouseEnter: true,
//     },

//     // Effects
//     effect: 'coverflow',
//     coverflowEffect: {
//         rotate: 0,
//         stretch: 0,
//         depth: 100,
//         modifier: 2,
//         slideShadows: false,
//     },

//     // Navigation
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },

//     // Pagination
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//         dynamicBullets: true,
//     },

//     // Responsive breakpoints
//     breakpoints: {
//         640: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//         },
//         768: {
//             slidesPerView: 2,
//             spaceBetween: 30,
//             effect: 'slide',
//             centeredSlides: false,
//         },
//         1024: {
//             slidesPerView: 3,
//             spaceBetween: 40,
//             effect: 'slide',
//             centeredSlides: false,
//         },
//     },

//     // Accessibility
//     a11y: {
//         prevSlideMessage: 'Previous project',
//         nextSlideMessage: 'Next project',
//         firstSlideMessage: 'This is the first project',
//         lastSlideMessage: 'This is the last project',
//     },

//     // Keyboard control
//     keyboard: {
//         enabled: true,
//         onlyInViewport: true,
//     },

//     // Mouse wheel control
//     mousewheel: {
//         enabled: false,
//     },

//     // Touch gestures
//     touchRatio: 1,
//     touchAngle: 45,
//     grabCursor: true,

//     // Performance
//     watchSlidesProgress: true,
//     lazy: {
//         loadPrevNext: true,
//     },

//     // Speed and transitions
//     speed: 800,
//     longSwipes: true,
//     longSwipesRatio: 0.5,
//     longSwipesMs: 300,

//     // Events
//     on: {
//         init: function () {
//             console.log('Portfolio showcase initialized');
//             // Add loaded class for animations
//             document.querySelector('.portfolio-showcase').classList.add('loaded');
//         },
//         slideChangeTransitionStart: function () {
//             // Add smooth transition effects
//             const slides = this.slides;
//             slides.forEach((slide, index) => {
//                 if (index === this.activeIndex) {
//                     slide.style.transform = 'scale(1)';
//                     slide.style.opacity = '1';
//                 } else {
//                     slide.style.transform = 'scale(0.95)';
//                     slide.style.opacity = '0.7';
//                 }
//             });
//         },
//         transitionEnd: function () {
//             // Reset transforms after transition
//             const slides = this.slides;
//             slides.forEach(slide => {
//                 slide.style.transform = '';
//                 slide.style.opacity = '';
//             });
//         },
//     }
// });

// // Enhanced hover effects for project cards
// const projectCards = document.querySelectorAll('.project-card');
// projectCards.forEach(card => {
//     card.addEventListener('mouseenter', function () {
//         // Pause autoplay on hover
//         swiper.autoplay.stop();

//         // Add enhanced hover state
//         this.style.transform = 'translateY(-15px) scale(1.02)';
//     });

//     card.addEventListener('mouseleave', function () {
//         // Resume autoplay
//         swiper.autoplay.start();

//         // Reset hover state
//         this.style.transform = '';
//     });
// });

// Intersection Observer for scroll animations
// const observerOptions = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
// };

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('animate-in');
//         }
//     });
// }, observerOptions);

// Observe section elements
// const elementsToObserve = document.querySelectorAll('.section-header, .swiper-slide');
// elementsToObserve.forEach(el => observer.observe(el));

// // Performance optimization: Lazy load background images
// const lazyBackgrounds = document.querySelectorAll('[data-bg]');
// const bgObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const bg = entry.target.getAttribute('data-bg');
//             entry.target.style.backgroundImage = `url(${bg})`;
//             entry.target.removeAttribute('data-bg');
//             bgObserver.unobserve(entry.target);
//         }
//     });
// });

// lazyBackgrounds.forEach(bg => bgObserver.observe(bg));

// // Add smooth scroll behavior for CTA buttons
// document.querySelectorAll('.cta-button').forEach(button => {
//     button.addEventListener('click', function (e) {
//         e.preventDefault();
//         // Add click animation
//         this.style.transform = 'scale(0.95)';
//         setTimeout(() => {
//             this.style.transform = '';
//             // Here you would typically navigate to the project page
//             console.log('Navigating to project:', this.closest('.project-card').querySelector('.project-title').textContent);
//         }, 150);
//     });
// });



// Functions and Classes

// Navigation Menu
class NavigationMenu {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section, .hero');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();

        // console.log('Navigation menu initialized');
        // console.log(this.navLinks, this.sections, this.mobileMenu, this.navMenu);


    }

    init() {
        this.setupScrollSpy();
        this.setupSmoothScroll();
        this.setupMobileMenu();
        this.setupCloseOnLink();
    }

    setupScrollSpy() {
        window.addEventListener('scroll', () => this.updateActiveNav());
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        if (this.mobileMenu && this.navMenu) {
            this.mobileMenu.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.mobileMenu.classList.toggle('active');
            });
        }
    }

    setupCloseOnLink() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navMenu && this.mobileMenu) {
                    this.navMenu.classList.remove('active');
                    this.mobileMenu.classList.remove('active');
                }
            });
        });
    }

    updateActiveNav() {
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            // console.log(sectionTop);

            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
                // console.log(current);

            }
        });
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Update service list active state based on screen width
function updateServiceListActive() {
    const serviceLists = document.querySelectorAll('.service-list > .list');
    if (window.innerWidth > 500) {
        serviceLists.forEach(list => list.classList.add('active'));
    } else {
        serviceLists.forEach(list => list.classList.remove('active'));
    }
}

// Hero Section Slides
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.autoPlayInterval = null;
        this.autoPlayDuration = 4000;

        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoPlay();
    }

    bindEvents() {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Pause auto-play on hover
        const heroContainer = document.querySelector('.hero-container');
        heroContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        heroContainer.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch events for mobile
        let startX = 0;
        let endX = 0;

        heroContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        heroContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
            this.resetAutoPlay();
        }
    }

    goToSlide(slideIndex) {
        if (slideIndex === this.currentSlide) return;

        // Animate out current slide
        const currentContent = document.querySelector(`[data-slide="${this.currentSlide}"].slide-content`);
        const currentImage = document.querySelector(`[data-slide="${this.currentSlide}"].image-slide`);

        currentContent.classList.add('exit-up');
        currentImage.classList.add('exit-left');

        // Update navigation
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });

        // Animate in new slide after a short delay
        setTimeout(() => {
            // Hide old slide
            currentContent.classList.remove('active', 'exit-up');
            currentImage.classList.remove('active', 'exit-left');

            // Show new slide
            const newContent = document.querySelector(`[data-slide="${slideIndex}"].slide-content`);
            const newImage = document.querySelector(`[data-slide="${slideIndex}"].image-slide`);

            newContent.classList.add('active');
            newImage.classList.add('active');

            this.currentSlide = slideIndex;
        }, 100);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDuration);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}
