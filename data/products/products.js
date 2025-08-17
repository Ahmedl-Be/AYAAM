/* -----------UNI DATA---------- */
import { uniHats } from "./unisex/uni-hat.js";    //HATS

/* -----------MEN DATA---------- */

import { MenTop } from "./men/men-top.js"; //TOP

/* ----------WOMEN DATA--------- */
import { womenShoes } from "./women/women-shoes.js";    //SHOES



/* -----------PRODUCTS---------- */
export const products = [];


/* -----------UNI ADDED---------- */
products.push(...uniHats)    //HATS

/* -----------MEN ADDED---------- */
products.push(...MenTop);

/* ----------WOMEN ADDED--------- */
products.push(...womenShoes);    //SHOES