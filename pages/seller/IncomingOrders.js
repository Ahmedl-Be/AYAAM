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
              <small id="summaryPending"></small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="summary-item">
              <div class="status-badge bg-primary" id="summaryConfirmedBadge">Confirmed</div>
              <small id="summaryConfirmed"></small>
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

  // Initialize orders and products from localStorage
  let orders = localStore.read("orders") || [];
  if (!Array.isArray(orders)) {
    console.warn("Orders data is not an array, initializing as empty array.");
    orders = [];
  }
  let products = localStore.read("products") || [];
  if (!Array.isArray(products)) {
    console.warn("Products data is not an array, initializing as empty array.");
    products = [];
  }

  // Function to process new orders
  function processOrders(newOrders) {
    newOrders.forEach(newOrder => {
      newOrder.orderId = newOrder.orderId || `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      newOrder.orderDate = newOrder.orderDate || new Date().toLocaleDateString();
      newOrder.orderItems = newOrder.orderItems || [];

      newOrder.orderItems.forEach(item => {
        // Ensure item has a state
        item.state = item.state || "Pending";

        // Find the product in products array
        const product = products.find(
          p => p.productId === item.productId && p.size === item.size
        ) || { productId: item.productId, size: item.size, availableQty: 0 };

        // Check if sufficient quantity is available (without modifying products)
        item.state = product.availableQty >= item.qty ? "Confirmed" : "Pending";
      });

      // Add or update order
      const existingOrderIndex = orders.findIndex(o => o.orderId === newOrder.orderId);
      if (existingOrderIndex === -1) {
        orders.push(newOrder);
      } else {
        orders[existingOrderIndex] = newOrder;
      }
    });

    // Save updated orders to localStorage (products remain unchanged)
    localStore.write("orders", orders);
    updateUI();
  }

  // Function to update the UI
  function updateUI(filteredOrders = orders) {
    orderList.innerHTML = "";
    if (filteredOrders.length === 0) {
      orderList.innerHTML = '<div class="text-center text-muted p-3">No orders available yet.</div>';
    } else {
      filteredOrders.forEach((order, index) => {
        (order.orderItems || []).forEach(item => {
          const orderItem = document.createElement("div");
          orderItem.className = "order-item";
          orderItem.innerHTML = `
            <div class="avatar">${index + 1}</div>
            <div class="order-details">
              <div class="order-name">${item.productName || "N/A"}</div>
              <div class="order-products">Color: ${item.color || "N/A"}, Qty: ${item.qty || 0}, Price: $${(item.price * (item.qty || 1)).toFixed(2)}, Date: ${order.orderDate || "N/A"}</div>
            </div>
            <div class="order-status bg-${getStatusColor(item.state)} text-${item.state === "Pending" ? "dark" : "light"}">${item.state || "N/A"}</div>
          `;
          orderList.appendChild(orderItem);
        });
      });
    }
    updateSummary(filteredOrders);
  }

  // Function to get status color
  function getStatusColor(state) {
    switch (state) {
      case "Pending":
        return "warning";
      case "Confirmed":
        return "primary";
      default:
        return "secondary";
    }
  }

  // Function to update summary
  function updateSummary(filteredOrders) {
    const totalOrders = filteredOrders.length; // Count orders, not items
    const totalPrice = filteredOrders
      .reduce((sum, order) => sum + (order.orderItems || []).reduce((itemSum, item) => itemSum + (item.price * (item.qty || 1)), 0), 0)
      .toFixed(2);
    const pendingCount = filteredOrders.reduce(
      (sum, order) => sum + (order.orderItems || []).filter(item => item.state && item.state.toLowerCase() === "pending").length,
      0
    );
    const confirmedCount = filteredOrders.reduce(
      (sum, order) => sum + (order.orderItems || []).filter(item => item.state && item.state.toLowerCase() === "confirmed").length,
      0
    );

    if (summaryOrders) summaryOrders.textContent = totalOrders || "0";
    if (summaryTotal) summaryTotal.textContent = `$${totalPrice || "0.00"}`;
    if (summaryPending) summaryPending.textContent = pendingCount || "0";
    if (summaryConfirmed) summaryConfirmed.textContent = confirmedCount || "0";
    else {
      console.warn("Summary elements not found", { totalOrders, totalPrice, pendingCount, confirmedCount });
    }

    const pendingBadge = document.getElementById("summaryPendingBadge");
    const confirmedBadge = document.getElementById("summaryConfirmedBadge");
    if (pendingBadge) pendingBadge.textContent = `Pending `;
    if (confirmedBadge) confirmedBadge.textContent = `Confirmed`;
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
        return (order.orderItems || []).some(
          item =>
            order.orderId?.toString().includes(searchTerm) ||
            item.productName?.toLowerCase().includes(searchTerm) ||
            item.color?.toLowerCase().includes(searchTerm) ||
            item.size?.toLowerCase().includes(searchTerm) ||
            item.qty?.toString().includes(searchTerm) ||
            item.price?.toString().includes(searchTerm) ||
            item.state?.toLowerCase().includes(searchTerm) ||
            order.orderDate?.toLowerCase().includes(searchTerm)
        );
      });
    }

    if (selectedStatus) {
      filteredOrders = filteredOrders.filter(order =>
        (order.orderItems || []).some(item => item.state && item.state.toLowerCase() === selectedStatus.toLowerCase())
      );
    }

    updateUI(filteredOrders);
  }

  // Public method to receive new orders
  window.receiveOrder = function (newOrder) {
    if (!newOrder.orderItems || !newOrder.orderItems[0]?.productId || !newOrder.orderItems[0]?.size || !newOrder.orderItems[0]?.qty || !newOrder.orderItems[0]?.price) {
      console.error("Invalid order data", newOrder);
      return;
    }
    processOrders([newOrder]);
  };

  // Initialize UI with existing orders
  updateUI();
}
}