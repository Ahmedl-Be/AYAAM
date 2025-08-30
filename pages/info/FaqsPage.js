import View from "../../components/core/view.js";



export default class FaqsPage extends View {
    template() {
        return `
       <div class="faq-section" >
    <h2>Frequently Asked Questions</h2>
    <div class="accordion" id="faqAccordion">

      <!-- Q1 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="faqOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            What is AYAAM?
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="faqOne" data-bs-parent="#faqAccordion">
          <div class="accordion-body">
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
          <div class="accordion-body">
            You can sign up easily by clicking on the <a href="#/signup" target="_blank">Create Account</a> button, providing your details, and confirming your email.
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
          <div class="accordion-body">
            Yes, we value your privacy. All user data is encrypted and protected according to our <a href="#/privacy" target="_blank">Privacy Policy</a>.
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
          <div class="accordion-body">
            You can reach our support team anytime at <a href="mailto:support@ayaam.example">support@ayaam.example</a>.
          </div>
        </div>
      </div>

    </div>
  </div>
 
        `
    }

    script() {
      document.querySelectorAll(".tabs-nav .tab-link").forEach(tab => {
        tab.addEventListener("click", function () {
          document.querySelectorAll(".tabs-nav .tab-link").forEach(t => t.classList.remove("active"));
          this.classList.add("active");
        });
      });
    }

}