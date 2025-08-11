// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize the page
    console.log('AQ Accounting website loaded successfully');

    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            switch(buttonText) {
                case 'Besplatna Konsultacija':
                    alert('Kontakt forma za besplatnu konsultaciju će se otvoriti ovde');
                    break;
                case 'Zakažite Razgovor':
                    alert('Kalendar za zakazivanje razgovora će se otvoriti ovde');
                    break;
                case 'Počnite Danas':
                    alert('Forma za početak saradnje će se otvoriti ovde');
                    break;
                default:
                    alert('Akcija: ' + buttonText);
            }
        });
    });

    // Business Journey Scroll-Based Animation with Scroll Lock
    function initJourneyAnimation() {
        const steps = document.querySelectorAll('.timeline-step');
        const progressFill = document.getElementById('journeyProgress');
        const journeySection = document.querySelector('.business-journey-section');
        let currentStep = -1; // Start from -1 so first activation becomes step 0
        let journeyCompleted = false;
        let isScrollLocked = false;
        let scrollAccumulator = 0;
        const scrollThreshold = 100; // Amount of scroll needed to advance to next step

        function animateStep(stepIndex) {
            if (stepIndex < steps.length && stepIndex !== currentStep && stepIndex >= 0) {
                console.log(`Animating step from ${currentStep} to ${stepIndex}`);
                
                // Remove active class from all steps
                steps.forEach(step => step.classList.remove('active'));
                
                // Add active class to current step
                steps[stepIndex].classList.add('active');
                
                // Update progress bar
                const progressPercent = ((stepIndex + 1) / steps.length) * 100;
                progressFill.style.width = progressPercent + '%';
                
                currentStep = stepIndex;
                
                // Check if journey is completed
                if (stepIndex === steps.length - 1) {
                    console.log('Journey completed!');
                    journeyCompleted = true;
                    setTimeout(() => {
                        isScrollLocked = false;
                        console.log('Scroll unlocked');
                    }, 500); // Small delay before unlocking scroll
                }
            }
        }

        function handleJourneyScroll(event) {
            if (!journeySection) return;
            
            const rect = journeySection.getBoundingClientRect();
            
            // Check if we're in the journey section
            if (rect.top <= 100 && rect.bottom >= window.innerHeight - 100) {
                if (!journeyCompleted) {
                    event.preventDefault();
                    isScrollLocked = true;
                    
                    // Accumulate scroll delta
                    scrollAccumulator += Math.abs(event.deltaY);
                    
                    // Check if we've scrolled enough to advance to next step
                    if (scrollAccumulator >= scrollThreshold && currentStep < steps.length - 1) {
                        const nextStep = currentStep + 1; // Simply increment by 1
                        animateStep(nextStep);
                        scrollAccumulator = 0; // Reset accumulator
                    }
                }
            } else {
                // Reset when leaving the section
                if (rect.bottom < window.innerHeight - 100) {
                    journeyCompleted = false;
                    currentStep = -1; // Start from -1 so first step becomes 0
                    scrollAccumulator = 0;
                    // Remove active class from all steps when leaving
                    steps.forEach(step => step.classList.remove('active'));
                    if (progressFill) progressFill.style.width = '0%';
                }
            }
        }

        function updateJourneyOnScroll() {
            if (!journeySection) return;
            
            const rect = journeySection.getBoundingClientRect();
            
            // Initialize first step when section comes into view
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                if (currentStep === -1) {
                    animateStep(0); // Activate first step
                }
            }
        }

        // Add wheel event listener for scroll locking
        window.addEventListener('wheel', handleJourneyScroll, { passive: false });
        
        // Add regular scroll listener for section detection
        window.addEventListener('scroll', updateJourneyOnScroll);
        
        // Initial update
        updateJourneyOnScroll();

        // Click handlers for manual step navigation
        steps.forEach((step, index) => {
            step.addEventListener('click', () => {
                animateStep(index);
            });
        });

        // Keyboard navigation (optional)
        window.addEventListener('keydown', (event) => {
            if (isScrollLocked) {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextStep = Math.min(currentStep + 1, steps.length - 1);
                    animateStep(nextStep);
                    scrollAccumulator = 0;
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    const prevStep = Math.max(currentStep - 1, 0);
                    animateStep(prevStep);
                    scrollAccumulator = 0;
                }
            }
        });
    }

    // Initialize journey animation
    initJourneyAnimation();
    
    // Mobile Journey Step Highlighting
    function initMobileJourneyHighlighting() {
        // Only run on mobile devices
        if (window.innerWidth <= 768) {
            const steps = document.querySelectorAll('.timeline-step');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remove mobile-active class from all steps
                        steps.forEach(step => step.classList.remove('mobile-active'));
                        
                        // Add mobile-active class to the step in view
                        entry.target.classList.add('mobile-active');
                    }
                });
            }, {
                threshold: 0.6, // Trigger when 60% of the step is visible
                rootMargin: '-20% 0px -20% 0px' // Trigger when step is centered
            });
            
            steps.forEach(step => {
                observer.observe(step);
            });
        }
    }
    
    // Initialize mobile highlighting
    initMobileJourneyHighlighting();
    
    // Re-initialize on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            initMobileJourneyHighlighting();
        }
    });

    // Scroll to contact function
    window.scrollToContact = function() {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.service) {
                alert('Molimo popunite sva obavezna polja.');
                return;
            }
            
            // Simulate form submission
            alert(`Hvala vam ${formData.name}! Vaš upit je poslat. Kontaktiraćemo vas uskoro na ${formData.email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scroll for contact link
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// End of script
