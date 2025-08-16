//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" 


/* data*/
const data = [
    {   id: 'uha001', 
        name: "Nike Pro", 
        description: "Structured Round Bill Cap",
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
            {name: 'M', qty:'3'},
            {name: 'L', qty:'3'},
            {name: 'XL', qty:'3'}
            ]
        },
        ],
        material: "Mesh + Synthetic Leather", //optional for later use
        brand: "Nike", // optional for later use
        addedAt: ''
    },
];