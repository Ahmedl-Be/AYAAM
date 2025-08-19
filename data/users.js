
import { toUser } from '../scripts/utils.js';
 const data = [
    {
        id: 'yasser',
        name: "Yasser",
        email: "yasser@example.com",
        password: "123456",
         role: "Admin",
        phone: '01019719364'
    },
    {
        id: 'sosamaexamplecom',
        name: "Ahmed Osama",
        email: "osama@example.com",
        password: "123456",
        role: "Seller",
        phone: '01019719364'
    },
    {
        id: 'sazzaexamplecom',
        name: "Azza",
        email: "azza@example.com",
        password: "123456",
        role: "Seller",
        phone: '01019719364'
    },
    {
        id: 'smariamexamplecom',
        name: "Mariam",
        email: "mariam@example.com",
        password: "123456",
        role: "Seller",
        phone: '01019719364'
    },
    {
        id: 3,
        name: "Ahmed Beltagy",
        email: "beltagy@example.com",
        password: "123456",
        role: "User",
        phone: '01019719364'
    }
];

export const users = [];

for (let i = 0; i < data.length; i++) { users[i] = toUser(data[i]) }


