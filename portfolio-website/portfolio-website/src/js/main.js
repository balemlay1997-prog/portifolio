// main.js
const defaultProjects = [
    {
        title: 'Responsive Portfolio Website',
        description: 'A personal portfolio website showcasing skills and projects, built with HTML, CSS, and JavaScript.',
        technologies: 'HTML, CSS, JavaScript',
        image: 'images/project-portfolio.svg',
        imageAlt: 'Responsive portfolio website preview',
        codeLink: 'https://github.com/balemlay/portfolio',
        demoLink: 'https://balemlay.github.io/portfolio'
    },
    {
        title: 'Interactive Game',
        description: 'A simple interactive game built using JavaScript for user engagement.',
        technologies: 'JavaScript, HTML, CSS',
        image: 'images/project-game.svg',
        imageAlt: 'Interactive game preview',
        codeLink: 'https://github.com/balemlay/game',
        demoLink: 'https://balemlay.github.io/game'
    },
    {
        title: 'Banking System',
        description: 'A Java console banking system with account creation, login, deposit, withdraw, and transfers.',
        technologies: 'Java, OOP, Console',
        image: 'images/project-banking.svg',
        imageAlt: 'Banking system preview',
        codeLink: 'https://github.com/balemlay/banking-system',
        demoLink: 'https://github.com/balemlay/banking-system'
    },
    {
        title: 'Cafe Management System',
        description: 'A cafe system project for managing orders, menu items, and inventory.',
        technologies: 'Java, OOP, Console',
        image: 'images/project-cafe.png',
        imageAlt: 'Coffee menu image for the cafe management system',
        codeLink: 'https://github.com/balemlay/cafe-system',
        demoLink: 'https://github.com/balemlay/cafe-system'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Load projects
    loadProjects();
    setupCvPreview();

    // Smooth scrolling for navigation links
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

    // Add click interactivity to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

function setupCvPreview() {
    const cvButtons = document.querySelectorAll('.view-cv-link, .view-cv-button');
    const cvPreview = document.querySelector('.cv-preview');

    if (!cvButtons.length || !cvPreview) {
        return;
    }

    cvButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showCvPreview(cvPreview);
        });
    });
}

function showCvPreview(cvPreview) {
    const cvSection = document.getElementById('cv');

    if (cvSection) {
        cvSection.scrollIntoView({
            behavior: 'smooth'
        });
    }

    setTimeout(() => {
        if (!cvPreview.getAttribute('src')) {
            cvPreview.setAttribute('src', cvPreview.dataset.src);
        }

        cvPreview.classList.remove('is-hidden');
        cvPreview.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 250);
}

function loadProjects() {
    fetch('data/projects.json')
        .then(response => response.json())
        .then(projects => renderProjects(projects))
        .catch(error => {
            console.error('Error loading projects:', error);
            renderProjects(defaultProjects);
        });
}

function renderProjects(projects) {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.imageAlt}" class="project-image">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Technologies:</strong> ${project.technologies}</p>
            <a href="${project.codeLink}" class="btn" target="_blank">View Code</a>
            <a href="${project.demoLink}" class="btn" target="_blank">Live Demo</a>
        `;
        projectList.appendChild(projectCard);
    });
}
