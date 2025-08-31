import View from "../../components/core/view.js";
import Toast from "../../components/ui/toast.js";
import { validateEmail } from "../../data/authentication.js";
import { localStore } from "../../scripts/utils/storage.js";

export default class ReachUsPage extends View {
  template() {
    return `
      <!-- Hero -->
      <header class="hero py-5 mb-4">
        <div class="container">
          <div class="row align-items-center justify-content-between g-3">
            <div class="col-lg-8">
              <span class="badge badge-brand rounded-pill mb-3">
                <i class="fa-solid fa-envelope"></i> Get in Touch
              </span>
              <h1 class="display-5 fw-bold mb-2">Reach Us</h1>
              <p class="lead text-muted mb-0">
                We’d love to hear from you! Choose the channel that works best for you.
              </p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <div class="text-muted">Customer Care: <strong>24/7</strong></div>
              <small class="d-block text-muted">
                Email us at 
                <a href="mailto:support@ayaam.com" class="text-decoration-underline">support@ayaam.com</a>
              </small>
            </div>
          </div>
        </div>
      </header>

      <!-- Main -->
      <main class="container pb-5">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            
            <!-- Contact Info Card -->
            <div class="policy-card p-4 p-md-5 mb-4">
              <h2 class="h4 mb-3">Contact Information</h2>
              <ul class="list-unstyled text-muted mb-0">
                <li class="mb-2"><i class="fa-solid fa-envelope me-2 text-primary"></i> 
                  <strong>Email:</strong> <a href="mailto:support@ayaam.com">support@ayaam.com</a>
                </li>
                <li class="mb-2"><i class="fa-solid fa-phone me-2 text-primary"></i> 
                  <strong>Phone:</strong> +20 123 456 789
                </li>
                <li><i class="fa-solid fa-location-dot me-2 text-primary"></i> 
                  <strong>Address:</strong> 123 AYAAM Street, Cairo, Egypt
                </li>
              </ul>
            </div>

<!-- Form Card -->
            <div class="policy-card p-4 p-md-5">
              <h2 class="h4 mb-3">Send us a Message</h2>
              <form id="reachForm" class="reach-form">
        <!-- Name Field -->
                <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="name" required />
                    <div id="nameError" class="invalid-feedback">
                    Please enter your full name.
                    </div>
                </div>

        <!-- Email Field -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="email" required />
                    <div id="emailError" class="invalid-feedback">
                    Please enter a valid email.
                    </div>
                </div>

        <!-- Message Field -->
                <div class="mb-3">
                  <label for="message" class="form-label">Message</label>
                  <textarea id="message" rows="4" class="form-control" required></textarea>
                </div>

        <!-- Form Submit -->
                <button type="submit" class="btn btn-primary">Send Message</button>
              </form>
            </div>

          </div>
        </div>
      </main>
    `;
  }

  script() {
    const tickets = localStore.read('tickets', []);
    const form = document.getElementById("reachForm");
    const nameEl = form.querySelector("#name");
    const emailEl = form.querySelector("#email");
    const messageEl = form.querySelector("#message");

    // Real-time validation for name
    nameEl.addEventListener('blur', checkName);
    nameEl.addEventListener('input', () => { clearError(nameEl) });

    // Real-time validation for email
    emailEl.addEventListener('blur', checkEmail);
    emailEl.addEventListener('input', () => { clearError(emailEl) });

    

/* ======= Form Submitting ====== */
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = nameEl.value.trim();
      const email = emailEl.value.trim().toLowerCase();
      const message = messageEl.value.trim();

      if (!validateEmail(email)) {
        Toast.notify("Please enter a valid email.", "danger");
        return;
      }

      if (!name || !email || !message) {
        Toast.notify("Please fill out all fields.", "danger");
        return;
      }
      const ticket = { name, email, message }
      tickets.push(ticket)
      console.log("Message Sent:", { name, email, message });
      localStore.write('tickets', tickets);

      Toast.notify("Thank you for reaching out! We’ll get back to you soon.", "success");
      form.reset();
    });


/* ============== VALIDATION FUNCTIONS ================================ */
    /* === NAME === */
    function checkName() {
      const nameValue = nameEl.value.trim();
      const nameError = document.getElementById('nameError');

      if (!nameValue) {
        nameError.textContent = 'Name cannot be empty!';
        nameEl.classList.add('is-invalid');
        return false;
      }

      if (nameValue.split(" ").length < 2) {
        nameError.textContent = 'Please enter your full name (first and last name)';
        nameEl.classList.add('is-invalid');
        return false;
      }

      nameEl.classList.remove('is-invalid');
      return true;
    }

    /* === EMAIL === */
    function checkEmail() {
      const emailValue = emailEl.value.trim();
      const emailError = document.getElementById('emailError');

      if (!emailValue) {
        emailError.textContent = 'Email cannot be empty!';
        emailEl.classList.add('is-invalid');
        return false;
      }

      if (!validateEmail(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        emailEl.classList.add('is-invalid');
        return false;
      }

      emailEl.classList.remove('is-invalid');
      return true;
    }

    /* === CLEAR ERROR */
    function clearError(_element) { //takes a form input and resets it as valid
      _element.classList.remove('is-invalid')
    }
  }
}
