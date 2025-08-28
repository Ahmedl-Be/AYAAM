import { CartManager } from "../../scripts/cartScripts/cartManager.js";
import Component from "../core/component.js"



export default class CartItems extends Component {

    template() {
        const cartManager = new CartManager();
        const items = cartManager.getCartItem();
        console.log(items);
        return `
            <div class="cart-items-container" id="cart-container">  
                 <div class="cart-items-container">
                    
                        <div class=' border-bottom bordernoneMD text-center text-md-start '>
                            <h2>Bag</h2>
                            <p class='fw-semibold d-block d-md-none'> 
                                <span class='text-secondary border-end border-2 px-2' id='totalItems'> ${cartManager.itemCount()} Items</span> 
                                <span class='ms-1 total' >$ ${(cartManager.calculateTotal().total).toFixed(2)}</span> 
                            </p>
                        </div>

                        <div class='py-4' id='cart-container' >
                            ${items.length === 0
                                ? ` <h6 id="no-items"> There are no items in your bag. </h6> `
                                : items.map(item =>
                                    `
                                                        <div class='py-4 borderblockMD w-100 h cart-card' data-id="${item.id}" data-color="${item.color}" data-size="${item.size}">
                                                            <div class='d-flex align-align-items-center gap-4 '>
                                                                <div  >
                                                                    <div class="cart-image-container">
                                                                        <img src="${item.img}" class="img-cart default-img" />
                                                                    </div>
                                                                    <div class='cart-item rounded-pill border p-2 my-2 d-flex align-items-center justify-content-around'>
                                                                        <!-- BTN MINUS -->
                                                                        ${item.qty >= 2
                                        ? `<button class="bg-transparent border-0 decrease-btn" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}">
                                                                                <i class="fa-solid fa-minus fa-fw pointer"></i>
                                                                            </button>`
                                        : `<button class="bg-transparent border-0 delete-btn" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}">
                                                                                <i class="fa-regular fa-trash-can fa-fw hoverIcon pointer"></i>
                                                                            </button>`
                                    }
                                                                        <!-- ____________Span Qty _______________ -->
                                                                        <span class="qty"> ${item.qty} </span>

                                                                        <!-- BTN Plus -->
                                                                        <button class='bg-transparent border-0 btn-increase icrease-btn'  
                                                                            data-id="${item.id}"
                                                                            data-color= "${item.color}"
                                                                            data-size = "${item.size}" 
                                                                            ${item.qty >= (item.stockQty) ? "disabled" : ""}
                                                                        >
                                                                            <i class="fa-solid fa-plus fa-fw li-pointer"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div class='fw-semibold w-75'>
                                                                    <div class=' d-md-flex justify-content-between align-items-center'>
                                                                        <p >${item.name}</p>
                                                        
                                                                        <p>
                                                                            <!-- ____________________price after sale_________________ -->
                                                                            $${item.price} 
                                                                            ${item.sale ? `<span class="text-secondary ms-2 text-decoration-line-through">
                                                                                $ ${item.realPrice}
                                                                            </span>` : ""}
                                                                        </p>
                                                                    </div>
                                                                    <p class="card-text line-clamp text-muted small mb-2">${item.description}</p>
                                                                    <div class=' d-flex align-items-center gap-5'>
                                                                        <p class='text-secondary'>${item.color}</p>
                                                                        <p class='text-secondary'>Size : ${item.size}</p>
                                                                    </div>
                                                                    <p class=' text-secondary'>Brand : <span class='text-primary'>${item.brand}</span></p>
                                                                    <p class='d-flex align-items-center gap-2'>${item.category}
                                                                        <i class="fa-solid fa-angle-right fa-fw centerArIcon" style="color: #0D6EFD;"></i>
                                                                        ${item.subcategory}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    `
                                ).join("")
                            }
                        </div>
                    </div>

            </div>
        `

    }


    script() {
        const cartManager = new CartManager();
        const items = cartManager.getCartItem();
        console.log(items);

        document.querySelectorAll('.icrease-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const color = e.currentTarget.dataset.color;
                const size = e.currentTarget.dataset.size;

                cartManager.increaseQty(id, color, size, e.currentTarget);
            });
        });

        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const color = e.currentTarget.dataset.color;
                const size = e.currentTarget.dataset.size;

                cartManager.decreaseQty(id, color, size, e.currentTarget);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const color = e.currentTarget.dataset.color;
                const size = e.currentTarget.dataset.size;

                const card = document.querySelector(`.cart-card[data-id="${id}"][data-color="${color}"][data-size="${size}"]`);
                console.log(card)

                if (card) {
                    cartManager.removeItem(id, color, size, card);
                }
            });
        });
    }

}


