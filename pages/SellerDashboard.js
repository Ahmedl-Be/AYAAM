
import Navbar from "../components/landing/Nav.js";
import View from "../components/core/view.js";

export default class SellerDashboard extends View {
    template() {
        return `
            <header class="sticky-top bg-white" id='navbar'></header>
            <h1>Dashboardd</h1>
        `;
    }

    script() {
        this.mount(Navbar, "#navbar");
    }
}
