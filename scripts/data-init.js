import { users }  from '../data/users.js';
// import { products } from '../data/products.js';
// import { orders } from '../data/orders.js';

if (!localStorage.getItem('users')) {
    setData('users', users)
}
// if (!localStorage.getItem('products')) {
//     localStorage.setItem('products', JSON.stringify(products));
// }
// if (!localStorage.getItem('orders')) {
//     localStorage.setItem('orders', JSON.stringify(orders));
// }

export function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
