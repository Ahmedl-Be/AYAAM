export function renderUsers(container) {
    const users = localStore.read("users") || [];

    container.innerHTML = ` 
        <!--.............................Header Section.......................... -->
        <div class="card border-0 shadow-lg mb-4">
            <div class="card-header bg-primary text-white py-3">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="card-title mb-1 h4">
                            <i class="fas fa-users me-2"></i>
                            User Management
                        </h2>
                        <p class="card-text mb-0 opacity-75">
                            Manage and oversee all user accounts
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
                        <div class="h4 text-primary mb-1">${users.length}</div>
                        <small class="text-muted text-uppercase fw-semibold">Total Users</small>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-success mb-1">
                            ${users.filter((u) => u.status === "active" || !u.status).length}
                        </div>
                        <small class="text-muted text-uppercase fw-semibold">Active</small>
                    </div>
                </div>
            </div>
            
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-info mb-1">
                            ${users.filter((u) => u.joinDate &&
        // check if the user joined in the last 30 days and return the length
        new Date(u.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
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
                                placeholder="Search users..." id="searchInput">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <select class="form-select" id="roleFilter">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="seller">Seller</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div class="col-12 col-lg-4 ms-auto text-end">
                        <button class="btn btn-primary" id="addUserBtn">
                            <i class="fas fa-plus me-2"></i>Add New User
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
                            <span id="selectedCount">0</span> user(s) selected
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

        <!--.......................... Users Table .................................-->
        <div class="card border-1 shadow-sm mb-4">
        <!--.................Table Title...................-->
            <div class="card-header bg-white py-2 shadow-sm ">
                <h5 class="card-title mb-0">
                    <i class="fas fa-table me-2 text-primary"></i>
                    Users List
                </h5>
            </div>
        <!-- .......display user table if there are users , if its empty display empty state..........-->
            <div class="card-body p-0">
                ${users.length > 0 ? renderUsersTable(users) : renderEmptyState()}
            </div>
        </div>

        <!-- ..................................Add User Form ............................-->
        <!-- .......Display none by default, only displayed when add new user button is clicked ....................-->

        <div class="card border-0 shadow-lg d-none" id="userForm">
            <div class="card-header bg-primary text-white">
                <h5 class="card-title mb-0">
                    <i class="fas fa-user-plus me-2"></i>
                    Add New User
                </h5>
            </div>
            <div class="card-body">
                ${renderUserForm()}
            </div>
        </div>
    `;

    UserEvents(container);
}