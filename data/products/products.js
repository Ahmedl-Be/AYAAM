/* -----------UNI DATA---------- */
    //HATS
import { uniHats } from "./unisex/uni-hat.js";

/* -----------MEN DATA---------- */
    //TOP
import { MenTop } from "./men/men-top.js"; 

/* ----------WOMEN DATA--------- */
    //SHOES
import { womenShoes } from "./women/women-shoes.js";

    // Dresses
import { womenDresses } from "./women/women-dresses.js";

    // Accessories
import { womenAccessories } from "./women/women-accessories.js";


/* -----------PRODUCTS---------- */
export const products = [];


/* -----------UNI ADDED---------- */
    //HATS
products.push(...uniHats)

/* -----------MEN ADDED---------- */
    //TOPS
products.push(...MenTop);

/* ----------WOMEN ADDED--------- */
    //SHOES
products.push(...womenShoes);
    // Dresses
products.push(...womenDresses);
    // Accessories
products.push(...womenAccessories);