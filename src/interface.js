let pairs = [];

const pairsList = document.getElementById('pairs-list');
const pairInput = document.getElementById('pair-input');
const modal = document.getElementById("myModal");

document.getElementById("close").addEventListener("click", () => {
    modal.style.display = "none";
});


//рендер масиву пар
function renderPairsList() {
    pairsList.innerHTML = "";
    for (let i = 0; i < pairs.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" class="checkbox" onclick="selectOne()" 
            value="${i}"> ${pairs[i].name} = ${pairs[i].value}`;
        pairsList.appendChild(li);
    }
}

//метод для додавання нової пари
function addPair() {
    let input = pairInput.value.trim();
    let pairRegex = /^\w+\s*=\s*\w+$/; //перевірка синтаксісу пари ім'я-значення //^[\p{L}\d]+$
    if (pairRegex.test(input)) {
        let pair = input.split('=');
        pairs.push({name: pair[0].trim(), value: pair[1].trim()});
        renderPairsList();
        pairInput.value = "";
    } else {
        alert("Невірний формат пари iм'я-значення");
    }
}


//сортування списку за значенням
function sortByValue() {
    pairs.sort(function(a, b) {
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
    renderPairsList();
}

//сортування списку по імені
function sortByName() {
    pairs.sort(function(a, b) {
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
    renderPairsList();
}

//видалення вибраних елементів зі списку
function deletePairs() {
    let checkboxes = pairsList.getElementsByTagName("input");
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            pairs.splice(i, 1);
            pairsList.removeChild(checkboxes[i].parentNode);
        }
    }
}

//вибір лише одного елемента списку
function selectOne() {
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

function convertToXml() {
    let xml = '<root>' + '\n';
    for (let pair of pairs) {
        xml += `<${pair.name}>${pair.value}</${pair.name}>` + '\n';
    }
    xml += '</root>';
    document.getElementById("resultText").innerText = xml;
    modal.style.display = "block";
}