// SaaviGen.AI Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initCTAButtons();
    initScrollEffects();
    initInteractiveEffects();
    initLazyAnimations();
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Add active class to current section
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('nav__link--active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('nav__link--active');
                }
            }
        });
    }
    
    // Header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
    
    window.addEventListener('scroll', debounce(() => {
        updateActiveNav();
        handleHeaderScroll();
    }, 10));
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('nav__menu--open');
            navToggle.classList.toggle('nav__toggle--open');
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav__menu--open');
                navToggle.classList.remove('nav__toggle--open');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('nav__menu--open');
                navToggle.classList.remove('nav__toggle--open');
                document.body.classList.remove('nav-open');
            }
        });
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                scrollToSection(targetId);
            }
        });
    });
}

// Scroll to section helper
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Clear any existing form errors on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('form-control--error');
                // Remove any error messages
                const errorMsg = this.parentNode.querySelector('.form-error');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearFormErrors();
            
            // Get form data
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const organizationInput = contactForm.querySelector('#organization');
            const messageInput = contactForm.querySelector('#message');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const organization = organizationInput.value.trim();
            const message = messageInput.value.trim();
            
            // Validate form
            if (!validateForm(name, email, message, nameInput, emailInput, messageInput)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (in real implementation, this would send to a server)
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Clear form errors
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(error => error.remove());
    
    const errorInputs = document.querySelectorAll('.form-control--error');
    errorInputs.forEach(input => input.classList.remove('form-control--error'));
}

// Form validation
function validateForm(name, email, message, nameInput, emailInput, messageInput) {
    let isValid = true;
    
    // Validate name
    if (!name || name.length < 2) {
        showFieldError(nameInput, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showFieldError(emailInput, 'Please enter an email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.length < 10) {
        showFieldError(messageInput, 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification('Please fix the errors below and try again.', 'error');
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldElement, message) {
    fieldElement.classList.add('form-control--error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
    `;
    
    fieldElement.parentNode.appendChild(errorElement);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// CTA button functionality
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            
            if (action === 'training') {
                handleTrainingRequest();
            } else if (action === 'compliance') {
                handleComplianceRequest();
            }
        });
    });
}

// Handle training request
function handleTrainingRequest() {
    // Pre-fill contact form and scroll to it
    const messageField = document.getElementById('message');
    
    if (messageField) {
        messageField.value = 'I am interested in your Corporate Training programs. Please provide more information about your training offerings and how they can help our organization.';
    }
    
    // Scroll to contact section
    setTimeout(() => {
        scrollToSection('contact');
        
        // Focus on the name field after scrolling
        setTimeout(() => {
            const nameField = document.getElementById('name');
            if (nameField) {
                nameField.focus();
            }
        }, 500);
    }, 100);
    
    showNotification('Please fill out the form below to request corporate training information.', 'info');
}

// Handle compliance request
function handleComplianceRequest() {
    // Pre-fill contact form and scroll to it
    const messageField = document.getElementById('message');
    
    if (messageField) {
        messageField.value = 'I am interested in your Compliance Readiness Assessment. Please provide more information about your compliance services and assessment process.';
    }
    
    // Scroll to contact section
    setTimeout(() => {
        scrollToSection('contact');
        
        // Focus on the name field after scrolling
        setTimeout(() => {
            const nameField = document.getElementById('name');
            if (nameField) {
                nameField.focus();
            }
        }, 500);
    }, 100);
    
    showNotification('Please fill out the form below to request a compliance readiness assessment.', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 16px 20px;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-family: Inter, var(--font-family-base);
        font-size: 14px;
        line-height: 1.5;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        white-space: pre-line;
    `;
    
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 12px;
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    notification.appendChild(closeBtn);
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

// Get notification color based on type
function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    return colors[type] || colors.info;
}

// Hide notification
function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .about__card,
        .service-category,
        .feature-card,
        .use-case-card,
        .testimonial-card
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    addAnimationStyles();
}

// Add animation and utility styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .about__card,
        .service-category,
        .feature-card,
        .use-case-card,
        .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .header--scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav__link--active {
            color: var(--color-primary) !important;
        }
        
        .nav__link--active::after {
            width: 100% !important;
        }
        
        body.nav-open {
            overflow: hidden;
        }
        
        .form-control--error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        .form-error {
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-4);
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .nav__menu {
                position: fixed !important;
                top: 100% !important;
                left: 0 !important;
                right: 0 !important;
                background: var(--color-surface) !important;
                border-top: 1px solid var(--color-border) !important;
                transform: translateY(-100%) !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.3s ease !important;
                z-index: 999 !important;
            }
            
            .nav__menu--open {
                transform: translateY(0) !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            .nav__list {
                flex-direction: column !important;
                padding: 24px !important;
                gap: 16px !important;
            }
            
            .nav__toggle {
                display: flex !important;
            }
            
            .nav__toggle--open span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav__toggle--open span:nth-child(2) {
                opacity: 0;
            }
            
            .nav__toggle--open span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add interactive hover effects
function initInteractiveEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Performance optimization: Lazy load animations
function initLazyAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.animationPlayState = 'running';
                animationObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.ai-brain, .neural-network');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        animationObserver.observe(el);
    });
}

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('nav__menu--open')) {
            navMenu.classList.remove('nav__menu--open');
            navToggle.classList.remove('nav__toggle--open');
            document.body.classList.remove('nav-open');
        }
    }
});

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}