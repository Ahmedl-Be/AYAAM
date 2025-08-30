import View from "../../components/core/view.js";
import { chartCreation } from "../../components/dashboard/admin-stats.js";
import { localStore } from "../../scripts/utils/storage.js";


export default class ProductsStatsPage extends View {
    template() {
        const products = localStore.read("products") || [];
        const users = localStore.read("users") || [];

        // count categories (excluding "other")
        const men = products.filter(product => product.category === "Men").length;
        const women = products.filter(product => product.category === "Women").length;
        const unisex = products.filter(product => product.category === "Unisex").length;

        // Calculate prices with basic metrics (removed premium/budget items)
        const prices = products.map(product => parseFloat(product.price) || 0);
        const totalPrice = prices.reduce((sum, price) => sum + price, 0);
        const avgPrice = products.length > 0 ? totalPrice / products.length : 0;

        // Price analytics
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
        const minPrice = prices.length > 0 ? Math.min(...prices.filter(p => p > 0)) : 0;

        // Calculate top 3 sellers by product count
        const allSellers = users.filter(user => user.role === "seller");
        const sellerProductCounts = allSellers.map(seller => ({
            name: seller.name || `Seller ${seller.id}`,
            count: products.filter(product => product.sellerId === seller.id).length
        }));

        const top3Sellers = sellerProductCounts
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .filter(seller => seller.count > 0);

        // Calculate category percentages
        const menPercentage = products.length > 0 ? ((men / products.length) * 100).toFixed(1) : 0;
        const womenPercentage = products.length > 0 ? ((women / products.length) * 100).toFixed(1) : 0;
        const unisexPercentage = products.length > 0 ? ((unisex / products.length) * 100).toFixed(1) : 0;
        // Create enhanced chart for product categories (without "other")
        const productLabels = ['Men', 'Women', 'Unisex'];
        const productData = [men, women, unisex];
        const productColors = ['#ffc107', '#dc3545', '#17a2b8'];

        if (products.length > 0) {
            chartCreation('productsChart', productLabels, productData, productColors, 'doughnut');
        }

        return `
        <div class="row">
            <div class="col-md-3 mb-3">
                <div class="card bg-primary text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-boxes mb-2" style="font-size: 1.5rem;"></i>
                        <h4 class="mb-1">${products.length}</h4>
                        <p class="mb-0 small">Total Products</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-warning text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-mars mb-2" style="font-size: 1.5rem;"></i>
                        <h4 class="mb-1">${men}</h4>
                        <p class="mb-0 small">Men's Items</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-danger text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-venus mb-2" style="font-size: 1.5rem;"></i>
                        <h4 class="mb-1">${women}</h4>
                        <p class="mb-0 small">Women's Items</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-info text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-users mb-2" style="font-size: 1.5rem;"></i>
                        <h4 class="mb-1">${unisex}</h4>
                        <p class="mb-0 small">Unisex Items</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-list me-2"></i>Product Categories</h5>
                    </div>
                    <div class="card-body">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-mars text-warning me-2"></i>
                                    <strong>Men</strong>
                                </div>
                                <div>
                                    <span class="badge bg-warning rounded-pill me-2">${men}</span>
                                    <small class="text-muted">${menPercentage}%</small>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-venus text-danger me-2"></i>
                                    <strong>Women</strong>
                                </div>
                                <div>
                                    <span class="badge bg-danger rounded-pill me-2">${women}</span>
                                    <small class="text-muted">${womenPercentage}%</small>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-users text-info me-2"></i>
                                    <strong>Unisex</strong>
                                </div>
                                <div>
                                    <span class="badge bg-info rounded-pill me-2">${unisex}</span>
                                    <small class="text-muted">${unisexPercentage}%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-calculator me-2"></i>Price Analytics</h5>
                    </div>
                    <div class="card-body">
                        <div class="row text-center mb-3">
                            <div class="col-4">
                                <div class="border rounded p-2">
                                    <div class="text-success h5">${minPrice.toFixed(0)}</div>
                                    <small class="text-muted">Min Price</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="border rounded p-2">
                                    <div class="text-primary h5">${avgPrice.toFixed(0)}</div>
                                    <small class="text-muted">Avg Price</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="border rounded p-2">
                                    <div class="text-danger h5">${maxPrice.toFixed(0)}</div>
                                    <small class="text-muted">Max Price</small>
                                </div>
                            </div>
                        </div>
                        
                        <hr>
                        
                        <div class="d-flex justify-content-between">
                            <span><i class="fas fa-coins text-info me-1"></i> Total inventory value:</span>
                            <strong>${totalPrice.toFixed(2)}</strong>
                        </div>
                        
                        ${products.length === 0 ?
                '<div class="alert alert-warning mt-3"><i class="fas fa-exclamation-triangle me-2"></i>No products available</div>'
                : ''
            }
                    </div>
                </div>
            </div>
            
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-pie me-2"></i>Category Distribution</h5>
                    </div>
                    <div class="card-body">
                        <div style="position: relative; height: 250px;">
                            <canvas id="productsChart"></canvas>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        ${top3Sellers.length > 0 ? `
        <div class="row">
            <div class="col-md-12 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-trophy me-2"></i>Top 3 Sellers by Products</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            ${top3Sellers.map((seller, index) => `
                            <div class="col-md-4 mb-2">
                                <div class="card ${index === 0 ? 'border-warning' : index === 1 ? 'border-secondary' : 'border-dark'}">
                                    <div class="card-body text-center">
                                        <div class="mb-2">
                                            ${index === 0 ? '<i class="fas fa-crown text-warning" style="font-size: 1.5rem;"></i>' :
                    index === 1 ? '<i class="fas fa-medal text-secondary" style="font-size: 1.5rem;"></i>' :
                        '<i class="fas fa-award text-dark" style="font-size: 1.5rem;"></i>'}
                                        </div>
                                        <h6 class="mb-1">${seller.name}</h6>
                                        <p class="mb-0">${seller.count} products</p>
                                        <small class="text-muted">#${index + 1} seller</small>
                                    </div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}
    `;
    }

    script() {
        chartCreation()
    }
}