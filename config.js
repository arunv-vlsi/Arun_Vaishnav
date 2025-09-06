// Portfolio Configuration File
// Add this script tag to index.html: <script src="config.js"></script>

window.PortfolioConfig = {
// Admin Settings
admin: {
password: ‘admin123’, // Change this to a secure password
enableAdminPanel: true
},

```
// Site Information
site: {
    title: 'Design Verification Engineer Portfolio',
    description: 'Professional portfolio showcasing design verification expertise',
    author: 'John Doe',
    url: 'https://yourusername.github.io/portfolio'
},

// Theme Configuration
theme: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#3b82f6',
    
    // Animation Settings
    enableAnimations: true,
    animationDuration: '0.6s',
    
    // Layout Options
    heroStyle: 'gradient', // 'gradient', 'image', 'video'
    navigationStyle: 'fixed', // 'fixed', 'sticky', 'static'
    
    // Typography
    fontFamily: 'Inter, sans-serif',
    headingFont: 'Inter, sans-serif'
},

// Feature Toggles
features: {
    darkMode: false,
    contactForm: true,
    videoModals: true,
    smoothScrolling: true,
    lazyLoading: true,
    scrollAnimations: true,
    mobileMenu: true,
    socialLinks: true,
    downloadResume: false,
    blogSection: false,
    testimonials: false
},

// Social Media Links
social: {
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername',
    twitter: '',
    email: 'your.email@example.com',
    phone: '+1-555-123-4567',
    website: ''
},

// Content Configuration
content: {
    // Navigation Menu Items
    navigation: [
        { name: 'Home', href: '#home', icon: 'fas fa-home' },
        { name: 'About', href: '#about', icon: 'fas fa-user' },
        { name: 'Experience', href: '#experience', icon: 'fas fa-briefcase' },
        { name: 'Projects', href: '#projects', icon: 'fas fa-laptop-code' },
        { name: 'Contact', href: '#contact', icon: 'fas fa-envelope' }
    ],
    
    // Skills/Technologies
    skills: [
        'SystemVerilog',
        'UVM',
        'Verilog',
        'Python',
        'C++',
        'FPGA',
        'ModelSim',
        'VCS',
        'Cadence',
        'Synopsys',
        'Git',
        'Linux',
        'Bash/Shell',
        'MATLAB',
        'Vivado'
    ],
    
    // Default profile data (fallback if localStorage is empty)
    defaultProfile: {
        name: 'John Doe',
        title: 'Design Verification Engineer',
        bio: 'Passionate about ensuring hardware designs meet specifications through comprehensive verification methodologies and cutting-edge simulation techniques.',
        photo: 'https://via.placeholder.com/400x400/2563eb/ffffff?text=JD',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: '',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe'
    }
},

// SEO Settings
seo: {
    enableMetaTags: true,
    enableOpenGraph: true,
    enableTwitterCards: true,
    enableStructuredData: true,
    keywords: [
        'Design Verification Engineer',
        'SystemVerilog',
        'UVM',
        'FPGA',
        'Hardware Verification',
        'Silicon Valley Engineer'
    ]
},

// Analytics (optional)
analytics: {
    googleAnalyticsId: '', // Add your GA4 ID
    enableHotjar: false,
    hotjarId: ''
},

// Performance Settings
performance: {
    enableLazyLoading: true,
    optimizeImages: true,
    preloadCriticalResources: true,
    enableServiceWorker: false // Set to true for PWA features
},

// Form Configuration
forms: {
    contactForm: {
        action: '', // Add form handler URL (Formspree, Netlify, etc.)
        method: 'POST',
        enableRecaptcha: false,
        recaptchaSiteKey: ''
    }
},

// Custom CSS Variables (will override default theme)
customCSS: {
    ':root': {
        // Uncomment and modify as needed
        // '--primary-color': '#1e40af',
        // '--hero-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        // '--font-size-hero': '3.5rem'
    }
}
```

};

// Function to apply configuration
function applyConfiguration() {
const config = window.PortfolioConfig;

```
// Apply custom CSS variables
if (config.customCSS) {
    const style = document.createElement('style');
    let cssText = '';
    
    Object.entries(config.customCSS).forEach(([selector, properties]) => {
        cssText += `${selector} {\n`;
        Object.entries(properties).forEach(([prop, value]) => {
            cssText += `  ${prop}: ${value};\n`;
        });
        cssText += `}\n`;
    });
    
    style.textContent = cssText;
    document.head.appendChild(style);
}

// Apply SEO meta tags
if (config.seo.enableMetaTags) {
    const metaTags = [
        { name: 'description', content: config.site.description },
        { name: 'author', content: config.site.author },
        { name: 'keywords', content: config.seo.keywords.join(', ') }
    ];
    
    metaTags.forEach(tag => {
        let meta = document.querySelector(`meta[name="${tag.name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', tag.name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', tag.content);
    });
}

// Apply Open Graph tags
if (config.seo.enableOpenGraph) {
    const ogTags = [
        { property: 'og:title', content: config.site.title },
        { property: 'og:description', content: config.site.description },
        { property: 'og:url', content: config.site.url },
        { property: 'og:type', content: 'website' }
    ];
    
    ogTags.forEach(tag => {
        let meta = document.querySelector(`meta[property="${tag.property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', tag.property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', tag.content);
    });
}

// Apply Google Analytics
if (config.analytics.googleAnalyticsId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`;
    document.head.appendChild(script);
    
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.analytics.googleAnalyticsId}');
    `;
    document.head.appendChild(inlineScript);
}
```

}

// Apply configuration when DOM is loaded
document.addEventListener(‘DOMContentLoaded’, applyConfiguration);

// Export for use in main script
window.CONFIG = window.PortfolioConfig;
