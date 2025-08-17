import { getData, setData } from './data-init.js';
import router from './routes.js';

export function setupLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const users = getData('users');
        const user = users.find(u => u.email === email && u.password === password);


        if (!user) {
            document.getElementById('loginError').textContent = "Invalid email or password";
            return;
        }

        setData('loggedUser', user);
        router(user.role)
        
    });
}
