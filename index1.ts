import { faker } from "@faker-js/faker";
import inquirer from "inquirer";

class Customer {
    firstName: string;// customer properties
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    accountNumber: number;
    balance: number;

    constructor(
        firstName: string,
        lastName: string,
        gender: string,
        age: number,
        mobileNumber: number,
        accountNumber: number,
        balance: number,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
}

interface IBankAccount {
    accountNumber: number;
    balance: number;
}

class Bank { //Class Bank 
    name: string;
    customer: Customer[] = [];
    account: IBankAccount[] = [];
    constructor(name: string) {
        this.name = name;
    }
    addCustomer(obj: Customer) {// bank Functionalities
        this.customer.push(obj);
    }
    addAccountNumber(obj: IBankAccount) {
        this.account.push(obj);
    }
    viewStatus(accountNumberToFind: number): Customer | undefined {
        return this.customer.find((customer) => customer.accountNumber === accountNumberToFind);
    }
}

let myBank: Bank = new Bank("NodeJS Bank");//bank instance

for (let customerNumber = 1; customerNumber <= 3; customerNumber++) {//Generating 3 fake customers
    let firstName = faker.person.firstName("male");
    let lastName = faker.person.lastName("male");
    let gender = "male";
    let age = customerNumber + 25;
    let mobileNumber = parseInt(faker.phone.number("300########"));
    let accountNumber = customerNumber + 52400000;
    let balance = customerNumber * 1000;
    const cus = new Customer(firstName, lastName, gender, age, mobileNumber, accountNumber, balance);
    myBank.addCustomer(cus);
    myBank.addAccountNumber({ accountNumber: cus.accountNumber, balance: cus.balance });
}

async function bankServices(bank: Bank) {// bank services
    console.log("Welcome to NodeJS Bank");


    let accountConfirmation = await inquirer.prompt({//account confirmation
        type: "number",
        message: "Enter Account Number: ",
        name: "enteredAccountNum",
    });

    const enteredAccountNum = accountConfirmation.enteredAccountNum;// showing account details
    const status = bank.viewStatus(enteredAccountNum);
    if (status) {
        console.log("Valid Account:");
        console.log("First Name:", status.firstName);
        console.log("Last Name:", status.lastName);
        console.log("Account Number:", status.accountNumber);
    } else {
        console.log("Error: Customer not found.");
    }
    while (true) {
        let service = await inquirer.prompt(
            {
                type: "list",
                message: "Please select the Service", // message from bank system
                name: "serviceName",
                choices: [
                    "View Balance",
                    "Cash Withdrawal",
                    "Cash Deposit",
                    "Transfer Funds",
                    "Exit"
                ]
            },
        );
        const selectedService = service.serviceName
        console.log(selectedService)
        switch (selectedService) {
            case "View Balance":
                if (status) {
                    console.log(`Your current Balance: ${status.balance}`)
                };
                break;
            case "Cash Withdrawal":
                if (status) {
                    let enteredAmount = await inquirer.prompt(
                        [
                            {
                                type: "number",
                                message: "Enter the withdrawal Amount: ", //amount to be withdraw
                                name: "withdrawalAmount",
                            }
                        ]
                    );
                    let withdrawalAmount = enteredAmount.withdrawalAmount;
                    if (withdrawalAmount > status.balance) { // checking the customer balance
                        console.log("Entered amount exceeds your current balance");
                    } else {
                        let newBalance = status.balance - withdrawalAmount;
                        status.balance = newBalance; //updating balance
                        console.log(`Rs ${withdrawalAmount} has been detected from your Account.`); //
                    };
                };
                break;
            case "Cash Deposit":
                if (status) {
                    let enteredAmount = await inquirer.prompt(
                        [
                            {
                                type: "number",
                                message: "Enter the Deposit Amount: ", //amount to be deposit
                                name: "depositAmount",
                            }
                        ]
                    );
                    let depositAmount = enteredAmount.depositAmount;
                    let newBalance = status.balance + depositAmount;
                    status.balance = newBalance; //updating balance
                    console.log(`Rs ${depositAmount} has been added successfully to your Account.`);
                    console.log(`Your current balance is: Rs${status.balance}`);
                };
                break;
            case "Transfer Funds":
                if (status) {
                    let transfer = await inquirer.prompt(
                        [
                            {
                                type: "input",
                                message: "Enter the Bank name for Transfer: ", //Bank name for Transfer
                                name: "transferBankName",
                            },
                            {
                                type: "number",
                                message: "Enter the Bank Account for Transfer: ", //Bank Account for Transfer
                                name: "transferBankAccount",
                            },
                            {
                                type: "number",
                                message: "Enter the Transfer Amount: ", //amount to be withdraw
                                name: "transferAmount",
                            }
                        ]
                    );
                    let transferBankName = transfer.transferBankName;
                    let transferBankAccount = transfer.transferBankAccount;
                    let transferAmount = transfer.transferAmount;
                    console.log("Validating Account number and Customer")
                    console.log("Account number Verified.")
                    if (transferAmount > status.balance) { // checking the customer balance
                        console.log("Entered amount exceeds your current balance");
                    } else {
                        let newBalance = status.balance - transferAmount;
                        status.balance = newBalance; //updating balance
                        console.log(`Rs ${transferAmount} has been detected from your Account.`); //
                        console.log(`Rs ${transferAmount} has been transferred to ${transferBankAccount} ${transferBankName} successfully`)
                        console.log(`Your current balance is: Rs${status.balance}`);
                    };
                };
                break;
            case "Exit":
                process.exit();
            default:
                "Enter Valid Service"
                break;
        }
    };

}


bankServices(myBank);
