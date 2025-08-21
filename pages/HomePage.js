import Navbar from "../components/ui/NavBar.js";
import View from "../scripts/view.js";

export default class Home extends View {
    template() {
        return `
            ${Navbar()}
<!--------------------------------------------------------------------------->
<section class="hero-section text-center">
      <div class="container">
        <h1 class="display-4 fw-bold mb-4">Summer Collection 2023</h1>
        <p class="lead mb-5">
          Discover the latest trends in fashion for every occasion
        </p>
        <div class="d-flex justify-content-center gap-3">
          <a href="#" class="btn btn-primary btn-lg px-4">Shop Now</a>
          <a href="#" class="btn btn-outline-light btn-lg px-4 signup-btn"
            >Sign Up & Get 20% Off</a
          >
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="container mb-5">
      <h2 class="text-center mb-5">Shop by Category</h2>
      <div class="row g-4">
        <!-- Category 1 -->
        <div class="col-md-4 col-sm-12">
          <div class="category-card card">
            <img
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c80b41145d104f03924180fd7730186e_9366/Unisex_Denim_Strapback_Black_JK5240_01_00_standard.jpg"
              class="card-img-top"
              alt="Men's Fashion"
            />
            <div class="card-body">
              <h5 class="card-title">Men's Fashion</h5>
              <div class="rating mb-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="text-muted ms-2">(1,245)</span>
              </div>
              <a href="#" class="btn btn-outline-primary">Explore</a>
            </div>
          </div>
        </div>

        <!-- Category 2 -->
        <div class="col-12 col-md-4 col-sm-12">
          <div class="category-card card">
            <img
              src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3"
              class="card-img-top"
              alt="Women's Fashion"
            />
            <div class="card-body">
              <h5 class="card-title">Women's Fashion</h5>
              <div class="rating mb-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span class="text-muted ms-2">(2,187)</span>
              </div>
              <a href="#" class="btn btn-outline-primary">Explore</a>
            </div>
          </div>
        </div>

        <!-- Category 3 -->
        <div class="col-md-4 col-sm-6">
          <div class="category-card card">
            <img
              src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/ss25_ccrd_kids_glp_lifestyle_2_d_7ac0b03fc1.jpg"
              class="card-img-top"
              alt="Kids Fashion"
            />
            <div class="card-body">
              <h5 class="card-title">Kids Collection</h5>
              <div class="rating mb-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <span class="text-muted ms-2">(876)</span>
              </div>
              <a href="#" class="btn btn-outline-primary">Explore</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products -->
    <section class="container mb-5">
      <h2 class="text-center mb-5">Bestsellers</h2>
      <div class="row">
        <!-- Product 1 -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="card h-100">
            <img
              src="https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3"
              class="card-img-top"
              alt="Product"
            />
            <div class="card-body">
              <h5 class="card-title">Premium Denim Jacket</h5>
              <div class="rating mb-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="text-muted ms-2">(324)</span>
              </div>
              <p class="card-text text-success">
                $59.99
                <span class="text-decoration-line-through text-muted"
                  >$79.99</span
                >
              </p>
            </div>
            <div class="card-footer bg-transparent">
              <button class="btn btn-sm btn-outline-dark w-100">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Product 2 -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="card h-100">
            <img
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3"
              class="card-img-top"
              alt="Product"
            />
            <div class="card-body">
              <h5 class="card-title">Casual Summer Dress</h5>
              <div class="rating mb-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <span class="text-muted ms-2">(412)</span>
              </div>
              <p class="card-text text-success">$39.99</p>
            </div>
            <div class="card-footer bg-transparent">
              <button class="btn btn-sm btn-outline-dark w-100">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Product 3 -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="card h-100">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3"
              class="card-img-top"
              alt="Product"
            />
            <div class="card-body">
              <h5 class="card-title">Classic White Sneakers</h5>
              <div class="rating mb-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span class="text-muted ms-2">(789)</span>
              </div>
              <p class="card-text text-success">$49.99</p>
            </div>
            <div class="card-footer bg-transparent">
              <button class="btn btn-sm btn-outline-dark w-100">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Product 4 -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="card h-100">
            <img
              src="https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3"
              class="card-img-top"
              alt="Product"
            />
            <div class="card-body">
              <h5 class="card-title">Sporty Jogger Pants</h5>
              <div class="rating mb-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <i class="far fa-star"></i>
                <span class="text-muted ms-2">(256)</span>
              </div>
              <p class="card-text text-success">
                $34.99
                <span class="text-decoration-line-through text-muted"
                  >$44.99</span
                >
              </p>
            </div>
            <div class="card-footer bg-transparent">
              <button class="btn btn-sm btn-outline-dark w-100">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-3">
        <a href="#" class="btn btn-primary">View All Products</a>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="bg-light py-5 mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center">
            <h3>Subscribe to Our Newsletter</h3>
            <p class="text-muted">
              Get updates on new arrivals, special offers and more
            </p>
            <form class="mt-4">
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Your email address"
                />
                <button class="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <h5>FashionHub</h5>
            <p>
              Your one-stop shop for the latest fashion trends and styles for
              everyone in the family.
            </p>
            <div class="social-icons">
              <a href="#" class="text-white me-2"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="#" class="text-white me-2"
                ><i class="fab fa-twitter"></i
              ></a>
              <a href="#" class="text-white me-2"
                ><i class="fab fa-instagram"></i
              ></a>
              <a href="#" class="text-white"
                ><i class="fab fa-pinterest"></i
              ></a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <h5>Shop</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-white">Men's Clothing</a></li>
              <li><a href="#" class="text-white">Women's Clothing</a></li>
              <li><a href="#" class="text-white">Kids' Collection</a></li>
              <li><a href="#" class="text-white">Accessories</a></li>
              <li><a href="#" class="text-white">Sale</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <h5>Customer Service</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-white">Contact Us</a></li>
              <li><a href="#" class="text-white">FAQs</a></li>
              <li><a href="#" class="text-white">Shipping & Returns</a></li>
              <li><a href="#" class="text-white">Size Guide</a></li>
              <li><a href="#" class="text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <h5>Contact Info</h5>
            <address>
              <p>
                <i class="fas fa-map-marker-alt me-2"></i> 123 Fashion St, Style
                City
              </p>
              <p><i class="fas fa-phone me-2"></i> (123) 456-7890</p>
              <p><i class="fas fa-envelope me-2"></i> info@fashionhub.com</p>
            </address>
          </div>
        </div>
        <hr class="bg-secondary" />
        <div class="row">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0">&copy; 2023 FashionHub. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <img
              src="https://via.placeholder.com/200x30?text=Payment+Methods"
              alt="Payment Methods"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </footer>
        `;
    }
   
}