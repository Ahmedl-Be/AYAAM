import View from "../../components/core/view.js";
import { localStore } from "../../scripts/utils/storage.js";

export default class salesHistory extends View {
  template() {
    return `
      <div class="salesHistoryDashboard">
        <h1>Sales History Dashboard</h1>
        <div class="controls">
            <input type="text" placeholder="Search for product...">
        </div>
        <div class="stats">
            <div class="stat best" id="bestSeller">Best Seller: </div>
            <div class="stat least" id="leastSeller">Least Seller: </div>
            <div class="stat total" id="totalSales">Total Sales: </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Sold</th>
                    <th>In Stock</th>
                    <th>Last Sold</th>
                </tr>
            </thead>
            <tbody id="productTable"></tbody>
        </table>
        <div class="chart-container">
            <canvas id="salesChart"></canvas>
        </div>
      </div>
    `;
  }

  script() {
    const initialize = () => {
      const tableBody = document.getElementById('productTable');
      const salesChartCanvas = document.getElementById('salesChart');
      if (!tableBody || !salesChartCanvas) {
        console.error("DOM elements not found. Check if template is rendered.");
        return;
      }

      const rawProducts = localStore.read("products") || [];
      const orders = localStore.read("orders") || [];
      console.log("Products:", rawProducts, "Orders:", orders);

      const products = rawProducts.map(product => ({
        Id: product.id || 0,
        Name: product.name || "Unknown",
        Stock: product.stock || 0,
        Subcategory: product.subcategory || "Unknown",
      }));

      const salesData = products.map(product => {
        const productOrders = orders
          .flatMap(order => order.orderItems || [])
          .filter(item => item.productId === product.Id);
        const totalSold = productOrders.reduce((sum, item) => sum + (item.qty || 0), 0);
        const lastSold = productOrders.length ? productOrders[0].orderDate || "Not Available" : "Not Available";
        return { name: product.Name, sold: totalSold, inStock: product.Stock, lastSold };
      });

      tableBody.innerHTML = '';
      if (salesData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No sales data available.</td></tr>';
      } else {
        salesData.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.name || 'N/A'}</td>
            <td>${item.sold || 0}</td>
            <td>${item.inStock || 0}</td>
            <td>${item.lastSold || 'N/A'}</td>
          `;
          tableBody.appendChild(row);
        });
      }

      const totalSales = salesData.reduce((sum, item) => sum + (item.sold || 0), 0);
      const bestSeller = salesData.reduce((max, item) => (max.sold || 0) > (item.sold || 0) ? max : item, { sold: -Infinity }).name || 'N/A';
      const leastSeller = salesData.reduce((min, item) => (min.sold || 0) < (item.sold || 0) ? min : item, { sold: Infinity }).name || 'N/A';

      document.getElementById('bestSeller').textContent = `Best Seller: ${bestSeller}`;
      document.getElementById('leastSeller').textContent = `Least Seller: ${leastSeller}`;
      document.getElementById('totalSales').textContent = `Total Sales: ${totalSales} items`;

      const ctx = salesChartCanvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: salesData.map(item => item.name || 'N/A'),
            datasets: [{
              label: 'Sales per Product',
              data: salesData.map(item => item.sold || 0),
              backgroundColor: 'var(--primary-4)',
              borderColor: 'var(--primary-5)',
              borderWidth: 1
            }]
          },
          options: {
            scales: { y: { beginAtZero: true } }
          }
        });
      } else {
        console.error("Chart context not available.");
      }

      // وظيفة البحث
      const searchInput = document.querySelector('input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const searchTerm = e.target.value.toLowerCase();
          const rows = tableBody.querySelectorAll('tr');
          rows.forEach(row => {
            const product = row.cells[0].textContent.toLowerCase();
            row.style.display = product.includes(searchTerm) ? '' : 'none';
          });
        });
      }
    };

    
      initialize();
    
  }
}