import Router from "./scripts/router.js";
import seedData from "./data/seed.js";

/* ====== LAZY-LOADED PAGES (DYNAMIC IMPORTS) ====== */
// Each route dynamically imports the corresponding page.
// This improves performance by only loading code when needed.
const routes = {
  "/404": { loader: () => import("./pages/NotFound.js") },
  "/home": { loader: () => import("./pages/HomePage.js") },
  "/signup": { loader: () => import("./pages/SignupPage.js") },
  "/login": { loader: () => import("./pages/LoginPage.js") },
  "/catalog": { loader: () => import("./pages/CatalogPage.js")},
  "/product": { loader: () => import("./pages/Product.js") },
  "/cart": { loader:  () => import("./pages/CartPage.js") },
  
  /* LOGIN ONLY NEEDED*/
  "/checkout": { loader: () => import("./pages/CheckOutPage.js"), roles:['admin', 'user', 'master', 'seller'] },
  /* ADMIN ONLY PAGES */
  "/admin": { loader: () => import("./pages/AdminDashboard.js"), roles: ["admin", "master"] },

 /* SELLER ONLY PAGES */
  "/seller": { loader: () => import("./pages/SellerDashboard.js"), roles: ["seller"] },
  "/addproduct": { loader: () => import("./pages/seller/AddProduct.js"), roles: ["seller"] },
}

/* ====== APP ROOT ELEMENT ====== */
// MAIN APP CONTAINER
const app = document.getElementById("app");
if (!app) {
  console.error("ERROR: Root element '#app' not found in index.html");
}

/* ====== DATA SEEDING ====== */
// LOADING DATA FOR THE FIRST TIME
seedData();

/* ====== ROUTER INITIALIZATION ====== */
// Create the router instance with the defined routes and root container.
const router = new Router(routes, app);