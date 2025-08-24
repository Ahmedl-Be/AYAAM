import { localStore } from "../scripts/utils/storage.js";
import { products } from "./products/products.js";
import { users } from "./users/users.js";

/* ============== SEEDING DATA ================= */
/**
 * Seed initial data into storage if not already present.
 * This ensures localStorage/sessionStorage always has base data.
 * 
 * @param {StorageManager} store - StorageManager instance (usually localStore).
 */
export default function seedData() {
  // Seed Users
  if (!localStore.exists("users", true)) {
    localStore.write("users", users);
  }

  // Seed Products
  if (!localStore.exists("products", true)) {
    localStore.write("products", products);
  }

  // Seed Orders
  if (!localStore.exists("orders", true)) {
    localStore.write("orders", []);
  }
}