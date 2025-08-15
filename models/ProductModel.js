// Product Class
export class Product {
    #id;
    #name;
    #description;
    #category;
    #subcategory;
    #price;
    #stock;
    #images;
    #brand;
    #material;
    #sellerId;
    #status;

    

    constructor(
        _id,
        _name,
        _description,
        _category,
        _subcategory,
        _price,
        _stock = [],
        _images = [],
        _brand,
        _material = "",
        _sellerId,
        _status = "pending"
    ) {
        this.Id = _id;
        this.Name = _name;
        this.Description = _description;
        this.Category = _category;
        this.Subcategory = _subcategory;
        this.Price = _price;
        this.Stock = _stock;
        this.Images = _images;
        this.Brand = _brand;
        this.Material = _material;
        this.SellerId = _sellerId;
        this.Status = _status;
    }

/* ---ID */
    set Id(_id) { this.#id = _id; }
    get Id() { return this.#id; }

/* ---NAME */
    set Name(_name) {
        if (_name.constructor.name !== "String") {
                throw new Error("Name Must be a String");
            }

            this.#name = _name.trim().split(" ") 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        }
    get Name() { return this.#name; }
        
/* ---DESCRIPTION */
    set Description(_description) {
        if (_description.constructor.name !== "String") {
            throw new Error("Description Must be a String");
        }
        this.#description = _description;
    }
    get Description() { return this.#description; }
    
/* ---CATEGORY--- */
    set Category(_category) {
            if (_category.constructor.name !== "String") throw new Error("Category must be a string");
            this.#category = _category.trim().split(" ") .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
    }
    get Category() { return this.#category; }

/* ---SUBCATEGORY--- */
    set Subcategory(_subcategory) {
            if (_subcategory.constructor.name !== "String") throw new Error("Subcategory must be a string");
            this.#subcategory = _subcategory.trim().split(" ") .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
    }
    get Subcategory() { return this.#subcategory; }

/* ---PRICE--- */
    set Price(_price) {
        if (_price.constructor.name !== "Number") {
                throw new Error("Price Must be a Number");
            }
        this.#price = _price;
    }
    get Price() { return this.#price; }

/* ---STOCK--- */
    set Stock(_stock) { 
        if (!Array.isArray(_stock)) throw new Error("Stock must be an array of {color, size, quantity}");
         _stock.forEach(item => {
            if (typeof item.color !== "string" || typeof item.size !== "string" || typeof item.quantity !== "number") {
                throw new Error("Each stock item must have {color: string, size: string, quantity: number}");
            }
        });
        this.#stock = _stock;
     }
    get Stock() { return this.#stock; }

/* ---COLOR IMAGES--- */
    set Images(_images) { this.#images = _images; }
    get Images() { return this.#images; }


/* ---BRAND--- */
    set Brand(_brand) {
        if (_brand.constructor.name !== "String") throw new Error("Brand must be a string");
        this.#brand = _brand;
    }
    get Brand() { return this.#brand; }

/* ---MATERIAL--- */
    set Material(_material) {
        if (_material.constructor.name !== "String") throw new Error("Material must be a string");
        this.#material = _material.toLowerCase();
    }
    get Material() { return this.#material; }


/* ---SELLER ID--- */
    set SellerId(_sellerId) { this.#sellerId = _sellerId; }
    get SellerId() { return this.#sellerId; }

/* ---STATUS--- */
    set Status(_status) { this.#status = _status; }
    get Status() { return this.#status; }

    isApproved() {
        return this.#status === 'approved'
    }
/* ---toJSON--- */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            category: this.#category,
            subcategory: this.#subcategory,
            price: this.#price,
            stock: this.#stock,
            images: this.#images,
            brand: this.#brand,
            material: this.#material,
            sellerId: this.#sellerId,
            status: this.#status
        };
    }
}