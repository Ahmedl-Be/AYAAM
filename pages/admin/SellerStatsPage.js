import View from "../../components/core/view.js";
import { chartCreation } from "../../components/dashboard/admin-stats.js";
import { localStore } from "../../scripts/utils/storage.js";


export default class SellerStatsPage extends View {
    template() {
        const users = localStore.read("users") || [];
        const products = localStore.read("products") || [];

        //  counting sellers
        const allSellers = users.filter(user => user.role === "seller");
        const totalSellers = allSellers.length;
        const activeSellers = allSellers.filter(seller => seller.status === "active").length;
        const inactiveSellers = totalSellers - activeSellers;
        const totalProducts = products.length;

        // seller 
        const avgProductsPerSeller = totalSellers > 0 ? (totalProducts / totalSellers).toFixed(1) : 0;
        const activeSellerPercent = totalSellers > 0 ? ((activeSellers / totalSellers) * 100).toFixed(1) : 0;

        // Calculate top 3 sellers by product count
        const sellerProductCounts = allSellers.map(seller => ({
            name: seller.name ,
            count: products.filter(product => product.sellerId === seller.id).length
        }));

        const top3Sellers = sellerProductCounts
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .filter(seller => seller.count > 0);

        // chart for seller status
        const sellerLabels = ['Active', 'Inactive'];
        const sellerData = [activeSellers, inactiveSellers];
        const sellerColors = ['#28a745', '#6c757d'];

        if (totalSellers > 0) {
            chartCreation('sellersChart', sellerLabels, sellerData, sellerColors, 'doughnut');
        }

        return `
        <div class="col-12">
            <h2 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Seller Stats</h2>
            <p class="text-muted">Overview of <span class="fw-bold text-primary">AYAAM</span>'s Sellers </p>
        </div>
        <div class="row">
            <div class="col-md-3 mb-3 " >
                <div class="card bg-info text-white shadow-sm py-2">
                    <div class="card-body text-center">
                        <i class="fas fa-store mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${totalSellers}</h3>
                        <p class="mb-0">Total Sellers</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-success text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-check-circle mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${activeSellers}</h3>
                        <p class="mb-0">Active Sellers</p>
                        <small class="text-light">${activeSellerPercent}% active</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-warning text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-box mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${totalProducts}</h3>
                        <p class="mb-0">Products Listed</p>
                        <small class="text-light">Across all sellers</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-purple text-white shadow-sm" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <div class="card-body text-center py-4">
                        <i class="fas fa-chart-line mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${avgProductsPerSeller}</h3>
                        <p class="mb-0">Avg Products/Seller</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Sellers Information</h5>
                    </div>
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-6 border-end">
                                <h4 class="text-success">${activeSellers}</h4>
                                <small class="text-muted">Active</small>
                            </div>
                            <div class="col-6">
                                <h4 class="text-secondary">${inactiveSellers}</h4>
                                <small class="text-muted">Inactive</small>
                            </div>
                        </div>
                        <hr>
                        
                        <div class="d-flex justify-content-between">
                            <span>Total sellers:</span>
                            <strong>${totalSellers}</strong>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Total products:</span>
                            <strong>${totalProducts}</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span>Avg. Products per seller:</span>
                            <strong>${avgProductsPerSeller}</strong>
                        </div>
                        
                        ${top3Sellers.length > 0 ? `
                        <div class="mb-2">
                            <strong><i class="fas fa-trophy text-warning me-1"></i> Top Performers:</strong>
                        </div>
                        ${top3Sellers.map((seller, index) => `
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="small">
                                    <span class="badge badge-sm ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : 'bg-dark'}">${index + 1}</span>
                                    ${seller.name}
                                </span>
                                <small class="text-muted">${seller.count} products</small>
                            </div>
                        `).join('')}
                        ` : ''}
                        
                        ${totalSellers === 0 ?
                '<div class="alert alert-info mt-3"><i class="fas fa-info-circle me-2"></i>No sellers registered yet</div>'
                : ''
            }
                    </div>
                </div>
            </div>
            <div class="col-md-8 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-pie me-2"></i>Seller Status Distribution</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div style="position: relative; height: 250px;">
                                    <canvas id="sellersChart"></canvas>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mt-3">
                                    <h6 class="mb-3">Activity Status</h6>
                                    <div class="progress mb-3" style="height: 20px;">
                                        <div class="progress-bar bg-success" role="progressbar" 
                                             style="width: ${activeSellerPercent}%" 
                                             aria-valuenow="${activeSellerPercent}" aria-valuemin="0" aria-valuemax="100">
                                            ${activeSellerPercent}% Active
                                        </div>
                                    </div>
                                    
                                    <div class="row text-center">
                                        <div class="col-6">
                                            <div class="border rounded p-2">
                                                <div class="text-success h5">${activeSellers}</div>
                                                <small class="text-muted">Active Now</small>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="border rounded p-2">
                                                <div class="text-secondary h5">${inactiveSellers}</div>
                                                <small class="text-muted">Inactive</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    script() {
        chartCreation();
    }

}