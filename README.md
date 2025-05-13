# 🕵️ Trust in the Shadow 💰

A decentralized web game built on Ethereum where players engage in a game-theory-based "Prisoner's Dilemma" with a bot. The game combines blockchain immutability, smart contract betting logic, and a sleek frontend interface.

---

## 📌 Table of Contents

1. [🎮 Play Online (Deployed Version)](#play-online-deployed-version)
2. [🛠️ Run Locally (Frontend + Deployed Smart Contract)](#run-locally-frontend--deployed-smart-contract)
3. [⚙️ Total dApp Local Setup](#total-dapp-local-setup)

---

## 🎮 Play Online (Deployed Version)

> 🔗 **Frontend (Vercel):** [https://your-vercel-url.vercel.app](https://shareorsteal.vercel.app/)  
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

   First, make sure you have the required dependencies installed for Hardhat and related tools.

   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox ethers
