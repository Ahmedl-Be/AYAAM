import { localStore } from "../../scripts/utilities/storage.js";
import { getCurrentUser, logout } from "../../data/authentication.js";
import { Navlink, Anchor } from "./links.js";
import { Icon } from "./icons.js";
import { Button } from "./buttons.js";




const notifications = Icon('bell','solid','',true)
const loggedUser = getCurrentUser();
console.log(loggedUser)

export default function Navbar() {
  return `
    <header class="sticky-top bg-white">
        <nav class="navbar navbar-light container  border-bottom ">
<!-- First Row (visible on all screens) -->
            <div class="row p-0 m-0 w-100 g-3">

        <!-- LOGO - always first -->
                <div class="col-6 col-md-3 order-md-1p logo d-flex align-items-center">
                    ${Anchor('MY SHOP', 'home', "navbar-brand py-0")}
                </div>

        <!-- ICONS - moves to third position on md+ -->
                <div class="d-flex justify-content-end align-content-center col-6 col-md-3 order-2 order-md-3">
                    <div class="d-flex align-items-center justify-content-center p-0 gap-3">
                <!-- Notification Bell -->       
                        ${Button(notifications, 'ico-notify')}
                        
                <!-- Profile Icon -->
                        <div class="dropdown">
                            ${Button(Icon('user', 'solid', 'fa-lg'), 'profileDropdown','btn border-0 bg-transparent p-0', 'data-bs-toggle="dropdown" aria-expanded="false"')}
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                              ${
                                loggedUser
                                  ? `
                                    <li class="dropdown-item-text">
                                      Hello, ${loggedUser.name}
                                    </li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li>
                                      <button class="dropdown-item d-flex" id="btnLogout">
                                        ${Icon('right-from-bracket','solid','me-2')} Logout
                                      </button>
                                    </li>
                                  `
                                  : `
                                    <li>
                                      <a class="dropdown-item d-flex" href="#/home/auth?mode=login">
                                        ${Icon('right-to-bracket','solid','me-2')} Login
                                      </a>
                                    </li>
                                    <li>
                                      <a class="dropdown-item d-flex" href="#/home/auth?mode=signup">
                                        ${Icon('user-plus','solid','me-2')} Sign Up
                                      </a>
                                    </li>
                                  `
                              }
                              <li><hr class="dropdown-divider"></li>
                              <li>
                                  <button class="dropdown-item d-flex" id="toggleDarkMode">
                                    ${Icon('moon','solid','me-2')} Dark Mode
                                  </button>
                              </li>
                            </ul>

                        </div>
                        
                <!-- Cart Icon -->
                        ${Button(Icon('cart-shopping', 'solid', 'fa-lg'), 'ico-cart',)}
                        
                <!-- Mobile Toggler -->
                        ${Button(Icon('bars','solid','fa-lg '),'ico-bars',"navbar-toggler d-md-none border-0 p-0",'type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav"')}
                    </div>
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
              ${Navlink('MEN', 'products/men')}
              ${Navlink('WOMEN', 'products/women')}
              ${Navlink('SALE', 'products/sale')}
            </ul>
          </div>
        </div>
      </nav>
<!-- SECOND ROW (visible only in md+) -->
      <div class="navbar row d-none d-md-flex w-100 ps-0" id="category">
        <ul class="navbar-nav d-flex flex-row justify-content-center w-100">
            ${Navlink('MEN', 'products/men', 'mx-3')}
            ${Navlink('WOMEN', 'products/women', 'mx-3')}
            ${Navlink('SALE', 'products/sale', 'mx-3')}
        </ul>
      </div> 
    </header>
    `
};