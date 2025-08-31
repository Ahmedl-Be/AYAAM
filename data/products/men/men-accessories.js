
import { toProduct } from "../../../scripts/utils/data.js";

const menProductsAcc = [
    {
        id: "mac001",
        name: "Leather Belt with Silver Buckle",
        brand: "Tommy Hilfiger",
        description: "Genuine leather belt with silver buckle, adjustable for various waist sizes.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 30,
        material: "Leather",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p01.jpg"],
                sizes: [{ name: "One Size", qty: 20 }]
            },
            {
                color: "Brown",
                images: ["prod_p02.jpg"],
                sizes: [{ name: "One Size", qty: 15 }]
            },
        ],
    },
    {
        id: "mac002",
        name: "Classic Round Watch",
        brand: "Citizen",
        description: "Water-resistant analog watch with leather strap and minimalist dial.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 120,
        material: "Stainless Steel & Leather",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Silver-Black",
                images: ["prod_p11.jpg"],
                sizes: [{ name: "One Size", qty: 10 }]
            },
            {
                color: "Gold-Brown",
                images: ["prod_p12.jpg"],
                sizes: [{ name: "One Size", qty: 5 }]
            },
        ],
    },
    {
        id: "mac003",
        name: "Wool Blend Scarf",
        brand: "H&M",
        description: "Soft wool blend scarf, lightweight and warm for winter.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 25,
        material: "Wool Blend",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Gray",
                images: ["prod_p21.jpg"],
                sizes: [{ name: "One Size", qty: 12 }]
            },
            {
                color: "Navy",
                images: ["prod_p22.jpg"],
                sizes: [{ name: "One Size", qty: 8 }]
            },
        ],
    },
    {
        id: "mac004",
        name: "Aviator Sunglasses",
        brand: "Ray-Ban",
        description: "Classic aviator sunglasses with UV400 protection lenses.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 45,
        material: "Metal Alloy",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Silver",
                images: ["prod_p31.jpg"],
                sizes: [{ name: "One Size", qty: 15 }]
            },
            {
                color: "Gold",
                images: ["prod_p32.jpg"],
                sizes: [{ name: "One Size", qty: 10 }]
            },
        ],
    },
    {
        id: "mac005",
        name: "Leather Wallet",
        brand: "Fossil",
        description: "Bifold leather wallet with multiple card slots and coin pouch.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 30,
        material: "Leather",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Brown",
                images: ["prod_p41.jpg"],
                sizes: [{ name: "One Size", qty: 25 }]
            },
            {
                color: "Black",
                images: ["prod_p42.jpg"],
                sizes: [{ name: "One Size", qty: 20 }]
            },
        ],
    },
    {
        id: "mac006",
        name: "Knitted Beanie",
        brand: "Adidas",
        description: "Warm knitted beanie with stretch fit for comfort.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 15,
        material: "Acrylic",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p51.jpg"],
                sizes: [{ name: "One Size", qty: 18 }]
            },
            {
                color: "Blue",
                images: ["prod_p52.jpg"],
                sizes: [{ name: "One Size", qty: 12 }]
            },
        ],
    },
    {
        id: "mac007",
        name: "Silk Tie",
        brand: "Hugo Boss",
        description: "Premium silk tie with a smooth finish, perfect for formal events.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 20,
        material: "Silk",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Red",
                images: ["prod_p61.jpg"],
                sizes: [{ name: "One Size", qty: 14 }]
            },
            {
                color: "Navy",
                images: ["prod_p62.jpg"],
                sizes: [{ name: "One Size", qty: 16 }]
            },
        ],
    },
    {
        id: "mac008",
        name: "Cufflinks Set",
        brand: "Montblanc",
        description: "Elegant cufflinks set in stainless steel with gift box.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 5,
        material: "Stainless Steel",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Silver",
                images: ["prod_p71.jpg"],
                sizes: [{ name: "One Size", qty: 20 }]
            },
            {
                color: "Gold",
                images: ["prod_p72.jpg"],
                sizes: [{ name: "One Size", qty: 15 }]
            },
        ],
    },
    {
        id: "mac009",
        name: "Sports Cap",
        brand: "Nike",
        description: "Adjustable sports cap with breathable mesh panels.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 18,
        material: "Polyester",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p81.jpg"],
                sizes: [{ name: "One Size", qty: 25 }]
            },
            {
                color: "White",
                images: ["prod_p82.jpg"],
                sizes: [{ name: "One Size", qty: 20 }]
            },
        ],
    },
    {
        id: "mac010",
        name: "Travel Duffel Bag",
        brand: "Samsonite",
        description: "Durable travel duffel bag with multiple compartments.",
        category: "Men",
        subCategory: "Accessories",
        sale:0,
        price: 90,
        material: "Polyester & Nylon",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p91.jpg"],
                sizes: [{ name: "Large", qty: 8 }]
            },
            {
                color: "Gray",
                images: ["prod_p92.jpg"],
                sizes: [{ name: "Large", qty: 6 }]
            },
        ],
    },
];

const MenAcc = [];
for (const ele of menProductsAcc) {
    MenAcc.push(toProduct(ele))
}

export {MenAcc};
