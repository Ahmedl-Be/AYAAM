//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" 


/* data */
const data = [
    {   id: 'uha001', 
        name: "Nike Pro", 
        description: "Play with the elite with this Nike Pro Cap. It offers a max-depth design that you can confidently wear from course to court and just about anywhere else. The design features sweat-wicking woven fabric with a round, flat bill. A flexible snapback makes it easy to adjust for what's right for you.",
        price: 25.3,
        sale: 0.14,
        offers: [
                'free shipping'
            ],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Grey",
            imgs: ['grey-f.png','grey-b.png','grey-in.png','grey-s.png','grey-top.png'],
            sizes: [
            {name: 'M', qty: 4 },
            {name: 'L', qty: 2 },
            {name: 'XL', qty: 1 }
            ]
        },
        ],
        material: "Recycled Polyester Fibers", //optional for later use
        brand: "Nike", // optional for later use
        addedAt: ''
    },
    {   id: 'uha002', 
        name: "Nike Terra", 
        description: "Crafted for warmth, comfort and style—this modern, low-depth knit hat has you covered in the cold.",
        price: 23.97,
        sale: 0.14,
        offers: [
                'free shipping'
            ],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Black",
            imgs: ['black-f.png','black-b.png','black-in.png','black-s.png','black-top.png'],
            sizes: [
            {name: '', qty:2},
            ]
        },
        {
            color: "Brown",
            imgs: ['brown-f.png','brown-b.png','brown-in.png','brown-s.png','brown-top.png'],
            sizes: [
            {name: '', qty:5},
            ]
        },
        {
            color: "Lightgrey",
            imgs: ['lightgrey-f.png','lightgrey-b.png','lightgrey-in.png','lightgrey-s.png','lightgrey-top.png'],
            sizes: [
            {name: '', qty:4},
            ]
        },
        ],
        material: "Recycled Polyester Fibers", //optional for later use
        brand: "Nike", // optional for later use
        addedAt: ''
    },
    {   id: 'uha003', 
        name: "Jordan Rise", 
        description: "Let your head breathe as you rep the brand you love. A high-depth design gives this hat a comfortable, modern fit. Mesh panels help keep things airy while a snap-back closure gives you an adjustable fit.",
        price: 27.97,
        sale: 0.12,
        offers: [
                'free shipping', 'Highly Rated'
            ],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Cyan",
            imgs: ['cyan-top.png','cyan-front.png','cyan-back.png','cyan-side.png','cyan-in.png'],
            sizes: [
                {name: 'M', qty: 3 },
                {name: 'L', qty: 1 },
                {name: 'XL', qty: 2 }
            ]
        },
        {
            color: "Black",
            imgs: ['black-top.png','black-front.png','black-back.png','black-side.png','black-in.png'],
            sizes: [
            {name: '', qty:2},
            ]
        },
        {
            color: "Blue",
            imgs: ['blue-front.png','blue-back.png','blue-in.png','blue-side.png','blue-top.png'],
            sizes: [
            {name: '', qty:4},
            ]
        },
        ],
        material: "Recycled Polyester Fibers", //optional for later use
        brand: "Nike", // optional for later use
        addedAt: ''
    },
];