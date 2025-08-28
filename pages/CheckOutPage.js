import SummaryCart from "../components/cart/SummaryCart.js";
import CheckOutForm from "../components/checkout/CheckOutForm.js";
import CheckoutReceit from "../components/checkout/CheckoutReceit.js";
import View from "../components/core/view.js";
import Navbar from "../components/landing/Nav.js";
import { CartManager } from "../scripts/cartScripts/cartManager.js";
import { navigate } from "../scripts/utils/navigation.js";
import { sessionStore } from "../scripts/utils/storage.js";

const cartManager = new CartManager();
const cartItems = cartManager.getCartItem();
console.log(cartItems)

export default class CheckoutPage extends View {
    template() {
        return `
           <header class="sticky-top bg-white" id='navbar'></header>
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
        `
    }

    script() {

        this.mount(Navbar, "#navbar");
        this.mount(CheckOutForm, "#check-out-form");
        this.mount(CheckoutReceit, "#summary-checkout");
        

        // document.getElementById('pay').addEventListener('click', () => {
        //     navigate('/home');
        // });

        // document.getElementById('continue-shoping').addEventListener('click', () => {
        //     navigate('/catalog');
        // });
    }

}