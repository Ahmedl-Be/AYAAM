//admin seller page
import { getData, setData,capitalizeWords,generateId,getInitials,getRandomColor, formatDate,showAlert, showConfirmDialog} from "../../scripts/data-init.js";
import User from "../../models/UserModel.js";
// import {} from "./admin-utils.js";

export function renderSellers(container) {
    const users = getData("users") || [];
    const sellers = users.filter((u) => u.role === "Seller");

    container.innerHTML = `
        <!--.............................Header Section.......................... -->
        <div class="card border-0 shadow-lg mb-4">
            <div class="card-header bg-primary text-white py-3">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="card-title mb-1 h4">
                            <i class="fas fa-users me-2"></i>
                            Seller Management
                        </h2>
                        <p class="card-text mb-0 opacity-75">
                            Manage and oversee all seller accounts
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!--.............................. Stats Row.................................-->
        <div class="row g-3 mb-4">
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-primary mb-1">${sellers.length}</div>
                        <small class="text-muted text-uppercase fw-semibold">Total Sellers</small>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-success mb-1">
                            ${sellers.filter((s) => s.status === "active" || !s.status).length}
                        </div>
                        <small class="text-muted text-uppercase fw-semibold">Active</small>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-info mb-1">
                            ${sellers.filter((s) => s.joinDate &&
        // check if the seller joined in the last 30 days and reurn the length
        new Date(s.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                        </div>
                        <small class="text-muted text-uppercase fw-semibold">New This Month</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- .................................Toolbar ................................-->
        <div id="toolbarStart"></div>
        <div class="card border-0 shadow-lg mb-4">
            <div class="card-body">
                <div class="row g-3 align-items-center">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="input-group">
                            <span class="input-group-text bg-white border-end-0">
                                <i class="fas fa-search text-muted"></i>
                            </span>
                            <input type="text" class="form-control  border-start-0" 
                                placeholder="Search sellers..." id="searchInput">
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 ms-auto text-end">
                        <button class="btn btn-primary" id="addSellerBtn">
                            <i class="fas fa-plus me-2"></i>Add New Seller
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ..............Bulk Actions Bar (Display: none by default) ...............-->
        <!-- ..........only displayed when any of the checkboxes is checked........-->
        <div class="card border-0 shadow-sm mb-4 d-none" id="bulkActionsBar">
            <div class="card-body py-2">
                <div class="row align-items-center">
                    <div class="col">
                        <span class="fw-semibold">
                            <span id="selectedCount">0</span> seller(s) selected
                        </span>
                    </div>
                    <div class="col-auto">
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-success" id="bulkActivateBtn">
                                <i class="fas fa-check me-1"></i>Activate
                            </button>
                            <button class="btn btn-outline-warning" id="bulkDeactivateBtn">
                                <i class="fas fa-pause me-1"></i>Deactivate
                            </button>
                            <button class="btn btn-outline-danger" id="bulkDeleteBtn">
                                <i class="fas fa-trash me-1"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--.......................... Sellers Table .................................-->
        <div class="card border-1 shadow-sm mb-4">
        <!--.................Table Title...................-->
            <div class="card-header bg-white py-2 shadow-sm ">
                <h5 class="card-title mb-0">
                    <i class="fas fa-table me-2 text-primary"></i>
                    Sellers List
                </h5>
            </div>
        <!-- .......display seller table if there are sellers , if its empty display empty state..........-->
            <div class="card-body p-0">
                ${sellers.length > 0 ? renderSellersTable(sellers) : renderEmptyState()}
            </div>
        </div>

        <!-- ..................................Add Seller Form ............................-->
        <!-- .......Display none by default, only displayed when add new seller button is clicked ....................-->

        <div class="card border-0 shadow-lg d-none" id="sellerForm">
            <div class="card-header bg-primary text-white">
                <h5 class="card-title mb-0">
                    <i class="fas fa-user-plus me-2"></i>
                    Add New Seller
                </h5>
            </div>
            <div class="card-body">
                ${renderSellerForm()}
            </div>
        </div>
    `;

    SellerEvents(container);
}

