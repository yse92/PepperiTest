export class Pairs {
    constructor(arr) {
        this._arr = arr;
    }
    getPairs() {
        return this._arr;
    }

    setPairs(pairs) {
        this._arr = pairs;
    }

    getById(id) {
        return this._arr[id];
    }

    //додавання пари до списку
    addPair(pair) {
        this._arr.push(pair);
    }

    //функція видалення пар зі списку
    deletePair(id) {
        this._arr.splice(id, 1);
    }

    //перевірка синтаксісу пари ім'я-значення
    isValid(value) {
        let pairRegex = /^\w+\s*=\s*\w+$/; // ^[\p{L}\d]+$
        return pairRegex.test(value)
    }

    //сортування за значенням
    sortByValue() {
        this._arr.sort((a, b) => {
            const nameA = a.value.toUpperCase();
            const nameB = b.value.toUpperCase();
            return nameA.localeCompare(nameB);
        });
    }

    //сортування за ім'ям
    sortByName() {
        this._arr.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA.localeCompare(nameB);
        });
    }
}
