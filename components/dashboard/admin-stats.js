import { localStore } from "../../scripts/utils/storage.js";

// creating charts
function chartCreation(canvasId, labels, data, colors, type = 'pie') {
    setTimeout(() => {
        const ctx = document.getElementById(canvasId);
        if (ctx) {
            // Load Chart.js 
            if (typeof Chart === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
                document.head.appendChild(script);
                script.onload = () => {
                    new Chart(ctx, {
                        type: type,
                        data: {
                            labels: labels,
                            datasets: [{
                                data: data,
                                backgroundColor: colors
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }
                    });
                };
            } else {
                new Chart(ctx, {
                    type: type,
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: colors
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        }
    }, 100);
}

export function renderUsersStats(container) {
    const users = localStore.read("users") || [];
    
    //counting user types
    const totalUsers = users.length;
    const sellers = users.filter(user => user.role === "seller").length;
    const admins = users.filter(user => user.role === "admin").length;
    const customer = users.filter(user => user.role === "customer").length;
    
    container.innerHTML = `
        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card bg-primary text-white">
                    <div class="card-body text-center">
                        <h4>${totalUsers}</h4>
                        <p>Total Users</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-success text-white">
                    <div class="card-body text-center">
                        <h4>${customer}</h4>
                        <p>customer</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-info text-white">
                    <div class="card-body text-center">
                        <h4>${sellers}</h4>
                        <p>Sellers</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5>Users Breakdown</h5>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between">
                                customer <span class="badge bg-secondary">${customer}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                Sellers <span class="badge bg-info">${sellers}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                Admins <span class="badge bg-danger">${admins}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>User Types</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="usersChart" height="200"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create simple pie chart for users
    const userLabels = ['customer', 'Sellers', 'Admins'];
    const userData = [customer, sellers, admins];
    const userColors = ['#28a745', '#17a2b8', '#dc3545'];
    
    chartCreation('usersChart', userLabels, userData, userColors, 'pie');
}

export function renderSellersStats(container) {
    const users = localStore.read("users") || [];
    const products = localStore.read("products") || [];
    
    //  counting sellers
    const allSellers = users.filter(user => user.role === "seller");
    const totalSellers = allSellers.length;
    const activeSellers = allSellers.filter(seller => seller.status === "active").length;
    const inactiveSellers = totalSellers - activeSellers;
    const totalProducts = products.length;
    
    container.innerHTML = `
        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card bg-info text-white">
                    <div class="card-body text-center">
                        <h4>${totalSellers}</h4>
                        <p>Total Sellers</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-success text-white">
                    <div class="card-body text-center">
                        <h4>${activeSellers}</h4>
                        <p>Active Sellers</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-warning text-white">
                    <div class="card-body text-center">
                        <h4>${totalProducts}</h4>
                        <p>Products Listed</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5>Sellers Information</h5>
                        <p>Total sellers: <strong>${totalSellers}</strong></p>
                        <p>Active sellers: <strong>${activeSellers}</strong></p>
                        <p>Inactive sellers: <strong>${inactiveSellers}</strong></p>
                        <p>Total products: <strong>${totalProducts}</strong></p>
                        ${totalSellers > 0 ? `<p>Average products per seller: <strong>${Math.round(totalProducts / totalSellers)}</strong></p>` : ''}
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Seller Status</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="sellersChart" height="200"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create simple chart for seller status
    const sellerLabels = ['Active', 'Inactive'];
    const sellerData = [activeSellers, inactiveSellers];
    const sellerColors = ['#28a745', '#6c757d'];
    
    chartCreation('sellersChart', sellerLabels, sellerData, sellerColors, 'doughnut');
}

export function renderProductsStats(container) {
    const products = localStore.read("products") || [];
    
    // count categories
    const men = products.filter(product => product.category === "Men").length;
    const women = products.filter(product => product.category === "Women").length;
    const unisex = products.filter(product => product.category === "Unisex").length;
    const other = products.filter(product => !product.category || 
        !["Men", "Women", "Unisex"].includes(product.category)).length;
    
    // Calculate prices
    const prices = products.map(product => parseFloat(product.price) || 0);
    const totalPrice = prices.reduce((sum, price) => sum + price, 0);
    const avgPrice = products.length > 0 ? totalPrice / products.length : 0;
    
    container.innerHTML = `
        <div class="row">
            <div class="col-md-3 mb-3">
                <div class="card bg-primary text-white">
                    <div class="card-body text-center">
                        <h4>${products.length}</h4>
                        <p>Total Products</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-success text-white">
                    <div class="card-body text-center">
                        <h4>${avgPrice.toFixed(2)}</h4>
                        <p>Average Price</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-warning text-white">
                    <div class="card-body text-center">
                        <h4>${men}</h4>
                        <p>Men's Items</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-info text-white">
                    <div class="card-body text-center">
                        <h4>${women}</h4>
                        <p>Women's Items</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5>Product Categories</h5>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between">
                                Men <span class="badge bg-primary">${men}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                Women <span class="badge bg-danger">${women}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                Unisex <span class="badge bg-success">${unisex}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                Other <span class="badge bg-secondary">${other}</span>
                            </li>
                        </ul>
                        
                        <div class="mt-3">
                            <h6>Summary</h6>
                            <p>Total products: <strong>${products.length}</strong></p>
                            <p>Total inventory value: <strong>${totalPrice.toFixed(2)}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Product Categories</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="productsChart" height="200"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create chart for product categories
    const productLabels = ['Men', 'Women', 'Unisex', 'Other'];
    const productData = [men, women, unisex, other];
    const productColors = ['#007bff', '#dc3545', '#28a745', '#6c757d'];
    
    chartCreation('productsChart', productLabels, productData, productColors, 'doughnut');
}