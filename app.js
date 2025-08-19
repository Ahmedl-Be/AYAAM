import { validateSignUp } from './scripts/auth.js';
import { initRouter } from './scripts/routes.js';

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
  initRouter();
  validateSignUp()
});