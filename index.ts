#! /usr/bin/env node

import inquirer from "inquirer";

let myBalance = 10000; // Dollar
let myPin = 1234;

inquirer
  .prompt([
    {
      name: "pin",
      message: "Enter your pin",
      type: "number",
    },
  ])
  .then(function (myPinAnswer: { pin: number }) {
    if (myPinAnswer.pin === myPin) {
      console.log("Login Successful!!");
      atmOperations();
    } else {
      console.log("Incorrect Pin. Please try again.");
    }
  });

function atmOperations() {
  inquirer
    .prompt([
      {
        name: "operation",
        message: "Please select an option",
        type: "list",
        choices: [
          "Withdraw",
          "Balance Inquiry",
          "Fast Cash",
          "Change Pin",
          "Exit",
        ],
      },
    ])
    .then(function (myWithdrawAnswer: { operation: string }) {
      if (myWithdrawAnswer.operation === "Withdraw") {
        withdraw();
      } else if (myWithdrawAnswer.operation === "Balance Inquiry") {
        balanceInquiry();
      } else if (myWithdrawAnswer.operation === "Fast Cash") {
        fastCash();
      } else if (myWithdrawAnswer.operation === "Change Pin") {
        changePin();
      } else if (myWithdrawAnswer.operation === "Exit") {
        console.log("Thank you for using our ATM. Goodbye!");
      }
    });
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "amount",
        message: "Enter the amount to withdraw",
        type: "number",
      },
    ])
    .then(function (myWithdraw: { amount: number }) {
      if (myWithdraw.amount <= myBalance) {
        myBalance -= myWithdraw.amount;
        console.log("Withdrawal successful!");
        console.log("Your remaining balance is: " + myBalance);
      } else {
        console.log("Insufficient funds. Withdrawal not possible.");
      }
      atmOperations();
    });
}

function fastCash() {
  inquirer
    .prompt([
      {
        name: "presetAmount",
        message: "Select a pre-set amount to withdraw",
        type: "list",
        choices: [500, 1000, 5000],
      },
    ])
    .then(function (fastCashAnswer: { presetAmount: number }) {
      if (fastCashAnswer.presetAmount <= myBalance) {
        myBalance -= fastCashAnswer.presetAmount;
        console.log("Fast Cash withdrawal successful!");
        console.log("Your remaining balance is: " + myBalance);
      } else {
        console.log("Insufficient funds. Withdrawal not possible.");
      }
      atmOperations();
    });
}

function balanceInquiry() {
  console.log("Your balance is: " + myBalance);
  atmOperations();
}

function changePin() {
  inquirer
    .prompt([
      {
        name: "newPin",
        message: "Enter your new pin",
        type: "number",
      },
    ])
    .then(function (newPinAnswer: { newPin: number }) {
      myPin = newPinAnswer.newPin;
      console.log("Pin changed successfully!");
      atmOperations();
    });
}
