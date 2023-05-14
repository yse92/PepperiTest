function Pairs(arr) {
    let _arr = arr;

    this.getPairs = function() {
        return _arr;
    };

    this.setPairs = function (pairs) {
        _arr = pairs;
    }
    //додавання пар зі списку
    this.addPair = function(pair) {
        _arr.push(pair);
    }

    //функція видалення пар зі списку
    this.deletePair = function(id) {
        _arr.splice(id, 1);
    }

    //перевірка синтаксісу пари ім'я-значення
    this.isValid = function(value) {
        let pairRegex = /^\w+\s*=\s*\w+$/; // ^[\p{L}\d]+$
        return pairRegex.test(value)
    }

    //сортування за значенням
    this.sortByValue = function() {
        _arr.sort((a, b) => {
            const nameA = a.value.toUpperCase();
            const nameB = b.value.toUpperCase();
            return nameA.localeCompare(nameB);
        });
    }

    //сортування за ім'ям
    this.sortByName = function () {
        _arr.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA.localeCompare(nameB);
        });
    }
}

export { Pairs };