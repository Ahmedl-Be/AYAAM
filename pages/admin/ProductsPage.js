import View from "../../components/core/view.js";
import { localStore } from "../../scripts/utils/storage.js";

export default class ProductsPage extends View {
    template() {
        const products = localStore.read("products", []);
        return `
      <section>
        <h2>Products</h2>
        <button id="addProduct">+ Add Product</button>
        <ul>
          ${products.map((p, i) => `
            <li>
              ${p.name} - $${p.price}
              <button data-index="${i}" class="deleteProduct">Delete</button>
            </li>
          `).join("")}
        </ul>
      </section>
    `;
    }

    script() {
        document.getElementById("addProduct").onclick = () => {
            const products = localStore.read("products", []);
            const name = prompt("Product name?");
            const price = prompt("Price?");
            if (!name || !price) return;

            products.push({ name, price });
            localStore.write("products", products);
            this.render(); // rerender subview
        };

        document.querySelectorAll(".deleteProduct").forEach(btn => {
            btn.onclick = () => {
                const idx = btn.dataset.index;
                const products = localStore.read("products", []);
                products.splice(idx, 1);
                localStore.write("products", products);
                this.render();
            };
        });
    }
}