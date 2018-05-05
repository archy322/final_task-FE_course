/*WebStorage is an abstract class
for extending our local and session
storage services*/

class WebStorage {
    constructor() {
        if (this.constructor === WebStorage) {
            throw new TypeError("Can not construct abstract class.");
        }
    }

    write() {
        throw new TypeError("Do not call abstract method getProduct from child.");
    }

    read() {
        throw new TypeError("Do not call abstract method getProduct from child.");
    }

    writeObj() {
        throw new TypeError("Do not call abstract method getProduct from child.");
    }

    readObj() {
        throw new TypeError("Do not call abstract method getProduct from child.");
    }

    removeObj() {
        throw new TypeError("Do not call abstract method getProduct from child.");
    }

    clear() {
        throw new TypeError("Do not call abstract method getProduct from child.");
    }
}

/*LocalStorageService is a child class,
* that extends and overwrites methods from
* our abstract class - WebStorage. This class
* is actually just a wrapper for native
* localStorage methods*/

class LocalStorageService extends WebStorage {
    constructor() {
        super();
    }

    write(key, value) {
        localStorage.setItem(key, value)
    }

    read(key) {
     return localStorage.getItem(key)
    }

    writeObj(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    readObj(key) {
        if (!localStorage.getItem(key)) {
            throw new TypeError("There is no item with such key in localStorage");
        }
        return JSON.parse(localStorage.getItem(key));
    }

    removeObj(key) {
        if (!localStorage.getItem(key)) {
            throw new TypeError("There is no item with such key in localStorage");
        }
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}
