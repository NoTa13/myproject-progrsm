// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (name === '' || email === '' || message === '') {
                showMessage('Please fill in all fields', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Show success message
            showMessage('Message sent successfully! Thank you for contacting me.', 'success');

            // Reset form
            contactForm.reset();

            // Clear message after 3 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form_message';
            }, 3000);
        });
    }

    // Animate skill progress bars on scroll
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill_progress');
                if (skillProgress) {
                    const width = skillProgress.style.width;
                    skillProgress.style.width = '0';
                    setTimeout(() => {
                        skillProgress.style.width = width;
                    }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillCards = document.querySelectorAll('.skill_card');
    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Function to show message
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form_message ${type}`;
    }
});

// Smooth scroll effect for navigation
document.querySelectorAll('a[href^="../"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.href.includes('index.html') || this.href.includes('home_works.html') || this.href.includes('lessons.html') || this.href.includes('about.html')) {
            // Allow normal navigation
        }
    });
});
