// DOM Elements
const navbar = document.querySelector('#navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const themeToggle = document.querySelector('.theme-toggle');
const scrollTopBtn = document.querySelector('.scroll-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('section');
//const contactForm = document.querySelector('#contactForm');
const links = document.querySelectorAll('.nav-links a');

// Function to toggle mobile menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Function to toggle theme
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Toggle icon
    if (newTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Function to filter projects
function filterProjects(category) {
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to animate elements when in viewport
function animateOnScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('appear');
        }
    });
}

// Function to update active menu item based on scroll position
function updateActiveMenu() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Function to toggle scroll-to-top button visibility
function toggleScrollButton() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
}

// Function to handle form submission
// function handleFormSubmit(e) {
//     e.preventDefault();

//     // Get form data
//     const formData = new FormData(contactForm);
//     const formDataObj = Object.fromEntries(formData.entries());

//     // Here you would normally send this data to your backend
//     console.log('Form data:', formDataObj);

//     // Show success message
//     const successMessage = document.createElement('div');
//     successMessage.classList.add('form-success');
//     successMessage.innerText = 'Your message has been sent successfully!';

//     contactForm.innerHTML = '';
//     contactForm.appendChild(successMessage);
// }

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to all sections
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Set theme from localStorage
    const theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', theme);

    // Set correct icon
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Initialize animations
    animateOnScroll();
});

// Event Listeners
hamburger.addEventListener('click', toggleMenu);
themeToggle.addEventListener('click', toggleTheme);
scrollTopBtn.addEventListener('click', () => window.scrollTo(0, 0));
//contactForm.addEventListener('submit', handleFormSubmit);

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Project filters event listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.filter;
        filterProjects(category);
    });
});

// Window event listeners
window.addEventListener('scroll', () => {
    // Add shadow to navbar when scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    updateActiveMenu();
    toggleScrollButton();
    animateOnScroll();
});

// Intersection Observer for animations (modern approach)
const fadeElements = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});