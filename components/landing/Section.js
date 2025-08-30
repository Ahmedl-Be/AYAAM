import { navigate } from "../../scripts/utils/navigation.js";
import Component from "../core/component.js";
import ProductCard from "../products/ProductCard.js";
import { emptyItems } from "../ui/empty.js";

export default class CardsSection extends Component {
    constructor(_config = {}, _params = {}) {
        super(_config, _params);
        this.items = _params.items || [];
        this.title = _params.title || "Products";
        this.id = _params.id || "cards-section";
    }

    template() {
        return `
        <section id="${this.id}" class="container my-5">
            <div class="text-center mb-5">
                <h2 class="fw-bold fs-2">${this.title}</h2>
                <div style="width: 60px; height: 4px; background: black; margin: 10px auto; border-radius: 2px;"></div>
            </div>
<!--- Cards List  -->
            <div class="row flex-nowrap overflow-auto pt-2 gx-3" id="product-list-${this.id}"></div>

<!--- Browse Items  -->            
            <div class="text-center mt-4">
                <button class="btn btn-outline-dark px-4" id='${this.id}-btn'>Browse All Items</button>
            </div>
        </section>
        `;
    }

    script() {
/* BROWSE BUTTON */
        const browseBtn = this.parent.querySelector(`#${this.id}-btn`);
        if (browseBtn) {
            browseBtn.addEventListener("click", () => {
                navigate('/catalog');
            });
        }

/* SELECT CARDS LIST */
        const listEl = this.parent.querySelector(`#product-list-${this.id}`);
        listEl.innerHTML = "";

/* PRODUCT CARDS */
        if (this.items.length > 0) {
            /* Loop over items */
            this.items.forEach(product => {
                const col = document.createElement("div");
                col.className = "col-12 col-sm-6 col-md-4 col-lg-3"
                listEl.appendChild(col);
                this.mount(ProductCard, col, product);
            });
        } else {
            listEl.innerHTML = emptyItems();
        }
    }
}
