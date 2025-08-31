import View from "../../components/core/view.js";
import { localStore } from "../../scripts/utils/storage.js";

export default class MainDasboard extends View {
  template() {
    return `
     <div class="dashboard">
        <h1 class="text-center mb-3">Seller Dashboard</h1>
        <div class="row g-3 mb-3">
            <div class="col-12 col-md-4">
                <div class="summary-card">
                    <h3 ">Total Sales</h3>
                    <p id="summaryTotal" class="text-primary">$0.00</p>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="summary-card">
                    <h3>Total Orders</h3>
                    <p id="summaryOrders" class="text-primary">0</p>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="summary-card">
                    <h3 >Products</h3>
                    <p id="summaryProducts" class="text-primary">0</p>
                </div>
            </div>
        </div>
        <div class="row g-3">
            <div class="col-12 col-md-6">
                <div class="chart-card">
                    <h3 >Monthly Sales</h3>
                    <canvas id="monthlySalesChart"></canvas>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="chart-card">
                    <h3 >Orders Overview</h3>
                    <canvas id="ordersOverviewChart"></canvas>
                </div>
            </div>
        </div>
        <div class="card order-table bg-light mt-3 recent-orders">
            <h3 >Recent Orders</h3>
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
      const validOrders = orders.filter(order => 
        order.orderItems && order.orderItems.length > 0
      );
      if (validOrders.length === 0) {
        orderList.innerHTML = '<div class="text-center text-muted p-2">No orders available yet.</div>';
      } else {
        validOrders.forEach(order => {
          order.orderItems.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item d-flex justify-content-between align-items-center p-2 border-bottom';
            orderItem.innerHTML = `
              <span class="order-date">${order.orderDate || new Date().toISOString().split('T')[0]}</span>
              <span class="order-product">${item.productName || 'N/A'}</span>
              <span class="order-qty">Qty: ${item.qty || 1}</span>
              <span class="order-price">$${item.price * (item.qty || 1)}</span>
              <span class="order-status">${item.state || 'N/A'}</span>
            `;
            orderList.appendChild(orderItem);
          });
        });
      }

      updateSummary();
      updateCharts();
    }

    function updateSummary() {
      const validOrders = orders.filter(order => 
        order.orderItems && order.orderItems.length > 0
      );
      const totalOrders = validOrders.length;
      const totalPrice = validOrders.reduce((sum, order) => 
        sum + order.orderItems.reduce((itemSum, item) => itemSum + (item.price * (item.qty || 1)), 0), 0
      ).toFixed(2);
      const totalProducts = products.length;
      summaryOrders.textContent = totalOrders;
      summaryTotal.textContent = `$${totalPrice}`;
      summaryProducts.textContent = totalProducts;
    }

    function updateCharts() {
      const monthlySalesCtx = document.getElementById('monthlySalesChart').getContext('2d');
      const validOrders = orders.filter(order => 
        order.orderItems && order.orderItems.length > 0
      ).slice(0, 6);
      new Chart(monthlySalesCtx, {
        type: 'line',
        data: { 
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul'], 
          datasets: [{ 
            label: 'Sales', 
            data: validOrders.flatMap(order => order.orderItems.map(item => item.price * (item.qty || 1))), 
            fill: true, 
            tension: 0.1,
            borderColor: '#1E40AF', 
            backgroundColor: 'rgba(30, 64, 175, 0.2)'
          }] 
        }
      });

      const ordersOverviewCtx = document.getElementById('ordersOverviewChart').getContext('2d');
      const statusCount = { Pending: 0, Confirmed: 0 };
      orders.forEach(order => {
        order.orderItems.forEach(item => {
          if (item.state) {
            if (item.state === 'pending') statusCount.Pending++;
            else if (item.state === 'Confirmed') statusCount.Confirmed++;
          }
        });
      });
      console.log("Status Count:", statusCount); 
      new Chart(ordersOverviewCtx, {
        type: 'bar',
        data: { 
          labels: Object.keys(statusCount),
          datasets: [{ 
            label: 'Orders',
            data: Object.values(statusCount),
            backgroundColor: ['#1E40AF', '#60A5FA'],
            borderColor: ['#1E40AF', '#60A5FA'],
            borderWidth: 1
          }] 
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
            updateUI();
        
  }
}