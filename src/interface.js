import {Pairs} from "./pairs";

class App {

    constructor() {
        this.pairs = new Pairs([]);
        this.pairsList = document.getElementById('pairs-list');
        this.pairInput = document.getElementById('pair-input');
        this.modal = document.getElementById("myModal");
        this.closeButton = document.getElementById("close");
        this.pairInput = document.getElementById('pair-input');
        this.closeButton = document.getElementById("close");
        this.addButton = document.getElementById("add");
        this.sortByNameButton = document.getElementById("sort-by-name-button");
        this.sortByValueButton = document.getElementById("sort-by-value-button");
        this.deleteButton = document.getElementById("delete-button");
        this.showXmlButton = document.getElementById("show-xml-button");

        this.addPairFromInput = this.addPairFromInput.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortByValue = this.sortByValue.bind(this);
        this.deletePairs = this.deletePairs.bind(this);
        this.convertToXml = this.convertToXml.bind(this);

        this.pairInput.addEventListener('change', this.addPairFromInput);
        this.addButton.addEventListener('click', this.addPairFromInput);
        this.sortByNameButton.addEventListener('click', this.sortByName);
        this.sortByValueButton.addEventListener('click', this.sortByValue);
        this.deleteButton.addEventListener('click', this.deletePairs);
        this.showXmlButton.addEventListener('click', this.convertToXml);
        this.closeButton.addEventListener("click", () => {
            this.modal.style.display = "none";
        });



        //this.renderPairsList();
    }

    renderPairsList() {
        this.pairsList.innerHTML = "";
        for (let i = 0; i < this.pairs.getPairs().length; i++) {
            let li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" class="checkbox" onclick="selectOne()" 
        value="${i}"> ${this.pairs[i].name} = ${this.pairs[i].value}`;
            this.pairsList.appendChild(li);
        }
    }

    addPairFromInput() {
        let input = this.pairInput.value.trim();
        if (this.pairs.isValid(input)) {
            let pair = input.split('=');
            this.pairs.addPair({name: pair[0].trim(), value: pair[1].trim()});
            this.renderPairsList();
            this.pairInput.value = "";
        } else {
            alert("Невірний формат пари iм'я-значення");
        }
    }

    deletePairs() {
        let checkboxes = this.pairsList.getElementsByTagName("input");
        for (let i = checkboxes.length - 1; i >= 0; i--) {
            if (checkboxes[i].checked) {
                this.pairs.deletePair(i);
                this.pairsList.removeChild(checkboxes[i].parentNode);
            }
        }
    }

    sortByValue() {
        this.pairs.sortByValue();
        this.renderPairsList();
    }

    sortByName() {
        this.pairs.sortByName();
        this.renderPairsList();
    }

    selectOne() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let selectedItems = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedItems.push(checkbox.parentElement.parentElement);
            }
        });
        if (selectedItems.length > 1) {
            selectedItems.forEach((item) => {
                item.querySelector('input[type="checkbox"]').checked = false;
            });
            selectedItems = [selectedItems[selectedItems.length - 1]];
            selectedItems[0].querySelector('input[type="checkbox"]').checked = true;
        }
    }

    convertToXml() {
        let xml = '<root>' + '\n';
        for (let pair of this.pairs.getPairs()) {
            xml += `<${pair.name}>${pair.value}</${pair.name}>` + '\n';
        }
        xml += '</root>';
        document.getElementById("resultText").innerText = xml;
        this.modal.style.display = "block";
    }
}
const app = new App();

//
//
// let pairs = new Pairs([]);
//
// let pairsList = document.getElementById('pairs-list');
// let pairInput = document.getElementById('pair-input');
// let modal = document.getElementById("myModal");
// let closeButton = document.getElementById("close");
//
// //ініціалізація
// function init() {
//     pairInput.addEventListener('change', addPairFromInput);
//     closeButton.addEventListener("click", () => {
//         modal.style.display = "none";
//     });
//     renderPairsList();
// }
//
// //рендер масиву пар
// function renderPairsList() {
//     pairsList.innerHTML = "";
//     for (let i = 0; i < pairs.getPairs().length; i++) {
//         let li = document.createElement("li");
//         li.innerHTML = `<input type="checkbox" class="checkbox" onclick="selectOne()"
//         value="${i}"> ${pairs[i].name} = ${pairs[i].value}`;
//         pairsList.appendChild(li);
//     }
// }
//
// //метод для додавання нової пари
// function addPairFromInput() {
//     let input = pairInput.value.trim();
//     if (pairs.isValid(input)) {
//         let pair = input.split('=');
//         pairs.addPair({name: pair[0].trim(), value: pair[1].trim()});
//         renderPairsList();
//         pairInput.value = "";
//     } else {
//         alert("Невірний формат пари iм'я-значення");
//     }
// }
//
// //видалення вибраних елементів зі списку
// function deletePairs() {
//     let checkboxes = pairsList.getElementsByTagName("input");
//     for (let i = checkboxes.length - 1; i >= 0; i--) {
//         if (checkboxes[i].checked) {
//             pairs.deletePair(i);
//             pairsList.removeChild(checkboxes[i].parentNode);
//         }
//     }
// }
//
// //сортування списку за значенням
// function sortByValue() {
//     pairs.setPairs(pairs.getPairs().sort((a, b) => {
//         const nameA = a.value.toUpperCase();
//         const nameB = b.value.toUpperCase();
//         return nameA.localeCompare(nameB);
//     }));
//     renderPairsList();
// }
//
// //сортування списку по імені
// function sortByName() {
//     pairs.setPairs(pairs.getPairs().sort((a, b) => {
//         const nameA = a.name.toUpperCase();
//         const nameB = b.name.toUpperCase();
//         return nameA.localeCompare(nameB);
//     }));
//     renderPairsList();
// }
//
// //вибір лише одного елемента списку
// function selectOne() {
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     let selectedItems = [];
//     checkboxes.forEach((checkbox) => {
//         if (checkbox.checked) {
//             selectedItems.push(checkbox.parentElement.parentElement);
//         }
//     });
//     if (selectedItems.length > 1) {
//         selectedItems.forEach((item) => {
//             item.querySelector('input[type="checkbox"]').checked = false;
//         });
//         selectedItems = [selectedItems[selectedItems.length - 1]];
//         selectedItems[0].querySelector('input[type="checkbox"]').checked = true;
//     }
// }
//
// function convertToXml() {
//     let xml = '<root>' + '\n';
//     for (let pair of pairs) {
//         xml += `<${pair.name}>${pair.value}</${pair.name}>` + '\n';
//     }
//     xml += '</root>';
//     document.getElementById("resultText").innerText = xml;
//     modal.style.display = "block";
// }
