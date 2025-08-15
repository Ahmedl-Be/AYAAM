// Order Class
export default class Order {
    #id;
    #customerId;
    #items;
    #total;
    #address;
    #payment;
    #status;

    constructor(
        _id,
        _customerId,
        _items = [], // [{ productId, color, size, qty, price }]
        _address,
        _payment = "Cash",
        _status = "processing"
    ) {
        this.Id = _id;
        this.CustomerId = _customerId;
        this.Items = _items;
        this.Address = _address;
        this.Payment = _payment;
        this.Status = _status;

        // CALCULATE TOTAL AUTOMATIC
        this.#total = this.#calculateTotal();
    }

    /* ID */
    set Id(_id) { this.#id = _id; }
    get Id() { return this.#id; }

    /* CUSTOMER ID */
    set CustomerId(_customerId) { this.#customerId = _customerId; }
    get CustomerId() { return this.#customerId; }

    /* ITEMS */
    set Items(_items) {
        if (!Array.isArray(_items)) {
            throw new Error("Items must be an array.");
        }
        this.#items = _items;
        this.#total = this.#calculateTotal();
    }
    get Items() { return this.#items; }

    /* TOTAL (Read Only) */
    get Total() { return this.#total; }

    /* ADDRESS */
    set Address(_address) { this.#address = _address; }
    get Address() { return this.#address; }

    /* PAYMENT */
    set Payment(_payment) { this.#payment = _payment; }
    get Payment() { return this.#payment; }

    /* STATUS */
    set Status(_status) { this.#status = _status; }
    get Status() { return this.#status; }

    /* PRIVATE METHOD: CALCULATE TOTAL */
    #calculateTotal() {
        return this.#items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

/* ---toJSON--- */
    toJSON() {
        return {
            id: this.#id,
            customerId: this.#customerId,
            items: this.#items,
            total: this.#total,
            address: this.#address,
            payment: this.#payment,
            status: this.#status
        };
    }
}