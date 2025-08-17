export default function Navbar() {
      return `
    <nav class="navbar">
      <div class="nav-links">
        <button class="nav-btn" data-route="/">Home</button>
        <button class="nav-btn" data-route="/catalog">Catalog</button>
        <button class="nav-btn" data-route="/cart">Cart</button>
        <button class="nav-btn" data-route="/seller">Seller</button>
        <button class="nav-btn" data-route="/admin">Admin</button>
      </div>
    </nav>
  `;
}