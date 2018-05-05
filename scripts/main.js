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

/*SessionStorageService is a child class,
* that extends and overwrites methods from
* our abstract class - WebStorage. This class
* clones our LocalStorageService and overrides its
* methods for engaging sessionStorage.*/

class SessionStorageService extends WebStorage {
    constructor() {
        super();
    }

    write(key, value) {
        sessionStorage.setItem(key, value)
    }

    read(key) {
        return sessionStorage.getItem(key)
    }

    writeObj(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    readObj(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    removeObj(key) {
        if (!sessionStorage.getItem(key)) {
            throw new TypeError("There is no item with such key in localStorage");
        }
        sessionStorage.removeItem(key);
    }

    clear() {
        sessionStorage.clear();
    }
}