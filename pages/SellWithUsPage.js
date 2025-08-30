import View from "../components/core/view.js";
import Footer from "../components/landing/Footer.js";
import { Button } from "../components/ui/buttons.js";
import { navigate } from "../scripts/utils/navigation.js";


export default class SellWithUsPage extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Sell With Us | AYAAM'
        }, _params);

    }
    template() {
        return `
        <div class="sell-iaam">

        <!-- Hero -->
        <header class="hero py-5 mb-5">
            <div class="container">
            <div class="row align-items-center g-4">
                <div class="col-lg-7" data-fade>
                <h1 class="display-5 fw-bold mb-3">Sell with <span style="color:var(--brand)">IAAM</span></h1>
                <p class="lead text-muted">Turn your passion into profit. Join thousands of sellers growing their business on IAAM’s trusted multi-actor eCommerce platform.</p>
                <a class="btn btn-lg btn-warning mt-3" onclick="window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })">
                    <i class="fa-solid fa-user-plus"></i> Start Selling Today
                </a>
                </div>
                <div class="col-lg-5 text-center" data-fade>
                <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="Sell with IAAM" class="img-fluid" style="max-height:280px;" />
                </div>
            </div>
            </div>
        </header>

        <!-- Stats -->
        <section class="container mb-5 statistics">
                <div class="highlight-card p-4" data-fade>
                <div class="stat">+10K</div>
                <p class="mb-0">Active Customers Every Month</p>
                </div>


                <div class="highlight-card p-4" data-fade>
                <div class="stat"><i class="fa-solid fa-store"></i></div>
                <p class="mb-0">Customers Across All of Egypt</p>
                </div>


                <div class="highlight-card p-4" data-fade>
                <div class="stat">24/7</div>
                <p class="mb-0">Dedicated Support Team</p>
            </div>

        </section>

        <!-- Why Sell with IAAM -->
        <section class="container mb-5 why-iaam">
            <div class="text-center mb-5" data-fade>
            <h2 class="h3 fw-bold">Why Choose <span style="color:var(--brand)">IAAM?</span></h2>
            <p class="text-muted">We give you more than just a platform — we give you the tools to grow, the support to succeed, and the audience to thrive.</p>
            </div>
            <div class="row g-4">
            <div class="col-md-6 col-lg-3" data-fade>
                <div class="highlight-card p-4 text-center h-100">
                <i class="fa-solid fa-bolt fa-2x mb-3"></i>
                <h5 class="fw-bold mb-2">Fast Onboarding</h5>
                <p class="small text-muted">Get started in minutes with zero setup fees and a hassle-free registration process.</p>
                </div>
            </div>
            <div class="col-md-6 col-lg-3" data-fade>
                <div class="highlight-card p-4 text-center h-100">
                <i class="fa-solid fa-earth-americas fa-2x mb-3"></i>
                <h5 class="fw-bold mb-2">Wider Reach</h5>
                <p class="small text-muted">Showcase your products to a broad audience across regions with IAAM’s growing customer base.</p>
                </div>
            </div>
            <div class="col-md-6 col-lg-3" data-fade>
                <div class="highlight-card p-4 text-center h-100">
                <i class="fa-solid fa-lock fa-2x mb-3"></i>
                <h5 class="fw-bold mb-2">Secure Payments</h5>
                <p class="small text-muted">Enjoy peace of mind with transparent policies and safe, on-time payouts for every order.</p>
                </div>
            </div>
            <div class="col-md-6 col-lg-3" data-fade>
                <div class="highlight-card p-4 text-center h-100">
                <i class="fa-solid fa-chart-line fa-2x mb-3"></i>
                <h5 class="fw-bold mb-2">Growth Tools</h5>
                <p class="small text-muted">Boost your visibility with marketing tools, sales tracking, and real-time analytics.</p>
                </div>
            </div>
            </div>
        </section>

        <!-- Warehouses Map -->
        <section class="container mb-5">
            <div class="text-center mb-4">
            <h2 class="h3 fw-bold">Our Warehouses Network</h2>
            <p class="text-muted">Wherever you are in Egypt, IAAM has a warehouse near you to store and distribute your products efficiently.</p>
            </div>
            <div id="map" class="sell-iaam-map"></div>
        </section>

        <!-- Success Stories -->
        <section class="py-5 bg-light mb-5">
            <div class="container">
            <div class="text-center mb-5" data-fade>
                <h2 class="h3 fw-bold">Success Stories</h2>
                <p class="text-muted">Don’t just take our word for it. See how sellers like you grew with IAAM.</p>
            </div>
            <div class="row g-4">
                <div class="col-md-4" data-fade>
                <div class="highlight-card p-4 h-100">
                    <p class="small">“IAAM helped me turn my handmade craft hobby into a thriving business. I reached more customers in 3 months than in 2 years offline.”</p>
                    <div class="d-flex align-items-center mt-3">
                    <img src="/assets/images/us/mariam.jpg" alt="" class="rounded-circle me-3" width="45" height="45">
                    <div>
                        <div class="fw-bold">Mariam Khaled</div>
                        <small class="text-muted">Accessories Seller</small>
                    </div>
                    </div>
                </div>
                </div>
                <div class="col-md-4" data-fade>
                <div class="highlight-card p-4 h-100">
                    <p class="small">“The tools and support are amazing. I can track my sales, analyze my growth, and scale without stress.”</p>
                    <div class="d-flex align-items-center mt-3">
                    <img src="/assets/images/us/beltagy.jpg" alt="" class="rounded-circle me-3" width="45" height="45">
                    <div>
                        <div class="fw-bold">Ahmed Beltagy</div>
                        <small class="text-muted">Shirts Seller</small>
                    </div>
                    </div>
                </div>
                </div>
                <div class="col-md-4" data-fade>
                <div class="highlight-card p-4 h-100">
                    <p class="small">“IAAM’s wide reach gave me access to new markets I never thought possible. My sales tripled in the first year.”</p>
                    <div class="d-flex align-items-center mt-3">
                    <img src="/assets/images/us/ossama.jpg" alt="" class="rounded-circle me-3" width="45" height="45">
                    <div>
                        <div class="fw-bold">Ahmed Ossama</div>
                        <small class="text-muted">Fashion Seller</small>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section id="signup" class="py-5 text-center" data-fade>
            <div class="container">
            <h2 class="display-6 fw-bold mb-3">Ready to Grow with IAAM?</h2>
            <p class="mb-4 text-muted">Be part of IAAM’s vibrant seller community and unlock your business potential today.</p>
            <a href="#/confirm-seller" class="btn btn-lg btn-warning shadow-lg px-4 py-3">
                <i class="fa-solid fa-arrow-right me-2"></i> Join IAAM Now
            </a>
            </div>
        </section>
        </div>
  <!-- Footer -->
  <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer' data-fade>${Footer()}</footer>
  `
    }

    script() {
        // Init Leaflet map
        var map = L.map('map').setView([26.8206, 30.8025], 5.5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

        var warehouses = [
            { name: "Cairo Warehouse", coords: [30.0444, 31.2357] },
            { name: "Alexandria Warehouse", coords: [31.2001, 29.9187] },
            { name: "Delta Hub", coords: [30.5833, 31.0000] },
            { name: "Aswan Storage", coords: [24.0889, 32.8998] },
            { name: "Sinai Hub", coords: [29.5, 34.0] }
        ];

        warehouses.forEach(loc => {
            L.marker(loc.coords)
                .addTo(map)
                .bindPopup(`<b>${loc.name}</b><br>IAAM Storage Facility`);
        });
    }
    
}