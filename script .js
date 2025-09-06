// Portfolio Website JavaScript
class PortfolioManager {
constructor() {
this.data = {
profile: {
name: ‘John Doe’,
title: ‘Design Verification Engineer’,
bio: ‘Passionate about ensuring hardware designs meet specifications through comprehensive verification methodologies and cutting-edge simulation techniques.’,
photo: ‘https://via.placeholder.com/400x400’,
email: ‘john.doe@email.com’,
phone: ‘+1 (555) 123-4567’,
location: ‘San Francisco, CA’
},
experience: [
{
id: 1,
company: ‘Tech Corp’,
role: ‘Senior Design Verification Engineer’,
duration: ‘2022 - Present’,
description: ‘Leading verification efforts for next-generation processors using SystemVerilog and UVM methodologies.’
},
{
id: 2,
company: ‘Silicon Valley Inc’,
role: ‘Design Verification Engineer’,
duration: ‘2020 - 2022’,
description: ‘Developed comprehensive testbenches for FPGA-based designs and implemented advanced verification strategies.’
}
],
education: [
{
id: 1,
institution: ‘Stanford University’,
degree: ‘M.S. Electrical Engineering’,
year: ‘2020’,
gpa: ‘3.8/4.0’
},
{
id: 2,
institution: ‘UC Berkeley’,
degree: ‘B.S. Electrical Engineering’,
year: ‘2018’,
gpa: ‘3.7/4.0’
}
],
projects: [
{
id: 1,
title: ‘Advanced CPU Verification Suite’,
description: ‘Comprehensive verification environment for a 64-bit processor using SystemVerilog and UVM.’,
image: ‘https://via.placeholder.com/350x200’,
video: ‘’,
technologies: [‘SystemVerilog’, ‘UVM’, ‘Python’, ‘VCS’]
},
{
id: 2,
title: ‘FPGA-based Signal Processor’,
description: ‘Design and verification of a digital signal processing unit on FPGA platform.’,
image: ‘https://via.placeholder.com/350x200’,
video: ‘’,
technologies: [‘Verilog’, ‘FPGA’, ‘Vivado’, ‘MATLAB’]
}
]
};

```
    this.init();
    this.loadData();
    this.updateUI();
}

init() {
    this.setupEventListeners();
    this.setupSmoothScrolling();
    this.setupMobileMenu();
    this.setupVideoModal();
    this.setupAdminPanel();
}

setupEventListeners() {
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', this.handleContactForm.bind(this));
    }

    // Admin panel events
    const adminTabs = document.querySelectorAll('.tab-btn');
    adminTabs.forEach(tab => {
        tab.addEventListener('click', this.switchAdminTab.bind(this));
    });

    // Scroll animations
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Admin access
    const adminAccess = document.querySelector('.admin-access');
    if (adminAccess) {
        adminAccess.addEventListener('click', this.showAdminLogin.bind(this));
    }
}

setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

setupVideoModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', this.closeVideoModal.bind(this));
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeVideoModal();
            }
        });
    }
}

setupAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.addEventListener('click', (e) => {
            if (e.target === adminPanel) {
                this.closeAdmin();
            }
        });
    }
}

handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

handleScroll() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // Active navigation highlighting
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

showAdminLogin() {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') { // Change this to a secure password
        document.getElementById('adminPanel').style.display = 'block';
        this.populateAdminForm();
    } else if (password !== null) {
        alert('Incorrect password');
    }
}

populateAdminForm() {
    const profile = this.data.profile;
    document.getElementById('adminName').value = profile.name;
    document.getElementById('adminTitle').value = profile.title;
    document.getElementById('adminBio').value = profile.bio;
    document.getElementById('adminPhoto').value = profile.photo;
    document.getElementById('adminEmail').value = profile.email;
    document.getElementById('adminPhone').value = profile.phone;
    document.getElementById('adminLocation').value = profile.location;
    
    this.populateExperienceList();
    this.populateEducationList();
    this.populateProjectsList();
}

switchAdminTab(e) {
    const targetTab = e.target.getAttribute('data-tab');
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${targetTab}-tab`).classList.add('active');
}

addExperience() {
    const company = document.getElementById('expCompany').value;
    const role = document.getElementById('expRole').value;
    const duration = document.getElementById('expDuration').value;
    const description = document.getElementById('expDescription').value;

    if (company && role && duration && description) {
        const newExp = {
            id: Date.now(),
            company,
            role,
            duration,
            description
        };
        
        this.data.experience.push(newExp);
        this.populateExperienceList();
        this.clearExperienceForm();
    } else {
        alert('Please fill all fields');
    }
}

