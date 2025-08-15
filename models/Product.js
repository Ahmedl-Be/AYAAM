// Product Class
export class Product {
    #id;
    #name;
    #description;
    #price;
    #colors;
    #images;
    #subcategory;
    #brand;
    #material;
    #sellerId;
    #status;

    

    constructor(
        _id,
        _name,
        _description,
        _price,
        _colors = [],
        _images = [],
        _subcategory,
        _brand,
        _material = "",
        _sellerId,
        _status = "pending"
    ) {
        this.Id = _id;
        this.Name = _name;
        this.Description = _description;
        this.Price = _price;
        this.Colors = _colors;
        this.Images = _images;
        this.Subcategory = _subcategory;
        this.Brand = _brand;
        this.Material = _material;
        this.SellerId = _sellerId;
        this.Status = _status;
    }

    /* ID */
    set Id(_id) { this.#id = _id; }
    get Id() { return this.#id; }

    /* NAME */
    set Name(_name) { this.#name = _name; }
    get Name() { return this.#name; }

    /* DESCRIPTION */
    set Description(_description) { this.#description = _description; }
    get Description() { return this.#description; }

    /* PRICE */
    set Price(_price) { this.#price = _price; }
    get Price() { return this.#price; }

    /* COLORS */
    set Colors(_colors) { this.#colors = _colors; }
    get Colors() { return this.#colors; }

    /* COLOR IMAGES */
    set Images(_images) { this.#images = _images; }
    get Images() { return this.#images; }

    /* SUBCATEGORY */
    set Subcategory(_subcategory) { this.#subcategory = _subcategory; }
    get Subcategory() { return this.#subcategory; }

    /* BRAND */
    set Brand(_brand) { this.#brand = _brand; }
    get Brand() { return this.#brand; }

    /* MATERIAL */
    set Material(_material) { this.#material = _material; }
    get Material() { return this.#material; }


    /* SELLER ID */
    set SellerId(_sellerId) { this.#sellerId = _sellerId; }
    get SellerId() { return this.#sellerId; }

    /* STATUS */
    set Status(_status) { this.#status = _status; }
    get Status() { return this.#status; }

/* ---toJSON--- */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            price: this.#price,
            colors: this.#colors,
            images: this.#images,
            subcategory: this.#subcategory,
            brand: this.#brand,
            material: this.#material,
            sellerId: this.#sellerId,
            status: this.#status
        };
    }
}