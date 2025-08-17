/* -----------UNI DATA---------- */
    //HATS
import { uniHats } from "./unisex/uni-hat.js";

/* -----------MEN DATA---------- */
import { menTop } from "./men/men-top.js";
import { menShoes } from "./men/men-shoes.js";
/* ----------WOMEN DATA--------- */
    //SHOES
import { womenShoes } from "./women/women-shoes.js";
    // Dresses
import { womenDresses } from "./women/women-dresses.js";
    // Accessories
import { womenAccessories } from "./women/women-accessories.js";
    // Blouses
import { womenBlouses } from "./women/women-top.js";


/* -----------PRODUCTS---------- */
export const products = [];


/* -----------UNI ADDED---------- */
    //HATS
products.push(...uniHats)

/* -----------MEN ADDED---------- */
products.push(...menTop);
products.push(...menShoes);

/* ----------WOMEN ADDED--------- */
    //SHOES
products.push(...womenShoes);
    // Dresses
products.push(...womenDresses);
    // Accessories
products.push(...womenAccessories);
    // BAGS
products.push(...womenBags);
    // SKIRTS
products.push(...womenSkirts);
    //Blouses
products.push(...womenBlouses);