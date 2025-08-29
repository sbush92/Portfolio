// Theme Toggle Functionality
class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    // Apply the saved theme on page load
    this.applyTheme(this.currentTheme);
    
    // Create and insert the theme toggle button
    this.createToggleButton();
    
    // Add event listener
    this.setupEventListeners();
  }

  createToggleButton() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.setAttribute('title', 'Toggle light/dark theme');
    
    // Add icon based on current theme
    this.updateButtonIcon(themeToggle);
    
    // Insert the button into the page
    document.body.appendChild(themeToggle);
    
    this.toggleButton = themeToggle;
  }

  updateButtonIcon(button) {
    const icon = this.currentTheme === 'dark' ? '☀️' : '🌙';
    button.innerHTML = icon;
  }

  setupEventListeners() {
    this.toggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Add keyboard support
    this.toggleButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    this.updateButtonIcon(this.toggleButton);
    
    // Save preference to localStorage
    localStorage.setItem('theme', this.currentTheme);
    
    // Update button title
    const newTitle = this.currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    this.toggleButton.setAttribute('title', newTitle);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
});