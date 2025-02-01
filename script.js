const amountEarned = document.getElementById("amountearned");
const amountSpent = document.getElementById("amountspent");
const amountAvailable = document.getElementById("amountavailable");

const inputDescription = document.getElementById("description");
const inputAmount = document.getElementById("amount");

const addIncome = document.getElementById("addincome");
const addExpenses = document.getElementById("addexpenses");

const incomeList = document.querySelector(".incomecontainer");
const expensesList = document.querySelector(".expensescontainer");

let earned = 0;
let spent = 0;
let available = 0;

function updateBudget() {
    available = earned - spent;
    amountEarned.textContent = earned;
    amountSpent.textContent = spent;
    amountAvailable.textContent = available;
}


function addincome() {
    let nameli = document.createElement("li");
    nameli.classList.add("itemincome");
    nameli.innerHTML = `<h4>${inputDescription.value}</h4>
                       <span>$${inputAmount.value}</span>
                       <button class="removebtn">X</button>`;

    if (inputDescription.value !== '' && inputAmount.value > 0) {
        incomeList.appendChild(nameli);
        earned += parseFloat(inputAmount.value);
    } else {
        alert("Please input both description and amount");
    }

    updateBudget();
    saveData();

    inputDescription.value = "";
    inputAmount.value = "";
}


function addexpenses() {
    let nameli = document.createElement("li");
    nameli.classList.add("itemexpenses");
    nameli.innerHTML = `<h4>${inputDescription.value}</h4>
                       <span>$${inputAmount.value}</span>
                       <button class="removebtn">X</button>`;

    if (inputDescription.value !== '' && inputAmount.value > 0) {
        expensesList.appendChild(nameli);
        spent += parseFloat(inputAmount.value);
    } else {
        alert("Please input both description and amount");
    }

    updateBudget();
    saveData();

    inputDescription.value = "";
    inputAmount.value = "";
}


incomeList.addEventListener("click", function(e) {
    if (e.target.classList.contains("removebtn")) {
        const amount = parseFloat(e.target.parentElement.querySelector("span").textContent.replace('$', ''));
        earned -= amount;
        e.target.parentElement.remove();
    }
    updateBudget();
    saveData();
});

expensesList.addEventListener("click", function(e) {
    if (e.target.classList.contains("removebtn")) {
        const amount = parseFloat(e.target.parentElement.querySelector("span").textContent.replace('$', ''));
        spent -= amount;
        e.target.parentElement.remove();
    }
    updateBudget();
    saveData();
});


function saveData() {
    localStorage.setItem("incomeList", incomeList.innerHTML);
    localStorage.setItem("expensesList", expensesList.innerHTML);
    localStorage.setItem("amountEarned", amountEarned.textContent);
    localStorage.setItem("amountSpent", amountSpent.textContent);
    localStorage.setItem("amountAvailable", amountAvailable.textContent);
}


function loadData() {
    if (localStorage.getItem("incomeList")) {
        incomeList.innerHTML = localStorage.getItem("incomeList");
    }
    if (localStorage.getItem("expensesList")) {
        expensesList.innerHTML = localStorage.getItem("expensesList");
    }
    if (localStorage.getItem("amountEarned")) {
        amountEarned.textContent = localStorage.getItem("amountEarned");
        earned = parseFloat(amountEarned.textContent);
    }
    if (localStorage.getItem("amountSpent")) {
        amountSpent.textContent = localStorage.getItem("amountSpent");
        spent = parseFloat(amountSpent.textContent);
    }
    if (localStorage.getItem("amountAvailable")) {
        amountAvailable.textContent = localStorage.getItem("amountAvailable");
        available = parseFloat(amountAvailable.textContent);
    }
    updateBudget();
}

loadData();
