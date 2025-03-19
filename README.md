# Hardhat Token DApp Tutorial

This is a **simple Hardhat tutorial app** that demonstrates how to:
- Write a **Token smart contract**
- Test the contract using **Hardhat testing**
- Debug using **console.log** in Solidity
- Deploy the contract locally using Hardhat
- Interact with the deployed contract using **React.js and ethers.js**

---

## 🚀 Why Use Hardhat?
Hardhat is a **powerful Ethereum development environment** that helps developers **compile, deploy, test, and debug** smart contracts easily.

### ✨ Features of Hardhat:
- **Local Ethereum Network:** Run a private blockchain on your machine.
- **Faster Testing:** Built-in **testing framework** for automated contract testing.
- **Console Debugging:** Use `console.log` inside Solidity.
- **Easy Scripting:** Automate deployment using scripts.

---

## 🔧 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version)
- [Git](https://git-scm.com/)
- [MetaMask](https://metamask.io/)

Then, install **Hardhat**:
```bash
npm install --save-dev hardhat
```

---

## 📌 Setting Up Hardhat Project
```bash
mkdir hardhat-token-dapp
cd hardhat-token-dapp
npx hardhat
```
Select **"Create a basic sample project"** and install dependencies:
```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox ethers
```

---

## 📜 Writing the Token Smart Contract
Create a file `contracts/Token.sol`:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "HHT";
    uint public totalSupply = 1000;

    mapping(address => uint) public balances;
    
    constructor() {
        balances[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens!");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
    
    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }
}
```

---

## 🧪 Writing Tests for the Contract
Create a test file `test/Token.js`:
```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token, token, owner, addr1, addr2;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2] = await ethers.getSigners();
        token = await Token.deploy();
    });

    it("Should assign total supply to owner", async function () {
        expect(await token.balanceOf(owner.address)).to.equal(1000);
    });

    it("Should transfer tokens", async function () {
        await token.transfer(addr1.address, 50);
        expect(await token.balanceOf(addr1.address)).to.equal(50);
    });
});
```
Run tests using:
```bash
npx hardhat test
```

---

## 🚀 Deploying the Contract
Create a deploy script `scripts/deploy.js`:
```javascript
const { ethers } = require("hardhat");

async function main() {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log("Token deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

Start Hardhat network:
```bash
npx hardhat node
```
Deploy the contract locally:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## 🌍 Deploying to a Testnet (Goerli, Sepolia, etc.)
1. Add a network configuration in `hardhat.config.js`:
```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```
2. Set up **environment variables**:
```bash
touch .env
```
Add:
```ini
ALCHEMY_GOERLI_URL="https://eth-goerli.alchemyapi.io/v2/YOUR_API_KEY"
PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
```
3. Deploy:
```bash
npx hardhat run scripts/deploy.js --network goerli
```

---

## 🔗 Integrating with React.js
Install **ethers.js**:
```bash
npm install ethers
```
Modify `App.js`:
```javascript
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "./abi/Token.json";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const App = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(0);
    const [contract, setContract] = useState(null);
    
    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);

            const tokenContract = new ethers.Contract(
                contractAddress,
                contractABI.abi,
                signer
            );
            setContract(tokenContract);
        }
    };
    
    const getBalance = async () => {
        if (contract && account) {
            const balance = await contract.balanceOf(account);
            setBalance(ethers.utils.formatUnits(balance, 0));
        }
    };
    
    useEffect(() => {
        if (contract) getBalance();
    }, [contract, account]);

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            <p>Connected Account: {account}</p>
            <p>Token Balance: {balance}</p>
        </div>
    );
};

export default App;
```
Run React:
```bash
npm start
```

---

## 📜 Summary of Hardhat Commands
```bash
npx hardhat test               # Run tests
npx hardhat node               # Start a local blockchain
npx hardhat compile            # Compile contracts
npx hardhat run scripts/deploy.js --network localhost  # Deploy locally
npx hardhat run scripts/deploy.js --network goerli     # Deploy to Goerli
```

---

🎉 **Congratulations!** You've built and deployed a token smart contract with **Hardhat & React.js**! 🚀

