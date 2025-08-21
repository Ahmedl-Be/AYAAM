export default class Componenet {
  constructor(_config = {}, _params = {}) {
    this.parent = (typeof _config.parent === "string")
      ? document.getElementById(_config.parent)
      : _config.parent || null;

    this.params = _params;
  }

  // override in child
  template() { return ""; }
  script() { }

  // render explicitly
  render() {
    if (!this.parent) return;
    this.parent.innerHTML = this.template();
    this.script();
  }
}