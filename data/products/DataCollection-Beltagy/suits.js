const suits = [
  {
    id: 'prod_s01',
    name: "Classic Black Two-Piece Suit",
    description: "Timeless black suit with notch lapel, ideal for business or formal events.",
    price: 2500,
    sellerId: 'seller_2',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Black", quantity: 5 },
      { size: "L", color: "Black", quantity: 3 }
    ],
    images: {
      Black: "images/subCat_Suits/prod_p01.png"
    },
    material: "Wool Blend",
    brand: "Hugo Boss"
  },
  {
    id: 'prod_s02',
    name: "Navy Slim Fit Suit",
    description: "Modern navy slim-fit suit with flat-front trousers.",
    price: 2600,
    sellerId: 'seller_3',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Navy", quantity: 4 },
      { size: "L", color: "Navy", quantity: 6 }
    ],
    images: {
      Navy: "images/subCat_Suits/prod_p02.png"
    },
    material: "Polyester & Viscose",
    brand: "Zara"
  },
  {
    id: 'prod_s03',
    name: "Gray Check Three-Piece Suit",
    description: "Gray check patterned suit with matching vest, perfect for weddings.",
    price: 3000,
    sellerId: 'seller_5',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Gray Check", quantity: 2 },
      { size: "L", color: "Gray Check", quantity: 5 }
    ],
    images: {
      Gray : "images/subCat_Suits/prod_p03.png"
    },
    material: "Wool",
    brand: "Armani"
  },
  {
    id: 'prod_s04',
    name: "Charcoal Double-Breasted Suit",
    description: "Sophisticated charcoal double-breasted suit with peak lapels.",
    price: 2800,
    sellerId: 'seller_7',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Charcoal", quantity: 3 },
      { size: "L", color: "Charcoal", quantity: 4 }
    ],
    images: {
      Charcoal: "images/subCat_Suits/prod_p04.png"
    },
    material: "Wool Blend",
    brand: "Ralph Lauren"
  },
  {
    id: 'prod_s05',
    name: "Light Gray Summer Suit",
    description: "Light gray breathable summer suit with half-lining for comfort.",
    price: 2400,
    sellerId: 'seller_1',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Light Gray", quantity: 6 },
      { size: "L", color: "Light Gray", quantity: 3 }
    ],
    images: {
      "Light Gray": "images/subCat_Suits/prod_p05.png"
    },
    material: "Linen & Cotton",
    brand: "Banana Republic"
  },
  {
    id: 'prod_s06',
    name: "Blue Pinstripe Suit",
    description: "Tailored blue pinstripe suit with two-button jacket.",
    price: 2700,
    sellerId: 'seller_6',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Blue Pinstripe", quantity: 5 },
      { size: "L", color: "Blue Pinstripe", quantity: 4 }
    ],
    images: {
      "Blue Pinstripe": "images/subCat_Suits/prod_p06.png"
    },
    material: "Wool",
    brand: "Brooks Brothers"
  },
  {
    id: 'prod_s07',
    name: "Burgundy Velvet Dinner Jacket",
    description: "Luxury burgundy velvet dinner jacket for special occasions.",
    price: 3200,
    sellerId: 'seller_9',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Burgundy", quantity: 2 },
      { size: "L", color: "Burgundy", quantity: 3 }
    ],
    images: {
      Burgundy: "images/subCat_Suits/prod_p07.png"
    },
    material: "Velvet",
    brand: "Gucci"
  },
  {
    id: 'prod_s08',
    name: "White Linen Suit",
    description: "Lightweight white linen suit, ideal for summer weddings and events.",
    price: 2300,
    sellerId: 'seller_8',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "White", quantity: 4 },
      { size: "L", color: "White", quantity: 5 }
    ],
    images: {
      White: "images/subCat_Suits/prod_p08.png"
    },
    material: "Linen",
    brand: "Ermenegildo Zegna"
  },
  {
    id: 'prod_s09',
    name: "Olive Green Suit",
    description: "Stylish olive green suit with single-breasted jacket.",
    price: 2600,
    sellerId: 'seller_4',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Olive", quantity: 3 },
      { size: "L", color: "Olive", quantity: 2 }
    ],
    images: {
      Olive: "images/subCat_Suits/prod_p09.png"
    },
    material: "Cotton Blend",
    brand: "Paul Smith"
  },
  {
    id: 'prod_s10',
    name: "Tuxedo with Satin Lapel",
    description: "Classic black tuxedo with satin lapel, perfect for black-tie events.",
    price: 3500,
    sellerId: 'seller_10',
    category: "Men",
    subCategory: "Suits",
    stock: [
      { size: "M", color: "Black", quantity: 4 },
      { size: "L", color: "Black", quantity: 3 }
    ],
    images: {
      Black: "images/subCat_Suits/prod_p010.png"
    },
    material: "Wool & Satin",
    brand: "Tom Ford"
  }
];
