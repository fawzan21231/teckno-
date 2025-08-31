// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects and click functionality
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });

    // Add click functionality for service cards
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        const serviceDescription = this.querySelector('p').textContent;
        
        // Show service activation modal
        showServiceModal(serviceName, serviceDescription);
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-15px)';
        }, 150);
    });
});

// Tool usage functionality
function useTool(serviceName) {
    const toolConfigs = {
        'Web Development': {
            action: 'openCodeEditor',
            message: 'Opening web development environment...',
            features: ['HTML Editor', 'CSS Styling', 'JavaScript Console', 'Live Preview']
        },
        'Mobile App Development': {
            action: 'openAppBuilder',
            message: 'Launching mobile app development studio...',
            features: ['UI Builder', 'Code Editor', 'Simulator', 'Testing Tools']
        },
        'UI/UX Design': {
            action: 'openDesignTool',
            message: 'Starting design workspace...',
            features: ['Design Canvas', 'Component Library', 'Prototyping', 'Export Tools']
        },
        'Digital Marketing': {
            action: 'openMarketingSuite',
            message: 'Opening digital marketing dashboard...',
            features: ['Campaign Manager', 'Analytics', 'SEO Tools', 'Social Media']
        },
        'Content Creation': {
            action: 'openContentStudio',
            message: 'Launching content creation studio...',
            features: ['Text Editor', 'Media Library', 'Publishing', 'SEO Optimizer']
        },
        'SEO Optimization': {
            action: 'openSEOTool',
            message: 'Starting SEO analysis and optimization...',
            features: ['Keyword Research', 'Site Audit', 'Ranking Tracker', 'Optimization Tools']
        }
    };
    
    const tool = toolConfigs[serviceName];
    if (tool) {
        showNotification(tool.message, 'success');
        
        // Create tool interface
        createToolInterface(serviceName, tool);
    } else {
        showNotification('Tool not available yet. Coming soon!', 'info');
    }
}

