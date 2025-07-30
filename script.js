// ===== PORTFOLIO DATA =====
const portfolioData = {
    'Lorem Ipsum Dolor': {
        category: 'Branding',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Lorem Ipsum'],
        image: 'https://via.placeholder.com/800x600/1a1a1a/6366f1?text=Lorem+Ipsum+Details'
    },
    'Consectetur Adipiscing': {
        category: 'Web Design',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        tools: ['Figma', 'Adobe XD', 'Sed Do', 'Eiusmod Tempor'],
        image: 'https://via.placeholder.com/800x600/1a1a1a/8b5cf6?text=Consectetur+Details'
    },
    'Sed Do Eiusmod': {
        category: 'Print Design',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.',
        tools: ['Adobe InDesign', 'Adobe Photoshop', 'Tempor Incididunt', 'Ut Labore'],
        image: 'https://via.placeholder.com/800x600/1a1a1a/ec4899?text=Sed+Do+Details'
    },
    'Tempor Incididunt': {
        category: 'Logo Design',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
        tools: ['Adobe Illustrator', 'Dolore Magna', 'Aliqua Ut'],
        image: 'https://via.placeholder.com/800x600/1a1a1a/06b6d4?text=Tempor+Details'
    },
    'Ut Labore Et': {
        category: 'Packaging',
        description: 'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis.',
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Dolore Magna', 'Aliqua Design'],
        image: 'https://via.placeholder.com/800x600/1a1a1a/10b981?text=Ut+Labore+Details'
    },
    'Dolore Magna': {
        category: 'Illustration',
        description: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Temporibus autem quibusdam et aut.',
        tools: ['Adobe Illustrator', 'Consectetur Elit', 'Sed Do Eiusmod', 'Tempor Incididunt'],
        image: 'https://via.placeholder.com/800x600/1a1a1a/f59e0b?text=Dolore+Details'
    }
};

// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('portfolioModal');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');
const navToggle = document.querySelector('.nav-toggle');

// ===== BACKGROUND ANIMATIONS =====
function initBackgroundAnimations() {
    createDynamicParticles();
    initMouseInteraction();
    initScrollBasedAnimations();
}

function createDynamicParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = window.innerWidth < 768 ? 8 : 20; // Fewer particles on mobile
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and timing
        const startX = Math.random() * window.innerWidth;
        const animationDelay = Math.random() * 15;
        const animationDuration = 15 + Math.random() * 10;
        const size = 1 + Math.random() * 3;
        
        particle.style.left = startX + 'px';
        particle.style.animationDelay = animationDelay + 's';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color variation
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        
        particlesContainer.appendChild(particle);
    }
}

function initMouseInteraction() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trailing particles on mouse move
        if (Math.random() < 0.1) { // 10% chance to create particle
            createMouseParticle(mouseX, mouseY);
        }
        
        // Update floating shapes based on mouse position
        updateShapesBasedOnMouse(mouseX, mouseY);
    });
}

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #6366f1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.6;
        animation: mouseParticleFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

function updateShapesBasedOnMouse(mouseX, mouseY) {
    const shapes = document.querySelectorAll('.floating-shape');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    shapes.forEach((shape, index) => {
        const distanceFromCenter = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
        );
        
        const maxDistance = Math.sqrt(
            Math.pow(centerX, 2) + Math.pow(centerY, 2)
        );
        
        const influence = 1 - (distanceFromCenter / maxDistance);
        const moveX = (mouseX - centerX) * influence * 0.02;
        const moveY = (mouseY - centerY) * influence * 0.02;
        
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

function initScrollBasedAnimations() {
    let ticking = false;
    
    function updateAnimationsOnScroll() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollProgress = scrollY / (documentHeight - windowHeight);
        
        // Update grid overlay based on scroll
        const gridOverlay = document.querySelector('.grid-overlay');
        if (gridOverlay) {
            gridOverlay.style.transform = `translate(${scrollProgress * 50}px, ${scrollProgress * 50}px)`;
        }
        
        // Update ambient glow based on scroll
        const ambientGlow = document.querySelector('.ambient-glow');
        if (ambientGlow) {
            ambientGlow.style.opacity = 0.5 + (scrollProgress * 0.3);
        }
        
        // Add parallax effect to floating shapes
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimationsOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNav(targetId);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Handle hero CTA button
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#portfolio');
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===== STICKY HEADER =====
function initStickyHeader() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
    });
}

