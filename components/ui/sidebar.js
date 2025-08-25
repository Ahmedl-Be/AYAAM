// Sidebar.js
export function Sidebar(sections = []) {
    return `
    <!-- ...............Toggle Button................ -->
    <button 
        class="btn btn-transparent rounded-circle shadow 
                d-flex align-items-center justify-content-center
                position-fixed start-0 top-0 m-2"
        type="button"
        style="width: 50px; height: 50px; z-index: 10;"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        id="sidebarTogglerBtn">
        <i class="fas fa-bars"></i> 
    </button>

    <!--...............Offcanvas Sidebar........... -->
    <div class="offcanvas offcanvas-start"  id="sidebarOffcanvas" style="width: 250px;">
        <div class="offcanvas-header">
        <!-- the h5 can be replaced with logo or image or our website nameto be reusable -->
                <h5 class="offcanvas-title">Admin Panel</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body p-0">
                <div id="sidebar-nav" class="list-group border-0 rounded-4 text-sm-start">
                ${sections.map(section => `
                    <a class="list-group-item list-group-item-action bg-primary text-white" 
                        data-bs-toggle="collapse" 
                        href="#collapse-${section.id}" 
                        role="button">
                        <i class="${section.icon}"></i> <span>${section.title}</span>
                    </a>
                    <div class="collapse" id="collapse-${section.id}">
                    <ul class="list-group list-group-flush" role="button">
                        ${section.items.map(item => `
                        <li class="list-group-item text-truncate" data-bs-dismiss="offcanvas" data-section="${item.id}">
                            <i class="${item.icon}"></i> <span>${item.title}</span>
                        </li>
                        `).join("")}
                    </ul>
                </div>
                `).join("")}
            </div>
        </div>
    </div>
    `;
}