// Create tool interface
function createToolInterface(serviceName, tool) {
    // Remove existing tool interface
    const existingInterface = document.querySelector('.tool-interface');
    if (existingInterface) {
        existingInterface.remove();
    }
    
    // Create tool interface container
    const toolInterface = document.createElement('div');
    toolInterface.className = 'tool-interface';
    toolInterface.innerHTML = `
        <div class="tool-header">
            <h3>${serviceName} Tool</h3>
            <button class="tool-close">&times;</button>
        </div>
        <div class="tool-content">
            <div class="tool-sidebar">
                <h4>Features</h4>
                <ul class="tool-features">
                    ${tool.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <div class="tool-status">
                    <span class="status-dot"></span>
                    <span>Tool Active</span>
                </div>
            </div>
            <div class="tool-workspace">
                <div class="tool-tabs">
                    <button class="tab-btn active" data-tab="main">Main</button>
                    <button class="tab-btn" data-tab="settings">Settings</button>
                    <button class="tab-btn" data-tab="help">Help</button>
                </div>
                <div class="tab-content active" id="main">
                    <div class="tool-welcome">
                        <h4>Welcome to ${serviceName} Tool</h4>
                        <p>This tool is now ready for use. Start creating amazing projects!</p>
                        <button class="btn btn-primary start-project-btn">Start New Project</button>
                    </div>
                </div>
                <div class="tab-content" id="settings">
                    <h4>Tool Settings</h4>
                    <div class="setting-item">
                        <label>Auto-save</label>
                        <input type="checkbox" checked>
                    </div>
                    <div class="setting-item">
                        <label>Theme</label>
                        <select>
                            <option>Light</option>
                            <option>Dark</option>
                            <option>Auto</option>
                        </select>
                    </div>
                </div>
                <div class="tab-content" id="help">
                    <h4>Help & Documentation</h4>
                    <p>Learn how to use this tool effectively.</p>
                    <button class="btn btn-secondary">View Tutorial</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    toolInterface.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 10001;
        display: flex;
        flex-direction: column;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(toolInterface);
    
    // Add tool interface styles
    const toolStyles = document.createElement('style');
    toolStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
        
        .tool-interface {
            font-family: 'Poppins', sans-serif;
        }
        
        .tool-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: #2c3e50;
            color: white;
        }
        
        .tool-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .tool-content {
            display: flex;
            flex: 1;
        }
        
        .tool-sidebar {
            width: 250px;
            background: #f8f9fa;
            padding: 2rem;
            border-right: 1px solid #e9ecef;
        }
        
        .tool-features {
            list-style: none;
            padding: 0;
            margin: 1rem 0;
        }
        
        .tool-features li {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .tool-features i {
            color: #27ae60;
        }
        
        .tool-status {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 2rem;
            padding: 1rem;
            background: white;
            border-radius: 10px;
        }
        
        .tool-workspace {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .tool-tabs {
            display: flex;
            background: #ecf0f1;
            border-bottom: 1px solid #e9ecef;
        }
        
        .tab-btn {
            padding: 1rem 2rem;
            border: none;
            background: none;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .tab-btn.active {
            background: white;
            border-bottom: 3px solid #3498db;
        }
        
        .tab-content {
            display: none;
            padding: 2rem;
            flex: 1;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .tool-welcome {
            text-align: center;
            padding: 4rem 2rem;
        }
        
        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .start-project-btn {
            margin-top: 2rem;
        }
    `;
    
    document.head.appendChild(toolStyles);
    
    // Tab functionality
    const tabBtns = toolInterface.querySelectorAll('.tab-btn');
    const tabContents = toolInterface.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            toolInterface.querySelector(`#${tabName}`).classList.add('active');
        });
    });
    
    // Close button functionality
    const closeBtn = toolInterface.querySelector('.tool-close');
    closeBtn.addEventListener('click', () => {
        toolInterface.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toolInterface.remove(), 300);
    });
    
    // Start project button
    const startProjectBtn = toolInterface.querySelector('.start-project-btn');
    startProjectBtn.addEventListener('click', () => {
        showNotification('New project created! You can now start working.', 'success');
    });
    
    // Add slideOut animation
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes slideOut {
            from { transform: translateY(0); }
            to { transform: translateY(100%); }
        }
    `;
    document.head.appendChild(slideOutStyle);
}

// Service activation modal
function showServiceModal(serviceName, description) {
    // Remove existing modal
    const existingModal = document.querySelector('.service-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="service-modal-content">
            <div class="service-modal-header">
                <h3>${serviceName}</h3>
                <button class="service-modal-close">&times;</button>
            </div>
            <div class="service-modal-body">
                <p>${description}</p>
                <div class="service-status">
                    <div class="status-indicator">
                        <span class="status-dot"></span>
                        <span class="status-text">Service Activated</span>
                    </div>
                </div>
                <div class="service-actions">
                    <button class="btn btn-primary service-action-btn">Start Project</button>
                    <button class="btn btn-secondary service-action-btn">Learn More</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close button functionality
    const closeBtn = modal.querySelector('.service-modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Service action buttons
    const actionBtns = modal.querySelectorAll('.service-action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            if (action === 'Start Project') {
                showNotification(`Starting ${serviceName} project! Redirecting to contact form...`, 'success');
                setTimeout(() => {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.remove();
                        // Scroll to contact form
                        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }, 1000);
            } else if (action === 'Learn More') {
                showNotification(`Opening detailed information about ${serviceName}...`, 'info');
                // You can add more detailed information here
            }
        });
    });
    
    // Add tool usage functionality
    const toolUsageBtn = document.createElement('button');
    toolUsageBtn.className = 'btn btn-success service-action-btn';
    toolUsageBtn.textContent = 'Use Tool Now';
    toolUsageBtn.style.cssText = `
        background: #27ae60;
        color: white;
        margin-top: 1rem;
        width: 100%;
    `;
    
    toolUsageBtn.addEventListener('click', function() {
        useTool(serviceName);
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.service-actions').appendChild(toolUsageBtn);
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Skill tags animation
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'fadeInUp 0.6s ease forwards';
    tag.style.opacity = '0';
});

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.background = '#2980b9';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.background = '#3498db';
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add some CSS for the preloader
const preloaderStyles = document.createElement('style');
preloaderStyles.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .preloader::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(preloaderStyles);

// Create preloader element
const preloader = document.createElement('div');
preloader.className = 'preloader';
document.body.appendChild(preloader);

// Remove preloader after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});
