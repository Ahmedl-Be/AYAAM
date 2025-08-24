import Component from "../core/component.js";
import { CartManager } from "../../scripts/cartScripts.js/cartManager.js";
import { navigate } from "../../scripts/router.js";


const cartManager = new CartManager() ;


export default class SummaryCart extends Component{

    template() {
        return `
             <h2 class='mb-4 mt-5 mt-md-2 mt-md-0'>Summary</h2>

                    <div class="pointer mb-2">
                        <a class="d-flex align-items-center justify-content-between text-secondary text-decoration-none"
                            data-bs-toggle="collapse" href="#promoDiv" role="button" aria-expanded="false" aria-controls="promoDiv">
                            <span>Do you have a Promo Code?</span>
                            <span id="arrow-down"><i class="fa-solid fa-chevron-down"></i></span>
                            <span id="arrow-up" class="d-none"><i class="fa-solid fa-chevron-up"></i></span>
                        </a>
                    </div>

                    <div class="collapse mt-2" id="promoDiv">
                        <div class="d-flex gap-2 mb-2">
                            <input type="text" class="form-control w-75 rounded-3 border-code px-2"/>
                            <button class="btn btn-outline-secondary rounded-pill py-2 px-3 fw-bold w-25 text-center">Apply</button>
                        </div>
                    </div>
                    <p class="subtotal">SubTotal : $ <span>${(cartManager.calculateTotal().subtotal).toFixed(2)}</span> </p>
                    <p>Estimated Shipping & Handling : $Free </p>
                    <p>Estimated Tax : __ </p>

                    <div class='d-none d-md-block position-sticky bottom-0 start-0 w-100 bg-white py-3 py-md-0  gap-3 px-2 px-md-0  border-top bordernoneMD'>
                        <h5 class='totalCart py-1 py-md-3 mb-md-3 '> Total : $ <span class="total">${(cartManager.calculateTotal().total).toFixed(2)}</span>  </h5>
                        <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar text-bg-info text-center text-white" style="width: 75%">75% Confirm Your Order</div>
                        </div>
                        <button class='w-100 py-3 fw-bold border-0 rounded-pill bg-black text-white mt-3 checkoutBTN checkout-btn'>
                            CheckOut
                        </button>
                    </div>
                    
                    </div>

                    <div class=' d-md-none position-sticky bottom-0 start-0 w-100 bg-white py-3 py-md-0  gap-3 px-2 px-md-0  border-top bordernoneMD'>
                        <h5 class='totalCart py-1 py-md-3 mb-md-3 '> Total : $ <span class="total">${(cartManager.calculateTotal().total).toFixed(2)}</span>  </h5>
                        <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar text-bg-info text-center text-white" style="width: 75%">75% Confirm Your Order</div>
                        </div>
                        <button class='w-100 py-3 fw-bold border-0 rounded-pill bg-black text-white mt-3 checkoutBTN checkout-btn'>
                            CheckOut
                        </button>
                    </div>
            </div>
        `
    }

    script() {
        document.querySelectorAll('.checkout-btn').forEach(btn =>{
            btn.addEventListener('click' , ()=>{
                navigate('/checkout')
            })
        })
        
    }
}