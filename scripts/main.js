/*WebStorage is an abstract class
for extending our local and session
storage services*/

class WebStorage {
    constructor() {
        if (this.constructor === WebStorage) {
            throw new TypeError("Can not construct abstract class.");
        }
    }

    /*
    *Adds a key-value pair to our webStorage, returns nothing
    * key - its a string value which would sets as key for having access to relevant value.
    * value - its a primitive data type(string, number, boolean, undefined, null) or array which will be available
    * by the relevant key.
    */
    write(key, value) {
        throw new TypeError("Do not call abstract method write from child.");
    }

    /*
    * Takes a key and returns value that relevant to this key in our storage
    * key - its a string value which would sets as key for having access to relevant value.
    * returns primitive data type(string, number, boolean, undefined, null) or array which is relevant to
    *  the key.
    */
    read(key) {
        throw new TypeError("Do not call abstract method read from child.");
    }

    /*
    * Adds a key-value pair to our webStorage, returns nothing
    * key - its a string value which would sets as key for having access to relevant value.
    * value - its an Object which will be turns into string by JSON.stringify, and added to our storage.
    */
    writeObject(key, value) {
        throw new TypeError("Do not call abstract method writeObject from child.");
    }

    /*
    * Takes a key and returns Object that relevant to this key in our storage
    * key - its a string value which would sets as key for having access to relevant value.
    * returns Object which will be parsed from string by JSON.parse.
    */
    readObject(key) {
        throw new TypeError("Do not call abstract method readObject from child.");
    }

    /*
    * Takes a key, and removes relevant value from our storage, returns nothing
    * key - its a string value which would sets as key for having access to relevant value.
    */
    removeObject(key) {
        throw new TypeError("Do not call abstract method removeObject from child.");
    }

    /*
    * Removes all values from our storage and lets it empty, returns nothing
    */
    clear() {
        throw new TypeError("Do not call abstract method clear from child.");
    }
}

/*LocalStorageService is a child class,
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

/*SessionStorageService is a child class,
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

/*Network is a service for sending
requests and engage with APIs,*/

class Network {
    constructor() {
        this.request = new XMLHttpRequest();
    }

    /*
    * Takes  html method, url, data for body(if you send PUT or POST methods) and boolean argument async for
    * sending synchrone or asynchrone request.
    * method - its a string value which would sets as a GET/POST/PUT/DELETE/PATCH/HEAD method in your request.
    * url - its a string value which would sets as url address link in your request.
    * data - its an Object which will be turns in string by JSON.stringify and used as body of your request.
    * async - its Boolean which is true by default, if yo set anything but not false in async value, it will sets on true.
    * returns Promise which will resolve your response or reject your error.
    */
    send(method, url, data, async = true) {
        const request = this.request;

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