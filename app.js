import Router from "./scripts/router.js";
import seedData from "./data/seed.js";
import Home from "./pages/HomePage.js";
import NotFound from "./pages/NotFound.js";
import SignupPage from "./pages/SignupPage.js";
/* ================ APP =============== */
const app = document.getElementById('app');
if(!app) {console.error("APP DOESN'T EXIST CHECK 'index.html' ")}

/* ============== ROUTES ============== */
const routes = {
  "/home": Home,
  // "/catalog": Catalog,
  "/signup": SignupPage,
  "/404": NotFound,
};

/* =========== SEEDING DATA =========== */
seedData();
/* =========== INITIALIZING =========== */
const router = new Router(routes, app);