import { getData, setData } from './data-init.js';


export function validateSignUp() {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('signupForm');
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const repeatedPassword = document.getElementById('repeatedPassword');
        const terms = document.getElementById('terms');
        
        // Real-time validation for name
        name.addEventListener('blur', checkName);
        name.addEventListener('input', ()=>{clearError(name)});
        
        // Real-time validation for email
        email.addEventListener('blur', checkEmail);
        email.addEventListener('input', ()=>{clearError(email)});
        
        // Real-time validation for password
        password.addEventListener('blur', checkPassword);
        password.addEventListener('input', ()=>{clearError(password)});
        
        // Real-time password matching
        repeatedPassword.addEventListener('input', validatePasswordMatch);
        
        // Form submission
        form.addEventListener('submit', function(event) {
            // Validate all fields
            const isNameValid = checkName();
            const isEmailValid = checkEmail();
            const isPasswordValid = checkPassword();
            const isPasswordMatchValid = validatePasswordMatch();
            const isTermsValid = terms.checked;
            
            if (!isTermsValid) {
                document.getElementById('termsError').style.display = 'block';
            } else {
                document.getElementById('termsError').style.display = 'none';
            }
            
            // If any validation fails, prevent form submission
            if (!isNameValid || !isEmailValid || !isPasswordValid || !isPasswordMatchValid || !isTermsValid) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
        
        
/* ============== VALIDATION FUNCTIONS ================================ */
     /* === NAME === */   
        function checkName() {
            const nameValue = name.value.trim();
            const nameError = document.getElementById('nameError');
            
            if (!nameValue) {
                nameError.textContent = 'Name cannot be empty!';
                name.classList.add('is-invalid');
                return false;
            }
            
            if (nameValue.split(" ").length < 2) {
                nameError.textContent = 'Please enter your full name (first and last name)';
                name.classList.add('is-invalid');
                return false;
            }
            
            name.classList.remove('is-invalid');
            return true;
        }
            
            
    /* === EMAIL === */
        function checkEmail() {
            const emailValue = email.value.trim();
            const emailError = document.getElementById('emailError');

            if (!emailValue) {
                emailError.textContent = 'Email cannot be empty!';
                email.classList.add('is-invalid');
                return false;
            }
            
            if (!validateEmail(emailValue)) {
                emailError.textContent = 'Please enter a valid email address';
                email.classList.add('is-invalid');
                return false;
            }
            
            email.classList.remove('is-invalid');
            return true;
        }
            
            
    /* === PASSWORD === */
        function checkPassword() {
            const passwordValue = password.value;
            const passwordError = document.getElementById('passwordError');
            
            if (!passwordValue) {
                passwordError.textContent = 'Password cannot be empty!';
                password.classList.add('is-invalid');
                return false;
            }
            
            if (!validatePassword(passwordValue)) {
                passwordError.textContent = 'Password must have : \n - atleast 8 digits. \n- atleast 1 Capital letter \n- atleast 1 small letter \n- a special character';
                password.classList.add('is-invalid');
                return false;
            }
            
            password.classList.remove('is-invalid');
            return true;
        }
            
            
    /* === RE PASSWORD === */
        function validatePasswordMatch() {
            const passwordValue = password.value;
            const repeatedPasswordValue = repeatedPassword.value;
            const matchMessage = document.getElementById('passwordMatchMessage');
            
            if (!repeatedPasswordValue) {
                matchMessage.textContent = 'Enter Password again';
                matchMessage.className = 'mt-1 small text-danger';
                return false;
            }
            
            if (passwordValue !== repeatedPasswordValue) {
                matchMessage.textContent = '✗ Passwords do not match';
                matchMessage.className = 'mt-1 small text-danger';
                return false;
            }
            
            repeatedPassword.classList.remove('is-invalid');
            matchMessage.textContent = '✓ Passwords match';
            matchMessage.className = 'mt-1 small text-success';
            return true;
        }
        

    });
}

/* ===========function to validate email======= */
export function validateEmail(_email) {
    // Regular expression for email validation
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Return true if email matches regex, false otherwise
    return regex.test(_email);
}


/* ===========function to validate password======= */
export function validatePassword(_password) { 
    // Regular expression for password validation
    // Must be atleast 8 digits
    // Must have atleast 1 Capital letter
    // Must have atleast 1 small letter
    // Must have a special character
    
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Return true if password matches regex, false otherwise
    return regex.test(_password);
}
/* ==================RE PASSWORD=================== */
export function clearError(_element) { //takes a form input and resets it as valid
            _element.classList.remove('is-invalid')
        }