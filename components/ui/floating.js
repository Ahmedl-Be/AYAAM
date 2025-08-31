import Component from "../core/component.js";

export default class FloatBtns extends Component {

    template() {
        return `
          <div class="floating-buttons">
<!-- Scroll to Top -->
            <button id="scrollTopBtn" class="btn" title="Back to Top">
                <i class="fa-solid fa-arrow-up"></i>
            </button>
<!-- Customer Support -->
            <button id="supportBtn" class="btn" title="Customer Support">
                <a href="mailto:support@ayaam.example" style="text-decoration: none; color: white;">
                    <i class="fa-solid fa-headset"></i>
                </a>
            </button>
        </div>
        ` 
    }


    script() {
        const scrollTopBtn = document.getElementById("scrollTopBtn");
        const supportBtn = document.getElementById("supportBtn");

        // Show/hide scroll to top button with fade effect
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                scrollTopBtn?.classList.add("show-btn");
            } else {
                scrollTopBtn?.classList.remove("show-btn");
            }
        });

        // Scroll to top
        scrollTopBtn?.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

    }
}