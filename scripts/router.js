import { showLoader, hideLoader } from "./utilities/loader.js";

/* Simple navigation helper */
export function navigate(_path) {
    if (location.hash !== "#" + _path) {
        location.hash = _path.startsWith("/") ? "#" + _path : "#/" + _path;
    }
}

/* Parse query string into an object */
export function parseQuery(_query) {
    const query = _query.startsWith("?") ? _query.slice(1) : _query;
    if (!query) return {};

    return query.split("&").reduce((params, param) => {
        const [key, value] = param.split("=").map(decodeURIComponent);
        params[key] = value;
        return params;
    }, {});
}

export default class Router {
    constructor(_routes, _rootId = "app") {
        this.routes = _routes;
        this.root = document.getElementById(_rootId);
        this.currentView = null;

        window.addEventListener("DOMContentLoaded", () => this.resolve());
        window.addEventListener("hashchange", () => this.resolve());

        // Intercept <a data-route> clicks
        document.body.addEventListener("click", (e) => {
            if (e.target.matches("[data-route]")) {
                e.preventDefault();
                const path = e.target.getAttribute("href");
                navigate(path);
            }
        });
    }

    async resolve() {
        try {

            // If no hash or just "#/" → force set it to "#/home"
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
            let routeLoader = null;

            // Find the best matching route (longest prefix match)
            for (const route in this.routes) {
                if (pathPart === route || pathPart.startsWith(route)) {
                    if (!baseRoute || route.length > baseRoute.length) {
                        routeLoader = this.routes[route];
                        baseRoute = route;
                    }
                }
            }

            showLoader();

            // Handle lazy loaded routes
            if (typeof routeLoader === "function") {
                try {
                    const module = await routeLoader();
                    ViewClass = module.default;
                } catch (error) {
                    console.error("Failed to load route:", baseRoute, error);
                    ViewClass = this.routes["/404"];
                    baseRoute = "/404";
                }
            } else {
                ViewClass = routeLoader; // Static route
            }

            if (!ViewClass) {
                ViewClass = this.routes["/404"];
                baseRoute = "/404";
            }

            // Reuse current view if still in the same base route
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