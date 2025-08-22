import Router from "./scripts/router.js";
import seedData from "./data/seed.js";

/* ====== LAZY-LOADED PAGES (DYNAMIC IMPORTS) ====== */
// Each route dynamically imports the corresponding page.
// This improves performance by only loading code when needed.
const routes = {
  "/404": () => import("./pages/NotFound.js"),
  "/home": () => import("./pages/HomePage.js"),
  "/signup": () => import("./pages/SignupPage.js"),
  "/login": () => import("./pages/LoginPage.js"),
  // Future routes:
  // "/catalog": () => import("./pages/CatalogPage.js"),
  "/cart": () => import("./pages/CartPage.js"),
  "/admin": () => import("./pages/AdminDashboard.js"),
  // "/seller": () => import("./pages/SellerDashboard.js"),
};

/* ====== APP ROOT ELEMENT ====== */
// The main container where all views will be rendered.
const app = document.getElementById("app");
if (!app) {
  console.error("ERROR: Root element '#app' not found in index.html");
}

/* ====== DATA SEEDING ====== */
// Load initial data into storage (if needed for demo or testing).
seedData();

/* ====== ROUTER INITIALIZATION ====== */
// Create the router instance with the defined routes and root container.
const router = new Router(routes, app);