function renderSellersTable(sellers) {
    return `
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="table-primary">
                    <tr>
                        <th scope="col" class="ps-4">
                            <input type="checkbox" class="form-check-input" id="selectAll">
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">Seller</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Joined Date</th>
                        <th scope="col" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${sellers.map(seller => renderSellerRow(seller)).join("")}
                </tbody>
            </table>
        </div>
    `;
}
function renderSellerRow(seller) {
    return `
    
        <tr>
            <td class="ps-4">
                <!--...............the check box holds the sellerid value...............-->
                <input type="checkbox" class="form-check-input seller-checkbox" value="${seller.id}">
            </td>
                        <td>
                <div class="fw-semibold">${seller.id}</div>
            </td>
            <td>
                <!--....the seller's name in circle with random colors formatted with initials(1st letters capital).....-->
                <div class="d-flex align-items-center">

                    <div  ${getRandomColor()}" 
                    style="width: 40px; height: 40px; font-size: 0.875rem; font-weight: bold;">
                        ${getInitials(seller.name)}
                    </div>
                    <div>
                        <div class="fw-semibold">${seller.name}</div>
                        <small class="text-muted">${seller.phone || "No Phone"}</small>
                    </div>
                </div>
            </td>
            <td>
                <a href="mailto:${seller.email}" class="text-decoration-none">
                    ${seller.email}
                </a>
            </td>
            <td>
                <span class="badge ${seller.status === "active" ? "bg-success" : "bg-secondary"}">
                    <i class="fas fa-circle me-1" style="font-size: 0.5rem;"></i>
                    ${(seller.status || "Active").charAt(0).toUpperCase() + (seller.status || "Active").slice(1)}
                </span>
            </td>
            <td>${formatDate(seller.joinDate)}</td>
            <!--...............the action buttons(assingned to each seller by id)...........-->
            <td class="text-center">
                <div class="btn-group btn-group-sm" role="group">
                    <button class="btn btn-outline-info btn-sm view-seller-btn" 
                        data-seller-id="${seller.id}"
                        title="View Details"
                        data-bs-toggle="tooltip">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline-primary btn-sm edit-seller-btn" 
                        data-seller-id="${seller.id}"
                        title="Edit Seller"
                        data-bs-toggle="tooltip">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm remove-seller" 
                        data-id="${seller.id}" 
                        data-name="${seller.name}"
                        title="Delete Seller"
                        data-bs-toggle="tooltip">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

// when there are no sellers render the empty state 
//in our case it wont happen without deleting the existing sellers
function renderEmptyState() {
    return `
        <div class="text-center py-5">
            <i class="fas fa-store text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">No Sellers Found</h4>
            <p class="text-muted">Start by adding your first seller to the platform</p>
        </div>
    `;
}
//adding new seller form
function renderSellerForm() {
    return `
        <form id="newSellerForm" class="needs-validation" novalidate>
            <div class="row g-3">
                <div class="col-md-6">
                    <label for="sellerName" class="form-label">
                        <i class="fas fa-user me-1 text-primary"></i>Full Name
                    </label>
                    <input type="text" class="form-control" id="sellerName" 
                        placeholder="Enter full name" required>
                    <div class="invalid-feedback">
                        Please provide a valid name.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="sellerEmail" class="form-label">
                        <i class="fas fa-envelope me-1 text-primary"></i>Email Address
                    </label>
                    <input type="email" class="form-control" id="sellerEmail" 
                        placeholder="Enter email address" required>
                    <div class="invalid-feedback">
                        Please provide a valid email address.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="sellerPassword" class="form-label">
                        <i class="fas fa-lock me-1 text-primary"></i>Password
                    </label>
                    <input type="password" class="form-control" id="sellerPassword" 
                        placeholder="Enter password" required minlength="6">
                    <div class="invalid-feedback">
                        Password must be at least 6 characters long.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="sellerPhone" class="form-label">
                        <i class="fas fa-phone me-1 text-primary"></i>Phone Number
                    </label>
                    <input type="tel" class="form-control" id="sellerPhone" 
                        placeholder="Enter phone number" required>
                    <div class="invalid-feedback">
                        Please enter a valid phone number.
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary me-2">
                        <i class="fas fa-check me-2"></i>
                        <span>Save Seller</span>
                    </button>
                    <button type="button" class="btn btn-outline-secondary" id="cancelBtn">
                        <i class="fas fa-times me-2"></i>Cancel
                    </button>
                </div>
            </div>
        </form>
    `;
}

function SellerEvents(container) {
    // Add seller button
    document.getElementById("addSellerBtn")?.addEventListener("click", () => {
        const form = document.getElementById("sellerForm");
        form.classList.toggle("d-none");
        if (!form.classList.contains("d-none")) {
            document.getElementById("sellerName").focus();
        }
    });

    // Cancel button
    document.getElementById("cancelBtn")?.addEventListener("click", () => {
        document.getElementById("sellerForm").classList.add("d-none");
        document.getElementById("newSellerForm").reset();
        document.getElementById("newSellerForm").classList.remove("was-validated");
    });


    // Form submission
    const newSellerForm = document.getElementById("newSellerForm");
    if (newSellerForm) {
        newSellerForm.addEventListener("submit", handleSellerFormSubmit);
    }

    // Delete seller buttons
    document.querySelectorAll(".remove-seller").forEach((btn) => {
        btn.addEventListener("click", handleSellerDelete);
    });

    // Edit seller buttons (in action column)
    document.querySelectorAll(".edit-seller-btn")?.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const sellerId = btn.getAttribute("data-seller-id");
            editSeller(sellerId);
        });
    });

    // View seller buttons
    document.querySelectorAll(".view-seller-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const sellerId = btn.getAttribute("data-seller-id");
            viewSellerDetails(sellerId);
        });
    });

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", handleSellerSearch);
    }

    // Bulk action buttons
    const bulkActivateBtn = document.getElementById("bulkActivateBtn");
    if (bulkActivateBtn) {
        bulkActivateBtn.addEventListener("click", () => bulkAction("activate"));
    }

    const bulkDeactivateBtn = document.getElementById("bulkDeactivateBtn");
    if (bulkDeactivateBtn) {
        bulkDeactivateBtn.addEventListener("click", () => bulkAction("deactivate"));
    }

    const bulkDeleteBtn = document.getElementById("bulkDeleteBtn");
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener("click", () => bulkAction("delete"));
    }

    // Select all checkbox
    const selectAllCheckbox = document.getElementById("selectAll");
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("change", function () {
            const checkboxes = container.querySelectorAll(".seller-checkbox");
            checkboxes.forEach((cb) => (cb.checked = this.checked));
            updateBulkActionsVisibility();
        });
    }

    // Individual checkboxes
    container.querySelectorAll(".seller-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", updateBulkActionsVisibility);
    });

    // Initialize tooltips
    const tooltipTriggerList = container.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    updateBulkActionsVisibility();
}

// Event Handlers
function handleSellerFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.checkValidity()) {
        const users = getData("users") || [];

        // Check if email already exists
        if (users.find((u) => u.email === document.getElementById("sellerEmail").value)) {
            showAlert("Email address already exists!", "danger");
            return;
        }
        // if everything is ok, add new seller>>>
        const formattedName = capitalizeWords(document.getElementById("sellerName").value); // capitalize Full Name
        const sName = document.getElementById("sellerName").value;

        const newSeller = new User(
            generateId("Seller", `${sName}`), // generate unique ID
            formattedName,
            document.getElementById("sellerEmail").value,
            document.getElementById("sellerPassword").value,
            "Seller",
            document.getElementById("sellerPhone").value,
            "active",
            new Date(), //creation date (joinDate)

        );
        users.push(newSeller);
        setData("users", users);

        // Reset form and hide it
        e.target.reset();
        e.target.classList.remove("was-validated");
        document.getElementById("sellerForm").classList.add("d-none");
        showAlert("New seller has been successfully added", "success"
        );

        // Re-render sellers
        const container = document.getElementById("adminContent");
        renderSellers(container);
    }

    e.target.classList.add("was-validated");
}

function handleSellerDelete(e) {
    e.preventDefault();
    const id = e.target.closest('button').getAttribute("data-id");
    const name = e.target.closest('button').getAttribute("data-name");

    if (showConfirmDialog(`Are you sure you want to delete ${name}?`,`Delete ${name}`)) {
        const users = getData("users") || [];
        const updated = users.filter((u) => u.id != id);
        localStorage.setItem("users", JSON.stringify(updated));
        showAlert(`${name} has been successfully deleted.`);

        // Re-render sellers
        const container = document.getElementById("adminContent");
        renderSellers(container);
    }
}

function handleSellerSearch() {
    const searchTerm = this.value.toLowerCase();
    const container = document.getElementById("adminContent");
    const rows = container.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const name = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
        const email = row.querySelector("td:nth-child(4)").textContent.toLowerCase();

        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Seller Management Functions
export function viewSellerDetails(sellerId) {
    const users = getData("users") || [];
    const seller = users.find((u) => u.id == sellerId);

    if (seller) {
        const modalHtml = `
            <div class="modal fade" id="sellerDetailsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-user-circle me-2"></i>Seller Details
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-4">
                                <div class="col-md-4 text-center">
                                    <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" 
                                        style="width: 80px; height: 80px; font-size: 2rem; font-weight: bold;">
                                        ${getInitials(seller.name)}
                                    </div>
                                    <h5>${seller.name}</h5>
                                    <span class="badge ${seller.status === "active" || !seller.status ? "bg-success" : "bg-secondary"}">
                                        ${(seller.status || "Active").charAt(0).toUpperCase() + (seller.status || "Active").slice(1)}
                                    </span>
                                </div>
                                <div class="col-md-8">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <label class="form-label text-muted small">EMAIL ADDRESS</label>
                                            <div class="fw-semibold">${seller.email}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">PHONE NUMBER</label>
                                            <div class="fw-semibold">${seller.phone || "Not provided"}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">USER ID</label>
                                            <div class="fw-semibold">#${seller.id}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">ROLE</label>
                                            <div class="fw-semibold">${seller.role}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">JOINED DATE</label>
                                            <div class="fw-semibold">${formatDate(seller.joinDate)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="editSellerFromDetailsBtn" data-seller-id="${seller.id}">
                                <i class="fas fa-pencil me-2"></i>Edit Seller
                            </button>
                            <a href="mailto:${seller.email}" class="btn btn-success">
                                <i class="fas fa-envelope me-2"></i>Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById("sellerDetailsModal");
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to DOM and show it
        document.body.insertAdjacentHTML("beforeend", modalHtml);
        const modal = new bootstrap.Modal(document.getElementById("sellerDetailsModal"));
        modal.show();

        // Add event listener for edit button in modal
        const editBtn = document.getElementById("editSellerFromDetailsBtn");
        if (editBtn) {
            editBtn.addEventListener("click", function () {
                const sellerId = this.getAttribute("data-seller-id");
                modal.hide();
                editSeller(sellerId);
            });
        }

        // Clean up modal after it's hidden
        document.getElementById("sellerDetailsModal").addEventListener("hidden.bs.modal", function () {
            this.remove();
        });
    }
}

