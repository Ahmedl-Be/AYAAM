
import Navbar from "../components/landing/Nav.js";
import View from "../components/core/view.js";
import Component from "../components/core/component.js";
import { renderProducts } from "c:/Users/yasse/OneDrive/Desktop/admin-products.js";
import { Button } from "../components/ui/buttons.js";

export default class AdminDashboard extends View {
    template() {
        return `
            <div id='sidebar'></div>
            <div id='subview'></div>
        `;
    }

    script() {
        this.mount(Navbar, "#sidebar");
    }
}



export class Aside extends Component {
    template() {
        return `
         <!--.............................Header Section.......................... -->
        <div class="card border-0 shadow-lg mb-4">
            <div class="card-header bg-primary text-white py-3">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="card-title mb-1 h4">
                            <i class="fas fa-box me-2"></i>
                            Product Management
                        </h2>
                        <p class="card-text mb-0 opacity-75">
                            Manage and oversee all products in the system
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!--.....................................Stats Row....................................-->
                                <!--........Total Product card..........-->
        <div class="row g-3 mb-4">
            <div class="col-6 col-md-3">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-primary mb-1"></div>
                        <small class="text-muted text-uppercase fw-semibold">Total Products</small>
                    </div>
                </div>
            </div>
                                <!--............Stock card..............-->
            <div class="col-6 col-md-3">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-success mb-1"></div>
                        <small class="text-muted text-uppercase fw-semibold">In Stock</small>
                    </div>
                </div>
            </div>
                                <!--............items on sale Card..............-->
            <div class="col-6 col-md-3">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-info mb-1"></div>
                        <small class="text-muted text-uppercase fw-semibold">On Sale</small>
                    </div>
                </div>
            </div>
                                <!--............Categories Card..............-->
            <div class="col-6 col-md-3">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-warning mb-1"></div>
                        <small class="text-muted text-uppercase fw-semibold">Categories</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- .................................Toolbar ................................-->
        <div class="card border-0 shadow-lg mb-4">
            <div class="card-body">
                <div class="row g-3 align-items-center">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="input-group">
                            <span class="input-group-text bg-white border-end-0">
                                <i class="fas fa-search text-muted"></i>
                            </span>
                            <input type="text" class="form-control border-start-0" 
                                placeholder="Search products..." id="searchInput">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <select class="form-select" id="categoryFilter">
                            <option value="">All Categories</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- ..............Bulk Actions Bar (Display: none by default) ...............-->
        <div class="card border-0 shadow-sm mb-4 d-none" id="bulkActionsBar">
            <div class="card-body py-2">
                <div class="row align-items-center">
                    <div class="col">
                        <span class="fw-semibold">
                            <span class="text-danger fw-bold"  id="selectedCount">0</span> product(s) selected
                        </span>
                    </div>
                    <div class="col-auto">
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-danger" id="bulkDeleteBtn">
                                <i class="fas fa-trash me-1"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--.......................... Products Table .................................-->
        <div class="card border-1 shadow-sm mb-4">
            <!--.................Table Title...................-->
            <div class="card-header bg-white py-2 shadow-sm">
                <h5 class="card-title mb-0">
                    <i class="fas fa-table me-2 text-primary"></i>
                    Products List
                </h5>
            </div>
            <div class="card-body p-0">
                
            </div>
        </div>
    `;
    }

    script() {
        console.log('sadasdfas')
    }
}

