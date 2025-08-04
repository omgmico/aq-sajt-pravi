// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
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

    // Add scroll effect to header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add animation on scroll for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.hero, .guidance-section, .solutions-section, .testimonial-section');
    sections.forEach(section => {
        observer.observe(section);
    });

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

    // Business Journey Animation
    function initJourneyAnimation() {
        const steps = document.querySelectorAll('.timeline-step');
        const progressFill = document.getElementById('journeyProgress');
        let currentStep = 0;
        const stepDuration = 2000; // 2 seconds per step

        function animateStep(stepIndex) {
            if (stepIndex < steps.length) {
                // Remove active class from all steps
                steps.forEach(step => step.classList.remove('active'));
                
                // Add active class to current step
                steps[stepIndex].classList.add('active');
                
                // Update progress bar
                const progressPercent = ((stepIndex + 1) / steps.length) * 100;
                progressFill.style.width = progressPercent + '%';
                
                currentStep = stepIndex;
            }
        }

        function startJourneyAnimation() {
            let stepIndex = 0;
            
            // Initial animation
            animateStep(stepIndex);
            
            // Set interval for automatic progression
            const interval = setInterval(() => {
                stepIndex++;
                if (stepIndex >= steps.length) {
                    stepIndex = 0; // Reset to beginning
                }
                animateStep(stepIndex);
            }, stepDuration);

            // Pause animation on hover
            const journeySection = document.querySelector('.business-journey-section');
            journeySection.addEventListener('mouseenter', () => {
                clearInterval(interval);
            });

            journeySection.addEventListener('mouseleave', () => {
                // Restart animation after mouse leaves
                setTimeout(() => {
                    startJourneyAnimation();
                }, 500);
            });
        }

        // Start animation when section is visible
        const journeySection = document.querySelector('.business-journey-section');
        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startJourneyAnimation();
                    journeyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        if (journeySection) {
            journeyObserver.observe(journeySection);
        }

        // Click handlers for manual step navigation
        steps.forEach((step, index) => {
            step.addEventListener('click', () => {
                animateStep(index);
            });
        });
    }

    // Initialize journey animation
    initJourneyAnimation();

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

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .hero, .guidance-section, .solutions-section, .testimonial-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