addEducation() {
    const institution = document.getElementById('eduInstitution').value;
    const degree = document.getElementById('eduDegree').value;
    const year = document.getElementById('eduYear').value;
    const gpa = document.getElementById('eduGPA').value;

    if (institution && degree && year) {
        const newEdu = {
            id: Date.now(),
            institution,
            degree,
            year,
            gpa
        };
        
        this.data.education.push(newEdu);
        this.populateEducationList();
        this.clearEducationForm();
    } else {
        alert('Please fill required fields');
    }
}

addProject() {
    const title = document.getElementById('projTitle').value;
    const description = document.getElementById('projDescription').value;
    const image = document.getElementById('projImage').value;
    const video = document.getElementById('projVideo').value;
    const technologies = document.getElementById('projTech').value.split(',').map(tech => tech.trim());

    if (title && description) {
        const newProject = {
            id: Date.now(),
            title,
            description,
            image: image || 'https://via.placeholder.com/350x200',
            video,
            technologies
        };
        
        this.data.projects.push(newProject);
        this.populateProjectsList();
        this.clearProjectForm();
    } else {
        alert('Please fill required fields');
    }
}

populateExperienceList() {
    const list = document.getElementById('experienceList');
    list.innerHTML = this.data.experience.map(exp => `
        <div class="admin-item">
            <h5>${exp.role} at ${exp.company}</h5>
            <p>${exp.duration}</p>
            <button onclick="portfolio.removeExperience(${exp.id})">Remove</button>
        </div>
    `).join('');
}

populateEducationList() {
    const list = document.getElementById('educationList');
    list.innerHTML = this.data.education.map(edu => `
        <div class="admin-item">
            <h5>${edu.degree} from ${edu.institution}</h5>
            <p>${edu.year}</p>
            <button onclick="portfolio.removeEducation(${edu.id})">Remove</button>
        </div>
    `).join('');
}

populateProjectsList() {
    const list = document.getElementById('projectsList');
    list.innerHTML = this.data.projects.map(proj => `
        <div class="admin-item">
            <h5>${proj.title}</h5>
            <button onclick="portfolio.removeProject(${proj.id})">Remove</button>
        </div>
    `).join('');
}

removeExperience(id) {
    this.data.experience = this.data.experience.filter(exp => exp.id !== id);
    this.populateExperienceList();
}

removeEducation(id) {
    this.data.education = this.data.education.filter(edu => edu.id !== id);
    this.populateEducationList();
}

removeProject(id) {
    this.data.projects = this.data.projects.filter(proj => proj.id !== id);
    this.populateProjectsList();
}

clearExperienceForm() {
    document.getElementById('expCompany').value = '';
    document.getElementById('expRole').value = '';
    document.getElementById('expDuration').value = '';
    document.getElementById('expDescription').value = '';
}

clearEducationForm() {
    document.getElementById('eduInstitution').value = '';
    document.getElementById('eduDegree').value = '';
    document.getElementById('eduYear').value = '';
    document.getElementById('eduGPA').value = '';
}

clearProjectForm() {
    document.getElementById('projTitle').value = '';
    document.getElementById('projDescription').value = '';
    document.getElementById('projImage').value = '';
    document.getElementById('projVideo').value = '';
    document.getElementById('projTech').value = '';
}

saveData() {
    // Update profile data from form
    this.data.profile = {
        name: document.getElementById('adminName').value,
        title: document.getElementById('adminTitle').value,
        bio: document.getElementById('adminBio').value,
        photo: document.getElementById('adminPhoto').value,
        email: document.getElementById('adminEmail').value,
        phone: document.getElementById('adminPhone').value,
        location: document.getElementById('adminLocation').value
    };

    // Save to localStorage (for GitHub Pages compatibility)
    localStorage.setItem('portfolioData', JSON.stringify(this.data));
    
    // Update UI
    this.updateUI();
    
    alert('Data saved successfully!');
    this.closeAdmin();
}

loadData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        this.data = { ...this.data, ...JSON.parse(savedData) };
    }
}

updateUI() {
    this.updateProfile();
    this.updateExperience();
    this.updateEducation();
    this.updateProjects();
}

