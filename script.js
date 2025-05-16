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
const subscriptionText = document.querySelector(".subscriptions_present");
const shoppingText = document.querySelector(".shopping_present");
const gymText = document.querySelector(".gym_present");
const celebrationsText = document.querySelector(".celebrations_present");
const fuelText = document.querySelector(".fuel_present");
const depositSubmitButton = document.getElementById("deposit_submit");
const recordTransactionAmountError = document.getElementById("amountError");
const recordTransactionSelectionError = document.getElementById("selectionError");
const recordTransactionDateError = document.getElementById("dateError");
const recordTransactionMerchantError = document.getElementById("merchantNameError");




//Event Listener Section
wallet.addEventListener('click', (e) => {
    e.preventDefault();
    depositMoney("1000");}
, true);

deposit.addEventListener('click', (e) => {
    openDepositModal();
});
shopping.addEventListener('click', (e)=> {
    retrieveUserTransactions("shopping");
});
subscriptions.addEventListener('click', (e)=> {
    retrieveUserTransactions("subscriptions");
});
gym.addEventListener('click', (e)=> {
    retrieveUserTransactions("gym");
});
celebrations.addEventListener('click', (e)=> {
    retrieveUserTransactions("celebrations");
});
fuel.addEventListener('click', (e)=> {
    retrieveUserTransactions("fuel");
});
recordTransactionButton.addEventListener('click', (e) => {
    e.preventDefault();
    validateForm();
});
depositSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const depositAmount = document.getElementById("deposit_amount").value;
    if (depositAmount) {
        depositMoney(depositAmount);
        closeDepositModal();
    } else {
        alert("Please enter a valid deposit amount.");
    }
});



let moneyInAccount = 0;

// This section handles the logic of our project
function getFirstDeposit() {
    
    setUserAccountBalance(moneyInAccount);
    updateTransactionText();
}

// This section handles the logic of our project














//Functions Section

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
    console.log("Money in account" + moneyInAccount);
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
            changeSelectionType(TransactionSelection);
            closeModal();
            // Reset the form fields
            resetForm();
            // Call the function to display the transactions
            retrieveUserTransactions(TransactionSelection);
}
function changeSelectionType(selection) {
    switch (selection) {
        case "shopping":
            shoppingText.textContent = `Shopping recorded`;
            break;
        case "subscriptions":
            subscriptionText.textContent = `Subscriptions recorded`;
            break;
        case "gym":
            gymText.textContent = `Gym recorded`;
            break;
        case "celebrations":
            celebrationsText.textContent = `Celebrations recorded`;
            break;
        case "fuel":
            fuelText.textContent = `Fuel recorded`;
            break;
        default:
            console.log("Invalid selection");
    }
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

function removeChildContainer() {
    // Remove all child elements from the transactionsContainer
    while (transactionsContainer.firstChild) {
        transactionsContainer.removeChild(transactionsContainer.firstChild);
    }
}

function retrieveUserTransactions(type) {
    const retrievedTransaction = JSON.parse(localStorage.getItem(type));
    removeChildContainer();
    if (!retrievedTransaction) {
        console.log("No transactions found for this type.");
        displayNoTransactionRecorded()
        return;
    }
    generateEachUserTransaction(retrievedTransaction);
}

function displayUserTransactions(htmlElem) {
    // Append the main div to the transactions section
    transactionsContainer.appendChild(htmlElem);
}

function displayNoTransactionRecorded() {
    const mainDiv = document.createElement("div");
    mainDiv.style.border = "2px solid black";
    mainDiv.style.padding = "10px";
    mainDiv.style.display = "flex";
    mainDiv.style.marginTop = "1.2rem";
    mainDiv.style.gap = "10px";
    mainDiv.textContent = "No transactions recorded yet";
    transactionsContainer.appendChild(mainDiv);
}

function generateEachUserTransaction(arr) {
    arr.forEach(division => {
        // Create the main div
        const mainDiv = document.createElement("div");
        mainDiv.style.border = "2px solid black";
        mainDiv.style.padding = "10px";
        mainDiv.style.display = "flex";
        mainDiv.style.marginTop = "1.2rem";
        mainDiv.style.gap = "10px";

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
        resetErrorMessages();
        document.getElementById("modal").style.display = "none";
        document.getElementById("modalOverlay").style.display = "none";
    }

    function resetErrorMessages() {

        recordTransactionAmountError.style.display = "none";
        recordTransactionSelectionError.style.display = "none";
        recordTransactionDateError.style.display = "none";
        recordTransactionMerchantError.style.display = "none";
    }

    // Function to validate the form inputs
    function validateForm() {
        const recordTransactionAmount = document.getElementById("amount").value;
        const recordTransactionSelection = document.getElementById("transactionType").value;
        const recordTransactionDate = document.getElementById("date").value;
        const recordTransactionMerchant = document.getElementById("merchantName").value;
        
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


        if (isValid) {
            getUserTransaction(recordTransactionMerchant, recordTransactionAmount, recordTransactionDate, recordTransactionSelection);
            setUserMoney("sub", recordTransactionAmount);
            setUserAccountBalance(getUserMoney());
            return;
        }        
        
    }
    

function searchTransactions() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const allTransactions = getAllLocalStorage();
    const result = filterByDate(allTransactions, searchInput);
    function evaluateSearchResult(result) {
        console.log(result);
        for (let value in result) {
            if (result[value].length === 0) {
                removeChildContainer();
                displayNoTransactionRecorded();
            } else {
                removeChildContainer();
                const allInnerObjects = getAllFilteredInnerObjects(result);
                generateEachUserTransaction(allInnerObjects);
                break;
            }
        }
    }
    evaluateSearchResult(result);
}

function getAllFilteredInnerObjects(obj) {
    //Check if some of the objects are empty
    const firstArray = obj.shopping || [];
    const secondArray = obj.subscriptions || [];
    const thirdArray = obj.gym || [];
    const fourthArray = obj.celebrations || [];
    const fifthArray = obj.fuel || [];
    const allArrays = [firstArray, secondArray, thirdArray, fourthArray, fifthArray];
    const allInnerObjects = allArrays.filter(array => array.length > 0);
    // loop through each array and get the inner objects
    const mergedArray = allInnerObjects.reduce((acc, array) => {
        return acc.concat(array);
    }, []);
    console.log(mergedArray);
    return mergedArray;
}



function filterByDate(transactions, targetDate) {
    let filteredResults = {};

    Object.keys(transactions).forEach(category => {
        filteredResults[category] = transactions[category].filter(item => item.date === targetDate);
    });

    return filteredResults;
}


function getAllLocalStorage() {
  const allItems = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      allItems[key] = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      allItems[key] = localStorage.getItem(key); // Fallback for non-JSON values
    }
  }
  return allItems;
}


// onload check which elements have been placed in the local storage
function updateTransactionText() {
    const transactionTypes = ["shopping", "subscriptions", "gym", "celebrations", "fuel"];
    transactionTypes.forEach(type => {
        const storedData = localStorage.getItem(type);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.length > 0) {
                document.querySelector(`.${type}_present`).textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} recorded`;
            }
        }
    });
}


function openDepositModal() {
    document.getElementById("modal2").style.display = "block";
    document.getElementById("modalOverlay2").style.display = "block";
    
}

function closeDepositModal() {
    document.getElementById("modal2").style.display = "none";
    document.getElementById("modalOverlay2").style.display = "none";
}