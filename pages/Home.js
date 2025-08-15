export default function Home() {
    return `
    <h1>Welcome Home</h1>
            <h2>Login</h2>
            <form id="loginForm">
                <label>Email:</label>
                <input type="email" id="email" required>
                <label>Password:</label>
                <input type="password" id="password" required>
                <button type="submit">Login</button>
            </form>
            <p id="loginError" style="color:red;"></p>
    `;
}