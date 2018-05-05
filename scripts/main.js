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
    * Method 'write' adds a key-value pair to our webStorage, returns nothing
    * key - its a string value which would sets as key for having access to relevant value.
    * value - its a primitive data type(string, number, boolean, undefined, null) or array which will be available
    * by the relevant key.
    */
    write(key, value) {
        throw new TypeError("Do not call abstract method write from child.");
    }

    /*
    * Method 'read' takes a key and returns value that relevant to this key in our storage
    * key - its a string value which would sets as key for having access to relevant value.
    * returns - returns primitive data type(string, number, boolean, undefined, null) or array which is relevant to
    *  the key.
    */
    read(key) {
        throw new TypeError("Do not call abstract method read from child.");
    }
    /*
    * Method 'writeObject' adds a key-value pair to our webStorage, returns nothing
    * key - its a string value which would sets as key for having access to relevant value.
    * value - its an Object which will be turns into string by JSON.stringify, and added to our storage.
    */
    writeObject(key, value) {
        throw new TypeError("Do not call abstract method writeObject from child.");
    }
    /*
    * Method 'readObject' takes a key and returns Object that relevant to this key in our storage
    * key - its a string value which would sets as key for having access to relevant value.
    * returns - returns Object which will be parsed from string by JSON.parse.
    */
    readObject(key) {
        throw new TypeError("Do not call abstract method readObject from child.");
    }
    /*
    * Method 'removeObject' takes a key, and removes relevant value from our storage, returns nothing
    * key - its a string value which would sets as key for having access to relevant value.
    */
    removeObject(key) {
        throw new TypeError("Do not call abstract method removeObject from child.");
    }
    /*
    * Method 'clear' removes all values from our storage and lets it empty, returns nothing
    */
    clear() {
        throw new TypeError("Do not call abstract method clear from child.");
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