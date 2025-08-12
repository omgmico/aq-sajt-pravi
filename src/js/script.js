// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', function() {
        const isExpanded = mobileMenu.classList.contains('active');
        
        if (!isExpanded) {
            mobileMenu.classList.add('active');
            document.body.classList.add('no-scroll');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            
            // Focus first menu item for keyboard navigation
            const firstMenuItem = mobileMenu.querySelector('a');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
        } else {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.focus();
        }
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.focus();
    });

    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.focus();
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.focus();
        }
    });

    // Parallax stacking effect for sections
    function initParallaxStacking() {
        // Disable on small screens or reduced motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (window.innerWidth <= 768 || prefersReduced) return;
        const stackSections = document.querySelectorAll('.stack-section:not(.first)'); // Exclude first section
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20% 0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                const ratio = entry.intersectionRatio;
                
                if (entry.isIntersecting) {
                    // Suptilan parallax efekat na osnovu scroll pozicije
                    const transform = `translateY(${(1 - ratio) * 5}px) scale(${0.98 + ratio * 0.02})`;
                    const opacity = 0.85 + ratio * 0.15;
                    
                    section.style.transform = transform;
                    section.style.opacity = opacity;
                    
                    // bez dodatnih senki na mobilnom
                } else {
                    // Reset transformacije kada sekcija nije vidljiva
                    section.style.transform = '';
                    section.style.opacity = '';
                    section.style.boxShadow = '';
                }
            });
        }, observerOptions);

        stackSections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize parallax stacking
    initParallaxStacking();

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
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth <= 768;
        // On mobile or reduced motion, replace scroll lock with simple highlight behavior
        if (isMobile || prefersReduced) {
            // Simple active state on intersection (mobile already handled below)
            return; // Skip heavy scroll-lock logic entirely
        }
        const steps = document.querySelectorAll('.timeline-step');
        const progressFill = document.getElementById('journeyProgress');
        const journeySection = document.querySelector('.business-journey-section');
        let currentStep = -1; // Start from -1 so first activation becomes step 0
        let journeyCompleted = false;
        let journeyPermanentlyCompleted = false; // NEW: Track permanent completion
        let isScrollLocked = false;
        let scrollAccumulator = 0;
        const scrollThreshold = 30; // Lower threshold for easier triggering
        let isProcessingStep = false; // Prevent rapid step changes
        let lastScrollTime = 0;
        const scrollCooldown = 800; // INCREASED: Minimum time between step changes (ms)
        let stepLockTimeout = null; // Timeout for forced step lock

        function animateStep(stepIndex) {
            if (stepIndex < steps.length && stepIndex !== currentStep && stepIndex >= 0 && !isProcessingStep && !journeyPermanentlyCompleted) {
                isProcessingStep = true;
                console.log(`Animating step from ${currentStep} to ${stepIndex}`);
                
                // Remove active class from all steps
                steps.forEach(step => step.classList.remove('active'));
                
                // Add active class to current step
                steps[stepIndex].classList.add('active');
                
                // Update progress bar
                const progressPercent = ((stepIndex + 1) / steps.length) * 100;
                progressFill.style.width = progressPercent + '%';
                
                currentStep = stepIndex;
                
                // Check if journey is completed (reached final step)
                if (stepIndex === steps.length - 1) {
                    console.log('Journey PERMANENTLY completed!');
                    journeyCompleted = true;
                    journeyPermanentlyCompleted = true; // PERMANENT completion
                    
                    // Delay unlock by 0.5s before disabling all future interactions
                    setTimeout(() => {
                        isScrollLocked = false;
                        console.log('Scroll unlocked after 0.5s delay - journey permanently done');
                    }, 500);
                    
                    // Keep step 5 active and progress bar full FOREVER
                    steps[stepIndex].classList.add('active');
                    progressFill.style.width = '100%';
                    
                    return; // Exit early, no more processing needed
                }
                
                // FORCED LOCK: Release processing lock after longer delay (only if not permanently completed)
                clearTimeout(stepLockTimeout);
                stepLockTimeout = setTimeout(() => {
                    isProcessingStep = false;
                    console.log('Step lock released');
                }, scrollCooldown);
            }
        }

        function handleJourneyScroll(event) {
            if (!journeySection) return;
            
            const rect = journeySection.getBoundingClientRect();
            const currentTime = Date.now();
            
            // Check if we're in the journey section
            if (rect.top <= 100 && rect.bottom >= window.innerHeight - 100) {
                // If permanently completed, don't process any more scrolls
                if (journeyPermanentlyCompleted) {
                    return; // Journey is done forever, ignore all scrolls
                }
                
                if (!journeyCompleted) {
                    event.preventDefault();
                    isScrollLocked = true;
                    
                    // STRICT COOLDOWN: Check cooldown period - NO EXCEPTIONS
                    if (currentTime - lastScrollTime < scrollCooldown || isProcessingStep) {
                        console.log('Scroll blocked - cooldown active or processing step');
                        return; // Blocked - must wait
                    }
                    
                    // Only accumulate positive scroll (downward) with REDUCED sensitivity
                    if (event.deltaY > 0) {
                        scrollAccumulator += Math.min(event.deltaY, 20); // Cap scroll delta to prevent fast scrolling
                    }
                    
                    // Check if we've scrolled enough to advance to ONLY next step
                    if (scrollAccumulator >= scrollThreshold && currentStep < steps.length - 1) {
                        const nextStep = currentStep + 1; // Only increment by 1, never skip
                        console.log(`Advancing from step ${currentStep} to ${nextStep}`);
                        animateStep(nextStep);
                        scrollAccumulator = 0; // Reset accumulator
                        lastScrollTime = currentTime; // Update last scroll time
                    }
                }
            } else {
                // DON'T RESET if permanently completed
                if (!journeyPermanentlyCompleted && rect.bottom < window.innerHeight - 100) {
                    // Only reset if journey hasn't been permanently completed
                    journeyCompleted = false;
                    currentStep = -1; // Start from -1 so first step becomes 0
                    scrollAccumulator = 0;
                    isProcessingStep = false;
                    lastScrollTime = 0;
                    clearTimeout(stepLockTimeout);
                    // Remove active class from all steps when leaving
                    steps.forEach(step => step.classList.remove('active'));
                    if (progressFill) progressFill.style.width = '0%';
                }
            }
        }

        function updateJourneyOnScroll() {
            if (!journeySection) return;
            
            const rect = journeySection.getBoundingClientRect();
            
            // If permanently completed, keep final state
            if (journeyPermanentlyCompleted) {
                // Ensure step 5 stays active and progress bar stays full
                steps.forEach(step => step.classList.remove('active'));
                steps[steps.length - 1].classList.add('active'); // Keep last step active
                if (progressFill) progressFill.style.width = '100%';
                return; // Don't initialize anything new
            }
            
            // Initialize first step when section comes into view (only if not permanently completed)
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
                // If permanently completed, don't allow manual navigation
                if (journeyPermanentlyCompleted) {
                    console.log('Manual navigation blocked - journey permanently completed');
                    return;
                }
                animateStep(index);
            });
        });

        // Keyboard navigation (optional)
        window.addEventListener('keydown', (event) => {
            // If permanently completed, ignore all keyboard navigation
            if (journeyPermanentlyCompleted) {
                return; // Journey is done forever
            }
            
            if (isScrollLocked) {
                const currentTime = Date.now();
                
                // STRICT COOLDOWN for keyboard too
                if (currentTime - lastScrollTime < scrollCooldown || isProcessingStep) {
                    console.log('Keyboard navigation blocked - cooldown active');
                    return; // Blocked - must wait
                }
                
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextStep = Math.min(currentStep + 1, steps.length - 1);
                    if (nextStep > currentStep) { // Only if we can actually advance
                        console.log(`Keyboard advancing from step ${currentStep} to ${nextStep}`);
                        animateStep(nextStep);
                        scrollAccumulator = 0;
                        lastScrollTime = currentTime;
                    }
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    // Allow going back but with same restrictions
                    if (currentTime - lastScrollTime < scrollCooldown / 2 || isProcessingStep) {
                        return; // Even going back has some cooldown
                    }
                    
                    const prevStep = Math.max(currentStep - 1, 0);
                    if (prevStep < currentStep) { // Only if we can actually go back
                        console.log(`Keyboard going back from step ${currentStep} to ${prevStep}`);
                        isProcessingStep = true;
                        currentStep = prevStep;
                        steps.forEach(step => step.classList.remove('active'));
                        steps[prevStep].classList.add('active');
                        const progressPercent = ((prevStep + 1) / steps.length) * 100;
                        progressFill.style.width = progressPercent + '%';
                        scrollAccumulator = 0;
                        lastScrollTime = currentTime;
                        
                        // Release lock for going back
                        clearTimeout(stepLockTimeout);
                        stepLockTimeout = setTimeout(() => {
                            isProcessingStep = false;
                        }, scrollCooldown / 2);
                    }
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
