import { getData } from "../../scripts/data-init.js";
import NavLink from "./NavLink.js";
import NotificationBadge from "./NotificationBadge.js";

let hasNotifications = false;
const loggedUser = getData('loggedUser')
console.log(loggedUser)

export default function Navbar() {
      return `
    <header class="sticky-top">
        <nav class="navbar navbar-light container bg-white border-bottom ">
    <!-- First Row (visible on all screens) -->
            <div class="row p-0 m-0 w-100 g-3">

        <!-- LOGO - always first -->
                <div class="col-6 col-md-3 order-md-1p logo d-flex align-items-center">
                    <a class="navbar-brand py-0" href="/" style="height: 100%">MY SHOP</a>
                </div>

        <!-- ICONS - moves to third position on md+ -->
                <div class="d-flex justify-content-end align-content-center col-6 col-md-3 order-2 order-md-3 profile">
                    <div class="d-flex align-items-center justify-content-center p-0">
                <!-- Notification Bell -->
                        ${NotificationBadge(hasNotifications)}
                <!-- Profile Icon -->
                        <a class="nav-link px-4" href="#${loggedUser? '/profile': '/register'}">
                            <i class="fas fa-user-circle fa-lg fa-fw"></i>
                        </a>
                    </div>
                <!-- Mobile Toggler -->
                    <button
                    class="navbar-toggler d-md-none border-0 p-0"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNav"
                    >
                    <i class="fa-solid fa-bars"></i>
                    </button>
                </div>

        <!-- SEARCH BAR - becomes second on md+ -->
                <div class="col-12 order-4 order-md-2 col-md-6 search-bar">
                        <form class="d-flex search-container form-control rounded-5">
                            <div class="input-group row">
                                <div class="col px-2 col-1 ">
                                    <i class="fas fa-search fa-fw"></i>
                                </div>
                                <input type="text" class="border-0 col col-11" placeholder="Search for products..."/>
                            </div>
                        </form>
                </div>
        </div>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNav">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title brand-title">Menu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <!-- OFF CANVAS -->
          <div class="offcanvas-body">
            <ul class="navbar-nav flex-grow-1">
              ${NavLink('MEN', 'products/men')}
              ${NavLink('WOMEN', 'products/women')}
              ${NavLink('SALE', 'products/sale')}
            </ul>
          </div>
        </div>
      </nav>
      <!-- SECOND ROW (visible only in md+) -->
      <div class="navbar row d-none d-md-flex w-100 ps-0" id="category">
        <ul class="navbar-nav d-flex flex-row justify-content-center w-100">
            ${NavLink('MEN', 'products/men', 'mx-3')}
            ${NavLink('WOMEN', 'products/women', 'mx-3')}
            ${NavLink('SALE', 'products/sale', 'mx-3')}
        </ul>
      </div>
    </header>`
};