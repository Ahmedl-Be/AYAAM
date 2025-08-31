import { logout } from "../../data/authentication.js";
import { navigate } from "../../scripts/utils/navigation.js";
import { AdminProfile } from "../../pages/admin/AdminProfile.js";
import { getInitials, getRandomColor } from "../../scripts/utils/dashboardUtils.js";

// sidebar component
export function Sidebar(_base, sections = [], title = "") {
    return `
    <!-- ...............Toggle Button (visible only on md and smaller)................ -->
    <button 
        class="btn btn-transparent rounded-circle shadow 
        d-flex align-items-center justify-content-center
        position-fixed start-0 top-0 m-2 d-lg-none"
        type="button"
        style="width: 50px; height: 50px; z-index: 1030;"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        id="sidebarTogglerBtn">
        <i class="fas fa-bars"></i> 
    </button>

    <!-- ...............Sidebar for LG screens................ -->
    <div class="d-none d-lg-flex flex-column bg-light border-end position-fixed h-100 db-sidebar"
        style="width: 250px; z-index: 1020;">

        <div class="mt-4">
            <button class="btn row d-flex text-decoration-none p-0 profile-btn ms-2 w-100" style="cursor: pointer;" title="Go To Profile">
                <div class="col col-3 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; font-size: 0.875rem; font-weight: bold;">
                    ${getInitials(title)}
                </div>
                <h5 class="col col-9 mb-4 pt-2 wlc-tiltle"> Hello! ${title}</h5>
            </button>
            <button 
            class=" list-group-item d-flex align-items-center gap-3 mb-2 ms-5 text-decoration-underline sidebar-homeBtn " 
            title="Go to Home Page">
            <i class="fas fa-home"></i> Home
            </button>
            <hr class="bg-secondary">
            <div class="list-group border-0 ">
                ${sections.map(section => `
                    <a class="list-group-item list-group-item-action bg-primary text-white fw-bold " 
                        data-bs-toggle="collapse" 
                        href="#lg-collapse-${section.id}" 
                        role="button">
                        <i class="${section.icon}"></i> <span>${section.title}</span>
                    </a>
                    <div class="collapse show" id="lg-collapse-${section.id}">
                        <ul class="list-group list-group-flush ms-3">
                            ${section.items.map(item => `
                            <li class="list-group-item text-truncate ps-4" 
                                style="cursor: pointer;" 
                                data-section="${item.id}">
                                <a href="#${_base + item.url}" data-route><i class="${item.icon}"></i> <span>${item.title}</span></a>
                            </li>
                            `).join("")}
                        </ul>
                    </div>
                `).join("")}
            </div>
        </div>
        <!--................ Logout btn................ -->
        <div class="p-3 mt-auto">
            <button class="btn btn-outline-danger w-100 sidebar-logoutBtn" >
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
    </div>

    <!-- ...............Offcanvas Sidebar for MD and SM................ -->
    <div class="offcanvas offcanvas-start d-lg-none db-sidebar" id="sidebarOffcanvas" style="width: 250px; ">
        <div class="offcanvas-header mt-4">
            <button class="btn row d-flex text-decoration-none p-0 profile-btn w-100" style="cursor: pointer;" title="Go To Profile">
                <div class="col col-3 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; font-size: 0.875rem; font-weight: bold;">
                    ${getInitials(title)}
                </div>
                <h5 class="col col-8 mb-4 pt-2 wlc-tiltle px-0 "> Hello! ${title}</h5>
            </button>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>
            <button class=" list-group-item d-flex align-items-center gap-4 mb-2 ms-5 text-decoration-underline sidebar-homeBtn" 
                    title="Go to Home Page">
                    <i class="fas fa-home"></i> Home
            </button>
            <hr>
        <div class="offcanvas-body p-0">
            <div class="list-group border-0  text-sm-start">
                ${sections.map(section => `
                    <a class="list-group-item list-group-item-action bg-primary text-white fw-bold" 
                        data-bs-toggle="collapse" 
                        href="#collapse-${section.id}" 
                        role="button">
                        <i class="${section.icon}"></i> <span>${section.title}</span>
                    </a>
                    <div class="collapse show" id="collapse-${section.id}">
                        <ul class="list-group list-group-flush ms-3">
                            ${section.items.map(item => `
                            <li class="list-group-item text-truncate" 
                                data-bs-dismiss="offcanvas" 
                                data-section="${item.id}">
                                <a href="#${_base + item.url}" data-route> <i class="${item.icon}"></i> <span>${item.title}</span></a>
                            </li>
                            `).join("")}
                        </ul>
                    </div>
                `).join("")}
            </div>
        </div>
                <!--................ Logout btn................ -->
        <div class="p-3 ">
            <button class="btn btn-outline-danger w-100 sidebar-logoutBtn" >
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
    </div>

    <!-- Profile Modal -->
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="profileModalLabel">
                        <i class="fas fa-user-circle me-2"></i>
                        Profile info
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0" id="profileContainer">
                    <!-- profile content will be rendered here -->
                </div>
            </div>
        </div>
    </div>
    `;
}
// functionalities and ev listeners
export function SidebarEvents() {
    // Home Buttons
    document.querySelectorAll('.sidebar-homeBtn').forEach(btn => {
        btn?.addEventListener('click', () => {
            navigate('/home');
        });
    });

    // Logout Buttons
    document.querySelectorAll('.sidebar-logoutBtn').forEach(btn => {
        btn?.addEventListener('click', () => {
            logout();
            navigate('/login');
        });
    });

    // Admin Profile Popup Buttons
    document.querySelectorAll('.profile-btn').forEach(btn => {
        btn?.addEventListener('click', (e) => {
            e.preventDefault();
            showProfilePopup();
        });
    });
}

//  show admin profile in popup
function showProfilePopup() {
    const modal = new bootstrap.Modal(document.getElementById('profileModal'));
    const container = document.getElementById('profileContainer');
    
    // Create and render AdminProfile
    const adminProfile = new AdminProfile();
    container.innerHTML = adminProfile.template();
    
    // Execute any scripts from AdminProfile
    if (adminProfile.script) {
        adminProfile.script();
    }
    
    // Show the modal
    modal.show();
}