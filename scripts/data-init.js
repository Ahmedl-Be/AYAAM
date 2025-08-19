/* 
*   Includes any functions that deal with data.
*
*/
import { users } from '../data/users.js';
import { products } from '../data/products/products.js';
// import { orders } from '../data/orders.js';


/* ======== LOADING DATA FOR THE FIRST TIME ======== */
if (!localStorage.getItem('users')) {
    setData('users', users)
}
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(products));
}
// if (!localStorage.getItem('orders')) {
//     localStorage.setItem('orders', JSON.stringify(orders));
// }
/* ================================================== */

/* ======== SAVING DATA TO LOCAL STORAGE ======== */
// In:  key: key of the data to store
//   : data: data to store at local  <stored as string>
export function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/* ======== FETCHING DATA FROM LOCAL STORAGE ======== */
// In: the key of the data stored at localstorage
//Out: The formatted data .. Failure => empty array
export function getData(key) { 
    try {                       
        return JSON.parse(localStorage.getItem(key)) || '';
    } catch (error) {
        console.error('Failed to parse localStorage data:', error);
        return [];
    }
}



