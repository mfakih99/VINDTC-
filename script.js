// VinDetect.ai Interactive Features
class VinDetectApp {
    constructor() {
        this.init();
    }

    init() {
        this.initAOS();
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initNavigationHighlight();
        this.initCharts();
        this.initFormHandling();
        this.initAnimations();
        this.initParallax();
        this.initVINInteractivity();
        this.initFAQ();
    }

    initAOS() {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                    mobileMenu.classList.toggle('animate-fade-in');
                }
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initNavigationHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        const highlightNav = () => {
            let current = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-indigo-600', 'border-b-2', 'border-indigo-600');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('text-indigo-600', 'border-b-2', 'border-indigo-600');
                }
            });
        };

        window.addEventListener('scroll', this.throttle(highlightNav, 100));
    }

    initCharts() {
        this.createAccuracyChart();
        this.createFraudTypesChart();
        this.createTimelineChart();
    }

    createAccuracyChart() {
        const ctx = document.getElementById('accuracyChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ghost VINs', 'Cloned VINs', 'Tampered VINs', 'Synthetic VINs', 'Overall'],
                datasets: [{
                    label: 'Detection Accuracy (%)',
                    data: [99.2, 98.8, 97.9, 99.5, 98.7],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(240, 147, 251, 0.8)',
                        'rgba(79, 172, 254, 0.8)',
                        'rgba(67, 233, 123, 0.8)'
                    ],
                    borderColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#4facfe',
                        '#43e97b'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `Accuracy: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            color: '#6b7280'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    createFraudTypesChart() {
        const ctx = document.getElementById('fraudTypesChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Ghost VINs', 'Cloned VINs', 'Tampered VINs', 'Other'],
                datasets: [{
                    data: [35, 28, 22, 15],
                    backgroundColor: [
                        '#ef4444',
                        '#f97316',
                        '#8b5cf6',
                        '#6b7280'
                    ],
                    borderWidth: 0,
                    cutout: '60%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            color: '#6b7280'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    createTimelineChart() {
        const ctx = document.getElementById('timelineChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: 'VIN Fraud Cases (thousands)',
                    data: [45, 52, 61, 73, 89, 95],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                        },
                        ticks: {
                            color: '#6b7280',
                            callback: function(value) {
                                return value + 'K';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    initFormHandling() {
        const contactForm = document.querySelector('#contact-form');
        if (!contactForm) return;

        // Enhanced form validation
        const validateField = (field) => {
            const value = field.value.trim();
            const errorElement = field.parentElement.querySelector('.error-message');
            let isValid = true;
            let errorMessage = '';

            // Clear previous errors
            field.classList.remove('border-red-500', 'border-green-500');
            errorElement.classList.add('hidden');

            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = `${field.labels[0].textContent.replace('*', '').trim()} is required`;
            } else if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            } else if (field.type === 'tel' && value) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            }

            if (!isValid) {
                field.classList.add('border-red-500');
                errorElement.textContent = errorMessage;
                errorElement.classList.remove('hidden');
            } else if (value) {
                field.classList.add('border-green-500');
            }

            return isValid;
        };

        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('border-red-500')) {
                    validateField(field);
                }
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            const fields = contactForm.querySelectorAll('input[required], textarea[required]');
            let isFormValid = true;
            
            fields.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                this.showFormStatus('Please correct the errors above', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const loadingSpinner = submitBtn.querySelector('.loading-spinner');
            
            // Show loading state
            submitText.textContent = 'Sending...';
            loadingSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75');

            try {
                // Simulate form submission with realistic delay
                await this.delay(2000 + Math.random() * 1000);
                
                // Simulate success/failure (90% success rate for demo)
                if (Math.random() > 0.1) {
                    this.showFormStatus('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                    
                    // Clear validation states
                    contactForm.querySelectorAll('input, textarea').forEach(field => {
                        field.classList.remove('border-red-500', 'border-green-500');
                    });
                } else {
                    throw new Error('Network error');
                }
                
            } catch (error) {
                this.showFormStatus('Failed to send message. Please try again or contact us directly.', 'error');
            } finally {
                submitText.textContent = 'Send Message';
                loadingSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75');
            }
        });
    }

    showFormStatus(message, type) {
        const statusElement = document.getElementById('form-status');
        if (!statusElement) return;

        statusElement.classList.remove('hidden', 'bg-green-100', 'bg-red-100', 'text-green-800', 'text-red-800');
        
        if (type === 'success') {
            statusElement.classList.add('bg-green-100', 'text-green-800');
            statusElement.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
        } else {
            statusElement.classList.add('bg-red-100', 'text-red-800');
            statusElement.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${message}`;
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusElement.classList.add('hidden');
        }, 5000);
    }

    initAnimations() {
        // Counter animations for statistics
        this.animateCounters();
        
        // Parallax effect for hero section
        this.initParallaxHero();
        
        // Intersection observer for animations
        this.initIntersectionObserver();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-card .text-4xl');
        
        const animateCounter = (element, target, duration = 2000) => {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    if (number) {
                        animateCounter(entry.target, number);
                    }
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    initParallaxHero() {
        const hero = document.querySelector('#hero');
        if (!hero) return;

        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, 10));
    }

    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .stat-card').forEach(el => {
            observer.observe(el);
        });
    }

    initParallax() {
        // Simple parallax effect for background elements
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 10));
    }

    initVINInteractivity() {
        this.initVINValidator();
        this.initVINStructureHighlight();
        this.addVINExamples();
    }

    initVINValidator() {
        // Create a VIN validation demo
        const vinInput = document.createElement('div');
        vinInput.innerHTML = `
            <div class="mt-8 bg-white rounded-xl p-6 shadow-lg" data-aos="fade-up" data-aos-delay="600">
                <h4 class="text-xl font-semibold text-gray-900 mb-4 text-center">
                    <i class="fas fa-search text-blue-600 mr-2"></i>Try VIN Validation
                </h4>
                <div class="max-w-md mx-auto">
                    <input 
                        type="text" 
                        id="vinTestInput" 
                        maxlength="17" 
                        placeholder="Enter a 17-character VIN" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <button 
                        id="validateVin" 
                        class="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        Validate VIN
                    </button>
                    <div id="vinResult" class="mt-4 p-4 rounded-lg hidden"></div>
                </div>
            </div>
        `;
        
        const vinSection = document.querySelector('section:has(h2:contains("Understanding VIN Structure"))');
        if (vinSection) {
            vinSection.querySelector('.max-w-7xl').appendChild(vinInput);
        }

        // Add event listeners
        const input = document.getElementById('vinTestInput');
        const button = document.getElementById('validateVin');
        const result = document.getElementById('vinResult');

        if (input && button && result) {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            });

            button.addEventListener('click', () => {
                const vin = input.value;
                this.validateVIN(vin, result);
            });
        }
    }

    validateVIN(vin, resultElement) {
        if (!vin || vin.length !== 17) {
            this.showVINResult(resultElement, 'error', 'VIN must be exactly 17 characters');
            return;
        }

        // Check for invalid characters
        if (vin.includes('I') || vin.includes('O') || vin.includes('Q')) {
            this.showVINResult(resultElement, 'error', 'VIN contains invalid characters (I, O, Q)');
            return;
        }

        // Check if it's a known example VIN
        const exampleVINs = ['1HGBH41JXMN109186', '2HGFA1F51AH123456', '3GNDA13D76S123456'];
        if (exampleVINs.includes(vin)) {
            this.showVINResult(resultElement, 'success', 'Valid VIN structure - Example vehicle');
            this.highlightVINStructure(vin);
            return;
        }

        // For demo purposes, randomly classify as valid or suspicious
        const isValid = Math.random() > 0.3; // 70% chance of being "valid"
        
        if (isValid) {
            this.showVINResult(resultElement, 'success', 'VIN structure appears valid');
        } else {
            this.showVINResult(resultElement, 'warning', 'Suspicious VIN detected - Further analysis recommended');
        }
        
        this.highlightVINStructure(vin);
    }

    showVINResult(element, type, message) {
        element.classList.remove('hidden');
        element.className = `mt-4 p-4 rounded-lg ${
            type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
            type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
            'bg-red-100 text-red-800 border border-red-200'
        }`;
        
        const icon = type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'times-circle';
        element.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${icon} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
    }

    highlightVINStructure(vin) {
        // Animate the VIN breakdown to show the input VIN
        const vinDisplay = document.querySelector('.font-mono.font-bold.text-gray-900.tracking-wider');
        if (vinDisplay) {
            vinDisplay.textContent = vin;
            vinDisplay.classList.add('animate-pulse');
            setTimeout(() => {
                vinDisplay.classList.remove('animate-pulse');
            }, 2000);
        }
    }

    addVINExamples() {
        // Add interactive VIN examples
        const examples = [
            { vin: '1HGBH41JXMN109186', make: 'Honda', model: 'Accord' },
            { vin: '2HGFA1F51AH123456', make: 'Honda', model: 'Civic' },
            { vin: '3GNDA13D76S123456', make: 'Chevrolet', model: 'Malibu' }
        ];

        examples.forEach((example, index) => {
            setTimeout(() => {
                this.showVINExample(example);
            }, (index + 1) * 3000);
        });
    }

    showVINExample(example) {
        const vinDisplay = document.querySelector('.font-mono.font-bold.text-gray-900.tracking-wider');
        if (vinDisplay && !document.getElementById('vinTestInput')?.value) {
            vinDisplay.textContent = example.vin;
            
            // Show vehicle info briefly
            const info = document.createElement('div');
            info.className = 'text-sm text-blue-600 mt-2 animate-fade-in';
            info.textContent = `${example.make} ${example.model}`;
            vinDisplay.parentNode.appendChild(info);
            
            setTimeout(() => {
                if (info.parentNode) {
                    info.parentNode.removeChild(info);
                }
            }, 2000);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        // Style based on type
        const styles = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-blue-500 text-white',
            warning: 'bg-yellow-500 text-black'
        };
        
        notification.className += ` ${styles[type] || styles.info}`;
        notification.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button class="ml-4 text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    initFAQ() {
        console.log('Initializing FAQ...');
        const faqButtons = document.querySelectorAll('.faq-button');
        console.log('Found FAQ buttons:', faqButtons.length);
        
        if (faqButtons.length === 0) {
            console.warn('No FAQ buttons found. Retrying in 1 second...');
            setTimeout(() => this.initFAQ(), 1000);
            return;
        }
        
        faqButtons.forEach((button, index) => {
            console.log(`Setting up FAQ button ${index + 1}`);
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('FAQ button clicked:', button.getAttribute('data-target'));
                
                const targetId = button.getAttribute('data-target');
                const content = document.getElementById(targetId);
                const icon = button.querySelector('i');
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                console.log('Target content found:', !!content);
                console.log('Is expanded:', isExpanded);
                
                // Close all other FAQ items
                faqButtons.forEach(otherButton => {
                    if (otherButton !== button) {
                        const otherTargetId = otherButton.getAttribute('data-target');
                        const otherContent = document.getElementById(otherTargetId);
                        const otherIcon = otherButton.querySelector('i');
                        
                        otherButton.setAttribute('aria-expanded', 'false');
                        if (otherContent) {
                            otherContent.classList.add('hidden');
                        }
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Toggle current FAQ item
                if (isExpanded) {
                    button.setAttribute('aria-expanded', 'false');
                    if (content) {
                        content.classList.add('hidden');
                    }
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                } else {
                    button.setAttribute('aria-expanded', 'true');
                    if (content) {
                        content.classList.remove('hidden');
                    }
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                    }
                    
                    // Smooth scroll to make sure the opened content is visible
                    setTimeout(() => {
                        button.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 300);
                }
            });
            
            // Keyboard accessibility
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
        
        console.log('FAQ initialization complete');
    }
}

// Demo and Infographic Navigation
class DemoHandler {
    static navigateToDemo() {
        // Check if infographic exists
        fetch('Infographic.html')
            .then(response => {
                if (response.ok) {
                    window.location.href = 'Infographic.html';
                } else {
                    // Create a demo modal or redirect to a demo section
                    DemoHandler.showDemoModal();
                }
            })
            .catch(() => {
                DemoHandler.showDemoModal();
            });
    }

    static navigateToInfographic() {
        window.location.href = 'Infographic.html';
    }

    static showDemoModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md w-full">
                <div class="text-center">
                    <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-play text-2xl text-indigo-600"></i>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-900 mb-4">Demo Coming Soon</h3>
                    <p class="text-gray-600 mb-6">
                        Our interactive demo is currently in development. Contact us to schedule a personalized demonstration.
                    </p>
                    <div class="flex space-x-4">
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Close
                        </button>
                        <button onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); this.closest('.fixed').remove();" class="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VinDetectApp();
    
    // Standalone FAQ initialization as backup
    setTimeout(() => {
        initStandaloneFAQ();
    }, 500);
    
    // Add event listeners for demo buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('button')?.textContent?.includes('See Demo')) {
            e.preventDefault();
            DemoHandler.navigateToDemo();
        }
        
        if (e.target.closest('button')?.textContent?.includes('View Infographic')) {
            e.preventDefault();
            DemoHandler.navigateToInfographic();
        }
    });
});

