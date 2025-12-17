// Ubuntu Style Website Template - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('UbuntuWeb Template loaded successfully!');
    
    // Initialize all components
    initMobileNavigation();
    initAnimatedCounters();
    initToastNotification();
    initFormInteractions();
    initComponentInteractions();
    initSmoothScrolling();
    
    // Add Ubuntu terminal typing effect
    initTerminalEffect();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Animated Counters for Stats
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-count'));
                const duration = 1500; // ms
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        // For decimal numbers (like 4.8)
                        if (target % 1 !== 0) {
                            counter.textContent = current.toFixed(1);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (target % 1 !== 0) {
                            counter.textContent = target.toFixed(1);
                        } else {
                            counter.textContent = target;
                        }
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Toast Notification
function initToastNotification() {
    const toast = document.getElementById('demoToast');
    const toastClose = document.getElementById('toastClose');
    
    if (!toast || !toastClose) return;
    
    // Show toast after 1 second
    setTimeout(() => {
        toast.classList.add('show');
    }, 1000);
    
    // Close toast button
    toastClose.addEventListener('click', function() {
        toast.classList.remove('show');
    });
    
    // Auto-hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Form Interactions
function initFormInteractions() {
    // Form validation example
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!email) {
                showFormMessage('Please enter your email address.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showFormMessage('Thank you for subscribing!', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Other form interactions
    document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Form validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message alert alert-${type}`;
    messageEl.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to form
    const form = document.querySelector('.newsletter-form');
    form.parentNode.insertBefore(messageEl, form.nextSibling);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 5000);
}

// Component Interactions
function initComponentInteractions() {
    // Button click effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Demo buttons interaction
    document.querySelectorAll('.component-demo .btn').forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent.trim();
            showDemoAlert(`You clicked: "${text}"`);
        });
    });
    
    // Option buttons interaction
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// Show demo alert
function showDemoAlert(message) {
    // Create alert
    const alert = document.createElement('div');
    alert.className = 'alert alert-info demo-alert';
    alert.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
        <button class="alert-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to body
    document.body.appendChild(alert);
    
    // Close button
    alert.querySelector('.alert-close').addEventListener('click', function() {
        alert.remove();
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) alert.remove();
    }, 3000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Terminal Typing Effect
function initTerminalEffect() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    if (!terminalLines.length) return;
    
    // Add typing animation to commands
    terminalLines.forEach((line, index) => {
        const command = line.querySelector('.command');
        if (command) {
            const text = command.textContent;
            command.textContent = '';
            command.style.display = 'inline-block';
            
            setTimeout(() => {
                typeText(command, text, 50, () => {
                    // After typing, show output on next line
                    const nextLine = terminalLines[index + 1];
                    if (nextLine && nextLine.querySelector('.output')) {
                        setTimeout(() => {
                            nextLine.style.opacity = '1';
                        }, 300);
                    }
                });
            }, index * 1000);
        }
    });
}

// Type text animation
function typeText(element, text, speed, callback) {
    let i = 0;
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    }
    
    type();
}

// Add CSS for demo alerts
const demoAlertStyle = document.createElement('style');
demoAlertStyle.textContent = `
    .demo-alert {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1002;
        max-width: 400px;
        animation: slideInUp 0.3s ease;
    }
    
    .alert-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        margin-left: auto;
        padding: 4px;
        border-radius: 4px;
    }
    
    .alert-close:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    
    @keyframes slideInUp {
        from {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(demoAlertStyle);

// Initialize page animations
window.addEventListener('load', function() {
    // Add fade-in animation to elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .component-section, .stat-card');
    
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
});