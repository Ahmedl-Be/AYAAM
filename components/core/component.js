export default class Component {
  constructor(_config = {}, _params = {}) {
    // Parent container can be a DOM element or an ID string
    this.parent = (typeof _config.parent === "string")
      ? document.getElementById(_config.parent)
      : _config.parent || null;

    this.params = _params; // Query params or custom data
    this.route = _config.route || null; // Base route (if passed from Router)
  }

  /* === TEMPLATE: Must return an HTML string === */
  template() { return ""; }

  /* === SCRIPT: Attach event listeners or logic === */
  script() {}

  /* === LIFECYCLE HOOKS: Optional overrides === */
  onEnter() {}
  onLeave() {}
  onSubRoute(_path, _params) {}

  /* === Render: Called by Router or parent === */
  render() {
    this.onEnter();

    if (!this.parent) {
      console.warn(`No parent found for ${this.constructor.name}`);
      return;
    }

    this.parent.innerHTML = this.template();
    this.script();
  }

  /* === Mount a child component inside a selector === */
  mount(_ComponentClass, _selector, _params = {}) {
    const target = this.parent.querySelector(_selector);
    if (!target) {
      console.warn(`Mount failed: selector '${_selector}' not found`);
      return;
    }
    const child = new _ComponentClass({ parent: target }, _params);
    child.render();
    return child;
  }
}