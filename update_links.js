const fs = require('fs');
const path = require('path');

// Get all HTML files in the current directory
const files = fs.readdirSync('.').filter(file => file.endsWith('.html'));

// Mapping of old links to new clean URLs
const linkMap = {
    'href="home.html"': 'href="/"',
    'href="about.html"': 'href="/about"',
    'href="services.html"': 'href="/services"',
    'href="projects.html"': 'href="/projects"',
    'href="experience.html"': 'href="/experience"',
    'href="testimonials.html"': 'href="/testimonials"',
    'href="contact.html"': 'href="/contact"',
    'href="socials.html"': 'href="/socials"',
    // Also handle links with class="active"
    'href="home.html" class="active"': 'href="/" class="active"',
    'href="about.html" class="active"': 'href="/about" class="active"',
    'href="services.html" class="active"': 'href="/services" class="active"',
    'href="projects.html" class="active"': 'href="/projects" class="active"',
    'href="experience.html" class="active"': 'href="/experience" class="active"',
    'href="testimonials.html" class="active"': 'href="/testimonials" class="active"',
    'href="contact.html" class="active"': 'href="/contact" class="active"',
    'href="socials.html" class="active"': 'href="/socials" class="active"',
};

// Process each HTML file
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace all occurrences of old links with new clean URLs
    Object.entries(linkMap).forEach(([oldLink, newLink]) => {
        content = content.split(oldLink).join(newLink);
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated links in ${file}`);
});

console.log('All HTML files have been updated with clean URLs!');
