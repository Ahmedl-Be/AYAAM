import { signup, login, getCurrentUser, logout } from "./data/authentication.js";
import { localStore, sessionStore } from "./scripts/utilities/storage.js";
/* 

// 🔹 Step 1: Clear old data for testing
localStore.remove("users");
localStore.remove("currentUser");
sessionStore.remove("currentUser");

// 🔹 Step 2: Signup new user
console.log("===== SIGNUP =====");
const user1 = signup("Yasser", "yasser@example.com", "Yasser@14523", "Yasser@14523", "01019719364", "master");
console.log("Users after signup:", localStore.read('users'));
console.log("LOGGED IN ? local", getCurrentUser)
console.log("LOGGED IN ? session", getCurrentUser)

// 🔹 Step 3: Try login with wrong password
console.log("===== LOGIN (wrong password) =====");
const wrongLogin = login("yasser@example.com", "wrongpass");
console.log("Wrong login:", wrongLogin);

// 🔹 Step 4: Try login with correct password
console.log("===== LOGIN (correct) =====");
const loggedUser = login("yasser@example.com", "Yasser@14523", false); // true = remember me
console.log("Logged in:", loggedUser);

// 🔹 Step 5: Get current user
console.log("===== GET CURRENT USER =====");
const current = getCurrentUser();
console.log("Current User:", current);

// 🔹 Step 6: Logout
// console.log("===== LOGOUT =====");
// logout();

// // 🔹 Step 7: Check current user after logout
// console.log("Current User after logout:", getCurrentUser());
 */