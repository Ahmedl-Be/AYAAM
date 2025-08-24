import { localStore, sessionStore } from "../utils/storage.js";

// Dummy user Cart
const userCart = {
  userId: "u1",
  items: [
    {
      id: "wdr009",
      name: "Flower Long Summer Dress",
      color: "Black",
      price: Number((15.3 * (1 - 0.2)).toFixed(2)),
      size: "XS",
      qty: 2,
    },
    {
      id: "wdr009",
      name: "Flower Long Summer Dress",
      color: "Black",
      price: Number((15.3 * (1 - 0.2)).toFixed(2)),
      size: "S",
      qty: 4,
    },
    {
      id: "wdr010",
      name: "Elegant Long Dress",
      color: "Green",
      price: Number((12.63 * (1 - 0.2)).toFixed(2)),
      size: "XS",
      qty: 1,
    }
  ]
};

// Set dummy cart items to session
sessionStore.write("ShopingCart", userCart);

export function CartManager() {
  // Get local data to work on
  this.products = localStore.read("products", []);

  // Get user cart from session
  this.cart = sessionStore.read("ShopingCart", []);

  // Get detailed cart items
  this.getCartItem = function () {
    return this.cart.items.map(item => {
      const product = this.products.find(p => p.id === item.id);
      const stockItem = product?.stock.find(s => s.color === item.color);
      const sizeInStock = stockItem?.sizes.find(sz => sz.name === item.size);

      return {
        ...item,
        description: product?.description || "",
        realPrice: product?.price || 0,
        brand: product?.brand || "",
        category: product?.category || "",
        subcategory: product?.subcategory || "",
        offers: ["Free Shipping"],
        stockQty: sizeInStock?.qty || 0,
        total: Number((item.price * item.qty).toFixed(2)),
        images: stockItem?.images?.map(imgName =>
          `./data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${imgName}`
        ) || [],
        img: stockItem?.images
          ? `./data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${stockItem.images[0]}`
          : ""
      };
    });
  };

  // Save cart to session
  this.saveCart = function () {
    sessionStore.write("ShopingCart", this.cart);
  };

  // Update quantity UI
  this.rerender = function () {
    this.cart.items.forEach(item => {
      const qtyEl = document.querySelector(
        `.cart-item[data-id="${item.id}"][data-color="${item.color}"][data-size="${item.size}"] .qty`
      );
      if (qtyEl) qtyEl.innerText = item.qty;
    });
  };
  
  // Calculate totals
  this.calculateTotal = function () {
    const totals = this.cart.items.reduce((acc, item) => {
      const product = this.products.find(p => p.id === item.id);
      if (!product) return acc;
  
      const qty = item.qty || 0;
      const priceAfterDiscount = item.price;
  
      acc.subtotal += product.price * qty;
      acc.total += priceAfterDiscount * qty;
      return acc;
    }, { subtotal: 0, total: 0 });
  
    totals.discountTotal = totals.subtotal - totals.total;
    return totals;
  };
  
  // Update totals in DOM
  this.updateTotalUI = function (totals) {
     const subtotalEls = document.querySelectorAll(".subtotal");
    const totalEls = document.querySelectorAll(".total");
    const discountEls = document.querySelectorAll(".discount");
    const totalItemsEls = document.querySelectorAll('.totalItems');
    const hNoItems = document.querySelector('#no-items');
  
    subtotalEls.forEach(el => el.innerText =`SubTotal : $ ${ totals.subtotal.toFixed(2)}`);
    totalEls.forEach(el => el.innerText =  totals.total.toFixed(2));
    discountEls.forEach(el => el.innerText =`Discount :$ ${totals.discountTotal.toFixed(2)}` );
    totalItemsEls.forEach(el => el.innerText = `${this.itemCount()} Items`);
  
    console.log(this.calculateTotal().subtotal)
  };
  

  // Increase item quantity
    this.increaseQty = function (id, color, size, btnEl) {
        const item = this.cart.items.find(
        i => i.id === id && i.color === color && i.size === size
        );
    
        const product = this.products.find(p => p.id === id);
        const stockItem = product?.stock.find(s => s.color === color);
        const sizeObj = stockItem?.sizes.find(sz => sz.name === size) || {};
    
        if (!item) return;
    
        if (item.qty < (sizeObj.qty || 0)) {
        item.qty += 1;
        this.saveCart();
    
        // Update UI
        const parent = btnEl.closest(".cart-item");
        const qtyEl = parent.querySelector(".qty");
        if (qtyEl) qtyEl.innerText = item.qty;
    
        const totals = this.calculateTotal();
        this.updateTotalUI(totals);
        } else {
        btnEl.disabled = true;
        btnEl.style.cursor = "not-allowed";
        console.log("End of stock");
        }

    };
  
  // Decrease item quantity
  this.decreaseQty = function(id, color, size, btnEl) {
        const item = this.cart.items.find(i => i.id === id && i.color === color && i.size === size);
        if (!item) return;

        item.qty -= 1;
        this.saveCart();

        if (item.qty <= 0) {
            this.removeItem(id, color, size);
            return;
        }

        if (btnEl) {
            const qtyEl = btnEl.closest(".cart-card")?.querySelector(".qty");
            if (qtyEl) qtyEl.textContent = item.qty;

            if (item.qty === 1) {
                const decBtn = btnEl.closest(".cart-card")?.querySelector("button.decrease-btn");
                if (decBtn) {
                    decBtn.classList.remove("decrease-btn");
                    decBtn.classList.add("delete-btn");
                    decBtn.innerHTML = `<i class="fa-regular fa-trash-can fa-fw hoverIcon pointer"></i>`;
                }
            }
        }

        const totals = this.calculateTotal();
        this.updateTotalUI(totals);
    };

    // Remove item from cart
   this.removeItem = function(id, color, size) {
        this.cart.items = this.cart.items.filter(
            i => !(i.id === id && i.color === color && i.size === size)
        );
        this.saveCart();

        const card = document.querySelector(`.cart-card[data-id="${id}"][data-color="${color}"][data-size="${size}"]`);
        if (card) card.remove();

        const totals = this.calculateTotal();
        this.updateTotalUI(totals);
        console.log(this.cart.items)
    };
  
  
  // Count total items in cart
  this.itemCount = function () {
    return this.cart.items.reduce((sum, item) => sum + (item.qty || 0), 0);
  };

}
