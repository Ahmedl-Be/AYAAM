import { getCurrentUser } from "../data/authentication.js";
import { showLoader, hideLoader } from "./utils/loader.js";
import { parseQuery, navigate } from "./utils/navigation.js";

export default class Router {
    constructor(_routes, _rootId = "app") {
        this.routes = _routes;
        this.root = document.getElementById(_rootId);
        this.currentView = null;

        window.addEventListener("DOMContentLoaded", () => this.resolve());
        window.addEventListener("hashchange", () => this.resolve());

        // Intercept <a data-route> clicks
        document.body.addEventListener('click', (e) => {
            const a = e.target.closest('a[data-route]');
            if (!a) return;

            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

            e.preventDefault();
            navigate(a.getAttribute('href'));
        });
    }

    async resolve() {
        try {
            // REDIRECT TO HOME
            if (!location.hash || location.hash === "#/") {
                navigate("/home");
                return;
            }

            

            
            let fullPath = location.hash.slice(1) || "/home";
            if (!fullPath || fullPath === "/") {
                fullPath = "/home";
            }

            const [pathPart, queryString] = fullPath.split("?");
            const params = parseQuery(queryString || "");

            let ViewClass = null;
            let baseRoute = null;
            let routeConfig = null;

            // Find the best matching route (longest prefix match)
            for (const route in this.routes) {
                if (pathPart === route || pathPart.startsWith(route)) {
                    if (!baseRoute || route.length > baseRoute.length) {
                        routeConfig = this.routes[route];
                        baseRoute = route;
                    }
                }
            }

            showLoader();

            if (!routeConfig) {
                routeConfig = this.routes["/404"];
                baseRoute = "/404";
            }

            // 📌 Authorization check
            if (routeConfig.roles) {
                const user = getCurrentUser();
                if (!user) {
                    navigate("/login");
                    hideLoader();
                    return;
                }
                if (!routeConfig.roles.includes(user.role)) {
                    navigate("/403");
                    hideLoader();
                    return;
                }
            }


            // Handle lazy loaded routes
            if (typeof routeConfig.loader === "function") {
                try {
                    const module = await routeConfig.loader();
                    ViewClass = module.default;
                } catch (error) {
                    console.error("Failed to load route:", baseRoute, error);
                    routeConfig = this.routes["/404"];
                    ViewClass = (await routeConfig.loader()).default;
                    baseRoute = "/404";
                }
            } else {
                ViewClass = routeConfig.loader; // Static route
            }

            if (!ViewClass) {
                routeConfig = this.routes["/404"];
                ViewClass = (await routeConfig.loader()).default;
                baseRoute = "/404";
            }

            // If already inside the same view → just forward to subroute
            if (this.currentView && this.currentView.route === baseRoute) {
                this.currentView.onSubRoute(pathPart, params);
                hideLoader();
                return;
            }

            // Cleanup previous view
            if (this.currentView) this.currentView.onLeave();

            // Create new view
            this.currentView = new ViewClass(
                { parent: this.root, route: baseRoute },
                params
            );
            this.currentView.render();

            if (this.currentView.onSubRoute) {
                this.currentView.onSubRoute(pathPart, params);
            }

            hideLoader();
        } catch (error) {
            console.error("Router error:", error);
            hideLoader();

            // Fallback to 404
            const fallbackLoader = this.routes["/404"];
            let FallbackClass;

            if (typeof fallbackLoader === "function") {
                const module = await fallbackLoader();
                FallbackClass = module.default;
            } else {
                FallbackClass = fallbackLoader;
            }

            this.currentView = new FallbackClass({ parent: this.root, route: "/404" });
            this.currentView.render();
        }
    }
}