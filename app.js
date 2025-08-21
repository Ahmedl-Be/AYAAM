import Home from "./pages/HomePage.js";
import Router from "./scripts/router.js";



const routes = {
  "/home": Home,
/*   "/catalog": Catalog,
  "/signup": Signup,
  "/404": NotFound, */
};

new Router(routes, "app");