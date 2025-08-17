//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" 

/* Declare data to transform as an array of objects */
const data = [
  {
    id: 'wsh001', // will be generated automatically 
    name: "Casual Shoes", 
    description: "Lightweight, breathable design for all-day comfort",
    price: 894,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
      { size: '36', color: "Black", quantity: 5 },
      { size: '37', color: "Black", quantity: 7 },
      { size: '38', color: "Black", quantity: 2 },
      { size: '39', color: "Black", quantity: 3 },
      { size: '40', color: "Black", quantity: 4 },

      { size: '36', color: "Beige", quantity: 5 },
      { size: '37', color: "Beige", quantity: 6 },
      { size: '38', color: "Beige", quantity: 2 },
      { size: '40', color: "Beige", quantity: 4 },
    ],

    images: {
      Black: "assets/Shoes/Shose2.png",
      Beige: "assets/Shoes/Shose3.png" ,
    },

    material: "Mesh + Synthetic Leather", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh002', // will be generated automatically 
    name: "Sports Shoes", 
    description: "Lightweight and comfortable sneakers, perfect for workouts and daily activities",
    price: 1200,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
      { size: '36', color: "Beige", quantity: 5 },
      { size: '37', color: "Beige", quantity: 6 },
      { size: '38', color: "Beige", quantity: 2},
      { size: '40', color: "Beige", quantity: 4 },
    ],

    images: {
      Beige: "assets/Shoes/Shoes4.png" ,
    },

    material: "Synthetic Leather", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh003', // will be generated automatically 
    name: "Ankle Strap Heels", 
    description: "Elegant high heels with ankle straps, combining style and comfort — perfect for special occasions",
    price: 800,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
      { size: '36', color: "Black", quantity: 5 },
      { size: '37', color: "Black", quantity: 3},
      { size: '38', color: "Black", quantity: 2},
      { size: '39', color: "Black", quantity: 3 },
      { size: '40', color: "Black", quantity: 1 },
      { size: '41', color: "Black", quantity: 4 },
    ],

    images: {
      Beige: "assets/Shoes/Shoes5.png" ,
    },

    material: "Suede", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh004', // will be generated automatically 
    name: "Heels", 
    description: "Elegant high heels that elevate your look for parties and special occasions",
    price: 900,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
       { size: '36', color: "Black", quantity: 2},
      { size: '37', color: "Black", quantity: 3},
      { size: '38', color: "Black", quantity: 2},
      { size: '39', color: "Black", quantity: 3 },
      { size: '40', color: "Black", quantity: 1 },
    ],

    images: {
      Beige: "assets/Shoes/Shoes7.png" ,
    },

    material: "Patent Leather", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh005', // will be generated automatically 
    name: "Ankle Strap Heels", 
    description: "Ankle strap heels with a back bow for a chic, feminine touch",
    price: 854,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
       { size: '36', color: "Black", quantity: 2},
      { size: '37', color: "Black", quantity: 3},
      { size: '39', color: "Black", quantity: 5},
      { size: '40', color: "Black", quantity: 1 },

      { size: '36', color: "brown", quantity: 2},
      { size: '37', color: "brown", quantity: 3},
      { size: '38', color: "brown", quantity:  4},
      { size: '40', color: "brown", quantity: 1 },
    ],

    images: {
      black: "assets/Shoes/Shoes8.png" ,
      brown: "assets/Shoes/Shoes9.png" ,
    },

    material: "Patent Leather", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh006', // will be generated automatically 
    name: "Heigh Heels", 
    description: "Elegant high heels that elevate your look for parties and special occasions",
    price: 900,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
       { size: '36', color: "Beige", quantity: 2},
      { size: '37', color: "Beige", quantity: 3},
      { size: '39', color: "Beige", quantity: 5},
      { size: '40', color: "Beige", quantity: 1 },
    ],

    images: {
      Beige: "assets/Shoes/Shoes10.png" ,
    },

    material: "Leather", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh007', // will be generated automatically 
    name: "Ankle Strap Heels", 
    description: "Elegant high heels with ankle straps, combining style and comfort — perfect for special occasions",
    price: 950,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
       { size: '36', color: "Navy", quantity: 2},
      { size: '37', color: "Navy", quantity: 3},
      { size: '39', color: "Navy", quantity: 4},
      { size: '41', color: "Navy", quantity: 2},

      { size: '37', color: "Burgundy", quantity: 3},
      { size: '39', color: "Burgundy", quantity: 4},
      { size: '40', color: "Burgundy", quantity: 1 },
    ],

    images: {
      Navy: "assets/Shoes/Shoes11.png" ,
      Burgundy: "assets/Shoes/Shoes12.png" ,
    },

    material: "Suede", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh008', // will be generated automatically 
    name: "White Heels", 
    description: "Women's Chunky Heel Ankle Strap Shoes",
    price: 850,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
       { size: '36', color: "White", quantity: 2},
      { size: '37', color: "White", quantity: 1},
      { size: '38', color: "White", quantity: 3},
      { size: '39', color: "White", quantity: 2},
    ],

    images: {
      White: "assets/Shoes/Shoes13.png" ,
    },

    material: "Textile", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh009', // will be generated automatically 
    name: "Ankle Strap Heels", 
    description: "KHASI Women's Khaki PU Platform Chunky Heel Ankle Strap Shoes",
    price: 850,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
       { size: '36', color: "Khaki ", quantity: 2},
      { size: '37', color: "Khaki ", quantity: 4},
      { size: '38', color: "Khaki ", quantity: 3},
      { size: '39', color: "Khaki ", quantity: 2},
    ],

    images: {
      Khaki : "assets/Shoes/Shoes14.png" ,
    },

    material: "Patent Leather", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh010', // will be generated automatically 
    name: "Sandals", 
    description: "Women's Bright Color Wedge Sandals with Braided Decor – Lightweight Summer Shoes for Casual & Holiday Wear",
    price: 550,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
      { size: '36', color: "White ", quantity: 2},
      { size: '37', color: "White ", quantity: 4},
      { size: '38', color: "White ", quantity: 3},
      { size: '39', color: "White ", quantity: 2},
      { size: '40', color: "White ", quantity: 1},
    ],

    images: {
      White : "assets/Shoes/Shoes15.png" ,
    },

    material: "Leather", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh011', // will be generated automatically 
    name: "Boots", 
    description: "Short leather boots with a sleek design, durable sole, and comfortable fit, perfect for everyday wear and stylish looks.",
    price: 1500,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
      { size: '36', color: "brown", quantity: 2},
      { size: '37', color: "brown", quantity: 3},
      { size: '38', color: "brown", quantity:  4},
      { size: '39', color: "brown", quantity: 1 },

      { size: '36', color: "Beige", quantity: 2},
      { size: '37', color: "Beige", quantity: 3},
      { size: '39', color: "Beige", quantity: 4},
      { size: '41', color: "Beige", quantity: 1 },
    ],

    images: {
      brown : "assets/Shoes/Shoes16.png" ,
      Beige : "assets/Shoes/Shoes17.png" ,
    },

    material: "Leather", //optional for later use
    brand: "Shein", // optional for later use
},

