//admin dashboard
import Views from "../components/core/view.js";
import { localStore } from './../scripts/utils/storage.js';

import { Sidebar } from "../components/ui/sidebar.js";
import { renderProducts } from "../components/dashboard/admin-products.js";
import { renderSellers } from "../components/dashboard/admin-sellers.js";
import { renderUsersStats, renderSellersStats, renderProductsStats } from "../components/dashboard/admin-stats.js";
import { getCurrentUser } from './../data/authentication.js';

export default class AdminDashboard extends Views{
    template(){
         const user = getCurrentUser();
        if (!user) return `<p>Please log in</p>`;

        const sections = [
            {
                id: "ecommerce",
                title: "E-Commerce",
                icon: "fas fa-store",
                items: [
                    { id: "products", title: "Products", icon: "fas fa-box" },
                    { id: "sellers", title: "Sellers", icon: "fas fa-users" }
                ]
            },
            {
                id: "stats",
                title: "Statistics",
                icon: "fas fa-chart-line",
                items: [
                    { id: "users", title: "Users", icon: "fas fa-user" },
                    { id: "sellers-count", title: "Sellers Count", icon: "fas fa-user-tag" },
                    { id: "products-count", title: "Products Count", icon: "fas fa-cube" }
                ]
            }
        ];

        return `
    <div class="container-fluid">
      <div class="row">
        ${Sidebar(sections)}

        <main class="col pt-3">
          <div class="page-header pt-3"></div>
          <div class="row">
            <div class="col-12" id="adminContent">
              <p class="text-muted text-center">Select a section from the sidebar.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;
    }
    script(){
        setupAdminLogic();
    }
}
// Setup Admin Logic - Navigation Handler
export function setupAdminLogic() {
    const adminContent = document.getElementById("adminContent");

    // Sidebar section clicks
    document.querySelectorAll("[data-section]").forEach((item) => {
        item.addEventListener("click", () => {
            const section = item.getAttribute("data-section");
            loadSection(section, adminContent);
        });
    });
}
// Section Router
export function loadSection(section, container) {
    switch (section) {
        case "products":
            renderProducts(container);
            break;
        case "sellers":
            renderSellers(container);
            break;
        case "users":
            renderUsersStats(container);
            break;
        case "sellers-count":
            renderSellersStats(container);
            break;
        case "products-count":
            renderProductsStats(container);
            break;
        default:
            container.innerHTML = `<p class="text-muted ps-5">Select a section from the sidebar.</p>`;
    }
}