import View from "../../components/core/view.js";
import { localStore } from "../../scripts/utils/storage.js";

export default class incomeingOrder extends View {
  template() {
    return `
      <div class="container">
    <div class="header">Incoming Orders</div>
    <div class="search-bar">
      <div class="input-group">
        <input type="text" id="searchInput" class="form-control" placeholder="Search">
        <select id="statusSelect" class="form-select ms-2">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
        </select>
      </div>
    </div>
    <div class="summary-row row g-2 mb-3">
      <div class="col-6 col-md-3">
        <div class="summary-item">
          <div class="fw-bold" id="summaryOrders">0</div>
          <small>Orders</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="summary-item">
          <div class="fw-bold" id="summaryTotal">$0</div>
          <small>Total</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="summary-item">
          <div class="status-badge bg-warning text-dark" id="summaryPendingBadge">Pending</div>
          <small id="summaryPending">0</small>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="summary-item">
          <div class="status-badge bg-primary" id="summaryConfirmedBadge">Confirmed</div>
          <small id="summaryConfirmed">0</small>
        </div>
      </div>
    </div>
    <div class="order-list">
      <div id="orderList"></div>
    </div>
  </div>
    `;
  }

  script() {
             const orderList = document.getElementById("orderList");
      const searchInput = document.getElementById("searchInput");
      const statusSelect = document.getElementById("statusSelect");
      const summaryOrders = document.getElementById("summaryOrders");
      const summaryTotal = document.getElementById("summaryTotal");
      const summaryPending = document.getElementById("summaryPending");
      const summaryConfirmed = document.getElementById("summaryConfirmed");

      const userCart = { //remove
        userId: "u1",
        items: [
          {
            id: "wdr009",
            name: "Flower Long Summer Dress",
            color: "Black",
            price: Number((15.3 * (1 - 0.2)).toFixed(2)),
            size: "XS",
            qty: 2,
          },
          {
            id: "wdr009",
            name: "Flower Long Summer Dress",
            color: "Black",
            price: Number((15.3 * (1 - 0.2)).toFixed(2)),
            size: "S",
            qty: 4,
          },
          {
            id: "wdr010",
            name: "Elegant Long Dress",
            color: "Green",
            price: Number((12.63 * (1 - 0.2)).toFixed(2)),
            size: "XS",
            qty: 1,
          }
        ]
      };

      let orders = userCart.items.map((item, index) => ({//remove
        orderId: index + 1,
        productName: item.name,
        color: item.color,
        size: item.size,
        qty: item.qty,
        price: item.price,
        status: "Pending"
      }));

    //   let orders = [];
    //   updateUI(orders); // لما اشيل داتا الا انا حاطها 

      function processOrders(newOrders) {
        newOrders.forEach(newOrder => {
          const cartItem = userCart.items.find(item => item.id === newOrder.productId && item.size === newOrder.size);
          if (cartItem && cartItem.qty >= newOrder.qty) {
            cartItem.qty -= newOrder.qty;
            newOrder.status = "Confirmed"; 
          } else {
            newOrder.status = "Pending"; 
          }
          if (!orders.some(o => o.orderId === newOrder.orderId)) {
            orders.push(newOrder);
          }
        });
        updateUI();
      }

      function updateUI(filteredOrders = orders) {
        orderList.innerHTML = '';
        if (filteredOrders.length === 0) {
          orderList.innerHTML = '<div class="text-center text-muted p-3">No orders available yet.</div>';
        } else {
          filteredOrders.forEach(order => {
            const item = document.createElement('div');
            item.className = 'order-item';
            item.innerHTML = `
              <div class="avatar">${order.orderId}</div>
              <div class="order-details">
                <div class="order-name">${order.productName}</div>
                <div class="order-products">Color: ${order.color}, Size: ${order.size}, Qty: ${order.qty}, Price: $${order.price.toFixed(2)}</div>
              </div>
              <div class="order-status bg-${getStatusColor(order.status)} text-${order.status === 'Pending' ? 'dark' : 'light'}">${order.status}</div>
            `;
            orderList.appendChild(item);
          });
        }
        updateSummary(filteredOrders);
      }

      function getStatusColor(status) {
        switch (status) {
          case 'Pending': return 'warning';
          case 'Confirmed': return 'primary';
          default: return 'secondary';
        }
      }

      function updateSummary(filteredOrders) {
        const totalOrders = filteredOrders.length;
        const totalPrice = filteredOrders.reduce((sum, order) => sum + (order.price * order.qty), 0).toFixed(2);
        const pendingCount = filteredOrders.filter(o => o.status === 'Pending').length;
        const confirmedCount = filteredOrders.filter(o => o.status === 'Confirmed').length;

        summaryOrders.textContent = totalOrders;
        summaryTotal.textContent = `$${totalPrice}`;
        summaryPending.textContent = pendingCount;
        summaryConfirmed.textContent = confirmedCount;
      }

      // Search and filter functionality
      searchInput.addEventListener("input", filterOrders);
      statusSelect.addEventListener("change", filterOrders);

      function filterOrders() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedStatus = statusSelect.value;

        let filteredOrders = [...orders];

        if (searchTerm) {
          filteredOrders = filteredOrders.filter(order => {
            return (
              order.orderId.toString().includes(searchTerm) ||
              order.productName.toLowerCase().includes(searchTerm) ||
              order.color.toLowerCase().includes(searchTerm) ||
              order.size.toLowerCase().includes(searchTerm) ||
              order.qty.toString().includes(searchTerm) ||
              order.price.toString().includes(searchTerm) ||
              order.status.toLowerCase().includes(searchTerm)
            );
          });
        }

        if (selectedStatus) {
          filteredOrders = filteredOrders.filter(order => order.status === selectedStatus);
        }

        updateUI(filteredOrders);
      }

      window.receiveOrder = function (newOrder) {
        if (!newOrder.orderId || !newOrder.productId || !newOrder.size || !newOrder.qty || !newOrder.price) {
          console.error("Invalid order data", newOrder);
          return;
        }
        processOrders([newOrder]);
      };

      // Process initial orders from userCart
      processOrders(orders);
  }
}