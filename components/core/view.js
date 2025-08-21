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
export default class View {
/* ======================= CONSTRUCTOR =========================== */
    constructor(_config = {}, _params = {}) {

    /* PARENT ELEMET => DEFAULT : "app" */
        this.parent = (typeof _config.parent === "string") ?
                            document.getElementById(_config.parent)
                            : _config.parent
                            || document.getElementById("app");
        
    /* DOC TITLE => DEFAULT : "" */        
        this.title = _config.title || "";
        
    /* ROUTE TO SHOW => DEFAULT : "" */
        this.route = _config.route || "";

    /* PARAMS TO SAVE AT SESSION STORAGE */
        this.params = _params;
        
    /* STORE SUBVIEWS */
        this._subviews = {};
        
    }
/* ==================== TO BE OVERRIDDEN ========================= */
    
    /* === TEMPLATE => HTML ELEMENT TO SHOW AT PAGE */
    template() { return ""; }

    /* === FUNCTION TO DO BEFORE LOADING THE PAGE */
    onEnter() {
        if (this.title) document.title = this.title;
    }

    /* === SCRIPT TO ATTACH TO MAIN */
    script() { }

    /* === FUNCTION TO DO BEFORE LEAVING PAGE */
    onLeave() {
        if (this._subview) {
            this._subview.onLeave();
            this._subview = null;
        }
        if (this.parent) this.parent.innerHTML = "";
    }




/* ==================== DONT OVERRIDE !!! ========================= */
    /* SUBVIEW - CALLED EXPLICITLY IN < script() > */
    subview(SubClass, { parent, route, title }, params = {}) {  
        const container = typeof parent === "string"? this.parent.querySelector(`#${parent}`)
        : parent;

        this._subviews[route] = { SubClass, container, title, params };

        const currentPath = location.hash.slice(1);
            if (currentPath.endsWith(route)) {
                this.mountSubview(route);
            }
        }

        // mount subview
        mountSubview(route) {
            const def = this._subviews[route];
            if (!def) return;
            const { SubClass, container, params } = def;
            container.innerHTML = "";
            const sub = new SubClass({ parent: container, route }, params);
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

  
    /* RENDERING - CALLED IMPLICITLY BY THE ROUTER */
    render() {
        this.onEnter();
        if (this.parent) {
            this.parent.innerHTML = this.template();
        }
        this.script();
    }


}


