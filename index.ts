// async function bankServices(bank: Bank) {
//     console.log("Welcome to NodeJS Bank");

//     let accountConfirmation = await inquirer.prompt({
//         type: "number",
//         message: "Enter Account Number: ",
//         name: "enteredAccountNum",
//     });

//     const enteredAccountNum = accountConfirmation.enteredAccountNum;
//     const status = bank.viewStatus(enteredAccountNum);
//     if (status) {
//         console.log("Valid Account:");
//         console.log("First Name:", status.firstName);
//         console.log("Last Name:", status.lastName);
//         console.log("Account Number:", status.accountNumber);
//     } else {
//         console.log("Error: Customer not found.");
//     }

//     while (true) {
//         let service = await inquirer.prompt({
//             type: "list",
//             message: "Please select the Service",
//             name: "serviceName",
//             choices: [
//                 "View Balance",
//                 "Cash Withdrawal",
//                 "Cash Deposit",
//                 "Transfer Funds",
//                 "Exit"
//             ]
//         });

//         const selectedService = service.serviceName;
//         console.log(selectedService);

//         switch (selectedService) {
//             case "View Balance":
//                 if (status) {
//                     console.log(`Your current Balance: ${status.balance}`);
//                 }
//                 break;
//             case "Cash Withdrawal":
//                 if (status) {
//                     let enteredAmount = await inquirer.prompt([
//                         {
//                             type: "number",
//                             message: "Enter the withdrawal Amount: ",
//                             name: "withdrawalAmount",
//                         }
//                     ]);
//                     let withdrawalAmount = enteredAmount.withdrawalAmount;
//                     if (withdrawalAmount > status.balance) {
//                         console.log("Entered amount exceeds your current balance");
//                     } else {
//                         let newBalance = status.balance - withdrawalAmount;
//                         status.balance = newBalance;
//                         console.log(`Rs ${withdrawalAmount} has been detected from your Account.`);
//                     }
//                 }
//                 break;
//             case "Cash Deposit":
//                 if (status) {
//                     let enteredAmount = await inquirer.prompt([
//                         {
//                             type: "number",
//                             message: "Enter the Deposit Amount: ",
//                             name: "depositAmount",
//                         }
//                     ]);
//                     let depositAmount = enteredAmount.depositAmount;
//                     let newBalance = status.balance + depositAmount;
//                     status.balance = newBalance;
//                     console.log(`Rs ${depositAmount} has been added successfully to your Account.`);
//                     console.log(`Your current balance is: Rs${status.balance}`);
//                 }
//                 break;
//             case "Transfer Funds":
//                 if (status) {
//                     let transfer = await inquirer.prompt([
//                         {
//                             type: "input",
//                             message: "Enter the Bank name for Transfer: ",
//                             name: "transferBankName",
//                         },
//                         {
//                             type: "number",
//                             message: "Enter the Bank Account for Transfer: ",
//                             name: "transferBankAccount",
//                         },
//                         {
//                             type: "number",
//                             message: "Enter the Transfer Amount: ",
//                             name: "transferAmount",
//                         }
//                     ]);

//                     let transferBankName = transfer.transferBankName;
//                     let transferBankAccount = transfer.transferBankAccount;
//                     let transferAmount = transfer.transferAmount;
//                     console.log("Validating Account number and Customer")
//                     console.log("Account number Verified.")
//                     if (transferAmount > status.balance) {
//                         console.log("Entered amount exceeds your current balance");
//                     } else {
//                         let newBalance = status.balance - transferAmount;
//                         status.balance = newBalance;
//                         console.log(`Rs ${transferAmount} has been detected from your Account.`);
//                         console.log(`Rs ${transferAmount} has been transferred to ${transferBankAccount} ${transferBankName} successfully`);
//                         console.log(`Your current balance is: Rs${status.balance}`);
//                     }
//                 }
//                 break;
//             case "Exit":
//                 process.exit();
//                 break;
//             default:
//                 console.log("Enter Valid Service");
//                 break;
//         }
//     }
// }

// bankServices(myBank);
