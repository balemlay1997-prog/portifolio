// main.js
const defaultProjects = [
    {
        title: 'Student Management System',
        description: 'A desktop application for managing student records, including add, update, delete, and search functions with real-time database handling.',
        technologies: 'C#, SQL, CRUD Operations, Database Connectivity',
        image: 'images/project-portfolio.svg',
        imageAlt: 'Student management system project preview',
        codeLink: 'https://github.com/balemlay1997-prog',
        demoLink: 'https://github.com/balemlay1997-prog'
    },
    {
        title: 'Simple Calculator Application',
        description: 'A Java application that performs basic arithmetic operations and strengthens event handling and logic-building skills.',
        technologies: 'Java, Application Logic, Event Handling',
        image: 'images/project-game.svg',
        imageAlt: 'Simple calculator application project preview',
        codeLink: 'https://github.com/balemlay1997-prog',
        demoLink: 'https://github.com/balemlay1997-prog'
    },
    {
        title: 'Library Management System',
        description: 'A concept project designed to manage books, users, and borrowing records with a focus on database structure and software design.',
        technologies: 'SQL, Database Design, Software Design Concepts',
        image: 'images/project-banking.svg',
        imageAlt: 'Library management system project preview',
        codeLink: 'https://github.com/balemlay1997-prog',
        demoLink: 'https://github.com/balemlay1997-prog'
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
        projectCard.tabIndex = 0;
        projectCard.setAttribute('role', 'link');
        projectCard.setAttribute('aria-label', `Open ${project.title} on GitHub`);
        projectCard.dataset.githubLink = project.codeLink;

        // Only show Live Demo button if it's different from the Code Link (prevents redundancy for console apps)
        const demoButton = (project.demoLink && project.demoLink !== project.codeLink)
            ? `<a href="${project.demoLink}" class="btn" target="_blank" rel="noopener">Live Demo</a>`
            : '';

        projectCard.innerHTML = `
            <a href="${project.codeLink}" target="_blank" rel="noopener"><img src="${project.image}" alt="${project.imageAlt}" class="project-image"></a>
            <h3><a href="${project.codeLink}" target="_blank" rel="noopener">${project.title}</a></h3>
            <p>${project.description}</p>
            <p><strong>Technologies:</strong> ${project.technologies}</p>
            <a href="${project.codeLink}" class="btn" target="_blank" rel="noopener">View Code</a>
            ${demoButton}
        `;

        projectCard.addEventListener('click', event => {
            if (event.target.closest('a')) {
                return;
            }

            window.open(projectCard.dataset.githubLink, '_blank', 'noopener');
        });

        projectCard.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.open(projectCard.dataset.githubLink, '_blank', 'noopener');
            }
        });

        projectList.appendChild(projectCard);
    });
}
