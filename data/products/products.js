/* -----------MEN DATA---------- */
import { MenAcc } from "./men/men-accessories.js";
import { MenPants } from "./men/men-bottom.js";
import { MenSuits } from "./men/men-suits.js";
/* ----------WOMEN DATA--------- */
    //SHOES
import { womenShoes } from "./women/women-shoes.js";


/* -----------PRODUCTS---------- */
export const products = [];


/* -----------MEN ADDED---------- */
products.push(...MenAcc);
products.push(...MenPants);
products.push(...MenSuits);

/* ----------WOMEN ADDED--------- */
    //SHOES
products.push(...womenShoes);