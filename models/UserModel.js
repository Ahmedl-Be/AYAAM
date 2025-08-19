import { generateID } from "../scripts/utils.js";

// User Class
export default class User {
    #id;
    #name;
    #email;
    #password;
    #phoneNumber;
    #role;

    constructor(_id,_name, _email, _password, _phoneNumber = '01000000000', _role = 'user') {
        this.Id = _id;
        this.Name = _name;
        this.Email = _email;
        this.Password = _password;
        this.PhoneNumber = _phoneNumber;
        this.Role = _role; // Admin, Seller, User
    }

    /* ID SETTER & GETTER */
    set Id(_id) { this.#id = _id; }
    get Id() { return this.#id}

    /* NAME SETTER & GETTER */

    set Name(_name) {
        this.#name = _name;
    }

    get Name() {
        return this.#name
    }

    /* EMAIL SETTER AND GETTER */
    set Email(_email) {
        this.#email = _email;
    }

    get Email() {
        return this.#email;
    }

    /* PASSWORD SETTER AND GETTER */
    set Password(_password) {
        this.#password = _password;
    }

    get Password() {
        return this.#password;
    }

    /* PHONENUMER SETTER AND GETTER */
    set PhoneNumer(_phoneNumer) {
        this.#phoneNumber = _phoneNumer;
    }

    get PhoneNumer() {
        return this.#phoneNumber;
    }

    /* ROLE SETTER AND GETTER */
    set Role(_role) {
        this.#role = _role;
    }

    get Role() {
        return this.#role
    }

/* ---toJSON--- */
    toJSON() {
    return {
        id: this.#id,
        name: this.#name,
        email: this.#email,
        password: this.#password,
        phoneNumer: this.#phoneNumber,
        role: this.#role
    };
}
}



