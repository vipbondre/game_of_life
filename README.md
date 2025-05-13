# 🕵️ Trust in the Shadow 💰

A decentralized web game built on Ethereum where players engage in a game-theory-based "Prisoner's Dilemma" with a bot. The game combines blockchain immutability, smart contract betting logic, and a sleek frontend interface.

---

## 📌 Table of Contents

1. [🎮 Play Online (Deployed Version)](#-play-online-deployed-version)
2. [🛠️ Run Locally (Frontend + Deployed Smart Contract)](#️-run-locally-frontend--deployed-smart-contract)
3. [⚙️ Advanced Dev Setup](#️-advanced-dev-setup) ← Coming soon...

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

## 🛠️ Run Locally (Frontend + Deployed Smart Contract)

### 🧾 Prerequisites

- Node.js (v16+)
- Git
- MetaMask (connected to Sepolia)
- Sepolia ETH for transactions

### 🔧 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo

# Install dependencies
npm install

# Run the frontend (using Live Server or any HTTP server)
# OR open index.html manually in browser
