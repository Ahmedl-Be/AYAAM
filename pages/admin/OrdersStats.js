import View from "../../components/core/view.js";
import { calculateOrderStats, initializeOrdersDashboard, prepareChartData, renderChartCard, renderOrdersTable, renderStatCard, renderTopProductsCard, } from "../../components/dashboard/admin-orders.js";
import { localStore } from "../../scripts/utils/storage.js";


export default class OrdersStatsPage extends View {
    template() {
        const ordersData = localStore.read('orders') || [];

        // Calculate statistics
        const stats = calculateOrderStats(ordersData);
        // Prepare chart data
        const chartData = prepareChartData(ordersData);

        return `
        <div id="orders">
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
        </div>
    `;
    }

    script() {
        const ordersData = localStore.read('orders',[]) ;
        // Prepare chart data
        const chartData = prepareChartData(ordersData);
    
        setTimeout(() => initializeOrdersDashboard(chartData), 100);


    }

}