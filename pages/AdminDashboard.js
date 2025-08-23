import View from "../components/core/view.js";
import UsersPage from "./admin/UsersPage.js";
import ProductsPage from "./admin/ProductsPage.js";
import { Anchor } from "../components/ui/links.js";
import Navbar from "../components/landing/Nav.js";

export default class AdminDashboard extends View {
    template() {
        return `
        <div id="slot"></div>
      <section>
        <h1>Admin Dashboard</h1>
        <nav>
          ${Anchor('Products', 'admin/products')} |
          ${Anchor('Users', 'admin/users')}
        </nav>
        <div id="subview-slot">

        </div>
        
        
      </section>
    `;
    }

    script() {
        this.mount(Navbar,'#slot');
        // register subviews
        this.subview(UsersPage, {
            parent: "subview-slot",
            route: "users",
            title: "Manage Users"
        });

        this.subview(ProductsPage, {
            parent: "subview-slot",
            route: "products",
            title: "Manage Products"
        });

    }
}