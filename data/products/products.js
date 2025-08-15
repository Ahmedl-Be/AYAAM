import { Product }  from '../../models/ProductModel.js';

export const products = [
    new Product(
    'prod_1', // ID
    "nike sport t-shirt", // Name (will be converted to "Nike Sport T-shirt")
    "High quality cotton t-shirt for sports use", // Description
    "Men", // Category
    "Top", // Subcategory 
    150, // Price
    [ // Stock array with { color, size, quantity }
        { color: "white", size: "M", quantity: 7 },
        { color: "white", size: "L", quantity: 5 },
        { color: "white", size: "XL", quantity: 10 },
        { color: "white", size: "XXL", quantity: 3 },
        { color: "grey", size: "M", quantity: 4 },
        { color: "grey", size: "L", quantity: 3 },
        { color: "grey", size: "XL", quantity: 1 },
        { color: "grey", size: "XXL", quantity: 0 },
        { color: "black", size: "M", quantity: 5 },
        { color: "black", size: "L", quantity: 1 },
        { color: "black", size: "XL", quantity: 0 },
        { color: "black", size: "XXL", quantity: 0 },
        
    ],
    [ // Images array
        "prod_1/white-f.png",
        "prod_1/white-b.png",
        "prod_1/grey-f.png",
        "prod_1/grey-b.png",
        "prod_1/black-f.png",
        "prod_1/black-b.png",
    ],
    
    "Nike", // Brand
    "Cotton", // Material (will be converted to lowercase: "cotton")
    101, // Seller ID
    "active" // Status
),
];
