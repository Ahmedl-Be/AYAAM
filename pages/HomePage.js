import Navbar from "../components/ui/NavBar.js";
import View from "../scripts/view.js";

export default class Home extends View {
    template() {
        return `
            ${Navbar()}
            <div class="container mt-5">
                <h1 class="display-4">Welcome to our Store</h1>
                <p class="lead">Browse our amazing products</p>
                <a href="#" class="btn btn-primary">View Catalog</a>
            </div>
        `;
    }
   
}