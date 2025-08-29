import View from "../../components/core/view.js";
import Footer from "../../components/landing/Footer.js";



export default class TermsPage extends View {
    template() {
        return `
       <div class="container">
        <div class="faq-section">
            <h2 class="mb-4">Terms of Use</h2>
            <p>Welcome to AYAAM. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use. Please read them carefully before using our services.</p>


            <div class="accordion" id="termsAccordion">

                <!-- 1 -->
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        1. Acceptance of Terms
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#termsAccordion">
                    <div class="accordion-body">
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
                    <div class="accordion-body">
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
                    <div class="accordion-body">
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
                    <div class="accordion-body">
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
                    <div class="accordion-body">
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
                    <div class="accordion-body">
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
                    <div class="accordion-body">
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
                    <div class="accordion-body">
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
                    <div class="accordion-body">
                        If you have any questions about these Terms of Use, please contact us at
                        <a href="mailto:support@ayaam.com">support@ayaam.com</a>.
                    </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
 
        `
    }

    script() {

    }

}