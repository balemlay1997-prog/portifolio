// src/js/form.js

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Simple validation
    if (name === '' || email === '' || phone === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Send message to GitHub as an issue
    sendToGitHub(name, email, phone);

    // Reset the form
    document.getElementById('contact-form').reset();
});

function sendToGitHub(name, email, phone) {
    const repoOwner = 'balemlay1997-prog'; // Replace with your GitHub username
    const repoName = 'portfolio-contact'; // Replace with your repository name for issues

    // DANGER: Never push a real GitHub token to a public repository.
    // GitHub will automatically revoke it. Consider using Formspree for contact forms.
    const token = 'YOUR_GITHUB_TOKEN';

    const issueTitle = `Contact from ${name}`;
    const issueBody = `**Name:** ${name}\n**Email:** ${email}\n**Phone:** ${phone}`;

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: issueTitle,
            body: issueBody
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! It has been sent to GitHub.');
        } else {
            alert('Failed to send message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}
