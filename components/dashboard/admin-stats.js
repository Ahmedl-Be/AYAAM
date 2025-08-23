
export function renderUsersStats(container) {
    const users = getData("users") || [];
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Users</h2>
                <p>Total users: <span class="badge bg-success">${users.length}</span></p>
            </div>
        </div>
    `;
}

export function renderSellersStats(container) {
    const users = getData("users") || [];
    const sellers = users.filter((u) => u.role === "Seller");
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Sellers</h2>
                <p>Total sellers: <span class="badge bg-info">${sellers.length}</span></p>
            </div>
        </div>
    `;
}

export function renderProductsStats(container) {
    const products = getData("products") || [];
    const men = products.filter((p) => p.category === "Men").length;
    const women = products.filter((p) => p.category === "Women").length;
    const unisex = products.filter((p) => p.category === "Unisex").length;
    const total = products.length;

    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Products Statistics</h2>
                <ul class="list-group">
                    <li class="list-group-item">Men: <span class="badge bg-secondary">${men}</span></li>
                    <li class="list-group-item">Women: <span class="badge bg-secondary">${women}</span></li>
                    <li class="list-group-item">Unisex: <span class="badge bg-secondary">${unisex}</span></li>
                    <li class="list-group-item">Total: <span class="badge bg-secondary">${total}</span></li>
                </ul>
            </div>
        </div>
    `;
}