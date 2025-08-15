
import { setupLogin } from './scripts/auth.js';
import router from './scripts/routes.js';



window.addEventListener('load', () => {
    router('Admin')
    setupLogin();
});


