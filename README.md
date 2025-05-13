# 🕵️ Trust in the Shadow 💰

A decentralized web game built on Ethereum where players engage in a game-theory-based "Prisoner's Dilemma" with a bot. The game combines blockchain immutability, smart contract betting logic, and a sleek frontend interface.

- Game link: https://shareorsteal.vercel.app/
- Demo video link: https://drive.google.com/drive/folders/1QlmMBDkgUsh9Z7oyeL4XuuofIFadXaWi?usp=sharing
---

## 📌 Table of Contents

1. [🎮 Play Online (Deployed Version)](#-play-online-deployed-version)
2. [🛠️ Run Locally (Frontend + Deployed Smart Contract)](#-run-frontend-locally--connect-to-deployed-smart-contract-sepolia)
3. [⚙️ Total dApp Local Setup](#%EF%B8%8F-total-dapp-local-setup)

---

## 🎮 Play Online (Deployed Version)

> 🔗 **Frontend (Vercel):** [https://shareorsteal.vercel.app](https://shareorsteal.vercel.app/)  
> 🔐 **Smart Contract (Sepolia Testnet):** Deployed and connected to frontend.

### How to Play:

1. 🔐 Connect your MetaMask wallet (Sepolia network).
2. 📝 Sign up with a username.
3. 💰 Place your ETH bet (or leave at 0 to play risk-free).
4. 🤖 Play a game against the bot (Steal or Share).
5. 🏆 If you win, your bet doubles!

### Rules of the Game:

- 🤝 Both Choose Share: 🤗 Fair play! You each earn 3 points.
- 💰 One Steals, One Shares: 🥷 Stealer takes 5 points, Sharer gets 0.
- ⚔️ Both Choose Steal: 😬 Mutual greed! Just 1 point each.
- 🎯 10 Rounds: 🎉 Hit the target score to double your ETH bet 💸.

### Requirements:
- MetaMask installed and set to **Sepolia Testnet**
- Some **Sepolia ETH** (Get from a [faucet](https://sepoliafaucet.com/))
- 🔐 **Note: You must be logged in with MetaMask to play the game.**

---

## 🔧 Run Frontend Locally & Connect to Deployed Smart Contract (Sepolia)

This section helps you host the frontend locally and interact with the smart contract already deployed on the **Sepolia Testnet**.

### 🚀 Prerequisites

- ✅ Node.js & npm installed
- ✅ MetaMask wallet connected to Sepolia Testnet
- ✅ ETH in your wallet from [Sepolia Faucet](https://sepoliafaucet.com)

### 🛠️ Steps to Run Locally (Frontend + Deployed Smart Contract)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/vipbondre/game_of_life.git
   cd game_of_life

2. **Install Dependencies**

   Make sure you're in the project directory:

   ```bash
   npm install

3. **Start the Frontend**

   Use any of the following methods to serve your frontend locally:

   - 🧪 **Option 1 (Recommended)**: Use VS Code Live Server  
     Right-click on `index.html` → `Open with Live Server`

   - 🧪 **Option 2**: Use live-server from terminal  
     (If not installed, first run: `npm install -g live-server`)

     ```bash
     npx live-server
     ```

5. **Interact with the DApp**

   - Connect MetaMask (ensure you're on the **Sepolia** test network).
   - Play the game: Sign up, place a bet, and start the challenge 🎯.

> ⚠️ **Note:** You must be logged in via MetaMask to play the game.

---

## ⚙️ Total dApp Local Setup

This section will guide you through setting up **Hardhat** to host the smart contract locally, compiling the contract, deploying it on a local network, and connecting it to your frontend.

### 1. **Install Hardhat and Dependencies**

   - First, make sure you have the required dependencies installed for Hardhat and related tools.

   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox ethers
   ```

### 2. Initialize Hardhat Project

- Run this command and follow the prompts:

```bash
npx hardhat
```
- Choose "Create a JavaScript project"
- Press Enter for all default options

### 3. Compile the Smart Contract

   ```bash
   cd contracts
   npx hardhat compile
   ```
### 4. Required Files
      hardhat.config.js
      scripts/deploy.js
      contracts/PrisonersDilemma.sol

### 5. Start Local Hardhat Node
   - In a new terminal, run:
   ```bash
   npx hardhat node
   ```
   - This will start a local blockchain on http://127.0.0.1:8545
   - It also provides you with 20 pre-funded accounts and their private keys.

### 6. Deploy to Localhost Network
   - In a separate terminal, deploy your contract to the local node:

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
   - You'll see the deployed contract address in the terminal.

### 7. Update Frontend to Connect with Local Contract
   - In your JavaScript frontend code:
   - Use the deployed contract address from step 6
   - Load the ABI from the generated artifacts/contracts/PrisonersDilemma.sol/PrisonersDilemma.json

### 8. Run Frontend Locally
   - Use Live Server or npx live-server to host the frontend as usual. 
   - Make sure MetaMask is set to Localhost 8545 and import one of the test accounts from the Hardhat node using its private key.

### 9. Add Local Network to MetaMask
   - Open MetaMask, Click the Network dropdown at the top and choose Add Network (or "Add Network Manually").
   - Fill in the following:

   - New RPC URL	http://127.0.0.1:8545
   - Chain ID	31337
   - Currency Symbol	ETH

   - Click Save.

### 10. Setup Complete
   - You can now run live server and setup metamask account.
   - Enjoy the game.

