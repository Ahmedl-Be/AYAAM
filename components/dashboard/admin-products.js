//admin-products page
import { checkStock, showAlert, showConfirmDialog, truncateText, getProductThumbnail } from "../../scripts/utils/dashboardUtils.js";
import { localStore } from "../../scripts/utils/storage.js";

// Global sorting state
let currentSort = { field: null, direction: 'asc' };

export function renderProducts(container) {
    const products = localStore.read("products") || [];

    container.innerHTML = `
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
                        <div class="h4 text-primary mb-1">${products.length}</div>
                        <small class="text-muted text-uppercase fw-semibold">Total Products</small>
                    </div>
                </div>
            </div>
                                <!--............Stock card..............-->
            <div class="col-6 col-md-3">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-success mb-1">${products.filter(p => p.stock && p.stock.length > 0).length}</div>
                        <small class="text-muted text-uppercase fw-semibold">In Stock</small>
                    </div>
                </div>
            </div>
                                <!--............items on sale Card..............-->
            <div class="col-6 col-md-3">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-info mb-1">${products.filter(p => p.sale > 0).length}</div>
                        <small class="text-muted text-uppercase fw-semibold">On Sale</small>
                    </div>
                </div>
            </div>
                                <!--............Categories Card..............-->
            <div class="col-6 col-md-3">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-warning mb-1">${[...new Set(products.map(p => p.category))].length}</div>
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
                ${products.length > 0 ? renderProductsTable(products) : renderEmptyState()}
            </div>
        </div>
    `;
    ProductEvents(container);
}

function renderCategoryFilter() {
    const select = document.getElementById("categoryFilter");
    select.innerHTML = `<option value="">All Categories</option>`; // default option

    const products = localStore.read("products") || [];
    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function renderProductsTable(products) {
    return `
        <div class="table-responsive ">
            <table class="table table-hover mb-0">
                <thead class="table-primary">
                    <tr>
                        <th scope="col" class="ps-4">
                            <input type="checkbox" class="form-check-input" id="selectAll">
                        </th>
                        <th scope="col" class="sortable-header" data-sort="id" style="cursor: pointer;" >
                            ID
                            <i class="fas fa-sort ms-1" data-field="id"></i>
                        </th>
                        <th scope="col" class="sortable-header" data-sort="name" style="cursor: pointer;">
                            Product 
                            <i class="fas fa-sort ms-1" data-field="name"></i>
                        </th>
                        <th scope="col" class="sortable-header" data-sort="category" style="cursor: pointer;">
                            Category 
                            <i class="fas fa-sort ms-1" data-field="category"></i>
                        </th>
                        <th scope="col" class="sortable-header" data-sort="price" style="cursor: pointer;">
                            Price 
                            <i class="fas fa-sort ms-1" data-field="price"></i>
                        </th>
                        <th scope="col" class="sortable-header" data-sort="stock" style="cursor: pointer;">
                            Stock 
                            <i class="fas fa-sort ms-1" data-field="stock"></i>
                        </th>
                        <th scope="col" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody id="productsTableBody">
                    ${products.map(product => renderProductRow(product)).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function renderProductRow(product) {
    return `
        <tr>
        <!-- checkbox column (#1st)-->
            <td class="ps-4">
                <input type="checkbox" class="form-check-input product-checkbox" value="${product.id}">
            </td>
            <!-- ID column (#2nd)-->
            <td>
                <div class="fw-semibold">${product.id}</div>
            </td>
            <!-- Product column (#3rd)-->
            <td>
                <div class="d-flex align-items-center">
                        <img 
                            src="${getProductThumbnail(product)}" 
                            alt="${product.name}" 
                            class="rounded me-3" 
                            style="width: 40px; height: 40px; object-fit: fill;" 
                        />
                    <div>
                        <div class="fw-semibold">${product.name}</div>
                        <small class="text-muted">${product.brand || 'No Brand'}</small>
                    </div>
                </div>
            </td>
            <!-- Category column (#4th)-->
            <td>
                <span class="badge bg-light text-dark">
                    ${product.category}
                    ${product.subcategory ? ` > ${product.subcategory}` : ''} 
                </span>
            </td>
            <!-- Price column (#5th)-->
            <td>
                <div>
                    ${product.sale > 0 ? `
                        <span class="text-decoration-line-through text-muted small">$${product.price}</span>
                        <div class="fw-bold text-danger">$${(product.price - product.sale).toFixed(2)}</div>
                        <small class="badge bg-danger">-$${product.sale}</small>
                    ` : `
                        <span class="fw-bold">$${product.price}</span>
                    `}
                </div>
            </td>
            <!-- Stock column (#6th)-->
            <td>
                ${checkStock(product)==="In Stock" ? `<span class="badge bg-success">${checkStock(product)}</span>` : `<span class="badge bg-danger">${checkStock(product)}</span>`}
            </td>
            <!-- Actions column (#7th)-->
            <td class="text-center">
                <div class="btn-group btn-group-sm" role="group">
                    <button class="btn  btn-sm  view-product-btn" 
                        data-product-id="${product.id}"
                        title="View Details"
                        data-bs-toggle="tooltip">
                        <i class="fas fa-eye text-info"></i>
                    </button>
                    <button class="btn btn-sm  remove-product" 
                        data-id="${product.id}" 
                        data-name="${product.name}"
                        title="Delete Product"
                        data-bs-toggle="tooltip">
                        <i class="fas fa-trash text-danger"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function renderEmptyState() {
    return `
        <div class="text-center py-5">
            <i class="fas fa-box text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">No Products Found</h4>
            <p class="text-muted">No products available in the system</p>
        </div>
    `;
}

//event listeners
function ProductEvents(container) {
    // Search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", handleProductSearch);      // ev1........needs fun #1
    }

    // Category filter
    const categoryFilter = document.getElementById("categoryFilter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", handleCategoryFilter);// ev2........needs fun #2
    }

    // Delete product buttons
    document.querySelectorAll(".remove-product").forEach((btn) => {
        btn.addEventListener("click", handleProductDelete);             // ev3........ needsfun #3
    });

    // View product buttons
    document.querySelectorAll(".view-product-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-product-id");
            viewProductDetails(productId);                               // ev4........needs fun #4
        });
    });

    // Bulk action button
    const bulkDeleteBtn = document.getElementById("bulkDeleteBtn");
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener("click", () => bulkAction("delete"));//ev5 ........needs fun #5
    }

    // Select all checkbox
    const selectAllCheckbox = document.getElementById("selectAll");
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("change", function () {
            const checkboxes = container.querySelectorAll(".product-checkbox");
            checkboxes.forEach((cb) => (cb.checked = this.checked)); // this = selectAllCheckbox
            toggleBulkActions();                                           // ev6........ needs fun #6
        });
    }

    // Individual checkboxes ( makes the bulk action button visible too)
    container.querySelectorAll(".product-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", toggleBulkActions);    // ev7........Same fun as above #6
    });

    // Sorting table
    container.querySelectorAll(".sortable-header").forEach((header) => {
        header.addEventListener("click", handleSort);                  // ev8........ needsfun #7
    });

    // tooltips (data-bs-toggle="tooltip") make the titles visible on hover using bootstrap js
    const btnToolTip = container.querySelectorAll('[data-bs-toggle="tooltip"]');
    btnToolTip.forEach((tp) => {
        new bootstrap.Tooltip(tp); //bootstrap js
    });

    toggleBulkActions(); //....fun #6
}


