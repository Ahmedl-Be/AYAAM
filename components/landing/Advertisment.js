import { navigate } from "../../scripts/router.js";
import Component from "../core/component.js";
import { Button } from "../ui/buttons.js";


export default class Advertisement extends Component {
    constructor(_config = {}, _params = {}) {
        super(_config, _params);
        this.src = _params.src || 'data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
        this.title = _params.title || "";
        this.subtitle = _params.subtitle || "";
        this.info = _params.info || "";
        this.btnContent = _params.btn.content || "Explore";
        this.btnClasses = _params.btn.classList || "";
        this._id = "ad-" + Math.random().toString(36).slice(2);
        this._brand = _params.brand || '';
    }

    template() {
        return `
    <div id="${this._id}" class="position-absolute top-0 start-0 w-100 h-100 ad-slide d-flex align-items-center transition-opacity">

<!-- Background image -->
        <img src="${this.src}" alt="${this.title}"
            class="position-absolute top-0 start-0 w-100 h-100"
            style="object-fit: cover; object-position: center;  z-index:0;" />

<!-- Overlay -->
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background:rgba(0,0,0,0.5); z-index:1;"></div>

<!-- Content -->
        <div class="container position-relative text-white" style="z-index:2;">
            <div class="col-lg-6">
                <h2 class="display-4 fw-bold mb-3 text-white">${this.title}</h2>
                <h4 class="mb-3 text-primary">${this.subtitle}</h4>
                <p class="lead mb-4 text-white">${this.info}</p>
                ${Button(this.btnContent, (this._id + '-btn'), this.btnClasses)}
            </div>
        </div>

    </div>
    `;
    }

    script() {
        document.getElementById(this._id + '-btn').addEventListener('click', () => {
            navigate(`/products/${this._brand}`)
        })
    }
}