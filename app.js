import Router from "./scripts/router.js";
import seedData from "./data/seed.js";

/* ====== LAZY-LOADED PAGES (DYNAMIC IMPORTS) ====== */
// Each route dynamically imports the corresponding page.
// This improves performance by only loading code when needed.
const routes = {
  /* FALL BACK */
  "/404": { loader: () => import("./pages/NotFound.js") },

  /* AUTHENTICATION & AUTHORIZATION */
  "/signup": { loader: () => import("./pages/SignupPage.js") },
  "/login": { loader: () => import("./pages/LoginPage.js") },
  "/confirm-seller": { loader: () => import("./pages/SellersRegistration.js"), roles: ['customer'] },

  /* LANDING */
  "/home": { loader: () => import("./pages/HomePage.js") },
  "/about": { loader: () => import("./pages/AboutPage.js") },
  "/catalog": { loader: () => import("./pages/CatalogPage.js") },
  "/product": { loader: () => import("./pages/Product.js") },
  "/cart": { loader: () => import("./pages/CartPage.js") },
  "/profile": { loader: () => import("./pages/Profile.js"), roles: ['admin', 'customer', 'seller'] },

  /* LOGIN NEEDED*/
  "/checkout": { loader: () => import("./pages/CheckOutPage.js"), roles: ['admin', 'customer',  'seller'] },

  /* ADMIN ONLY PAGES */
  "/admin": { loader: () => import("./pages/AdminDashboard.js"), roles: ["admin"] },

  /* SELLER ONLY PAGES */
  "/seller": { loader: () => import("./pages/SellerDashboard.js"), roles: ["seller"] },

  /* INFO PAGES */
  "/info": { loader: () => import("./pages/SupportPage.js") },
  "/sell-with-us": { loader: () => import("./pages/SellWithUsPage.js"), roles: ['customer'] },

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