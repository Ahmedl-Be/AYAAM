import View from "../../components/core/view.js";
import { localStore } from "../../scripts/utils/storage.js";

export default class MainDasboard extends View {
  template() {
    return `
     <div class="dashboard">
        <h1 class="text-center mb-3" style="color: #065f46;">Seller Dashboard</h1>
        <div class="row g-3 mb-3">
            <div class="col-12 col-md-4">
                <div class="summary-card">
                    <h3 style="color: #10b981;">Total Sales</h3>
                    <p id="summaryTotal" class="text-primary">$0.00</p>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="summary-card">
                    <h3 style="color: #34d399;">Total Orders</h3>
                    <p id="summaryOrders" class="text-primary">0</p>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="summary-card">
                    <h3 style="color: #6ee7b7;">Products</h3>
                    <p id="summaryProducts" class="text-primary">0</p>
                </div>
            </div>
        </div>
        <div class="row g-3">
            <div class="col-12 col-md-6">
                <div class="chart-card">
                    <h3 style="color: #065f46;">Monthly Sales</h3>
                    <canvas id="monthlySalesChart"></canvas>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="chart-card">
                    <h3 style="color: #10b981;">Orders Overview</h3>
                    <canvas id="ordersOverviewChart"></canvas>
                </div>
            </div>
        </div>
        <div class="card order-table bg-light mt-3">
            <h3 style="color: #34d399;">Recent Orders</h3>
            <div id="orderList"></div>
        </div>
    </div>

    `;
  }

  script() {
            const orderList = document.getElementById("orderList");
            const summaryTotal = document.getElementById("summaryTotal");
            const summaryOrders = document.getElementById("summaryOrders");
            const summaryProducts = document.getElementById("summaryProducts");

            let products = localStore.read("products") || [];
            let orders = localStore.read("orders") || [];

            function updateUI() {
                orderList.innerHTML = '';
                const validOrders = orders.filter(order => ['Pending', 'Confirmed'].includes(order.status));
                if (validOrders.length === 0) {
                    orderList.innerHTML = '<div class="text-center text-muted p-2">No orders available yet.</div>';
                } else {
                    validOrders.forEach(order => {
                        const item = document.createElement('div');
                        item.className = 'order-item d-flex justify-content-between';
                        item.innerHTML = `
                            <span style="color: #065f46;">${order.orderId || 'N/A'}</span>
                            <span style="color: #10b981;">${order.date || new Date().toISOString().split('T')[0]}</span>
                            <span style="color: ${order.status === 'Pending' ? '#6ee7b7' : '#34d399'};">${order.status}</span>
                            <span style="color: #065f46;">$${order.price * (order.qty || 1)}</span>
                        `;
                        orderList.appendChild(item);
                    });
                }

                updateSummary();
                updateCharts();
            }

            function updateSummary() {
                const validOrders = orders.filter(o => ['Pending', 'Confirmed'].includes(o.status));
                const totalOrders = validOrders.length;
                const totalPrice = validOrders.reduce((sum, order) => sum + (order.price * (order.qty || 1)), 0).toFixed(2);
                const totalProducts = products.length;
                summaryOrders.textContent = totalOrders;
                summaryTotal.textContent = `$${totalPrice}`;
                summaryProducts.textContent = totalProducts;
            }

            function updateCharts() {
                const monthlySalesCtx = document.getElementById('monthlySalesChart').getContext('2d');
                const validOrders = orders.filter(o => ['Pending', 'Confirmed'].includes(o.status)).slice(0, 6);
                new Chart(monthlySalesCtx, {
                    type: 'line',
                    data: { 
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul'], 
                        datasets: [{ 
                            label: 'Sales', 
                            data: validOrders.map(o => o.price * (o.qty || 1)), 
                            fill: true, 
                            backgroundColor: 'rgba(6, 95, 70, 0.2)', 
                            borderColor: '#065f46', 
                            tension: 0.1 
                        }] 
                    }
                });

                const ordersOverviewCtx = document.getElementById('ordersOverviewChart').getContext('2d');
                const statusCount = { Pending: 0, Confirmed: 0 };
                orders.forEach(o => { if (o.status && ['Pending', 'Confirmed'].includes(o.status)) statusCount[o.status]++; });
                new Chart(ordersOverviewCtx, {
                    type: 'bar',
                    data: { 
                        labels: Object.keys(statusCount), 
                        datasets: [{ 
                            label: 'Orders', 
                            data: Object.values(statusCount), 
                            backgroundColor: ['#6ee7b7', '#34d399'] 
                        }] 
                    }
                });
            }

            updateUI();
        
  }
}