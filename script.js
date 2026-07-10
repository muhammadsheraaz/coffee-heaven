// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Smooth Scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    }
}

// Menu Category Filter
const categoryButtons = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Order Function
function orderItem(itemName) {
    showToast(`✅ Added "${itemName}" to your order!`);
}

// Toast Notification
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = this.querySelectorAll('input, textarea');
    let allFilled = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
        }
    });
    
    if (allFilled) {
        showToast('✅ Thank you! We\'ll get back to you soon.');
        this.reset();
    } else {
        showToast('⚠️ Please fill in all fields.');
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = '#1a0f0a';
    } else {
        nav.style.background = 'var(--dark)';
    }
});

// Animate items on scroll
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

// Observe all menu items
menuItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Welcome Message
console.log('☕ Welcome to Coffee Haven!');
console.log('✨ Made with love for coffee lovers');

// Auto close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    }
});

// Add some interactive effects to coffee cup
const coffeeCup = document.querySelector('.coffee-cup');
if (coffeeCup) {
    coffeeCup.addEventListener('click', function() {
        this.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
        showToast('☕ Click! Fresh coffee coming right up!');
    });
}