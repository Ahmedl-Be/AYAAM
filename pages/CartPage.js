import CartItems from "../components/cart/cartItems.js";
import RelatedProducts from "../components/cart/RelatedProducts.js";
import SummaryCart from "../components/cart/SummaryCart.js";
import View from "../components/core/view.js";
import Navbar from "../components/landing/Nav.js";



export default class CartPage extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Your Cart | AYAAM'
        }, _params);

    }
    template() {
        return `
            <header class="sticky-top bg-white" id='navbar'></header>
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

            <!-- RELARED SECTION-->

            <div id="related-items" class="marginTop-related mb-4 ms-lg-0 me-lg-0 ps-lg-0 pe-lg-0" >
                
            </div>
        
        `
    }

    script() {
        this.mount(Navbar, "#navbar");
        this.mount(CartItems, "#cart-items");
        this.mount(SummaryCart, "#summary");
        this.mount(RelatedProducts, "#related-items");
    }
    
}