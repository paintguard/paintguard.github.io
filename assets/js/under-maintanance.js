// Function to create and append the launch overlay
function createLaunchOverlay() {
  // Create overlay div
  const overlay = document.createElement('div');
  overlay.id = 'launch-overlay';
  
  // Create logo image
  const logo = document.createElement('img');
  logo.id = 'launch-logo';
  logo.src = 'assets/img/logo.png';
  logo.alt = 'Website Logo';
  
  // Create text element
  const text = document.createElement('div');
  text.id = 'launch-text';
  text.textContent = 'Get Ready – We’re Almost There!';
  
  // Append logo and text to overlay
  overlay.appendChild(logo);
  overlay.appendChild(text);
  
  // Append overlay to body
  document.body.appendChild(overlay);
}

// Load CSS dynamically
function loadOverlayCSS() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'assets/css/overlay.css';
  document.head.appendChild(link);
}

// Initialize overlay when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadOverlayCSS();
  createLaunchOverlay();
});

// To make the website live, comment out the entire script below:
/*
document.addEventListener('DOMContentLoaded', () => {
  loadOverlayCSS();
  createLaunchOverlay();
});
*/