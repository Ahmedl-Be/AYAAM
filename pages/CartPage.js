import CartItems from "../components/cart/CartItems.js";
import RelatedProducts from "../components/cart/RelatedProducts.js";
import SummaryCart from "../components/cart/SummaryCart.js";
import View from "../components/core/view.js";
import Footer from "../components/landing/Footer.js";
import Navbar from "../components/landing/Nav.js";
import Toast from "../components/ui/toast.js";
import FloatBtns from "../components/ui/floating.js";


export default class CartPage extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Your Cart | AYAAM'
        }, _params);

    }
    template() {
        return `
            <header class="sticky-top bg-white" id='navbar' data-fade></header>
            <div class="toast-body" id="toastMsg"></div>
            <div id="floatBtns"></div>
            <div id="cart-container">
                <div class='container-lg '>

                    <!-- ITEMS INSIDE CART AND SUMMARY-->

                    <div class='row px-2 pt-2 pb-2'>
                        <!-- CART ITEMS COLUMN  -->
                        <div id='cart-items' class='col-12 col-md-8 border-bottom bordernoneMD'>
                            
                        </div>

                        <!-- SUMMARY  COLUMN -->
                        <div id='summary' class='col-12 col-md-4 marginBottomCart fw-semibold summary-container'>
                        
                        </div>
                    </div>
                </div>
            </div>

            <!-- RELATED SECTION-->

            <div id="related-items" class="marginTop-related mb-4 ms-lg-0 me-lg-0 ps-lg-0 pe-lg-0" data-fade>
                
            </div>

            <!-- Footer-->
            <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer'>${Footer()}</footer>
        
        `
    }

    script() {
        this.mount(Navbar, "#navbar");
        this.mount(Toast, "#toastMsg");
        this.mount(FloatBtns, "#floatBtns");
        this.mount(CartItems, "#cart-items");
        this.mount(SummaryCart, "#summary");
        this.mount(RelatedProducts, "#related-items");
    }

}