// ===== NAVIGATION UPDATES =====
function updateActiveNav(activeId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = header.offsetHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            updateActiveNav(`#${section.id}`);
        }
    });
}

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    const navList = document.querySelector('.nav-list');
    
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('mobile-active');
        
        // Animate hamburger menu
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navList = document.querySelector('.nav-list');
    navToggle.setAttribute('aria-expanded', 'false');
    navList.classList.remove('mobile-active');
    navToggle.classList.remove('active');
}

// ===== PORTFOLIO MODAL =====
function initPortfolioModal() {
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const data = portfolioData[title];
            
            if (data) {
                openModal(title, data);
            }
        });
    });
    
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(title, data) {
    // Populate modal content
    document.getElementById('modal-title').textContent = title;
    document.querySelector('.modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.description;
    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = title;
    
    // Populate tools
    const toolsList = document.getElementById('modal-tools');
    toolsList.innerHTML = '';
    data.tools.forEach(tool => {
        const toolSpan = document.createElement('span');
        toolSpan.textContent = tool;
        toolsList.appendChild(toolSpan);
    });
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    modalClose.focus();
}

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// ===== CONTACT FORM =====
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearFormErrors();
        
        // Validate form
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        let isValid = true;
        
        // Validate name
        if (!name) {
            showFormError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showFormError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showFormError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFormError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            showFormError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showFormError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            submitForm(name, email, message);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.style.borderColor = '#ef4444';
    inputElement.setAttribute('aria-invalid', 'true');
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    
    inputElements.forEach(input => {
        input.style.borderColor = '';
        input.setAttribute('aria-invalid', 'false');
    });
}

function submitForm(name, email, message) {
    const submitButton = document.querySelector('.btn-submit');
    const originalText = submitButton.querySelector('span').textContent;
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.querySelector('span').textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.classList.remove('loading');
        submitButton.querySelector('span').textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit!');
        
        console.log('Form submitted:', { name, email, message });
    }, 2000);
}

function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #06b6d4);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        z-index: 3000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    successDiv.textContent = message;
    
    // Add animation keyframes
    if (!document.querySelector('#success-animations')) {
        const style = document.createElement('style');
        style.id = 'success-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            @keyframes mouseParticleFade {
                0% {
                    opacity: 0.6;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.3) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 5000);
}

// ===== ANIMATIONS ON SCROLL =====
function initScrollAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizeImages() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== THEME UTILITIES =====
function initThemeUtilities() {
    // Add mobile menu styles and mouse particle animation
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-list {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: var(--spacing-lg);
                border-top: 1px solid var(--border-color);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease-in-out;
            }
            
            .nav-list.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-list li {
                margin-bottom: var(--spacing-md);
            }
            
            .nav-link {
                font-size: var(--font-size-lg);
                padding: var(--spacing-sm) 0;
                display: block;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        .success-message {
            font-family: var(--font-family);
        }
    `;
    document.head.appendChild(style);
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#portfolio';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhance focus visibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundAnimations();
    initSmoothScrolling();
    initStickyHeader();
    initMobileNavigation();
    initPortfolioModal();
    initContactForm();
    initScrollAnimations();
    optimizeImages();
    initThemeUtilities();
    initAccessibility();
    
    console.log('Portfolio website with enhanced backgrounds initialized successfully!');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Recreate particles with appropriate count for new screen size
    createDynamicParticles();
}, 250));

// ===== UTILITY FUNCTIONS =====
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