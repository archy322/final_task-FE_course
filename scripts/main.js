/**WebStorage is an abstract class
 for extending our local and session
 storage services*/

class WebStorage {
    constructor() {
        if (this.constructor === WebStorage) {
            throw new TypeError("Can not construct abstract class.");
        }
    }

    /**
     *Adds a key-value pair to our webStorage, returns nothing
     * key - its a string value which would sets as key for having access to relevant value.
     * value - its a primitive data type(string, number, boolean, undefined, null) or array which will be available
     * by the relevant key.
     */
    write(key, value) {
        throw new TypeError("Do not call abstract method write from child.");
    }

    /**
     * Takes a key and returns value that relevant to this key in our storage
     * key - its a string value which would sets as key for having access to relevant value.
     * returns primitive data type(string, number, boolean, undefined, null) or array which is relevant to
     *  the key.
     */
    read(key) {
        throw new TypeError("Do not call abstract method read from child.");
    }

    /**
     * Adds a key-value pair to our webStorage, returns nothing
     * key - its a string value which would sets as key for having access to relevant value.
     * value - its an Object which will be turns into string by JSON.stringify, and added to our storage.
     */
    writeObject(key, value) {
        throw new TypeError("Do not call abstract method writeObject from child.");
    }

    /**
     * Takes a key and returns Object that relevant to this key in our storage
     * key - its a string value which would sets as key for having access to relevant value.
     * returns Object which will be parsed from string by JSON.parse.
     */
    readObject(key) {
        throw new TypeError("Do not call abstract method readObject from child.");
    }

    /**
     * Takes a key, and removes relevant value from our storage, returns nothing
     * key - its a string value which would sets as key for having access to relevant value.
     */
    removeObject(key) {
        throw new TypeError("Do not call abstract method removeObject from child.");
    }

    /**
     * Removes all values from our storage and lets it empty, returns nothing
     */
    clear() {
        throw new TypeError("Do not call abstract method clear from child.");
    }
}

/**LocalStorageService is a child class,
 * that extends and overwrites methods from
 * our abstract class - WebStorage. This class
 * is actually just a wrapper for native
 * localStorage methods*/

class LocalStorageService extends WebStorage {
    write(key, value) {
        localStorage.setItem(key, value)
    }

    read(key) {
        return localStorage.getItem(key)
    }

    writeObject(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    readObject(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    removeObject(key) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

/**SessionStorageService is a child class,
 * that extends and overwrites methods from
 * our abstract class - WebStorage. This class
 * clones our LocalStorageService and overrides its
 * methods for engaging sessionStorage.*/

class SessionStorageService extends WebStorage {
    write(key, value) {
        sessionStorage.setItem(key, value)
    }

    read(key) {
        return sessionStorage.getItem(key)
    }

    writeObject(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    readObject(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    removeObject(key) {
        sessionStorage.removeItem(key);
    }

    clear() {
        sessionStorage.clear();
    }
}


/**Network is a service for sending
 requests and engage with APIs,*/

class Network {
    /**
     * Takes  html method, url, data for body(if you send PUT or POST methods) and boolean argument async for
     * sending synchrone or asynchrone request.
     * method - its a string value which would sets as a GET/POST/PUT/DELETE/PATCH/HEAD method in your request.
     * url - its a string value which would sets as url address link in your request.
     * data - its an Object which will be turns in string by JSON.stringify and used as body of your request.
     * async - its Boolean which is true by default, if yo set anything but not false in async value, it will sets on true.
     * returns Promise which will resolve your response or reject your error.
     */
    send(method, url, data, async) {
        const request = new XMLHttpRequest();

        if (typeof async !== "boolean") {
            async = true;
        }

        return new Promise((resolve, reject) => {
            request.open(method, url, async);
            if (method === "POST" || method === "PUT") {
                request.send(JSON.stringify(data))
            } else {
                request.send();
            }
            if (request.status !== 200) {
                reject(request.status + ': ' + request.statusText);
            } else {
                resolve(request.responseText);
            }
        });

    }
}

/**ProductModel is a model that stores
 Products data.
 * id - unique number for identification.
 * name - string with product's name.
 * price - number, stores product's cost.
 * desc - string, stores product's description.
 * desc - string, stores product's image's source path.
 * all properties have getters and setters
 * */
class ProductModel {
    constructor() {
        this._id = null;
        this._name = null;
        this._price = null;
        this._desc = null;
        this._img = null;
        this._amount = 1;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    static createFromObject(object) {
        let product = new ProductModel();
        for (let property in product) {
            try {
                product[property] = object[property];
            } catch (e) {
                console.log(`${property} doesn't exist`)
            }
        }
        return product;
    }
}

/**Cart works with localStorage throw LocalStorageService,
 * and writes array of ProductModel's instances into it*/
class Cart {
    constructor() {
        this.storage = new LocalStorageService();
        this.cartKey = 'CART';
    }

    /**Takes an object, checks if it instance of ProductModel,
     * and adds it to array of our products
     * product - is an object, that must be instance of ProductModel*/
    addProduct(product) {
        let products = this.read();
        let cartProduct = products.find(item => item._name === product._name);

        if (cartProduct !== undefined) {
            cartProduct._amount++;
        } else {
            products.push(product);
        }

        this.storage.writeObject(this.cartKey, products);
    }

    /**Takes an object, remove from array of products all suggestions of it.
     * product - is an object, that must be instance of ProductModel*/
    removeProduct(product, allAmount) {
        let products = this.read();

        if (allAmount) {
            products = products.filter(item => item._name !== product._name);
        } else {
            let cartProduct = products.find(item => item._name === product._name);
            if (cartProduct._amount > 1) {
                cartProduct._amount--;
            } else {
                products = products.filter(item => item._name !== product._name);
            }

        }
        this.storage.writeObject(this.cartKey, products);

    }

    /**Returns our array of objects in localStorage*/
    read() {
        let products = this.storage.readObject(this.cartKey);
        if (!products) {
            return [];
        } else {
            return products.map(object => ProductModel.createFromObject(object));
        }
    }

    clear() {
        this.storage.clear();
    }
}

const cart = new Cart();
let prod = new ProductModel();

prod.name = "Alex";
console.log(prod !== null)
cart.addProduct(prod);

console.log(cart.read());
cart.removeProduct(prod, false);
// console.log(cart.read());
// cart.removeProduct(prod, true);
console.log(cart.read());
