
import Navbar from "../components/landing/Nav.js";
import View from "../components/core/view.js";

export default class SellerDashboard extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Manage your store | AYAAM'
        }, _params);

    }
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
