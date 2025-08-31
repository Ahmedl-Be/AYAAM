import View from "../../components/core/view.js";
import Toast from "../../components/ui/toast.js";

export default class ReachUsPage extends View {
    template() {
        return `
      <section class="container my-5">
        <h1 class="mb-4">Reach Us</h1>
        <p class="mb-3">We’d love to hear from you! You can reach us through the following channels:</p>
        
        <ul class="list-unstyled mb-4">
          <li><strong>Email:</strong> <a href="mailto:support@ayaam.com">support@ayaam.com</a></li>
          <li><strong>Phone:</strong> +20 123 456 789</li>
          <li><strong>Address:</strong> 123 AYAAM Street, Cairo, Egypt</li>
        </ul>

        <h2 class="h4 mb-3">Send us a message</h2>
        <form id="reachForm" class="reach-form">
          <div class="mb-3">
            <label for="name" class="form-label">Your Name</label>
            <input type="text" id="name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Your Email</label>
            <input type="email" id="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" rows="4" class="form-control" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      </section>
    `;
    }

    script() {
        const form = document.getElementById("reachForm");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.querySelector("#name").value.trim();
            const email = form.querySelector("#email").value.trim();
            const message = form.querySelector("#message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields.");
                return;
            }

            console.log("Message Sent:", { name, email, message });

            Toast.notify("Thank you for reaching out! We’ll get back to you soon.","success");
            form.reset();
        });
    }
}