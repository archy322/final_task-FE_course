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

    writeItem() {
        throw new TypeError("Do not call abstract method getProduct from child.");
    }

    readItem() {
        throw new TypeError("Do not call abstract method getProduct from child.");
    }

    removeItem() {
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

    write(keys, items) {
        if (keys.length !== items.length) {
            throw new TypeError("Amount of keys and items must be equal");
        }
        for (let i = 0; i < keys.length; i++) {
            localStorage.setItem(keys[i], JSON.stringify(items[i]));
        }
    }

    read() {
        const currentStorageState = [];
        for (let key in localStorage) {
            currentStorageState.push(JSON.parse(localStorage.getItem(key)))
        }
        return currentStorageState;
    }

    writeItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    readItem(key) {
        if (!localStorage.getItem(key)) {
            throw new TypeError("There is no item with such key in localStorage");
        }
        return JSON.parse(localStorage.getItem(key));
    }

    removeItem(key) {
        if (!localStorage.getItem(key)) {
            throw new TypeError("There is no item with such key in localStorage");
        }
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

/*SessionStorageService is a child class,
* that extends and overwrites methods from
* our abstract class - WebStorage. This class is
* LocalStorageService's clone, created for working
* with sessionStorage*/

class SessionStorageService extends WebStorage {
    constructor() {
        super();
    }

    write(keys, items) {
        if (keys.length !== items.length) {
            throw new TypeError("Amount of keys and items must be equal");
        }
        for (let i = 0; i < keys.length; i++) {
            sessionStorage.setItem(keys[i], JSON.stringify(items[i]));
        }
    }

    read() {
        const currentStorageState = [];
        for (let key in sessionStorage) {
            currentStorageState.push(JSON.parse(sessionStorage.getItem(key)))
        }
        return currentStorageState;
    }

    writeItem(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    readItem(key) {
        if (!sessionStorage.getItem(key)) {
            throw new TypeError("There is no item with such key in sessionStorage");
        }
        return JSON.parse(sessionStorage.getItem(key));
    }

    removeItem(key) {
        if (!sessionStorage.getItem(key)) {
            throw new TypeError("There is no item with such key in sessionStorage");
        }
        sessionStorage.removeItem(key);
    }

    clear() {
        sessionStorage.clear();
    }
}