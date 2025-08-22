export default function ProductCard(product) {
    const imagePath = `./data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${product.stock[0].images[0]}`;
    
    return `
        <div class="card mb-4" style="width: 18rem;">
            <img src="${imagePath}" class="card-img-top" alt="${product.name}" 
                 onerror="this.src='./assets/images/placeholder.jpg'">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-success">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}
