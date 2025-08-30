//admin dashboard
import Views from "../components/core/view.js";
import { Sidebar,SidebarEvents } from "../components/ui/sidebar.js";
import { renderProducts } from "../components/dashboard/admin-products.js";
import { renderUsers } from "../components/dashboard/admin-users.js";
import { renderUsersStats, renderSellersStats, renderProductsStats } from "../components/dashboard/admin-stats.js";
import { getCurrentUser } from './../data/authentication.js';
import Toast from "../components/ui/toast.js";
import { renderOrdersDashboard } from "../components/dashboard/admin-orders.js";
import OrdersStatsPage from "./NotFound.js";
import ProductsPage from "./admin/ProductsPage.js";
import ProductsStatsPage from "./admin/ProductsStatsPage.js";
import SellerStatsPage from "./admin/SellerStatsPage.js";
import UsersPage from "./admin/UsersPage.js";
import UsersStatsPage from "./admin/UserStatsPage.js";


export default class AdminDashboard extends Views {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Admin Dashboard | AYAAM'
        }, _params);

    }
    template() {
        const user = getCurrentUser();
        if (!user) return `<p>Please log in</p>`;
        const userName = user.name;
        const sections = [
            {
                id: "ecommerce",
                title: "Management",
                icon: "fas fa-store",
                items: [
                    { id: "products", title: "Products", icon: "fas fa-box" ,url:"/products" },
                    { id: "users", title: "Users", icon: "fas fa-users", url:"/users" }
                ]
            },
            {
                id: "stats",
                title: "Statistics",
                icon: "fas fa-chart-line",
                items: [
                    { id: "sellers-count", title: "Sellers Stats", icon: "fas fa-user-tag", url:"/sellersStats" },
                    { id: "user-count", title: "User Stats", icon: "fas fa-user-tag", url:"/usersStats" },
                    { id: "products-count", title: "Products Stats", icon: "fas fa-cube", url:"/productsStats" },
                    { id: "orders-count", title: "Orders Stats", icon: "fa fa-shopping-cart" ,url:"/ordersStats"}
                ]
            }
        ];

        return `
        <div class="toast-body" id="toastMsg"></div>
            <div class="container-fluid">
                <div class="row">
                    ${Sidebar(sections,userName)}
                    
                    <main class="col pt-3" id="main">
                        <div class="page-header pt-3">
                            <h1 class="text-center">Admin Dashboard</h1>
                        </div>
                        <div class="row">
                            <div class="col-12" id="adminContent">
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        `;
    }
    script() {
        this.mount(Toast, "#toastMsg");
        this.subview(OrdersStatsPage, { parent: "adminContent", route: "ordersStats", title: "Orders Stats" });
        this.subview(ProductsPage, { parent: "adminContent", route: "products", title: "Products | AYAAM" });
        this.subview(ProductsStatsPage, { parent: "adminContent", route: "productsStats", title: "Products Stats" });
        this.subview(SellerStatsPage, { parent: "adminContent", route: "sellersStats", title: "Seller Stats" });
        this.subview(UsersPage, { parent: "adminContent", route: "users", title: "Users" });
        this.subview(UsersStatsPage, { parent: "adminContent", route: "usersStats", title: "Users Stats" });
        // setupAdminLogic();
         SidebarEvents()
    }
}
// Setup Admin Logic - Navigation Handler
// export function setupAdminLogic() {
//     const adminContent = document.getElementById("adminContent");

//     loadSection("users-stats", adminContent);

//     // Sidebar section clicks
//     document.querySelectorAll("[data-section]").forEach((item) => {
//         item.addEventListener("click", () => {
//             const section = item.getAttribute("data-section");
//             loadSection(section, adminContent);
//         });
//     });
// }
// Section Router
// export function loadSection(section, container) {
//     switch (section) {
//         case "products":
//             renderProducts(container);
//             break;
//         case "users":
//             renderUsers(container);
//             break;
//         case "users-count":
//             renderUsersStats(container);
//             break;
//         case "sellers-count":
//             renderSellersStats(container);
//             break;
//         case "products-count":
//             renderProductsStats(container);
//             break;
//         case "orders-count":
//             renderOrdersDashboard(container);
//             break;
//         default:
//             renderUsersStats(container);
//             break;
//     }
// }