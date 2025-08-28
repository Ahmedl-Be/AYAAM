import { CartManager } from "../../scripts/cartScripts/cartManager.js";
import Component from "../core/component.js";




export default class CheckoutReceit extends Component{

    template() {
        const cartManager = new CartManager();
        const items = cartManager.getCartItem();

        console.log(items)
        return `
            <div>
                <h5>Your Bag</h5>
                <div>
                    ${items.map((item)=> `
                        <div class="mb-2 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class=" position-relative">
                                    <img src="${item.img}" class="img-receit rounded-3"/>
                                    <p class="position-absolute top-0 start-0 bg-black rounded-pill badge item-qty"> <span class=" text-white">${item.qty}</span> </p>
                                </div>
                                <div class=" d-flex flex-column">
                                    <span>${item.name}</span>
                                    <span class=" text-muted"> ${item.category}</span>
                                </div>
                            </div>
                            <div>
                                <span class=" fw-semibold">$${item.price}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
                <div class="my-4">
                    <p class="subtotal d-flex justify-content-between fw-bold">SubTotal :  <span class=" text-end">$ ${(cartManager.calculateTotal().subtotal).toFixed(2)}</span> </p>
                    <p>Shipping : _____</p>
                    <p>Estimated Taxes : _____</p>
                    
                    <p class='totalCart py-1 py-md-3 mb-md-3 d-flex justify-content-between fw-bold'> Total :  <span class="total">$ ${(cartManager.calculateTotal().total).toFixed(2)}</span>  </p>
                </div>
               
            </div>
        
        `
    }

    script() {

      

    }
}