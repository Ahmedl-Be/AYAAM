import { getData } from "../scripts/data-init.js";

export default function AdminDashboard() {
    const user = getData('loggedUser');
    if (!user) return `<p>Please log in</p>`;
    return `<h1>Welcome ${user.name || 'Admin'}</h1>`;
}