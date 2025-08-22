import SignupForm from "../components/auth/SignupForm.js";
import Navbar from "../components/landing/Nav.js";
import View from "../components/core/view.js";

export default class HomePage extends View {
  template() {
    return `
            <header class="sticky-top bg-white" id='navbar'></header>
        `;
  }

  script() {
    this.mount(Navbar, "#navbar");
  }
}

