import View from "../../components/core/view.js";

export default class FaqsPage extends View {
  template() {
    return `
      <!-- Hero -->
      <header class="hero py-5 mb-4">
        <div class="container">
          <div class="row align-items-center justify-content-between g-3">
            <div class="col-lg-8">
              <span class="badge badge-brand rounded-pill mb-3">
                <i class="fa-solid fa-circle-question"></i> Help Center
              </span>
              <h1 class="display-5 fw-bold mb-2">Frequently Asked Questions</h1>
              <p class="lead text-muted mb-0">
                Find quick answers to the most common questions about using AYAAM.
              </p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <div class="text-muted">Need more help?</div>
              <small class="d-block text-muted">
                Contact us at 
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

            <!-- FAQ Accordion Card -->
            <div class="policy-card p-4 p-md-5">
              <div class="accordion" id="faqAccordion">

                <!-- Q1 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      What is AYAAM?
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="faqOne" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-muted">
                      AYAAM is a multi-actor e-commerce platform built to provide seamless online shopping and selling experiences.
                    </div>
                  </div>
                </div>

                <!-- Q2 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      How do I create an account?
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="faqTwo" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-muted">
                      You can sign up easily by clicking on the 
                      <a href="#/signup" target="_blank">Create Account</a> button, providing your details, and confirming your email.
                    </div>
                  </div>
                </div>

                <!-- Q3 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Is my data secure with AYAAM?
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="faqThree" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-muted">
                      Yes, we value your privacy. All user data is encrypted and protected according to our 
                      <a href="#/privacy" target="_blank">Privacy Policy</a>.
                    </div>
                  </div>
                </div>

                <!-- Q4 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqFour">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      How can I contact support?
                    </button>
                  </h2>
                  <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="faqFour" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-muted">
                      You can reach our support team anytime at 
                      <a href="mailto:support@ayaam.example">support@ayaam.example</a>.
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

  script() {

  }
}
