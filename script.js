const balance  = document.getElementById('my_balance');
const wallet = document.querySelector(".wallet_card");
const deposit  = document.querySelector(".Deposit")
const transactionsContainer = document.querySelector(".Transactions_container")
const shopping = document.querySelector(".shopping");
const subscriptions = document.querySelector(".subscriptions");
const gym = document.querySelector(".gym");
const celebrations = document.querySelector(".Celebrations");
const fuel = document.querySelector(".Fuel");
const recordTransactionButton = document.getElementById("recordTransactionsubmitButton");



//Event Listener Section
wallet.addEventListener('click', (e) => {
    e.preventDefault();
    depositMoney("1000");}
, true);

deposit.addEventListener('click', (e) => {
    depositMoney("500");
});
shopping.addEventListener('click', (e)=> {
    alert("I have been clicked");
    retrieveUserTransactions("shopping");
});
subscriptions.addEventListener('click', (e)=> {
    alert("I have been clicked");
    retrieveUserTransactions("subscriptions");
});
gym.addEventListener('click', (e)=> {
    alert("I have been clicked");
    retrieveUserTransactions("gym");
});
celebrations.addEventListener('click', (e)=> {
    alert("I have been clicked");
    retrieveUserTransactions("celebrations");
});
fuel.addEventListener('click', (e)=> {
    alert("I have been clicked");
    retrieveUserTransactions("fuel");
});
recordTransactionButton.addEventListener('click', (e) => {
    e.preventDefault();
    validateForm();
});






//Remove this global variable
let moneyInAccount = 0;

setUserAccountBalance();

function setUserMoney(operation ,money) {
    //This handles the amount of money in an account
    if (operation === "add") {
        moneyInAccount += money;
    } else if (operation === "sub") {
        moneyInAccount -= money;
    }
    return moneyInAccount;
}

// On Coming to our site we get the user account number
function getUserMoney() {
    // input to get the users account money
    let moneyPresent = setUserMoney("get", 0);
    console.log("Mney" + moneyPresent);
    return moneyPresent;
   
}

function setUserAccountBalance(value) {
    balance.innerText=`$ ${String(value)}`; 
}

function depositMoney(money) {
    let moneyInAccount = Number(money);
    setUserMoney("add", moneyInAccount);
    setUserAccountBalance(getUserMoney());

}
// Add a user Transaction
function carryOutTransaction(amountSpent) {
    //deduct from the set user money
    setUserMoney("sub", amountSpent);
}


//Section to handle and store various transactions based on what we have done
function getUserTransaction(TransactionMerchant, TransactionAmount, TransactionDate, TransactionSelection) {
            const transactionObject = {
                merchant: TransactionMerchant,
                amount: TransactionAmount,
                date: TransactionDate
            };
            storeUserTransaction(TransactionSelection, transactionObject);
            closeModal();
            alert("Transaction has been recorded successfully");
            // Reset the form fields
            resetForm();
            // Call the function to display the transactions
            retrieveUserTransactions(TransactionSelection);
}


function resetForm() {
    document.getElementById("amount").value = "";
    document.getElementById("transactionType").value = "";
    document.getElementById("date").value = "";
    document.getElementById("merchantName").value = "";
}
    

function storeUserTransaction(type, transactionObject) {
    // Get existing data from localStorage
    let storedData = localStorage.getItem(type);
    // Parse existing data or initialize an empty array
    let objectsArray = storedData ? JSON.parse(storedData) : [];
    objectsArray.push(transactionObject);  
    localStorage.setItem(type, JSON.stringify(objectsArray));
}

function retrieveUserTransactions(type) {
    const retrievedTransaction = JSON.parse(localStorage.getItem(type));
    if (!retrievedTransaction) {
        console.log("No transactions found for this type.");
        return;
    }
    generateEachUserTransaction(retrievedTransaction);
}

function displayUserTransactions(htmlElem) {
    // Append the main div to the transactions section
    transactionsContainer.appendChild(htmlElem);
}

function generateEachUserTransaction(arr) {
    console.log(arr);
    arr.forEach(division => {
        // Create the main div
        const mainDiv = document.createElement("div");
        mainDiv.style.border = "2px solid black";
        mainDiv.style.padding = "10px";
        mainDiv.style.display = "flex";
        mainDiv.style.marginTop = "1.2rem";
        mainDiv.style.gap = "10px";
        console.log(division);

        // Create and append four inner divs
        for (let i = 0; i < 3; i++) {
            const innerDiv = document.createElement("div");
            innerDiv.style.backgroundColor = "lightblue";
            innerDiv.style.display = "flex";
            innerDiv.style.flexGrow = "1";
            innerDiv.style.justifyContent = "center";
            innerDiv.style.alignItems = "center";
            innerDiv.textContent = Object.values(division)[i];
                
            mainDiv.appendChild(innerDiv);
        }
        displayUserTransactions(mainDiv);
    });
}


//Section to handle user transactions input fields
    function openModal() {
        document.getElementById("modal").style.display = "block";
        document.getElementById("modalOverlay").style.display = "block";
    }

    function closeModal() {
        document.getElementById("modal").style.display = "none";
        document.getElementById("modalOverlay").style.display = "none";
    }

    // Function to validate the form inputs
    function validateForm() {
        const recordTransactionAmount = document.getElementById("amount").value;
        const recordTransactionSelection = document.getElementById("transactionType").value;
        const recordTransactionDate = document.getElementById("date").value;
        const recordTransactionMerchant = document.getElementById("merchantName").value;
        
        const recordTransactionAmountError = document.getElementById("amountError");
        const recordTransactionSelectionError = document.getElementById("selectionError");
        const recordTransactionDateError = document.getElementById("dateError");
        const recordTransactionMerchantError = document.getElementById("merchantNameError");

        let isValid = true;

        if (isNaN(recordTransactionAmount) || recordTransactionAmount.trim() === "") {
            recordTransactionAmountError.style.display = "inline";
            isValid = false;
        } else {
            recordTransactionAmountError.style.display = "none";
        }
        if (recordTransactionMerchant === "" || recordTransactionMerchant.length < 3) {
            recordTransactionMerchantError.style.display = "inline";
            isValid = false;
        } else {
            recordTransactionMerchantError.style.display = "none";
        }

        if (recordTransactionSelection === "") {
            recordTransactionSelectionError.style.display = "inline";
            isValid = false;
        } else {
            recordTransactionSelectionError.style.display = "none";
        }

        if (recordTransactionDate === "") {
            recordTransactionDateError.style.display = "inline";
            isValid = false;
        } else {
            recordTransactionDateError.style.display = "none";
        }
        getUserTransaction(recordTransactionMerchant, recordTransactionAmount, recordTransactionDate, recordTransactionSelection);
        return;
    }
    










// Get to save the user transactions successfully in the machine with different usernames
// Generate a deposit page for user first Logging in to have their transactions shown - get the user amount





// Generate a transaction form to enter the expenses, with amount, select of category type to determine the expense
