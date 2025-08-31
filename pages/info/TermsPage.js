import View from "../../components/core/view.js";

export default class TermsPage extends View {
    template() {
        return `
      <!-- Hero -->
      <header class="hero py-5 mb-4">
        <div class="container">
          <div class="row align-items-center justify-content-between g-3">
            <div class="col-lg-8">
              <span class="badge badge-brand rounded-pill mb-3">
                <i class="fa-solid fa-scale-balanced"></i> Legal
              </span>
              <h1 class="display-5 fw-bold mb-2">Terms of Use</h1>
              <p class="lead text-muted mb-0">
                Please read these terms carefully before using AYAAM.  
                By accessing our platform, you agree to be bound by them.
              </p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <div class="text-muted">Last updated: <strong>August 29, 2025</strong></div>
              <small class="d-block text-muted">
                Questions?  
                <a href="mailto:support@ayaam.example" class="text-decoration-underline">support@ayaam.example</a>
              </small>
            </div>
          </div>
        </div>
      </header>

      <!-- Main -->
      <main class="container pb-5">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">

            <!-- Terms Accordion Card -->
            <div class="policy-card p-4 p-md-5">
              <div class="accordion" id="termsAccordion">

                <!-- 1 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      1. Acceptance of Terms
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      By accessing and using AYAAM, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use, along with our Privacy Policy. If you do not agree, please refrain from using our site.
                    </div>
                  </div>
                </div>

                <!-- 2 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      2. Use of the Website
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      You agree to use this website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their enjoyment of the site. Prohibited behavior includes harassing or causing distress to any individual, transmitting obscene or offensive content, or disrupting the normal flow of communication.
                    </div>
                  </div>
                </div>

                <!-- 3 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      3. Intellectual Property
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      All content, trademarks, and logos displayed on AYAAM are owned by or licensed to us. You may not reproduce, distribute, or exploit any part of the website without prior written consent.
                    </div>
                  </div>
                </div>

                <!-- 4 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFour">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      4. User Accounts
                    </button>
                  </h2>
                  <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      If you create an account on AYAAM, you are responsible for maintaining the confidentiality of your account information and all activities under your account. You must notify us immediately of any unauthorized use.
                    </div>
                  </div>
                </div>

                <!-- 5 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFive">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                      5. Limitation of Liability
                    </button>
                  </h2>
                  <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      AYAAM is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services. We do not guarantee uninterrupted access or that the website will be free from errors or viruses.
                    </div>
                  </div>
                </div>

                <!-- 6 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingSix">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                      6. Third-Party Links
                    </button>
                  </h2>
                  <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      Our site may contain links to external websites. We are not responsible for the content, privacy policies, or practices of these third-party sites.
                    </div>
                  </div>
                </div>

                <!-- 7 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingSeven">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                      7. Changes to Terms
                    </button>
                  </h2>
                  <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      We reserve the right to update or change these Terms of Use at any time. Any modifications will be effective immediately upon posting. Your continued use of the site constitutes acceptance of the revised terms.
                    </div>
                  </div>
                </div>

                <!-- 8 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingEight">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                      8. Governing Law
                    </button>
                  </h2>
                  <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      These Terms of Use are governed by and construed in accordance with the laws of your jurisdiction. Any disputes arising will be subject to the exclusive jurisdiction of the courts in that location.
                    </div>
                  </div>
                </div>

                <!-- 9 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingNine">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                      9. Contact Us
                    </button>
                  </h2>
                  <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#termsAccordion">
                    <div class="accordion-body text-muted">
                      If you have any questions about these Terms of Use, please contact us at
                      <a href="mailto:support@ayaam.com">support@ayaam.com</a>.
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    `;
    }

    script() { }
}