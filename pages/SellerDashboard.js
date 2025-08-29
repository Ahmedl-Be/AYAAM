
import View from "../components/core/view.js";
import MainDasboard from "./seller/MainDashboard.js";
import SellerProducts from "./seller/SellerProducts.js";
import incomeingOrder from "./seller/IncomingOrders.js";
import AddProduct from "./seller/AddProduct.js";

export default class SellerDashboard extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Manage your store | AYAAM'
        }, _params);

    }
    template() {
        return `
<!-- Sidebar Toggle Button -->
    <button class="btn toggle-btn position-fixed top-0 start-0 m-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar">
        <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarLabel"><i class="fas fa-list"></i> القائمة</h5>
            <button type="button" class="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="nav flex-column gap-2">
                <li class="nav-item">
                    <a class="nav-link active" href="#/seller/dashboard"><i class="fas fa-box"></i> Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/seller/products"><i class="fas fa-box"></i> Products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/seller/incomeingOrders"><i class="fas fa-box"></i> Incoming Orders</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/seller/salesHistory"><i class="fas fa-box"></i> Sales History</a>
                </li>
            </ul>
        </div>
    </div>
    <div id="seller-dashbord"></div>
        `;
    }

    script() {
     this.subview(MainDasboard, {
                parent: "seller-dashbord",
                route: "dashboard",
                title: "seller - dashbord"
            });

      this.subview(SellerProducts, {
                parent: "seller-dashbord",
                route: "products",
                title: "seller - products"
            });

  this.subview(AddProduct, {
                parent: "seller-dashbord",
                route: "addproduct",
                title: "Add New Product"
            });

      this.subview(incomeingOrder, {
                parent: "seller-dashbord",
                route: "incomeingOrders",
                title: "seller - incomeingOrders"
            });
    }
}
