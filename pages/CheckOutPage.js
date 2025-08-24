import View from "../components/core/view.js";
import { CartManager } from "../scripts/cartScripts/cartManager.js";
import { navigate } from "../scripts/utils/navigation.js";
import { sessionStore } from "../scripts/utils/storage.js";

const cartManager = new CartManager();
const cartItems = cartManager.getCartItem();
console.log(cartItems)

export default class CheckoutPage extends View {
    template() {
        return `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="d-flex align-items-center justify-content-between border-bottom py-3 fw-bold">
                            <span>Total Amount</span>
                            <span>$ ${cartManager.calculateTotal().total.toFixed(2)}</span>
                        </div>
                        <div class="bg-light-subtle my-3">
                            <p class="fw-semibold text-secondary fs-5"> Order Information</p>
                            <div class="table-responsive">
                                <table class="table ">
                                    <thead>
                                        <tr class="text-center fs-small">
                                            <th scope="col" class="text-secondary">Name</th>
                                            <th scope="col" class="text-secondary">Email</th>
                                            <th scope="col" class="text-secondary">Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center fw-semibold fs-small">
                                            <td>Azza</td>
                                            <td>azzasallam369@gmail.com</td>
                                            <td>01234567891</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row p-0 m-0">
                    <div class="col-12 col-md-8 col-lg-9 ">
                    <div>
                    <p class="fw-semibold text-secondary fs-5 ">Order Details</p>
                    <div class="orders-height g-2 py-3">
                        ${cartItems.map(item => `
                                        <div class=" d-flex flex-row align-items-center gap-3 cardItem-height pb-2  mb-3  border-bottom">
                                            <div class="h-100">
                                                <img src="${item.img}" class="img-order h-100 rounded-3"/>
                                            </div>
                                            <div class="fw-semibold">
                                                <p class="mb-1">$ ${item.price}</p>
                                                <p class="mb-1">${item.name} </p>
                                                <p class="mb-1 text-muted">${item.category} - ${item.subCategory}</p>
                                                <p class="mb-1 text-muted d-flex align-items-center gap-2"> <span>Qty : ${item.qty} </span> <span> | </span> <span>Color : ${item.color}</span></p>
                                            </div>
                                        </div>
                                        `).join('')}
                                    </div>
                                </div>

                        </div>

                        <div class="col-12 col-md-4 col-lg-3 bg-light-subtle py-3 px-2 boxshadow">
                            <div class=" fw-semibold">
                                <p>Date : 20/8/2025</p>
                                <p>Delivery Fee : $ 5 </p>
                                <p>Total : $ ${cartManager.calculateTotal().total.toFixed(2)}</p>
                                <p>Discount: $ ${cartManager.calculateTotal().discountTotal.toFixed(2)} </p>

                                <div class="my-3">

                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" checked required>
                                    <label class="form-check-label" for="cash">
                                        Cash
                                    </label>
                                </div>

                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="paymentMethod" id="visa" value="visa" required>
                                    <label class="form-check-label" for="visa">
                                        Visa
                                    </label>
                                </div>
                                </div>
                            </div>
                            <div class="py-3">
                                <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar text-bg-success" style="width: 100%">100% Confirm Your Order</div>
                                </div>
                                <button id="pay" class='w-100 py-3 fw-bold border-0 rounded-pill bg-black text-white mt-3 checkoutBTN'>
                                    Pay
                                </button>
                                <button id="continue-shoping" class='w-100 py-3 fw-bold rounded-pill bg-white text-muted border mt-3 shoping-btn'>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    script() {
        document.getElementById('pay').addEventListener('click', () => {
            navigate('/home');
        });

        document.getElementById('continue-shoping').addEventListener('click', () => {
            navigate('/catalog');
        });
    }

}