function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  const isDark = body.getAttribute('data-theme') === 'dark';
  
  if (isDark) {
    body.setAttribute('data-theme', 'light');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  
  body.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize contact form
  initContactForm();
});

// Scroll animations
function initScrollAnimations() {
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

  // Observe all sections for animation
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Observe project cards
  const projectCards = document.querySelectorAll('.details-container');
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  // Observe skill tags
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(tag);
  });
}

// Project filtering functionality
function filterProjects(category) {
  const projectCards = document.querySelectorAll('.project-card');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Update active button
  filterBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Filter projects
  projectCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory.includes(category)) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeInUp 0.5s ease';
    } else {
      card.classList.add('hidden');
    }
  });
}

// Contact form functionality
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // Create mailto link as fallback (since we don't have a backend)
    const mailtoLink = `mailto:mariumashraf.MA@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Thank you! Your email client should open with your message.', 'success');
    
    // Reset form
    form.reset();
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}
