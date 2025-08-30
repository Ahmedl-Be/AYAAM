import { localStore } from "../../scripts/utils/storage.js";    
import Toast from "../ui/toast.js";



// Render dashboard
export function renderOrdersDashboard(container) {
    localStorage.setItem("orders", JSON.stringify([
    {
        "orderId": "1756486109839-master57842",
        "userId": "master57842",
        "userName": "Yasser",
        "userEmail": "yasser@example.com",
        "orderDate": "29/08/2025",
        "orderItems": [
            {
                "productId": "uha003",
                "productName": "Jordan Rise",
                "qty": 2,
                "price": "27.97",
                "size": "M",
                "category": "Unisex",
                "color": "Cyan",
                "img": "./data/imgs/products/unisex/hat/uha003/cyan-top.png",
                "state": "pending"
            }
        ]
    },
    {
        "orderId": "1756486291207-master57842",
        "userId": "master57842",
        "userName": "Yasser",
        "userEmail": "yasser@example.com",
        "orderDate": "29/08/2025",
        "orderItems": [
            {
                "productId": "mbbl001",
                "productName": "Classic Blazer",
                "qty": 1,
                "price": "220.00",
                "size": "S",
                "category": "Men",
                "color": "Blue",
                "img": "./data/imgs/products/men/top/mbbl001/BHblueblazer1.jpg",
                "state": "pending"
            },
            {
                "productId": "wsh002",
                "productName": "Sports Shoes",
                "qty": 1,
                "price": "59.99",
                "size": "36",
                "category": "Women",
                "color": "Beige",
                "img": "./data/imgs/products/women/shoes/wsh002/Shoes4.jpeg",
                "state": "pending"
            },
            {
                "productId": "uha003",
                "productName": "Jordan Rise",
                "qty": 1,
                "price": "27.97",
                "size": "L",
                "category": "Unisex",
                "color": "Cyan",
                "img": "./data/imgs/products/unisex/hat/uha003/cyan-top.png",
                "state": "pending"
            }
        ]
    },
    {
        "orderId": "1756486969458-master57842",
        "userId": "master57842",
        "userName": "Yasser",
        "userEmail": "yasser@example.com",
        "orderDate": "29/08/2025",
        "orderItems": [
            {
                "productId": "uha004",
                "productName": "Unisex Denim Strapback",
                "qty": 2,
                "price": "27.99",
                "size": "M",
                "category": "Unisex",
                "color": "Light blue",
                "img": "./data/imgs/products/unisex/hat/uha004/lightblue-face.png",
                "state": "pending"
            }
        ]
    }
]));
    const ordersData = localStore.read('orders') || [];

    // Calculate statistics
    const stats = calculateOrderStats(ordersData);

    // Prepare chart data
    const chartData = prepareChartData(ordersData);

    container.innerHTML = `
        <div class="container-fluid py-4">
            <!-- Dashboard Header -->
            <div class="row mb-4">
                <div class="col-12">
                    <h2 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Orders Dashboard</h2>
                    <p class="text-muted">Overview of <span class="fw-bold text-danger">AYAAM</span>'s order performance</p>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="row mb-4">
                ${renderStatCard('$' + stats.totalRevenue, 'Total Revenue', 'fa-dollar-sign', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')}
                ${renderStatCard(stats.totalOrders, 'Total Orders', 'fa-shopping-cart', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')}
                ${renderStatCard(stats.pendingOrders, 'Pending Orders', 'fa-clock', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)')}
                ${renderStatCard(stats.confirmedOrders, 'Confirmed Orders', 'fa-check-circle', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)')}
            </div>

            <!-- Charts Row -->
            <div class="row mb-4">
                <div class="col-md-4">
                    ${renderChartCard('Orders by Category', 'categoryChart', 'fa-tags')}
                </div>
                <div class="col-md-4">
                    ${renderChartCard('Orders by Status', 'statusChart', 'fa-chart-pie')}
                </div>
                <div class="col-md-4">
                    ${renderTopProductsCard(chartData.topProducts)}
                </div>
            </div>

            <!-- Orders Table -->
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white d-flex justify-content-between align-items-center">
                            <h6 class="mb-0"><i class="fas fa-list me-2"></i>Recent Orders</h6>
                        </div>
                        <div class="card-body p-0">
                            ${renderOrdersTable(ordersData)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => initializeOrdersDashboard(chartData), 100);
}

// Reusable stat card
export function renderStatCard(value, label, icon, gradient) {
    return `
    <div class="col-md-3">
        <div class="card border-0 shadow-sm h-100" style="background:${gradient};">
            <div class="card-body text-white text-center">
                <i class="fas ${icon} fa-2x mb-2"></i>
                <h3 class="mb-1">${value}</h3>
                <p class="mb-0">${label}</p>
            </div>
        </div>
    </div>`;
}

//chart card
export function renderChartCard(title, canvasId, icon) {
    return `
    <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white">
            <h6 class="mb-0"><i class="fas ${icon} me-2"></i>${title}</h6>
        </div>
        <div class="card-body">
            <canvas id="${canvasId}" width="300" height="200"></canvas>
        </div>
    </div>`;
}

// Top products card
export function renderTopProductsCard(topProducts) {
    return `
    <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white">
            <h6 class="mb-0"><i class="fas fa-star me-2"></i>Top Products</h6>
        </div>
        <div class="card-body">
            <div class="top-products-list">
                ${topProducts.map((product, index) => `
                    <div class="d-flex align-items-center mb-3 ${index < topProducts.length - 1 ? 'border-bottom pb-3' : ''}">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:30px;height:30px;font-size:0.8rem;">
                            ${index + 1}
                        </div>
                        <div class="ms-3 flex-grow-1">
                            <h6 class="mb-1" style="font-size:0.9rem;">${product.name}</h6>
                            <small class="text-muted">${product.orders} orders</small>
                        </div>
                        <div class="text-end">
                            <strong class="text-success">$${product.revenue}</strong>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

// Orders table
export function renderOrdersTable(orders) {
    if (orders.length === 0) {
        return `
        <div class="text-center py-5">
            <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No orders yet</h5>
            <p class="text-muted">Orders will appear here once customers start purchasing</p>
        </div>`;
    }

    return `
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead class="table-light">
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => {
                    const total = order.orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0).toFixed(2);
                    const status = order.state || 'pending';
                    const statusClass = getStatusBadgeClass(status);

                    return `
                        <tr>
                            <td><code>${order.orderId}</code></td>
                            <td>
                                <strong>${order.userName}</strong><br>
                                <small class="text-muted">${order.userEmail}</small>
                            </td>
                            <td>
                                ${order.orderItems.map(item => `
                                    <div class="d-flex align-items-center mb-2">
                                        <img src="${item.img}" alt="${item.productName}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;margin-right:10px;" />
                                        <div>
                                            <strong style="font-size:0.9rem;">${item.productName}</strong><br>
                                            <small class="text-muted">Qty: ${item.qty} | Size: ${item.size}</small>
                                        </div>
                                    </div>
                                `).join('')}
                            </td>
                            <td><span class="badge ${statusClass}">${status}</span></td>
                            <td><strong class="text-success">$${total}</strong></td>
                            <td><small>${order.orderDate}</small></td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a class="dropdown-item" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="pending">
                                                <i class="fas fa-clock me-2"></i>Mark Pending
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="confirmed">
                                                <i class="fas fa-check me-2"></i>Mark Confirmed
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>`;
                }).join('')}
            </tbody>
        </table>
    </div>`;
}

// Initialize dashboard functionality
export function initializeOrdersDashboard(chartData) {
    setupEventListeners();
    initializeOrderCharts(chartData);
}

// Event listeners
export function setupEventListeners() {
    document.removeEventListener('click', handleDashboardClicks);
    document.addEventListener('click', handleDashboardClicks);
}

// Handle clicks
export function handleDashboardClicks(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    event.preventDefault();
    const action = target.dataset.action;

    switch(action) {
        case 'status-update':
            quickStatusUpdate(target.dataset.orderId, target.dataset.status);
            break;
    }
}

// Calculate statistics
export function calculateOrderStats(orders) {
    let totalRevenue = 0;
    let pendingOrders = 0;
    let confirmedOrders = 0;

    orders.forEach(order => {
        const orderTotal = order.orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);
        totalRevenue += orderTotal;

        const status = order.state?.toLowerCase() || 'pending';
        if (status === 'confirmed') confirmedOrders++;
        else pendingOrders++;
    });

    return {
        totalRevenue: totalRevenue.toFixed(2),
        totalOrders: orders.length,
        pendingOrders,
        confirmedOrders
    };
}

// Chart data
export function prepareChartData(orders) {
    const categoryData = {};
    const statusData = { pending: 0, confirmed: 0 };
    const productRevenue = {};

    orders.forEach(order => {
        const status = order.state?.toLowerCase() || 'pending';
        statusData[status] = (statusData[status] || 0) + 1;

        order.orderItems.forEach(item => {
            categoryData[item.category] = (categoryData[item.category] || 0) + 1;

            const revenue = parseFloat(item.price) * item.qty;
            if (productRevenue[item.productName]) {
                productRevenue[item.productName].revenue += revenue;
                productRevenue[item.productName].orders++;
            } else {
                productRevenue[item.productName] = { revenue, orders: 1 };
            }
        });
    });

    const topProducts = Object.entries(productRevenue)
        .map(([name, data]) => ({
            name: name.length > 30 ? name.slice(0, 30) + '...' : name,
            revenue: data.revenue.toFixed(2),
            orders: data.orders
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    return { categoryData, statusData, topProducts };
}

// Status badge
function getStatusBadgeClass(status) {
    switch(status?.toLowerCase()) {
        case 'pending': return 'bg-warning text-dark';
        case 'confirmed': return 'bg-success';
        default: return 'bg-warning text-dark';
    }
}

// Initialize charts
export function initializeOrderCharts(chartData) {
    if (window.categoryChartInstance) window.categoryChartInstance.destroy();
    if (window.statusChartInstance) window.statusChartInstance.destroy();

    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        window.categoryChartInstance = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(chartData.categoryData),
                datasets: [{ data: Object.values(chartData.categoryData), backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF'] }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
    }

    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        window.statusChartInstance = new Chart(statusCtx, {
            type: 'pie',
            data: {
                labels: ['Pending', 'Confirmed'],
                datasets: [{ data: [chartData.statusData.pending, chartData.statusData.confirmed], backgroundColor: ['#FFC107','#28A745'] }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
    }
}

// Quick status update
export function quickStatusUpdate(orderId, newStatus) {
    const orders = localStore.read("orders") || [];
    const order = orders.find(o => o.orderId === orderId);

    if (order) {
        order.state = newStatus;
        localStore.write("orders", orders);
        Toast.notify(`Order #${orderId} status updated to ${newStatus}!`, 'success');
        setTimeout(() => {
            const mainContent = document.getElementById('mainContent');
            if (mainContent) renderOrdersDashboard(mainContent);
        }, 1000);
    }
}

// Cleanup
export function cleanupOrdersDashboard() {
    document.removeEventListener('click', handleDashboardClicks);
    if (window.categoryChartInstance) { window.categoryChartInstance.destroy(); window.categoryChartInstance = null; }
    if (window.statusChartInstance) { window.statusChartInstance.destroy(); window.statusChartInstance = null; }
}