export function editSeller(sellerId) {
    const users = getData("users") || [];
    const seller = users.find((u) => u.id == sellerId);

    if (seller) {
        const editModalHtml = `
            <div class="modal fade" id="editSellerModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-edit me-2"></i>Edit Seller
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editSellerForm" class="needs-validation" novalidate>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="editSellerName" class="form-label">
                                            <i class="fas fa-user me-1 text-primary"></i>Full Name
                                        </label>
                                        <input type="text" class="form-control" id="editSellerName" 
                                               value="${seller.name}" required>
                                        <div class="invalid-feedback">
                                            Please provide a valid name.
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="editSellerEmail" class="form-label">
                                            <i class="fas fa-envelope me-1 text-primary"></i>Email Address
                                        </label>
                                        <input type="email" class="form-control" id="editSellerEmail" 
                                               value="${seller.email}" required>
                                        <div class="invalid-feedback">
                                            Please provide a valid email address.
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="editSellerPhone" class="form-label">
                                            <i class="fas fa-phone me-1 text-primary"></i>Phone Number
                                        </label>
                                        <input type="tel" class="form-control" id="editSellerPhone" 
                                               value="${seller.phone || ""}" placeholder="Enter phone number" required >
                                    </div>
                                    <div class="col-md-6">
                                        <label for="editSellerStatus" class="form-label">
                                            <i class="fas fa-toggle-on me-1 text-primary"></i>Status
                                        </label>
                                        <select class="form-select" id="editSellerStatus">
                                            <option value="active" ${seller.status === "active" || !seller.status ? "selected" : ""}>Active</option>
                                            <option value="inactive" ${seller.status === "inactive" ? "selected" : ""}>Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="updateSellerBtn" data-seller-id="${seller.id}">
                                <i class="fas fa-save me-2"></i>Update Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Remove existing modal if any
        document.getElementById("editSellerModal")?.remove();
        // Add modal to DOM and show it
        document.body.insertAdjacentHTML("beforeend", editModalHtml);
        const modal = new bootstrap.Modal(document.getElementById("editSellerModal"));
        modal.show();

        // Add event listener for update button
        document.getElementById("updateSellerBtn")?.addEventListener("click", function () {
            const sellerId = this.getAttribute("data-seller-id");
            updateSeller(sellerId);
        });

        // Clean up modal after it's hidden
        document.getElementById("editSellerModal").addEventListener("hidden.bs.modal", function () {
            this.remove();
        });
    }
}

export function updateSeller(sellerId) {
    const users = getData("users") || [];
    //check if user exists and is seller then returns its index or -1 if not fount
    const sellerIndex = users.findIndex((u) => u.id == sellerId);

    if (sellerIndex !== -1) {
        const form = document.getElementById("editSellerForm");

        if (form.checkValidity()) {
            const updatedName = document.getElementById("editSellerName").value;
            const updatedEmail = document.getElementById("editSellerEmail").value;
            const updatedPhone = document.getElementById("editSellerPhone").value;
            const updatedStatus = document.getElementById("editSellerStatus").value;

            // Check if email already exists for other users except the one being updated(the seller can keep his old mail when updating his data)
            const emailExists = users.find((u) => u.email === updatedEmail && u.id != sellerId); //(&& u.id !== sellerId  important)
            if (emailExists) {
                showAlert("Email address already exists for another user!", "danger");
                return;
            }
            // Update seller data
            users[sellerIndex].name = updatedName;
            users[sellerIndex].email = updatedEmail;
            users[sellerIndex].phone = updatedPhone;
            users[sellerIndex].status = updatedStatus;

            // Save to localStorage
            localStorage.setItem("users", JSON.stringify(users));

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("editSellerModal"));
            modal.hide();

            showAlert(`${updatedName} has been successfully updated.`);

            // Re-render the sellers table
            const container = document.getElementById("adminContent");
            renderSellers(container);
        } else {
            form.classList.add("was-validated");
        }
    }
}

// Bulk Actions
function updateBulkActionsVisibility() {
    const selectedCheckboxes = document.querySelectorAll(".seller-checkbox:checked");
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

export function bulkAction(action) {
    const selectedCheckboxes = document.querySelectorAll(".seller-checkbox:checked");
    const selectedIds = Array.from(selectedCheckboxes).map((cb) => cb.value);//every checkbox holds already holds the id
    if (selectedIds.length === 0) return;

    let users = getData("users") || [];
    if (action === "delete") {
        if (!showConfirmDialog(`Are you sure you want to delete ${selectedIds.length} selected seller(s)?`)) {
            return;
        }
        users = users.filter((u) => !selectedIds.includes(u.id.toString()));
        showAlert(`${selectedIds.length} seller(s) have been deleted successfully.`, "success");
    }
    else {
        users.forEach((user) => {
            if (selectedIds.includes(user.id.toString())) {
                user.status = action === "activate" ? "active" : "inactive";
            }
        });
        showAlert(`${selectedIds.length} seller(s) have been ${action}d.`, "success");
    }
    localStorage.setItem("users", JSON.stringify(users));

    // Re-render table
    const container = document.getElementById("adminContent");
    renderSellers(container);
}
