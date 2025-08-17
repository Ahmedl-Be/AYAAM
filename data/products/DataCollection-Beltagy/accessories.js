const accessories = [
  {
    id: 'prod_a01',
    name: "Leather Belt with Silver Buckle",
    description: "Genuine leather belt with silver buckle, adjustable for various waist sizes.",
    price: 300,
    sellerId: 'seller_2',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Black", quantity: 20 },
      { size: "One Size", color: "Brown", quantity: 15 }
    ],
    images: {
      Black: "images/subCat_accessories/prod_p01.jpg",
      Brown: "images/subCat_accessories/prod_p02.jpg"
    },
    material: "Leather",
    brand: "Tommy Hilfiger"
  },
  {
    id: 'prod_a02',
    name: "Classic Round Watch",
    description: "Water-resistant analog watch with leather strap and minimalist dial.",
    price: 1200,
    sellerId: 'seller_4',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Silver-Black", quantity: 10 },
      { size: "One Size", color: "Gold-Brown", quantity: 5 }
    ],
    images: {
      "Silver-Black": "images/subCat_accessories/prod_p11.jpg",
      "Gold-Brown": "images/subCat_accessories/prod_p12.jpg"
    },
    material: "Stainless Steel & Leather",
    brand: "Citizen"
  },
  {
    id: 'prod_a03',
    name: "Wool Blend Scarf",
    description: "Soft wool blend scarf, lightweight and warm for winter.",
    price: 250,
    sellerId: 'seller_1',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Gray", quantity: 12 },
      { size: "One Size", color: "Navy", quantity: 8 }
    ],
    images: {
      Gray: "images/subCat_accessories/prod_p21.jpg",
      Navy: "images/subCat_accessories/prod_p22.jpg"
    },
    material: "Wool Blend",
    brand: "H&M"
  },
  {
    id: 'prod_a04',
    name: "Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV400 protection lenses.",
    price: 450,
    sellerId: 'seller_5',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Silver", quantity: 15 },
      { size: "One Size", color: "Gold", quantity: 10 }
    ],
    images: {
      Silver: "images/subCat_accessories/prod_p31.jpg",
      Gold: "images/subCat_accessories/prod_p32.jpg"
    },
    material: "Metal Alloy",
    brand: "Ray-Ban"
  },
  {
    id: 'prod_a05',
    name: "Leather Wallet",
    description: "Bifold leather wallet with multiple card slots and coin pouch.",
    price: 350,
    sellerId: 'seller_3',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Brown", quantity: 25 },
      { size: "One Size", color: "Black", quantity: 20 }
    ],
    images: {
      Brown: "images/subCat_accessories/prod_p41.jpg",
      Black: "images/subCat_accessories/prod_p42.jpg"
    },
    material: "Leather",
    brand: "Fossil"
  },
  {
    id: 'prod_a06',
    name: "Knitted Beanie",
    description: "Warm knitted beanie with stretch fit for comfort.",
    price: 150,
    sellerId: 'seller_6',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Black", quantity: 18 },
      { size: "One Size", color: "Blue", quantity: 12 }
    ],
    images: {
      Black: "images/subCat_accessories/prod_p51.jpg",
      Blue: "images/subCat_accessories/prod_p52.jpg"
    },
    material: "Acrylic",
    brand: "Adidas"
  },
  {
    id: 'prod_a07',
    name: "Silk Tie",
    description: "Premium silk tie with a smooth finish, perfect for formal events.",
    price: 200,
    sellerId: 'seller_7',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Red", quantity: 14 },
      { size: "One Size", color: "Navy", quantity: 16 }
    ],
    images: {
      Red: "images/subCat_accessories/prod_p61.jpg",
      Navy: "images/subCat_accessories/prod_p62.jpg"
    },
    material: "Silk",
    brand: "Hugo Boss"
  },
  {
    id: 'prod_a08',
    name: "Cufflinks Set",
    description: "Elegant cufflinks set in stainless steel with gift box.",
    price: 500,
    sellerId: 'seller_8',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Silver", quantity: 20 },
      { size: "One Size", color: "Gold", quantity: 15 }
    ],
    images: {
      Silver: "images/subCat_accessories/prod_p71.jpg",
      Gold: "images/subCat_accessories/prod_p72.jpg"
    },
    material: "Stainless Steel",
    brand: "Montblanc"
  },
  {
    id: 'prod_a09',
    name: "Sports Cap",
    description: "Adjustable sports cap with breathable mesh panels.",
    price: 180,
    sellerId: 'seller_9',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "One Size", color: "Black", quantity: 25 },
      { size: "One Size", color: "White", quantity: 20 }
    ],
    images: {
      Black: "images/subCat_accessories/prod_p81.jpg",
      White: "images/subCat_accessories/prod_p82.jpg"
    },
    material: "Polyester",
    brand: "Nike"
  },
  {
    id: 'prod_a10',
    name: "Travel Duffel Bag",
    description: "Durable travel duffel bag with multiple compartments.",
    price: 900,
    sellerId: 'seller_10',
    category: "Men",
    subCategory: "Accessories",
    stock: [
      { size: "Large", color: "Black", quantity: 8 },
      { size: "Large", color: "Gray", quantity: 6 }
    ],
    images: {
      Black: "images/subCat_accessories/prod_p91.jpg",
      Gray: "images/subCat_accessories/prod_p92.jpg"
    },
    material: "Polyester & Nylon",
    brand: "Samsonite"
  }
];