// Standalone FAQ function as backup
function initStandaloneFAQ() {
    console.log('Initializing standalone FAQ...');
    const faqButtons = document.querySelectorAll('.faq-button');
    console.log('Standalone FAQ - Found buttons:', faqButtons.length);
    
    if (faqButtons.length === 0) {
        console.warn('Standalone FAQ - No buttons found, retrying...');
        setTimeout(initStandaloneFAQ, 1000);
        return;
    }
    
    faqButtons.forEach((button, index) => {
        // Remove any existing listeners to avoid duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Standalone FAQ clicked:', this.getAttribute('data-target'));
            
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = this.querySelector('i');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-button').forEach(otherButton => {
                if (otherButton !== this) {
                    const otherTargetId = otherButton.getAttribute('data-target');
                    const otherContent = document.getElementById(otherTargetId);
                    const otherIcon = otherButton.querySelector('i');
                    
                    otherButton.setAttribute('aria-expanded', 'false');
                    if (otherContent) {
                        otherContent.classList.add('hidden');
                    }
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current FAQ item
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                if (content) {
                    content.classList.add('hidden');
                }
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                this.setAttribute('aria-expanded', 'true');
                if (content) {
                    content.classList.remove('hidden');
                }
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
                
                // Smooth scroll to make sure the opened content is visible
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 300);
            }
        });
        
        // Keyboard accessibility
        newButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    console.log('Standalone FAQ initialization complete');
}

// Export for use in other modules
window.VinDetectApp = VinDetectApp;
window.DemoHandler = DemoHandler;
