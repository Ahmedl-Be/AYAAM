import ProductCard from './ProductCard.js';
import { localStore } from '../../scripts/utils/storage.js';

export default function ProductList() {
  const products = localStore.read('products', []);
  return `<div class="product-list d-grid gap-3">
    ${products.map(ProductCard).join('')}
  </div>`;
}
