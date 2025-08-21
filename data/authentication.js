import { generateID, toUser } from "../scripts/utilities/data.js";
import { localStore, sessionStore } from "../scripts/utilities/storage.js";

/* ======================= SIGNUP =========================== */
export function signup(_name, _email, _password, _repeatedPassword, _phone='01000000000' ,_role='user') {
    const users = localStore.read('users', []);
    
    const name = _name;
    const email = _email;
    const password = _password;
    const repeatedPassword = _repeatedPassword;
    const role = _role;
    const phone = _phone;

    const existingEmail = users.find(_user => _user.email === email);

    /* VALIDATE EMAIL */
    if (!validateEmail(email)) {
        console.warn("ENTER A VALID EMAIL...");
        return null;
    }

    /* CHECK IF EMAIL EXISTS */
    if (existingEmail) {
        console.warn("USER ALREADY EXISTS LOGIN...");
        return null;
    }
    console.log(password)
    /* VALIDATE PASSOWRD */
    if (!validatePassword(password)) {
        console.warn(` Passwords must have:
            - atleast 8 digits
            - atleast 1 Capital letter
            - atleast 1 small letter
            - a special character
            `);
        return null;
    }

    /* CHECK IF PW AND RPW MATCH */
    if (password !== repeatedPassword) {
        console.warn("Passwords MUST Match...");
        return null;
    }
    
    const createdAt = Date.now();

    let newUser = {
        id: generateID(role),
        name, email, password, role, phone
    }
    
    newUser = toUser(newUser);
    users.push(newUser);

    localStore.write('users', users)

    return login(newUser.Email, newUser.Password, true);

}

/* ======================= LOGIN ============================ */
/**
 * Try to login a user with email & password.
 * @param {string} _identifier
 * @param {string} _password
 * @param {boolean} _remember - If true, keep logged in using localStorage
 * @returns {object|null} The logged-in user object or null if failed
 */
export function login(_identifier, _password, _remember = false) {
    const users = localStore.read("users", []);
    const user = users.find( _user => (_user.email === _identifier || _user.phone === _identifier) && _user.password === _password);

    if (!user) {
        console.warn("Invalid email or password!!!!!");
        return null;
    }

    //Save session
    sessionStore.write("currentUser", user);

    //Optional keep logged in
    if (_remember) {
        localStore.write("currentUser", user);
    }

    console.log("Logged in:", user.name);
    return user;
}

/* ==================== CURRENT USER ======================== */
/**
 * Get the currently logged-in user (from session or local).
 * @returns {object|null}
 */
export function getCurrentUser() {
    return (
        sessionStore.read("currentUser", null) ||
        localStore.read("currentUser", null)
    );
}

/* ======================= LOGOUT =========================== */
/**
 * Logout current user from session (and local if exists).
 */
export function logout() {
    sessionStore.remove("currentUser");
    localStore.remove("currentUser");
    console.log("✅ Logged out");
}

/* ===========function to validate email======= */
export function validateEmail(_email) {
    // Regular expression for email validation
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Return true if email matches regex, false otherwise
    return regex.test(_email);
}


/* ===========function to validate password======= */
export function validatePassword(_password) { 
    // Regular expression for password validation
    // Must be atleast 8 digits
    // Must have atleast 1 Capital letter
    // Must have atleast 1 small letter
    // Must have a special character
    
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Return true if password matches regex, false otherwise
    return regex.test(_password);
}
/* ==================RE PASSWORD=================== */
