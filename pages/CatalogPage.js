import View from "../components/core/view.js";
import { ProductList } from "./customer/productList/ProductList.js";
import Navbar from "../components/landing/Nav.js";
import Footer from "../components/landing/Footer.js";


export default class Catalog extends View {
  constructor(_config, _params = {}) {
    // Call base constructor
    super({
      title: 'Products Catalog | AYAAM'
    }, _params);

  }
  template() {
    return `
    <header class="sticky-top bg-white" id='navbar'></header>
    <div class="container py-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="mb-0 text-uppercase fw-light">Shop Our Amazing Products</h2>
    </div>

    <div class="row">
      <!-- LEFT: Filters -->
      <aside class="col-12 col-lg-3 mb-4 mb-lg-0" id="filter-sidebar">
        <!-- mobile toggle -->
        <button class="btn btn-outline-dark w-100 d-lg-none mb-3" data-bs-toggle="collapse" data-bs-target="#filtersCollapse">
          <i class="fa-solid fa-filter me-2"></i> Filters
        </button>

        <div id="filtersCollapse" class="collapse d-lg-block">
          <form id="filters" class="small">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <strong>Filters</strong>
              <button type="button" id="clear-filters" class="btn btn-link btn-sm">Clear all</button>
            </div>

            <div class="accordion accordion-flush" id="filtersAccordion">

              <!-- Category -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingCat">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#filterCategory">
                    Category
                  </button>
                </h2>
                <div id="filterCategory" class="accordion-collapse collapse show" data-bs-parent="#filtersAccordion">
                  <div class="accordion-body" id="filterByCategory">
                    <div class="form-check">
                      <input class="form-check-input filter-input" type="radio" name="category" id="cat-all" value="" checked>
                      <label class="form-check-label" for="cat-all">All</label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Product Type / Subcategory  -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSub">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#filterSubCategory">
                    Product Type
                  </button>
                </h2>
                <div id="filterSubCategory" class="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
                  <div class="accordion-body" id="subcat-options">
                    <!-- JS will inject checkboxes based on products -->
                    <div class="form-text">Select a category to load product types.</div>
                  </div>
                </div>
              </div>

              <!-- Brand -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingBrand">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#filterBrand">
                    Brand
                  </button>
                </h2>
                <div id="filterBrand" class="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
                  <div class="accordion-body" id="brand-options">
                    <!-- JS will inject brand checkboxes -->
                  </div>
                </div>
              </div>

              <!-- Size -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSize">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#filterSize">
                    Size
                  </button>
                </h2>
                <div id="filterSize" class="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
                  <div class="accordion-body" id="size-options">
                    <!-- JS will inject brand size -->
           
                  </div>
                </div>
              </div>

              <!-- Color -->
              <div class="accordion-item">
               <h2 class="accordion-header" id="headingColor">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#filterColor">
                    Color
                  </button>
                </h2>
                <div id="filterColor" class="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
                  <div class="accordion-body" id="color-options">
         
          


                  </div>
                </div>
              </div> 

              <!-- Price -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingPrice">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#filterPrice">
                    Price
                  </button>
                </h2>
                <div id="filterPrice" class="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
                  <div class="accordion-body">
                    <div class="row g-2">
                      <div class="col-6">
                        <input type="number" min="0" class="form-control form-control-sm filter-input" id="min-price" placeholder="Min">
                      </div>
                      <div class="col-6">
                        <input type="number" min="0"  class="form-control form-control-sm filter-input" id="max-price" placeholder="Max">
                      </div>
                    </div>
                    <div class="form-text mt-1">Sale discounts are applied automatically.</div>
                  </div>
                </div>
              </div>

              <!-- Discount -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingDiscount">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#filterDiscount">
                    Discount
                  </button>
                </h2>
                <div id="filterDiscount" class="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
                  <div class="accordion-body">
                    <div class="form-check">
                      <input class="form-check-input filter-input" type="radio" name="discount" id="disc-any" value="" checked>
                      <label class="form-check-label" for="disc-any">Any</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input filter-input" type="radio" name="discount" id="disc-10" value="0.10">
                      <label class="form-check-label" for="disc-10">10% & up</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input filter-input" type="radio" name="discount" id="disc-20" value="0.20">
                      <label class="form-check-label" for="disc-20">20% & up</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input filter-input" type="radio" name="discount" id="disc-40" value="0.40">
                      <label class="form-check-label" for="disc-40">40% & up</label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Offers -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOffers">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#filterOffers">
                    Offers
                  </button>
                </h2>
                <div id="filterOffers" class="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
                  <div class="accordion-body" id="filterOffersBody">
                    <!-- JS Inject Here -->
                  </div>
                </div>
              </div>

            </div><!-- /accordion -->
          </form>
        </div>
      </aside>

      <!-- RIGHT: Products -->
      <section class="col-12 col-lg-9">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div id="results-count" class="text-muted small"></div>
        </div>
        <div class="row g-3" id="product-list"></div>
      </section>
    </div>
  </div>
  <div id="footerCatalog" class="bg-dark text-white">${Footer()}</div>
  `
  }

