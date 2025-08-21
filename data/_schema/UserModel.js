

// User Class
export default class User {
    #id;
    #name;
    #email;
    #password;
    #phone;
    #role;

    constructor(_id,_name, _email, _password, _phone = '01000000000', _role = 'user') {
        this.Id = _id;
        this.Name = _name;
        this.Email = _email;
        this.Password = _password;
        this.Phone = _phone;
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
    set Phone(_phone) {
        this.#phone = _phone;
    }

    get Phone() {
        return this.#phone;
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
        phoneNumer: this.#phone,
        role: this.#role
    };
}
}



