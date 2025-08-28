import { hideLoader, showLoader } from "../../scripts/utils/loader.js";
import Component from "./component.js";

/*
  _config {
    parent: parent element or id (default "app")
    route: path to show (example "/admin")
    title: title of the page
  }

  _params {
    optional object of parameters
  }
*/
export default class View extends Component {
  /* ======================= CONSTRUCTOR =========================== */
  constructor(_config = {}, _params = {}) {
    // Call base constructor
    super(_config, _params);

    // Parent element fallback → #app if nothing passed
    if (!this.parent) {
      this.parent = document.getElementById("app");
    }

    this.title = _config.title || "";
    this.route = _config.route || "";
    this._subviews = {};
    this.activeSubview = null;
  }

  /* ==================== TO BE OVERRIDDEN ========================= */
  template() { return ""; }

  script() {}

  onEnter() {
    if (this.title) document.title = this.title;
    window.scrollTo(0, 0);
    hideLoader();
  }

  onLeave() {
    showLoader();
    if (this.activeSubview) {
      this.activeSubview.onLeave();
      this.activeSubview = null;
    }
    if (this.parent) this.parent.innerHTML = "";
  }

  /* ==================== SUBVIEW SYSTEM =========================== */
  subview(SubClass, { parent, route, title }, params = {}) {
    const container = (typeof parent === "string")
      ? this.parent.querySelector(`#${parent}`)
      : parent;

    this._subviews[route] = { SubClass, container, route, title, params };

    const currentPath = location.hash.slice(1);
    if (currentPath.endsWith(route)) {
      this.mountSubview(route);
    }
  }

  mountSubview(route) {
    const def = this._subviews[route];
    if (!def) return;

    const { SubClass, container, route: subRoute, title, params } = def;
    container.innerHTML = "";

    const sub = new SubClass({ parent: container, route: subRoute, title }, params);
    sub.render();

    this.activeSubview = sub;
  }

  onSubRoute(path, params) {
    for (const route in this._subviews) {
      if (path.endsWith(route)) {
        this.mountSubview(route);
        return;
      }
    }
  }
}