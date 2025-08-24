import Component from "../core/component.js";
import { localStore } from "../../scripts/utils/storage.js";
import { getCurrentUser, logout } from "../../data/authentication.js";
import { Navlink, Anchor } from "../ui/links.js";
import { Icon } from "../ui/icons.js";
import { Button } from "../ui/buttons.js";
import { Toggler } from "../ui/toggler.js";
import View from "../core/view.js";

export default class Navbar extends View {
  constructor(_config = {}, _params = {}) {
    super(_config, _params);
    this.user = getCurrentUser();
  }

  template() {
    return `
      <nav class="navbar navbar-light container border-bottom">
<!-- First Row (visible on all screens) -->
        <div class="row p-0 m-0 w-100 g-3">

<!-- LOGO -->
            <div class="col-6 col-md-3 d-flex align-items-center">
              ${Anchor("MY SHOP", "/home", "navbar-brand py-0")}
            </div>

<!-- ICONS - moves to third position on md+ -->
            <div class="d-flex justify-content-end align-content-center col-6 col-md-3 order-2 order-md-3">
              <div class="d-flex align-items-center gap-3">
                ${Button(Icon("bell", "solid", ""), "ico-notify")}

    <!-- Profile Icon -->
                <div class="dropdown">
                  ${Button(Icon("user", "solid", "fa-lg"), "profileDropdown", "btn border-0 bg-transparent p-0", 'data-bs-toggle="dropdown" aria-expanded="false"')}
          <!-- Drop-down Profile-->
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    ${this.user ? `
                          <li class="dropdown-item-text">Hello, ${this.user.name}</li>
                          <li><hr class="dropdown-divider"></li>
                          <li>
                            <button class="dropdown-item d-flex" id="btnLogout">
                              ${Icon("right-from-bracket", "solid", "me-2")} Logout
                            </button>
                          </li>`

        : `<li>
                            <a class="dropdown-item d-flex" href="#/login">
                              ${Icon("right-to-bracket", "solid", "me-2")} Login
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item d-flex" href="#/signup">
                              ${Icon("user-plus", "solid", "me-2")} Sign Up
                            </a>
                          </li>
                        `
      }
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item d-flex" id="toggleDarkMode">
                      ${Icon("moon", "solid", "me-2")} Dark Mode
                    </button></li>
                  </ul>
                </div>

    <!-- Shopping Cart -->
               ${Button(`
            <span class="position-relative">
              ${Icon("cart-shopping", "solid", "fa-lg")}
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-count">
                </span>
             </span>
             `, "ico-cart", "btn border-0 bg-transparent p-0")}
    <!-- Toggler Icon -->
                ${Toggler('offcanvasNav')}
              </div>
            </div>

<!-- SEARCH BAR - becomes second on md+ -->
            <div class="col-12 order-4 order-md-2 col-md-6 search-bar">
              <form class="d-flex search-container form-control rounded-5">
                <div class="input-group row">
                  <div class="col px-2 col-1"><i class="fas fa-search fa-fw"></i></div>
                  <input type="text" class="border-0 col col-11" placeholder="Search for products..."/>
                </div>
              </form>
            </div>
          </div>
<!-- OFF CANVAS -->
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNav">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title brand-title">Menu</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
              <ul class="navbar-nav flex-grow-1">
                ${Navlink('MEN', '/products/men')}
                ${Navlink('WOMEN', '/products/women')}
                ${Navlink('SALE', '/products/sale')}
              </ul>
            </div>
          </div>
        </nav>

<!-- SECOND ROW -->
        <div class="navbar row d-none d-md-flex w-100 ps-0" id="category">
          <ul class="navbar-nav d-flex flex-row justify-content-center w-100">
            ${Navlink("MEN", "/products/men", "mx-3")}
            ${Navlink("WOMEN", "/products/women", "mx-3")}
            ${Navlink("SALE", "/products/sale", "mx-3")}
          </ul>
        </div>
      </header>
    `;
  }

  script() {
    // Handle logout
    const btnLogout = this.parent.querySelector("#btnLogout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        logout();
        location.reload(); // or trigger rerender
      });
    }

    // Handle dark mode
    const btnDark = this.parent.querySelector("#toggleDarkMode");
    if (btnDark) {
      btnDark.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
      });
    };


    // handle Shopping Cart Count
    const cartCount = this.parent.querySelector("#cart-count");
    function updateCartCount() {
      const cartItems = JSON.parse(sessionStorage.getItem("ShopingCart") || "[]");
      cartCount.textContent = cartItems.length;
      cartCount.classList.toggle("d-none", cartItems.length === 0);
    }
    updateCartCount();  // Run once at start
    // Listen for custom event from Product
    window.addEventListener("cartUpdated", updateCartCount);




  }
}

