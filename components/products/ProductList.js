import ProductCard from './ProductCard.js';
import { getData } from '../../scripts/data-init.js';

export default function ProductList() {
    const products = getData('products');
    return `
        <div class="product-list">
            ${products.map(product => ProductCard(product)).join('')}
        </div>
    `;
}