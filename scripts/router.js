export function navigate(_path) {
  if (location.hash !== "#" + _path) {
    location.hash = _path.startsWith("/") ? "#" + _path : "#" + "/" + _path;
  }
}

export function parseQuery(_query) {
// remove the leading "?" 
  const query = _query.startsWith("?") ? _query.slice(1) : _query;
// empty? return {}
  if (!query) return {};

  return query.split("&").reduce((_params, _param) => {
    const [key, value] = _param.split("=").map(decodeURIComponent);
    _params[key] = value;
    return _params;
  },{});
}

export default class Router {
    constructor(_routes, _rootId = "app") {
        this.routes = _routes;
        this.root = document.getElementById(_rootId);
        this.currentView = null;

        window.addEventListener("DOMContentLoaded", () => this.resolve());
        window.addEventListener("hashchange", () => this.resolve());

         //  clicks on <a data-route>
        document.body.addEventListener("click", (e) => {
            if (e.target.matches("[data-route]")) {
                e.preventDefault();
                const path = e.target.getAttribute("href");
                navigate(path);
            }
        });
    }

    resolve() {
        let fullPath = location.hash.slice(1) || "/home";

        if (!fullPath || fullPath === "/") {
            fullPath = "/home";
        }
        
        const [pathPart, queryString] = fullPath.split("?");
        const params = parseQuery(queryString || "");

        let ViewClass = null;
        let baseRoute = null;

        for (const route in this.routes) {
            if (pathPart === route || pathPart.startsWith(route)) {
                if (!baseRoute || route.length > baseRoute.length) {
                    ViewClass = this.routes[route];
                    baseRoute = route;
                }

            }
        }

        if (!ViewClass) {
            ViewClass = this.routes['/404'];
            baseRoute = '/404'
        }

        if (this.currentView && this.currentView.baseRoute === baseRoute) {
            this.currentView.onSubRoute(pathPart, params);
            return;
        }

        if (this.currentView) this.currentView.onLeave();

        this.currentView = new ViewClass({ parent: this.root, route: baseRoute },params);
        this.currentView.render();
    }
}
