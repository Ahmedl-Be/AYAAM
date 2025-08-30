import { navigate } from "../../scripts/utils/navigation.js";
import { localStore, sessionStore } from "../../scripts/utils/storage.js";
import Component from "../core/component.js";



export default class RelatedProducts extends Component {
    getDiscountedPrice(product) {
        if (!product || !product.price) return null;

        let discount = product.sale || 0;
        if (discount > 1) discount = discount / 100; 

        return (product.price * (1 - discount)).toFixed(2);
    }

    template() {
        const cartItems = sessionStore.read("shoppingCart", []);
        const localProducts = localStore.read("products", []);

        let relatedItems = [];

        if (cartItems.length === 0) {
            relatedItems = localProducts;
        } else {
            const cartCat = cartItems.map(item => {
                const product = localProducts.find(p => p.id === item.id);
                return product ? product.category : null;
            }).filter(Boolean);

            const uniqCats = [...new Set(cartCat)];

            relatedItems = uniqCats.map(cat => {
                const filtered = localProducts.filter(product => product.category === cat);
                return filtered.length > 0 ? filtered : localProducts;
            }).flat();
        }

        return `    
            <div class="marginTop-related mb-4 ms-lg-0 me-lg-0 ps-lg-0 pe-lg-0" id="related-items">
                <h2 class="text-center mb-4 mt-3 mt-md-0">Related Products</h2>

                <div class="slider-container position-relative">

                    <button class="slide-btn left-btn" id="leftBtn">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>

                    <div class="slider d-flex">
                        ${relatedItems.map(product => {
                            const discounted = this.getDiscountedPrice(product);
                            return `
                                <div class='col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center slide'>
                                    <div class="card h-100 shadow-sm position-relative" style="width: 100%; max-width: 280px; margin: auto;">
                                    
                                        <!-- Sale badge -->
                                        ${product.sale > 0 ? `
                                            <span class="badge bg-dark position-absolute top-0 start-0 m-2 px-2 py-2">
                                                ${(product.sale > 1 ? product.sale : product.sale * 100).toFixed()}% Sale
                                            </span>
                                        ` : ""}

                                        <!-- Image container with fixed height -->
                                        <div style="height: 260px; overflow: hidden;">
                                            <img 
                                                src="./data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${product.stock[0].images[0]}"
                                                class="card-img-top" 
                                                alt="${product.name}"
                                                style="object-fit: cover; width: 100%; height: 100%;"
                                            >
                                        </div>

                                        <div class="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h6 class="card-title fw-semibold">
                                                    ${product.brand} - ${product.name.slice(0, 20)}
                                                </h6>
                                                <p class="card-text text-muted mb-2 product-cart-description">
                                                    ${product.description.slice(0, 70)}...
                                                </p>

                                                <div class="d-flex justify-content-between align-items-start">
                                                    ${discounted
                                                        ? `
                                                            <div class="d-flex flex-column">
                                                                <span class="new-price fw-bold text-success">${discounted} USD</span>
                                                                <span class="old-price text-decoration-line-through text-muted" style="font-size: 0.75em">${product.price} USD</span>
                                                            </div>
                                                        `
                                                        : `<span class="new-price fw-bold ">${product.price} USD</span>`
                                                    }

                                                    <div class="d-flex gap-1 flex-wrap">
                                                        <small class="badge bg-dark rounded-pill">${product.category}</small>
                                                        <small class="badge bg-dark rounded-pill">${product.subcategory}</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <button 
                                                class="add-to-cart-btn btn btn-dark add-to-cart mt-3 d-flex align-items-center justify-content-center gap-2" 
                                                data-id="${product.id}" id="viewDetailsBtn-${product.id}">
                                                    <i class="fa-solid fa-cart-shopping text-white"></i> View Details      
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join("")}
                    </div>

                    <button class="slide-btn right-btn" id="rightBtn">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>

                </div>
            </div>  
        `;
    }

    
    script() {
            const buttons = document.querySelectorAll(".add-to-cart-btn");

            buttons.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const productId = btn.dataset.id; // id المنتج اللي ضغطنا عليه
                    sessionStore.write("currentProduct", productId, "");
                    navigate(`/product`);
                });
            });
        


            // document.addEventListener('DOMContentLoaded' ,()=>{
                const slider = document.querySelector(".slider");
                const slides = document.querySelectorAll(".slide");
    
                let currentIndex = 0;
                const slideWidth = slides[0].offsetWidth;
    
                function goToSlide(index) {
                slider.scrollTo({
                    left: index * slideWidth,
                    behavior: "smooth",
                });
            }

            document.querySelector(".right-btn").addEventListener("click", () => {
                nextSlide();
            });

            document.querySelector(".left-btn").addEventListener("click", () => {
                prevSlide();
            });

            // دالة للـ next slide
            function nextSlide() {
                currentIndex++;
                if (currentIndex >= slides.length) {
                    currentIndex = 0;
                }
                goToSlide(currentIndex);
            }

            // دالة للـ previous slide
            function prevSlide() {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = slides.length - 1;
                }
                goToSlide(currentIndex);
            }

            let autoplay = setInterval(nextSlide, 2000);

            slider.addEventListener("mouseenter", () => clearInterval(autoplay));
            slider.addEventListener("mouseleave", () => autoplay = setInterval(nextSlide, 3000));

        // })
    }   
    
}