{
    id: 'wsh012', // will be generated automatically 
    name: "Sports Shoes", 
    description: "Lightweight and comfortable sneakers, perfect for workouts and daily activities",
    price: 1000,
    sellerId: 'smariamexamplecom', // random based on sellers we add later
    category: "Women", 
    subCategory: "Shoes", // for later use 
    
    stock: [
      { size: '36', color: "Beige", quantity: 2},
      { size: '37', color: "Beige", quantity: 3},
      { size: '39', color: "Beige", quantity: 2},
      { size: '41', color: "Beige", quantity: 1 },

      { size: '36', color: "White", quantity: 2},
      { size: '37', color: "White", quantity: 3},
      { size: '38', color: "White", quantity:  4},
      { size: '39', color: "White", quantity: 1 },
      { size: '40', color: "White", quantity: 1 },
    ],

    images: {
        Beige : "assets/Shoes/Shoes18.png" ,
        White : "assets/Shoes/Shoes19.png" ,
    },

    material: "Synthetic Leather", //optional for later use
    brand: "Shein", // optional for later use
},



]

// declare an array to contain the ouput ***MUST BE <PascalCase> ***
const womenShoes = []; 

/* Loop over the array of data and covert to products */
for (let i = 0; i < data.length; i++) { womenShoes[i] = toProduct(data[i]) }
//Export the data
export { womenShoes }; 