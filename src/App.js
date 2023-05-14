
class App {
    constructor() {
        this.pairs = [];
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
        this.pairs.sort(function(a, b) {
            let nameA = a.value.toUpperCase();
            let nameB = b.value.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        this.renderPairsList();
    }

    sortByName() {
        this.pairs.sort(function(a, b) {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        this.renderPairsList();
    }

    renderPairsList() {
        this.pairsList.innerHTML = "";
        for (let i = 0; i < this.pairs.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" class="checkbox" onclick="selectOne()" 
            value="${i}"> ${this.pairs[i].name} = ${this.pairs[i].value}`;
            this.pairsList.appendChild(li);
        }
    }

    addPair() {
        let input = this.pairInput.value.trim();
        let pairRegex = /^\w+\s*=\s*\w+$/;
        if (pairRegex.test(input)) {
            let pair = input.split('=');
            this.pairs.push({name: pair[0].trim(), value: pair[1].trim()});
            this.renderPairsList();
            this.pairInput.value = "";
        } else {
            alert("Invalid name-value pair format");
        }
    }

    deletePairs() {
        let checkboxes = this.pairsList.getElementsByTagName("input");
        for (let i = checkboxes.length - 1; i >= 0; i--) {
            if (checkboxes[i].checked) {
                this.pairs.splice(i, 1);
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
        for (let pair of this.pairs) {
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