  script() {

    this.mount(Navbar, "#navbar");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    // Central filter state
    const state = {
      category: null,
      subCategories: new Set(),
      brand: new Set(),
      size: new Set(),
      color: new Set(),
      minPrice: null,
      maxPrice: null,
      discount: null,
      offers: new Set(),
    };



    function filterProductByCategory() {
      const categories = [...new Set(products.map(p => p.category))];
      const filterByCategory = document.querySelector("#filterByCategory");
      for (const category of categories) {
        filterByCategory.innerHTML += `
              <div class="form-check">
                  <input class="form-check-input filter-input" type="radio" name="category" id="cat-${category}" value="${category}">
                   <label class="form-check-label" for="cat-${category}">${category}</label>
              </div>
          `
      };

      // select all radio buttons for category filter **after adding them to the DOM**
      const categoryRadios = document.querySelectorAll('input[name="category"]');

      categoryRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
          const selectedCategory = e.target.value.trim();
          state.category = selectedCategory || null;

          // Reset other filters when category changes --important for UX--
          state.subCategories.clear();
          state.brand.clear();
          state.size.clear();

          filterProductByProductType();
          filterProductByBrand();
          filterProductBySize();
          filterProductByColor();
          filterProductByPrice();
          filterProductByDiscount();
          filterProductByOffers();

          ProductList("product-list", "results-count", state);;
        });
      });
    };



    function filterProductByProductType() {
      const productSubCat = document.getElementById("subcat-options");
      let availableTypes = products;
      if (state.category) {
        availableTypes = availableTypes.filter(p => p.category === state.category);
      };

      const productTypes = [...new Set(availableTypes.map(p => p.subcategory))];

      productSubCat.innerHTML = productTypes.map(type => `
      <div class="form-check form-check-inline">
        <input class="form-check-input filter-input" type="checkbox" value="${type}" id="pType-${type}" name="subcategory">
        <label class="form-check-label" for="pType-${type}">${type}</label>
      </div>`).join("");

      const SubCategoryCheck = document.querySelectorAll('input[name="subcategory"]');
      SubCategoryCheck.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) state.subCategories.add(checkbox.value);
          else state.subCategories.delete(checkbox.value);


          // --- NEW LOGIC: Remove brands not available in the new subcategory selection ---
          let availableProducts = products;
          if (state.category) {
            availableProducts = availableProducts.filter(p => p.category === state.category);
          }
          if (state.subCategories.size > 0) {
            availableProducts = availableProducts.filter(p => state.subCategories.has(p.subcategory));
          }
          const availableBrands = new Set(availableProducts.map(p => p.brand));
          // Remove brands from state.brand that are not in availableBrands
          state.brand.forEach(brand => {
            if (!availableBrands.has(brand)) {
              state.brand.delete(brand);
            }
          });


          // --- Remove unavailable sizes ---
          const availableSizes = new Set(
            availableProducts.flatMap(product =>
              (product.stock || []).flatMap(variant =>
                (variant.sizes || []).map(size => size && size.name ? size.name.trim() : null)
              )
            ).filter(name => name && name.length > 0)
          );
          state.size.forEach(size => {
            if (!availableSizes.has(size)) {
              state.size.delete(size);
            }
          });

          // --- Remove unavailable colors ---
          const availableColors = new Set(
            availableProducts.flatMap(product =>
              (product.stock || []).map(variant => variant.color?.trim())
            ).filter(c => c && c.length > 0)
          );
          state.color.forEach(color => {
            if (!availableColors.has(color)) {
              state.color.delete(color);
            }
          });
          // --- END NEW LOGIC ---


          filterProductBySize();
          filterProductByBrand();
          filterProductByColor();
          filterProductByPrice();
          ProductList("product-list", "results-count", state);
        });
      })
    };




    function filterProductByBrand() {
      const brandOptions = document.getElementById("brand-options");
      let availableProducts = products;
      if (state.category) {
        availableProducts = availableProducts.filter(p => p.category === state.category);
      };

      if (state.subCategories.size > 0) {
        availableProducts = availableProducts.filter(p => state.subCategories.has(p.subcategory));
      }

      const productBrand = [...new Set(availableProducts.map(p => p.brand))];
      brandOptions.innerHTML = productBrand.map(brand => `
      <div class="form-check form-check-inline">
        <input class="form-check-input filter-input" type="checkbox" value="${brand}" id="brand-${brand}" name="brand">
        <label class="form-check-label" for="brand-${brand}">${brand}</label>
      </div>`).join("");

      const BrandCheck = document.querySelectorAll('input[name="brand"]');
      BrandCheck.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) state.brand.add(checkbox.value);
          else state.brand.delete(checkbox.value);
          filterProductByColor();
          ProductList("product-list", "results-count", state);
        });
      })
    };



    function filterProductBySize() {
      const sizeOptions = document.getElementById("size-options");
      let availableProducts = products;

      if (state.category) {
        availableProducts = availableProducts.filter(p => p.category === state.category);
      };

      if (state.subCategories.size > 0) {
        availableProducts = availableProducts.filter(p => state.subCategories.has(p.subcategory));
      };

      // Extract all available sizes from the products and handel the very amount of exeptions
      const availableSizes = [
        ...new Set(
          availableProducts.flatMap(product =>
            (product.stock || []).flatMap(variant =>
              (variant.sizes || [])
                .map(size => (size && size.name ? size.name.trim() : null))
            )
          )
        )
      ].filter(name => name && name.length > 0);

      sizeOptions.innerHTML = availableSizes.map(size => `
          <div class="form-check form-check-inline">
              <input class="form-check-input filter-input" type="checkbox" value="${size}" id="size-${size}" name="sizes">
              <label class="form-check-label" for="size-${size}">${size}</label>
          </div>`).join('');

      const SizeCheck = document.querySelectorAll('input[name="sizes"]');
      SizeCheck.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) state.size.add(checkbox.value);
          else state.size.delete(checkbox.value);
          filterProductByColor();
          ProductList("product-list", "results-count", state);
        });
      });
    };



    function filterProductByColor() {
      const colorOptions = document.getElementById("color-options");
      let availableProducts = products;

      // Filter by category
      if (state.category) {
        availableProducts = availableProducts.filter(p => p.category === state.category);
      }
      // Filter by subcategory
      if (state.subCategories.size > 0) {
        availableProducts = availableProducts.filter(p => state.subCategories.has(p.subcategory));
      }
      // Filter by brand
      if (state.brand.size > 0) {
        availableProducts = availableProducts.filter(p => state.brand.has(p.brand));
      }
      // Filter by size
      if (state.size && state.size.size > 0) {
        availableProducts = availableProducts.filter(p =>
          (p.stock || []).some(variant =>
            (variant.sizes || []).some(size =>
              state.size.has(size.name)
            )
          )
        );
      }

      // Extract all unique colors from stock
      const availableColors = [
        ...new Set(
          availableProducts.flatMap(product =>
            (product.stock || [])
              .map(variant => variant.color?.trim())
          )
        )
      ].filter(c => c && c.length > 0);

      colorOptions.innerHTML = availableColors.map(color => `
          <div class="form-check form-check-inline">
              <input class="form-check-input filter-input" type="checkbox" value="${color}" id="color-${color}" name="colors">
              <label class="form-check-label" for="color-${color}">${color}</label>
          </div>`).join('');

      const ColorCheck = document.querySelectorAll('input[name="colors"]');
      ColorCheck.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) state.color.add(checkbox.value);
          else state.color.delete(checkbox.value);
          ProductList("product-list", "results-count", state);
        });
      });
    };




    function filterProductByPrice() {
      const minPriceInput = document.getElementById("min-price");
      const maxPriceInput = document.getElementById("max-price");
      [minPriceInput, maxPriceInput].forEach(input => {
        input.addEventListener("input", () => {
          const min = parseFloat(minPriceInput.value);
          const max = parseFloat(maxPriceInput.value);

          // Prevent negative values
          if (!isNaN(min) && min < 0) min = 0;
          if (!isNaN(max) && max < 0) max = 0;

          // Prevent invalid ranges (min > max)
          if (!isNaN(min) && !isNaN(max) && min > max) {
            max = min;
            maxPriceInput.value = min; // auto correct for UI
          };

          state.minPrice = isNaN(min) ? null : min;
          state.maxPrice = isNaN(max) ? null : max;

          ProductList("product-list", "results-count", state);
        });
      });

    };



    function filterProductByDiscount() {

      const discountRadios = document.querySelectorAll("input[name='discount']");
      discountRadios.forEach(radio => {
        radio.addEventListener("change", () => {
          const value = parseFloat(radio.value);
          state.discount = isNaN(value) ? null : value;
          ProductList("product-list", "results-count", state);
        });
      });

    };





    function filterProductByOffers() {

      const filterOffersBody = document.getElementById('filterOffersBody');

      const offersSet = new Set();
      products.forEach(p => {
        (p.offers || []).forEach(o => {
          if (o && o.trim().length > 0) {
            offersSet.add(o.trim());
          }
        }
        );
      });

      if (offersSet.size === 0) {
        filterOffersBody.innerHTML = `
          <span class="text-muted">No Offers Available Now</span>
          `;
        return;
      } else {
        filterOffersBody.innerHTML = Array.from(offersSet).map(offer => `
          <div class="form-check">
              <input class="form-check-input filter-input" type="checkbox" id="offer-${offer}" value="${offer}" name="offers">
              <label class="form-check-label" for="offer-${offer}">${offer}</label>
          </div>`).join("");
      }
      const offerCheckboxes = document.querySelectorAll("input[name='offers']");
      offerCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            state.offers.add(checkbox.value);
            console.log("Added offer:", checkbox.value);
          } else {
            state.offers.delete(checkbox.value);
          }
          ProductList("product-list", "results-count", state);
        });
      });
    }





    // Clear all filters
    document.getElementById("clear-filters").addEventListener("click", () => {
      state.category = null;
      state.subCategories.clear();
      state.brand.clear();
      state.size.clear();
      state.color.clear();
      state.minPrice = null;
      state.maxPrice = null;
      state.discount = null;
      state.offers.clear();

      // Reset all filter inputs
      document.querySelectorAll('.filter-input').forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = false;
        } else {
          input.value = '';
        }
      });

      const allCatRadio = document.getElementById("cat-all");
      if (allCatRadio) allCatRadio.checked = true

      // Re-render all filters if needed
      filterProductByProductType();
      filterProductByBrand();
      filterProductBySize();
      filterProductByColor();
      filterProductByPrice();
      filterProductByDiscount();
      filterProductByOffers();


      // Re-render the product list with no filters
      ProductList("product-list", "results-count", state);

    });



    // base filter 
    filterProductByCategory();

    // depend on category filter
    filterProductByProductType();

    //  depend on category and subcategory filters
    filterProductByBrand();

    // depend on category, subcategory and brand filters
    filterProductBySize();


    // depend on category, subcategory, brand and size  filter
    filterProductByColor();


    // depend on category filter
    filterProductByPrice();


    // depend on category
    filterProductByDiscount();


    // depend on category
    filterProductByOffers();

    // Initial product list load
    ProductList("product-list", "results-count", state);

  }

};