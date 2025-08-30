export default function TermsModal() {
    return `
        <div class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true" data-fade>
  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content rounded-3 shadow-lg">
      <div class="modal-header">
        <h5 class="modal-title" id="termsModalLabel">Terms & Conditions</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      
        <h6>1. Acceptance of Terms</h6>
        <p>By accessing and using AYAAM, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use.</p>

        <h6>2. Use of Service</h6>
        <p>AYAAM provides a multi-actor e-commerce platform. Users agree to use the platform responsibly and comply with applicable laws.</p>

        <h6>3. Accounts</h6>
        <p>You are responsible for maintaining the confidentiality of your account and password, and for all activities under your account.</p>

        <h6>4. Intellectual Property</h6>
        <p>All content, trademarks, and code on AYAAM are protected. Unauthorized use is prohibited.</p>

        <h6>5. Limitation of Liability</h6>
        <p>AYAAM is not liable for damages arising from misuse of the platform.</p>

        <h6>6. Changes to Terms</h6>
        <p>We reserve the right to update or modify these Terms & Conditions at any time. Continued use signifies acceptance.</p>

        <h6>7. Contact Us</h6>
        <p>If you have questions about these Terms & Conditions, please contact us at
          <a href="mailto:support@ayaam.com">support@ayaam.com</a>.
        </p>
      </div>

      <div class="modal-footer" data-fade>
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    `
}