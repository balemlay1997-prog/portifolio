// Combined script.js for the public folder

const defaultProjects = [
    {
        title: 'Student Management System',
        description: 'A desktop application for managing student records, including add, update, delete, and search functions.',
        technologies: 'C#, SQL, CRUD Operations',
        image: 'images/project-portfolio.svg',
        imageAlt: 'Student management system preview',
        codeLink: 'https://github.com/balemlay1997-prog'
    },
    {
        title: 'Simple Calculator Application',
        description: 'A Java application that performs basic arithmetic operations and strengthens logic-building skills.',
        technologies: 'Java, Application Logic',
        image: 'images/project-game.svg',
        imageAlt: 'Calculator preview',
        codeLink: 'https://github.com/balemlay1997-prog'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    setupCvPreview();
    setupNavigation();
    setupContactForm();
});

function setupNavigation() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // SECURE SUBMISSION using Formspree (No token needed!)
        // Get your actual ID from https://formspree.io/
        const formId = 'your-form-id'; 
        const formspreeUrl = `https://formspree.io/f/${formId}`;

        fetch(formspreeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, phone })
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you! Message sent successfully.');
                form.reset();
            } else {
                alert('Oops! Submission failed.');
            }
        })
        .catch(() => alert('Error sending message.'));
    });
}

function loadProjects() {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;

    fetch('data/projects.json')
        .then(res => res.json())
        .then(projects => renderProjects(projects))
        .catch(() => renderProjects(defaultProjects));
}

function renderProjects(projects) {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = projects.map(p => `
        <div class="project-card" onclick="window.open('${p.codeLink}', '_blank')">
            <img src="${p.image}" alt="${p.imageAlt}" class="project-image">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <p><strong>Tech:</strong> ${p.technologies}</p>
            <a href="${p.codeLink}" class="btn" target="_blank">View Code</a>
        </div>
    `).join('');
}

function setupCvPreview() {
    const btn = document.getElementById('open-cv-btn');
    const preview = document.querySelector('.cv-preview');
    if (btn && preview) {
        btn.addEventListener('click', () => {
            if (!preview.getAttribute('src')) {
                preview.setAttribute('src', preview.dataset.src);
            }
            preview.classList.toggle('is-hidden');
        });
    }
}