updateProfile() {
    const profile = this.data.profile;
    
    // Update hero section
    document.getElementById('heroName').textContent = profile.name;
    document.getElementById('heroTitle').textContent = profile.title;
    document.getElementById('heroBio').textContent = profile.bio;
    document.getElementById('heroPhoto').src = profile.photo;
    document.getElementById('heroPhoto').alt = profile.name;
    
    // Update about section
    document.getElementById('aboutText').textContent = profile.bio;
    
    // Update contact section
    document.getElementById('contactEmail').textContent = profile.email;
    document.getElementById('contactPhone').textContent = profile.phone;
    document.getElementById('contactLocation').textContent = profile.location;
    
    // Update page title
    document.title = `${profile.name} - ${profile.title}`;
}

updateExperience() {
    const container = document.getElementById('experienceContainer');
    container.innerHTML = this.data.experience.map((exp, index) => `
        <div class="timeline-item fade-in" style="animation-delay: ${index * 0.1}s">
            <div class="timeline-content">
                <h3>${exp.role}</h3>
                <h4>${exp.company}</h4>
                <div class="duration">${exp.duration}</div>
                <p>${exp.description}</p>
            </div>
        </div>
    `).join('');
}

updateEducation() {
    const container = document.getElementById('educationContainer');
    container.innerHTML = this.data.education.map((edu, index) => `
        <div class="education-item fade-in" style="animation-delay: ${index * 0.1}s">
            <h3>${edu.degree}</h3>
            <h4>${edu.institution}</h4>
            <div class="year">${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
        </div>
    `).join('');
}

updateProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = this.data.projects.map((project, index) => `
        <div class="project-card fade-in" style="animation-delay: ${index * 0.1}s">
            <div class="project-image" style="background-image: url('${project.image}')">
                ${project.video ? `<button class="project-video-btn" onclick="portfolio.openVideo('${project.video}')"><i class="fas fa-play"></i></button>` : ''}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

openVideo(videoUrl) {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoContainer');
    
    // Extract YouTube video ID
    const videoId = this.extractYouTubeId(videoUrl);
    if (videoId) {
        container.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allowfullscreen></iframe>`;
        modal.style.display = 'block';
    } else {
        alert('Invalid YouTube URL');
    }
}

extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoContainer');
    modal.style.display = 'none';
    container.innerHTML = '';
}

closeAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
}
```

}

// Initialize portfolio when DOM is loaded
document.addEventListener(‘DOMContentLoaded’, () => {
window.portfolio = new PortfolioManager();
});

// Global functions for admin panel (needed for onclick handlers)
function addExperience() {
window.portfolio.addExperience();
}

function addEducation() {
window.portfolio.addEducation();
}

function addProject() {
window.portfolio.addProject();
}

function saveData() {
window.portfolio.saveData();
}

function closeAdmin() {
window.portfolio.closeAdmin();
}

function showAdminLogin() {
window.portfolio.showAdminLogin();
}

// Intersection Observer for scroll animations
const observerOptions = {
threshold: 0.1,
rootMargin: ‘0px 0px -50px 0px’
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = ‘1’;
entry.target.style.transform = ‘translateY(0)’;
}
});
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener(‘DOMContentLoaded’, () => {
const elementsToAnimate = document.querySelectorAll(’.timeline-item, .education-item, .project-card’);

```
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
```

});

// Lazy loading for images
document.addEventListener(‘DOMContentLoaded’, () => {
const images = document.querySelectorAll(‘img’);
const imageObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const img = entry.target;
img.src = img.dataset.src || img.src;
img.classList.remove(‘lazy’);
imageObserver.unobserve(img);
}
});
});

```
images.forEach(img => {
    imageObserver.observe(img);
});
```

});

// Keyboard navigation
document.addEventListener(‘keydown’, (e) => {
// Close modals with Escape key
if (e.key === ‘Escape’) {
const videoModal = document.getElementById(‘videoModal’);
const adminPanel = document.getElementById(‘adminPanel’);

```
    if (videoModal.style.display === 'block') {
        window.portfolio.closeVideoModal();
    }
    if (adminPanel.style.display === 'block') {
        window.portfolio.closeAdmin();
    }
}
```

});

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
let timeout;
return function executedFunction(…args) {
const later = () => {
clearTimeout(timeout);
func(…args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}

// Apply debounced scroll handler
window.addEventListener(‘scroll’, debounce(() => {
if (window.portfolio) {
window.portfolio.handleScroll();
}
}, 10));
