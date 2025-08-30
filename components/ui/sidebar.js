import { logout } from "../../data/authentication.js";
import { navigate } from "../../scripts/utils/navigation.js";

// Sidebar.js
export function Sidebar(sections = [], title = "") {
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
    <div class="d-none d-lg-block bg-light border-end position-fixed h-100" 
        style="width: 250px; z-index: 1020;">
        <div class="mt-4">
            <h5 class="mb-4">${title}</h5>
            <button 
                class=" list-group-item d-flex align-items-center gap-2 mb-3 sidebar-homeBtn" 
                title="Go to Home Page"">
                <i class="fas fa-home"></i> Home
            </button>
            <div class="list-group border-0 ">
                ${sections.map(section => `
                    <a class="list-group-item list-group-item-action bg-primary text-white" 
                    style="cursor: pointer;">
                        <i class="${section.icon}"></i> <span>${section.title}</span>
                    </a>
                    <div class="collapse show" id="lg-collapse-${section.id}">
                        <ul class="list-group list-group-flush ms-3">
                            ${section.items.map(item => `
                            <li class="list-group-item text-truncate ps-4" 
                                style="cursor: pointer;" 
                                data-section="${item.id}">
                                <a href="#/admin${item.url}" data-route><i class="${item.icon}"></i> <span>${item.title}</span></a>
                            </li>
                            `).join("")}
                        </ul>
                    </div>
                `).join("")}
            </div>
        </div>
        <!--................ Logout btn................ -->
        <div class="p-3 border-top">
            <button class="btn btn-outline-danger w-100 sidebar-logoutBtn" >
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
    </div>

    <!-- ...............Offcanvas Sidebar for MD and SM................ -->
    <div class="offcanvas offcanvas-start d-lg-none" id="sidebarOffcanvas" style="width: 250px;">
        <div class="offcanvas-header mt-3">
            <h5 class="offcanvas-title">${title}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>
            <button 
                class=" list-group-item d-flex align-items-center gap-2 mb-3 sidebar-homeBtn" 
                title="Go to Home Page"">
                <i class="fas fa-home"></i> Home
            </button>
        <div class="offcanvas-body p-0">
            <div class="list-group border-0  text-sm-start">
                ${sections.map(section => `
                    <a class="list-group-item list-group-item-action bg-primary text-white" 
                        data-bs-toggle="collapse" 
                        href="#collapse-${section.id}" 
                        style="cursor: pointer;" 
                        role="button">
                        <i class="${section.icon}"></i> <span>${section.title}</span>
                    </a>
                    <div class="collapse" id="collapse-${section.id}">
                        <ul class="list-group list-group-flush ms-3">
                            ${section.items.map(item => `
                            <li class="list-group-item text-truncate" 
                                style="cursor: pointer;" 
                                data-bs-dismiss="offcanvas" 
                                data-section="${item.id}">
                                <a href="#/admin${item.url}"> <i class="${item.icon}" data-route></i> <span>${item.title}</span></a>
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
    `;
}


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
}