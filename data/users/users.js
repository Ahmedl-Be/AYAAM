import { toUser } from "../../scripts/utils/data.js";


const data = [
    {
        id: 'yasser',
        name: "Yasser",
        email: "yasser@example.com",
        password: "123456",
        role: "master",
        phone: '01008348640',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2025") // Join Date
    },

    {
        id: 'sosamaexamplecom',
        name: "Ahmed Osama",
        email: "osama@example.com",
        password: "123456",
        role: "admin",
        phone: '01001234545',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2025") // Join Date
    },

    {
        id: 'sazzaexamplecom',
        name: "Azza",
        email: "azza@example.com",
        password: "123456",
        role: "user",
        phone: '01012412753',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2025") // Join Date


    },
    {
        id: 'smariamexamplecom',
        name: "Mariam",
        email: "mariam@example.com",
        password: "123456",
        role: "seller",
        phone: '01005675670',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2025") // Join Date
    },
    {
        id: 3,
        name: "Ahmed Beltagy",
        email: "beltagy@example.com",
        password: "123456",
        role: "seller",
        phone: '01001231230',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2025") // Join Date
    }
];

export const users = [];

for (let i = 0; i < data.length; i++) { users[i] = toUser(data[i]) }


