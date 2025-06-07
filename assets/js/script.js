// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');

            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            const navbar = document.querySelector('.navbar');

            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.feature-card, .product-content, .product-image, .testimonial-content');

    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }
});

// Button hover effects
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            if (!this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});



// Lazy loading for images (optional enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Video Modal JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    const videoModal = document.getElementById('video-modal');
    const closeBtn = document.querySelector('.video-modal-close');
    const youtubeIframe = document.getElementById('youtube-iframe');

    if (watchDemoBtn && videoModal && closeBtn && youtubeIframe) {
        // YouTube video ID from the URL
        const videoId = '_dK-lnNAtNc';
        const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

        // Open modal when Watch Demo is clicked
        watchDemoBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openVideoModal();
        });

        // Close modal when X is clicked
        closeBtn.addEventListener('click', function () {
            closeVideoModal();
        });

        // Close modal when clicking outside the video
        videoModal.addEventListener('click', function (e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && videoModal.style.display === 'block') {
                closeVideoModal();
            }
        });

        function openVideoModal() {
            // Set the iframe source to start playing the video
            youtubeIframe.src = youtubeEmbedUrl;

            // Show the modal
            videoModal.style.display = 'block';

            // Prevent body scroll
            document.body.classList.add('modal-open');

            // Focus on close button for accessibility
            closeBtn.focus();
        }

        function closeVideoModal() {
            // Hide the modal
            videoModal.style.display = 'none';


            // Stop the video by removing the src
            youtubeIframe.src = '';

            // Restore body scroll
            document.body.classList.remove('modal-open');

            // Return focus to the button
            watchDemoBtn.focus();
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitButton = form?.querySelector('button[type="submit"]');
    
    if (!form || !formMessage || !submitButton) {
        console.warn('Contact form or required elements not found');
        return;
    }
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Reset previous messages
        formMessage.classList.remove('alert', 'alert-success', 'alert-danger', 'd-none');
        formMessage.textContent = '';
        formMessage.setAttribute('aria-live', 'polite'); // Accessibility: Announce changes to screen readers
        
        // Client-side validation
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        // Basic email format validation
        const email = form.querySelector('#email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            form.classList.add('was-validated');
            form.querySelector('#email').setCustomValidity('Invalid email format');
            return;
        } else {
            form.querySelector('#email').setCustomValidity('');
        }
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Prepare form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            botField: formData.get('bot-field')
        };
        
        try {
            // Add timeout to fetch request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
            
            const response = await fetch('https://my-worker.paintguardtool.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            const result = await response.json();
            
            if (response.ok) {
                formMessage.classList.add('alert', 'alert-success');
                formMessage.textContent = 'Your message has been sent successfully!';
                form.reset();
                form.classList.remove('was-validated');
            } else {
                formMessage.classList.add('alert', 'alert-danger');
                formMessage.textContent = result.message || 'Failed to send message. Please try again.';
            }
        } catch (error) {
            formMessage.classList.add('alert', 'alert-danger');
            formMessage.textContent = error.name === 'AbortError' 
            ? 'Request timed out. Please try again.'
            : 'An error occurred. Please try again later.';
            console.error('Form submission error:', error);
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
        
        formMessage.classList.remove('d-none');
        formMessage.focus(); // Accessibility: Focus on message for screen readers
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('d-none');
            formMessage.textContent = '';
            formMessage.classList.remove('alert', 'alert-success', 'alert-danger');
        }, 5000);
    });
});