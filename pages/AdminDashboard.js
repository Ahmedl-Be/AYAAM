import { getData } from "../scripts/data-init.js";

export default function AdminDashboard() {
    const name = getData('loggedUser')[0].name;

    return `<h1>Welcome ${name}</h1>`;
}