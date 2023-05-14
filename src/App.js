import {Pairs} from "./Pairs.js";

class App {
    constructor() {
        this.pairs = new Pairs([]);
        this.pairsList = document.getElementById('pairs-list');
        this.pairInput = document.getElementById('pair-input');
        this.modal = document.getElementById("myModal");
        this.sortByValue = this.sortByValue.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.addPair = this.addPair.bind(this);
        this.selectOne = this.selectOne.bind(this);
        this.renderPairsList();
    }

    sortByValue() {
        this.pairs.sortByValue();
        this.renderPairsList();
    }

    sortByName() {
        this.pairs.sortByName();
        this.renderPairsList();
    }

    renderPairsList() {
        this.pairsList.innerHTML = "";
        for (let i = 0; i < this.pairs.getPairs().length; i++) {
            let li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" class="checkbox" onclick="selectOne()" 
            value="${i}"> ${this.pairs.getById(i).name} = ${this.pairs.getById(i).value}`;
            this.pairsList.appendChild(li);
        }
    }

    addPair() {
        let input = this.pairInput.value.trim();
        if (this.pairs.isValid(input)) {
            let pair = input.split('=');
            this.pairs.addPair({name: pair[0].trim(), value: pair[1].trim()});
            this.renderPairsList();
            this.pairInput.value = "";
        } else {
            alert("Недійсний формат пари ім’я-значення");
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

document.getElementById("add").addEventListener("click", () => app.addPair())
document.getElementById("sort-by-name-button").addEventListener("click", () => app.sortByName())
document.getElementById("sort-by-value-button").addEventListener("click", () => app.sortByValue())
document.getElementById("delete-button").addEventListener("click", () => app.deletePairs())
document.getElementById("show-xml-button").addEventListener("click", () => app.convertToXml())
document.getElementById("close").addEventListener("click",
    () => document.getElementById("myModal").style.display = 'none')