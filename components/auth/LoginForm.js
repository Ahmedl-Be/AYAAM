import { login, signup, validateEmail, validatePassword } from '../../data/authentication.js';
import { navigate } from '../../scripts/router.js';
import Component from '../core/component.js';

export default class LoginForm extends Component{
    template() {
      return `
    <!-- LOGIN FORM -->
              <form id="loginForm" class="">

        <!-- Email Field -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="email" required />
                    <div id="emailError" class="invalid-feedback">
                    Please enter a valid email.
                    </div>
                </div>

        <!-- Password Field -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                    type="password"
                    class="form-control"
                    id="password"
                    required
                    />
                    <div id="passwordError" class="invalid-feedback">
                    Password must be at least 8 characters.
                    </div>
                </div>

        <!-- Remember Me Checkbox -->
                <div class="mb-4 form-check">
                    <input type="checkbox" class="form-check-input" id="remember" />
                    <label class="form-check-label" for="remember">Keep Me Logged In</label>
                </div>

        <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100 py-2">
                    Log In
                </button>
                  `
    } 
    
    script() {
        const form = this.parent.querySelector('#loginForm');
        const emailF = document.getElementById('email');
        const passwordF = document.getElementById('password');
        const rememberF = document.getElementById('remember');

        
        // Real-time validation for email
        emailF.addEventListener('blur', checkEmail);
        emailF.addEventListener('input', ()=>{clearError(emailF)});
        
        let rememberMe = false;
        // Real-time Remember Check
        rememberF.addEventListener('change', () => {
            const rememberErr =document.getElementById('rememberError')
            if (rememberF.checked) {
                rememberMe = true;
            } else {
                rememberMe = false;

            }
        })

        // Form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const isEmailValid = checkEmail();
            if (!isEmailValid) {
                return;
            }
            
            const user = login(emailF.value.toLowerCase(), passwordF.value, rememberMe);
            if (!user) {
                const emailError = document.getElementById('emailError');
                const pwError = document.getElementById('passwordError');
                emailError.textContent = '';
                pwError.textContent = 'Invalid Email Or Password';
                emailF.classList.add("is-invalid");
                passwordF.classList.add("is-invalid");
                return;
            }

            // Redirect based on role
            switch (user.role) {
                case "admin":
                    navigate("/admin") ;
                    break;
                case "seller":
                    navigate("/seller");
                    break;
                default:
                    navigate("/home");
                    break;
            }
            

        });

        /* ============== VALIDATION FUNCTIONS ================================ */
            
    /* === EMAIL === */
        function checkEmail() {
            const emailValue = emailF.value.trim();
            const emailError = document.getElementById('emailError');

            if (!emailValue) {
                emailError.textContent = 'Email cannot be empty!';
                emailF.classList.add('is-invalid');
                return false;
            }
            
            if (!validateEmail(emailValue)) {
                emailError.textContent = 'Please enter a valid email address';
                emailF.classList.add('is-invalid');
                return false;
            }
            
            emailF.classList.remove('is-invalid');
            return true;
        }
    
    /* === CLEAR ERROR */
    function clearError(_element) { //takes a form input and resets it as valid
        _element.classList.remove('is-invalid')
    }

    }
}