// Event Handlers
function handleProductSearch() { // for  event #1
    const searchTerm = this.value.toLowerCase();
    const container = document.getElementById("adminContent");
    const rows = container.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const productName = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
        const category = row.querySelector("td:nth-child(4)").textContent.toLowerCase();

        if (productName.includes(searchTerm) || category.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function handleCategoryFilter() { // for event #2
    const selectedCategory = this.value;
    const container = document.getElementById("adminContent");
    const rows = container.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const categoryText = row.querySelector("td:nth-child(4)").textContent;

        if (!selectedCategory || categoryText.includes(selectedCategory)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

async function handleProductDelete(e) { // for event #3
    e.preventDefault();
    const button = e.target.closest('button');
    if (!button) return;
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    if (!id || !name) return;

    const confirmed = await showConfirmDialog(`Are you sure you want to delete ${name}?`);
    if (!confirmed) return;

    const products = localStore.read("products") || [];
    const updated = products.filter((p) => p.id !== id);
    localStore.write("products", updated);
    showAlert(`${name} has been successfully deleted.`);

    const container = document.getElementById("adminContent");
    renderProducts(container);
    renderCategoryFilter();
}

export function viewProductDetails(productId) { // for event #4
    const products = localStore.read("products") || [];
    const product = products.find((p) => p.id === productId);

    if (product) {
        const modalHtml = `
            <div class="modal fade" id="productDetailsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-box-open me-2"></i>Product Details
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-4">
                                <div class="col-md-4 text-center">
                                    <img 
                                    src="${getProductThumbnail(product)}" 
                                    alt="${product.name}" 
                                    class="rounded me-3" 
                                    style="width: 100px; height: 100px; object-fit: fill;"/>
                                    <p class="fw-semibold" >${product.name}</p>
                                    <span class="badge bg-dark ">${product.category}</span>
                                </div>
                                <div class="col-md-8">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <label class="form-label text-muted small">DESCRIPTION</label>
                                            <div class="fw-semibold">${truncateText(product.description, 100) || "No description"}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">PRICE</label>
                                            <div class="fw-semibold">$${product.price}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">BRAND</label>
                                            <div class="fw-semibold">${product.brand || "No Brand"}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">MATERIAL</label>
                                            <div class="fw-semibold">${product.material || "Not specified"}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">SELLER ID</label>
                                            <div class="fw-semibold">${product.sellerId}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const existingModal = document.getElementById("productDetailsModal");
        if (existingModal) {
            existingModal.remove();
        }

        document.body.insertAdjacentHTML("beforeend", modalHtml);
        const modal = new bootstrap.Modal(document.getElementById("productDetailsModal"));
        modal.show();

        document.getElementById("productDetailsModal").addEventListener("hidden.bs.modal", function () {
            this.remove();
        });
    }
}

async function bulkAction(action) { //for event #5
    const selectedCheckboxes = document.querySelectorAll(".product-checkbox:checked");
    const selectedIds = Array.from(selectedCheckboxes).map((cb) => cb.value);
    if (selectedIds.length === 0) return;

    let products = localStore.read("products") || [];

    if (action === "delete") {
        const confirmed = await showConfirmDialog(`Are you sure you want to delete ${selectedIds.length} selected product(s)?`);
        if (!confirmed) return;

        products = products.filter((p) => !selectedIds.includes(p.id));
        showAlert(`${selectedIds.length} product(s) have been deleted successfully.`, "success");
    }

    localStore.write("products", products);
    const container = document.getElementById("adminContent");
    renderProducts(container);
    renderCategoryFilter();
}

function toggleBulkActions() { //for event #6 and #7
    const selectedCheckboxes = document.querySelectorAll(".product-checkbox:checked");
    const bulkActionsBar = document.getElementById("bulkActionsBar");

    if (selectedCheckboxes.length > 0) {
        if (bulkActionsBar) {
            bulkActionsBar.classList.remove("d-none");
            bulkActionsBar.querySelector("#selectedCount").textContent = selectedCheckboxes.length;
        }
    } else {
        if (bulkActionsBar) {
            bulkActionsBar.classList.add("d-none");
        }
    }
}

// ...................................Sorting Functions....................................................
function handleSort(e) {   // ......................for event #8
    const header = e.currentTarget;
    const field = header.getAttribute('data-sort'); //id, name, category, price, stock

    // Toggle direction if same field
    if (currentSort.field === field) { //If same col clicked again =>change sorting direction value "asc , desc"
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.field = field; // instead of default "null"
        currentSort.direction = 'asc'; //if diff col clicked =>change sorting direction value to "asc" default
    }

    // Sort products
    sortProducts(field, currentSort.direction);
}

function sortProducts(field, direction) {
    const products = localStore.read("products") || [];

    const sortedProducts = [...products].sort((a, b) => {
        let aVal, bVal;

        switch (field) {
            case 'id':
                aVal = a.id;
                bVal = b.id;
                break;
            case 'name':
                aVal = a.name.toLowerCase();
                bVal = b.name.toLowerCase();
                break;
            case 'category':
                aVal = a.category.toLowerCase();
                bVal = b.category.toLowerCase();
                break;
            case 'price':
                aVal = parseFloat(a.price);
                bVal = parseFloat(b.price);
                break;
            case 'stock':
                aVal = checkStock(a);
                bVal = checkStock(b);
                break;
            default:
                return 0;
        }

        // Handle string comparison
        if (typeof aVal === 'string' && typeof bVal === 'string') {
            if (direction === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        }

        // Handle numeric comparison
        if (direction === 'asc') {
            return aVal - bVal;
        } else {
            return bVal - aVal;
        }
    });

    // Re-render table body
    const tbody = document.getElementById('productsTableBody');
    if (tbody) {
        tbody.innerHTML = sortedProducts.map(product => renderProductRow(product)).join("");
        attachRowEventListeners();
    }
}
//reattaching events after sorting cause somehow it gets lost
function attachRowEventListeners() {
    // Re-attach delete buttons
    document.querySelectorAll(".remove-product").forEach((btn) => {
        btn.addEventListener("click", handleProductDelete);
    });

    // Re-attach view buttons
    document.querySelectorAll(".view-product-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-product-id");
            viewProductDetails(productId);
        });
    });

    // Re-attach checkboxes
    document.querySelectorAll(".product-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", toggleBulkActions);
    });

    // Re-attach tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tp) => {
        new bootstrap.Tooltip(tp);
    });
}



