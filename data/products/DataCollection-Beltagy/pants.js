const pants = [
  {
    id: 'prod_p01',
    name: "Slim Fit Chino Pants",
    description: "Breathable cotton-twill slim-fit chinos with a slight stretch for comfort.",
    price: 550,
    sellerId: 'seller_1',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "M", color: "Beige", quantity: 10 },
      { size: "L", color: "Beige", quantity: 7 },
      { size: "M", color: "Navy", quantity: 8 },
      { size: "L", color: "Navy", quantity: 5 }
    ],
    images: {
      Beige: "images/subCat_Pants/prod_p01.jpg",
      Navy: "images/subCat_Pants/prod_p02.jpg"
    },
    material: "Cotton-Twill",
    brand: "Gap"
  },
  {
    id: 'prod_p02',
    name: "Cargo Pants with Multi-Pockets",
    description: "Relaxed-fit canvas cargo pants with reinforced stitching and multiple storage pockets.",
    price: 650,
    sellerId: 'seller_2',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "L", color: "Olive", quantity: 7 },
      { size: "XL", color: "Olive", quantity: 3 },
      { size: "L", color: "Khaki", quantity: 6 }
    ],
    images: {
      Olive: "images/subCat_Pants/prod_p11.jpg",
      Khaki: "images/subCat_Pants/prod_p12.jpg"
    },
    material: "Canvas",
    brand: "Levi's"
  },
  {
    id: 'prod_p03',
    name: "Performance Stretch Joggers",
    description: "Lightweight performance joggers with moisture-wicking stretch fabric and ergonomic fit.",
    price: 700,
    sellerId: 'seller_3',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "M", color: "Black", quantity: 12 },
      { size: "L", color: "Black", quantity: 8 },
      { size: "M", color: "Gray", quantity: 7 }
    ],
    images: {
      Black: "images/subCat_Pants/prod_p21.jpg",
      Gray: "images/subCat_Pants/prod_p22.jpg"
    },
    material: "Polyester-Spandex",
    brand: "Nike"
  },
  {
    id: 'prod_p04',
    name: "Slim Dress Trousers",
    description: "Tailored slim-fit dress trousers with crease-resistant fabric, ideal for office use.",
    price: 1200,
    sellerId: 'seller_4',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "32", color: "Charcoal", quantity: 5 },
      { size: "34", color: "Charcoal", quantity: 4 },
      { size: "32", color: "Navy", quantity: 6 }
    ],
    images: {
      Charcoal: "images/subCat_Pants/prod_p31.jpg",
      Navy: "images/subCat_Pants/prod_p32.jpg"
    },
    material: "Poly-Blend",
    brand: "Brooks Brothers"
  },
  {
    id: 'prod_p05',
    name: "Hiking Adventure Pants",
    description: "Durable field pants with ripstop nylon fabric, UV protection, and zip-off legs conversion.",
    price: 900,
    sellerId: 'seller_5',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "M", color: "Tan", quantity: 6 },
      { size: "L", color: "Tan", quantity: 5 },
      { size: "M", color: "Green", quantity: 4 }
    ],
    images: {
      Tan: "images/subCat_Pants/prod_p41.jpg",
      Green: "images/subCat_Pants/prod_p42.jpg"
    },
    material: "Ripstop Nylon",
    brand: "Columbia"
  },
  {
    id: 'prod_p06',
    name: "Lightweight Athletic Pants",
    description: "Slim-fit athletic pants with 4-way stretch and reflective detailing for night runs.",
    price: 800,
    sellerId: 'seller_6',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "M", color: "Black", quantity: 10 },
      { size: "L", color: "Black", quantity: 8 },
      { size: "M", color: "Blue", quantity: 5 }
    ],
    images: {
      Black: "images/subCat_Pants/prod_p51.jpg",
      Blue: "images/subCat_Pants/prod_p52.jpg"
    },
    material: "Poly-Spandex",
    brand: "Under Armour"
  },
  {
    id: 'prod_p07',
    name: "Pleated Dress Pants",
    description: "Classic pleated trousers made of wool-blend, soft and ideal for formal occasions.",
    price: 2000,
    sellerId: 'seller_7',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "30", color: "Gray", quantity: 3 },
      { size: "32", color: "Gray", quantity: 2 },
      { size: "30", color: "Black", quantity: 4 }
    ],
    images: {
      Gray: "images/subCat_Pants/prod_p61.jpg",
      Black: "images/subCat_Pants/prod_p62.jpg"
    },
    material: "Wool-Blend",
    brand: "Suitsupply"
  },
  {
    id: 'prod_p08',
    name: "No-Iron Chino Pants",
    description: "Easy-care, wrinkle-free chinos with flex waistband and water repellent treatment.",
    price: 600,
    sellerId: 'seller_8',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "M", color: "Khaki", quantity: 8 },
      { size: "L", color: "Khaki", quantity: 6 },
      { size: "M", color: "Gray", quantity: 5 }
    ],
    images: {
      Khaki: "images/subCat_Pants/prod_p71.jpg",
      Gray: "images/subCat_Pants/prod_p72.jpg"
    },
    material: "Cotton-Spandex",
    brand: "Dockers"
  },
  {
    id: 'prod_p09',
    name: "Tailored Wool Blend Trousers",
    description: "Slim-fit wool-blend trousers with a modern cut and soft lining for comfort.",
    price: 2500,
    sellerId: 'seller_9',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "32", color: "Navy", quantity: 4 },
      { size: "34", color: "Navy", quantity: 3 },
      { size: "32", color: "Charcoal", quantity: 2 }
    ],
    images: {
      Navy: "images/subCat_Pants/prod_p81.jpg",
      Charcoal: "images/subCat_Pants/prod_p82.jpg"
    },
    material: "Wool-Blend",
    brand: "Todd Snyder"
  },
  {
    id: 'prod_p10',
    name: "Hybrid Cargo Dress Pants",
    description: "Modern hybrid pants: resemble cargos but with dress pant tailoring and tech fabric.",
    price: 1800,
    sellerId: 'seller_10',
    category: "Men",
    subCategory: "Pants",
    stock: [
      { size: "M", color: "Olive", quantity: 5 },
      { size: "L", color: "Olive", quantity: 3 },
      { size: "M", color: "Gray", quantity: 4 }
    ],
    images: {
      Olive: "images/subCat_Pants/prod_p91.jpg",
      Gray: "images/subCat_Pants/prod_p92.jpg"
    },
    material: "Tech-Blend",
    brand: "Bonobos"
  },
];
