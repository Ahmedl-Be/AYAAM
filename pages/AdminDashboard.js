//admin dashboard
import Views from "../components/core/view.js";
import { Sidebar } from "../components/ui/sidebar.js";
import { renderProducts } from "../components/dashboard/admin-products.js";
import { renderUsers } from "../components/dashboard/admin-users.js";
import { renderUsersStats, renderSellersStats, renderProductsStats } from "../components/dashboard/admin-stats.js";
import { getCurrentUser } from './../data/authentication.js';


export default class AdminDashboard extends Views{
    template(){
         const user = getCurrentUser();
        if (!user) return `<p>Please log in</p>`;

        const sections = [
            {
                id: "ecommerce",
                title: "Management",
                icon: "fas fa-store",
                items: [
                    { id: "products", title: "Products", icon: "fas fa-box" },
                    { id: "users", title: "Users", icon: "fas fa-users" }
                ]
            },
            {
                id: "stats",
                title: "Statistics",
                icon: "fas fa-chart-line",
                items: [
                    { id: "sellers-count", title: "Sellers Stats", icon: "fas fa-user-tag" },
                    { id: "user-count", title: "User Stats", icon: "fas fa-user-tag" },
                    { id: "products-count", title: "Products Stats", icon: "fas fa-cube" }
                ]
            }
        ];

        return `
            <div class="container-fluid">
                <div class="row">
                    ${Sidebar(sections)}
                    
                    <main class="col pt-3">
                        <div class="page-header pt-3">
                            <h1 class="text-center">Admin Dashboard</h1>
                        </div>
                        <div class="row">
                            <div class="col-12" id="adminContent">
                                <div class="alert alert-info text-center">
                                    <i class="fas fa-info-circle me-2"></i>
                                    Select a section from the sidebar to get started.
                                </div>
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
        case "users":
            renderUsers (container);
            break;
        case "users-count":
            renderUsersStats(container);
            break;
        case "sellers-count":
            renderSellersStats(container);
            break;
        case "products-count":
            renderProductsStats(container);
            break;
        default:
            renderUsersStats(container);
            break;
    }
}