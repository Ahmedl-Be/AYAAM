import { toUser } from "../../scripts/utils/data.js";

const data = [
    {
        id: 'yasser',
        name: "Yasser",
        email: "yasser@example.com",
        password: "123456",
        role: "master",
        phone: '01008348640'
    },
    {
        id: 'sosamaexamplecom',
        name: "Ahmed Osama",
        email: "osama@example.com",
        password: "123456",
        role: "admin",
        phone: '01001234545'
    },
    {
        id: 'sazzaexamplecom',
        name: "Azza",
        email: "azza@example.com",
        password: "123456",
        role: "user",
        phone: '01012412753'
    },
    {
        id: 'smariamexamplecom',
        name: "Mariam",
        email: "mariam@example.com",
        password: "123456",
        role: "seller",
        phone: '01005675670'
    },
    {
        id: 3,
        name: "Ahmed Beltagy",
        email: "beltagy@example.com",
        password: "123456",
        role: "seller",
        phone: '01001231230'
    }
];

export const users = [];

for (let i = 0; i < data.length; i++) { users[i] = toUser(data[i]) }


