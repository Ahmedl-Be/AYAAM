import SummaryCart from "../components/cart/SummaryCart.js";
import CheckOutForm from "../components/checkout/CheckOutForm.js";
import CheckoutReceit from "../components/checkout/CheckoutReceit.js";
import View from "../components/core/view.js";
import Footer from "../components/landing/Footer.js";
import Navbar from "../components/landing/Nav.js";
import Toast from "../components/ui/toast.js";
import { CartManager } from "../scripts/cartScripts/cartManager.js";
import FloatBtns from "../components/ui/floating.js";
import { navigate } from "../scripts/utils/navigation.js";
import { sessionStore } from "../scripts/utils/storage.js";

const cartManager = new CartManager();
const cartItems = cartManager.getCartItem();
console.log(cartItems)

export default class CheckoutPage extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Complete purcashe | AYAAM'
        }, _params);

    }
    template() {
        return `
           <header class="sticky-top bg-white" id='navbar'></header>
           <div id="toast"></div>
           <div id="floatBtns"></div>
           <div class=" container">
            <div class="row">

                <!-- INFO Form -->
                <div class=" col-12 col-md-8 ">
                    <div class="card shadow-sm p-4 mb-4 mt-2" >
                        <h5>CheckOut Details</h5>

                        <div id="check-out-form" >
                        </div>
                    </div>
                </div>

                <!-- RECET -->
                <div  class="col-12 col-md-4">
                    <div class="card shadow-sm p-4 mb-4 mt-2">
                        <div id="summary-checkout">

                        </div>
                    </div>
                    
                </div>
            </div>
           </div>

        <!--   __________________Footer_____________ -->
        <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer'>${Footer()}</footer>

        `
    }

    script() {

        this.mount(Navbar, "#toast");
        this.mount(Toast, "#navbar");
        this.mount(FloatBtns, "#floatBtns");
        this.mount(CheckOutForm, "#check-out-form");
        this.mount(CheckoutReceit, "#summary-checkout");
        
    }

}