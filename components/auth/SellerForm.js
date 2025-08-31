import { getCurrentUser, updateUser } from '../../data/authentication.js';
import { navigate } from '../../scripts/utils/navigation.js';
import Component from '../core/component.js';
import Toast from '../ui/toast.js';

export default class SellerForm extends Component {
    template() {
        return `
    <!-- SELLER FORM -->
    <form class="needs-validation" id="confirmForm" novalidate>

        <!-- Password -->
        <div class="mb-3">
            <label for="password" class="form-label">Enter your password. (not changed)</label>
            <input type="password" class="form-control" id="password" placeholder="Enter your password to continue" required>
            <div class="invalid-feedback" id="passwordError">Please enter a password.</div>
        </div>

        <!-- Terms -->
        <div class="mb-4 form-check">
            <input type="checkbox" class="form-check-input" id="terms" required />
            <label class="form-check-label" for="terms">
                I agree to the
                <a href="" data-bs-toggle="modal" data-bs-target="#termsModal">Terms & Conditions</a>
                and
                <a href='#/info/policy' target='_blank'>Privacy Policy</a>.
            </label>
            <div id="termsError" class="invalid-feedback d-none">
                You must accept the terms.
            </div>
        </div>

        <!-- Submit -->
        <div class="d-grid">
            <button class="btn btn-dark" type="submit">Register as Seller</button>
        </div>

    </form>
        `
    }

    script() {
        const currentUser = getCurrentUser();
        const form = document.getElementById('confirmForm');
        const pwEl = document.getElementById('password');
        const termsF = document.getElementById('terms');
        const termsErr = document.getElementById('termsError');

        // Real-time Terms Check
        termsF.addEventListener('change', () => {
            if (termsF.checked) {
                termsErr.classList.add('d-none');
                termsErr.classList.remove('d-block');
            } else {
                termsErr.classList.remove('d-none');
                termsErr.classList.add('d-block');
            }
        });

        // Form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate terms
            const isTermsValid = termsF.checked;
            if (!isTermsValid) {
                termsErr.classList.remove('d-none');
                termsErr.classList.add('d-block');
                e.stopPropagation();
                return;
            }

            // Validate password
            if (!pwEl.value) {
                Toast.notify("Enter your password unchanged", "warning");
                const pwError = document.getElementById('passwordError');
                pwError.textContent = 'Enter Password';
                pwEl.classList.add("is-invalid");
                return;
            }
            if (!(currentUser.password === pwEl.value)) {
                Toast.notify("❌ Wrong Password!", "danger");
                const pwError = document.getElementById('passwordError');
                pwError.textContent = 'Invalid Password';
                pwEl.classList.add("is-invalid");
                return;
            }

            // Success: update user role & status
            currentUser.role = "seller";
            currentUser.status = "inactive";
            updateUser(currentUser); 


            Toast.notify("✅ Success! Wait the confirmation message on your mail...", "success");
            setTimeout(() => navigate("/home"), 2000);
        });
    }
}