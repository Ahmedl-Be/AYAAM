import { localStore, sessionStore } from "../../scripts/utils/storage.js";
import Component from "../core/component.js";



const cartItems = sessionStore.read("ShopingCart" , []);
const localProducts = localStore.read("products" , []);

const cartCat = cartItems.map(item => {
    const product = localProducts.find(p => p.id === item.id);
    return product ? product.category : null ;
}).filter(Boolean);

console.log(cartCat) ;

const uniqCats = [...new Set(cartCat)];


const relatedItems = uniqCats.map(cat => {
    return localProducts.filter(product => product.category === cat);
}).flat();

console.log( 'related item', relatedItems);
        

export default class RelatedProducts extends Component{

    template() {
        return `    
            <div class=" marginTop-related mb-4 ms-lg-0 me-lg-0 ps-lg-0 pe-lg-0" id="related-items">
                <h2 class="text-center mb-4 mt-3 mt-md-0">Related Products</h2>

                <div class="slider-container position-relative">

                    <button class="slide-btn left-btn" id="leftBtn">
                    <i class="fa-solid fa-chevron-left"></i>
                    </button>

                    <div class="slider d-flex">
                    ${relatedItems.map(product => `
                        <div class='col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center slide'>
                        <div class="card h-100 position-relative " style="width: 18rem;">
                            ${
                                product.sale ? `
                                <span class="position-absolute bg-black text-white px-2 py-2 fs-6 fw-semibold bagecartItem" 
                                    style="z-index: 1; font-size: 0.8rem;">
                                        ${product.sale / 100 }% SALE 
                                </span>
                                ` : ``
                            }

                            <img style="height:320px" 
                                src="./data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${product.stock[0].images[0]}"  
                                class="card-img-top" alt="...">

                            <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text line-clamp text-muted small mb-2">${product.description}</p>
                            
                            <div class="mb-2 d-flex justify-content-between">
                            ${product.sale ? `
                                    <div class="d-flex flex-column">
                                        <span class="text-success fw-bold">$ ${product.sale}</span>
                                        <span class="text-muted text-decoration-line-through">$ ${product.price}</span>
                                    </div>
                                    ` : `
                                    <span class="text-primary fw-bold">$ ${product.price}</span>
                                    `
                                }
                                <div class="d-flex align-items-center gap-2">
                                <span class="badge bg-dark rounded-4">${product.category}</span>
                                <span class="badge bg-dark rounded-4"> ${product.subcategory}</span>
                                </div>
                            </div>

                            <a href="#" onclick="" class="btn bg-black text-white w-100 mt-auto text-center">
                                <i class="fa-solid fa-cart-plus me-1"></i>
                                Add To Bag
                            </a>
                            </div>
                        </div>
                        </div>
                    `).join("")}
                    </div>

                    <button class="slide-btn right-btn" id="rightBtn">
                    <i class="fa-solid fa-chevron-right"></i>
                    </button>

                </div>
            </div>  
        `
    }

    script() {
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
        }   
    
}