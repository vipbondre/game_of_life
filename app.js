const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BetPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "choice",
        "type": "string"
      }
    ],
    "name": "BotChoice",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "won",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "diffOfPoints",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newRating",
        "type": "uint256"
      }
    ],
    "name": "GameResult",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "name": "LoggedIn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "bet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "previousChoices",
        "type": "string[]"
      }
    ],
    "name": "generateBotChoice",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getUser",
    "outputs": [
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rating",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "gamesPlayed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "gamesWon",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "totalBet",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      }
    ],
    "name": "login",
    "outputs": [
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rating",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "gamesPlayed",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "diffOfPoints",
        "type": "uint256"
      }
    ],
    "name": "payoutIfWon",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

const contractAddress = "0x9A6cb4d5e5643cc7BDFd1c62a70576B31321F494";

let provider, signer, contract;

let history = [];
let previousChoices = [];
let playerScore = 0;
let opponentScore = 0;
let targetScore = 22;
let currentRound = 1;
const maxRounds = 10;

let currentUser = {
  username: "UNKNOWN",
  rating: "N/A",
  gamesPlayed: "N/A",
  gamesWon: "N/A",
  shortAddress: "N/A",
  totalBet: "N/A"
};

function startGame() {
  // Reset state
  history = [];
  playerScore = 0;
  opponentScore = 0;
  currentRound = 1;
  targetScore = 22;

  // Show/hide UI
  document.getElementById("targetScore").innerText = targetScore;
  document.getElementById("game").style.display = "block";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("result").innerHTML = "";
  document.getElementById("historyList").innerHTML = "";
  document.getElementById("result").innerHTML = `
  <div class="result-flex">
    <div class="choice">
      🙋‍♂️ You: 0
    </div>
    <div class="choice">
      🤖 Bot: 0
    </div>
  </div>
`;

  // Reset scores and round display
  updateScores();
  updateRound();
}

async function makeChoice(playerChoice) {
  if (typeof window.ethereum !== 'undefined') {
    try {
      if (currentRound > maxRounds) return;

      //const opponentChoice = Math.random() < 0.5 ? 'share' : 'steal';
      // opponentChoice will be through smart contract..
      // Example input: array of choices
      console.log("previousChoices:", previousChoices);
      const opponentChoice = await contract.generateBotChoice(previousChoices);
      console.log("Bot Choice:", opponentChoice);

      // Scoring logic
      let roundPoints = {
        player: 0,
        opponent: 0
      };

      if (playerChoice === 'Share' && opponentChoice === 'Share') {
        roundPoints.player = 3;
        roundPoints.opponent = 3;
        previousChoices.push("Share");
      } else if (playerChoice === 'Share' && opponentChoice === 'Steal') {
        roundPoints.player = 0;
        roundPoints.opponent = 5;
        previousChoices.push("Share");
      } else if (playerChoice === 'Steal' && opponentChoice === 'Share') {
        roundPoints.player = 5;
        roundPoints.opponent = 0;
        previousChoices.push("Steal");
      } else {
        roundPoints.player = 1;
        roundPoints.opponent = 1;
        previousChoices.push("Steal");
      }

      // Update total scores
      playerScore += roundPoints.player;
      opponentScore += roundPoints.opponent;

      document.getElementById("result").innerHTML = `
      <div class="result-flex">
        <div class="choice">
          🙋‍♂️ You: <span class="${playerChoice === 'Share' ? 'green' : 'red'}">
            ${playerChoice === 'Share' ? '🤝' : '💸'} (+${roundPoints.player})
          </span>
        </div>
        <div class="choice">
          🤖 Bot: <span class="${opponentChoice === 'Share' ? 'green' : 'red'}">
            ${opponentChoice === 'Share' ? '🤝' : '💸'} (+${roundPoints.opponent})
          </span>
        </div>
      </div>`;

      const resultBox = document.getElementById("result");
      resultBox.classList.remove("pop-animate"); // Reset class in case it’s reused

      // Force reflow to restart animation
      void resultBox.offsetWidth;

      resultBox.classList.add("pop-animate");

      // Track history
      history.unshift({
        round: currentRound,
        playerChoice,
        opponentChoice,
        playerPoints: roundPoints.player,
        opponentPoints: roundPoints.opponent
      });

      if (history.length > maxRounds) history.pop();

      // Render updates
      renderHistory();
      updateScores();

      // Check for end
      currentRound++;
      if (currentRound > maxRounds) {
        showFinalResult();
        previousChoices = []; // or previousChoices.length = 0;
      } else {
        updateRound();
      }
    } catch (error) {
      console.error("User rejected MetaMask connection", error);
      alert("Connection to MetaMask failed.");
    }
  } else {
    alert("MetaMask not detected. Please install MetaMask.");
  }
}

function renderHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
  
    history.forEach((round) => {
      const entry = document.createElement("div");
      entry.className = "history-entry";
  
      const playerIcon = round.playerChoice === "Share" ? "🟢" : "🔴";
      const opponentIcon = round.opponentChoice === "Share" ? "🟢" : "🔴";
      const playerPoints = round.playerPoints > 0 ? `+${round.playerPoints}` : `0`;
      const opponentPoints = round.opponentPoints > 0 ? `+${round.opponentPoints}` : `0`;
  
      entry.innerHTML = `
        <div class="round-number">Round ${round.round}</div>
        <div class="move">
          ${playerIcon} | ${opponentIcon}
        </div>
        <div class="points">
          <span class="points ${round.playerChoice === "Share" ? "green" : "red"}">${playerPoints}</span> |
          <span class="points ${round.opponentChoice === "Share" ? "green" : "red"}">${opponentPoints}</span>
        </div>
      `;
      historyList.appendChild(entry);
    });
  }  
  
  

function updateScores() {
  document.getElementById("playerScore").innerText = playerScore;
  document.getElementById("opponentScore").innerText = opponentScore;
}

function updateRound() {
  document.getElementById("roundNumber").innerText = currentRound;
}

async function showFinalResult() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      if (playerScore >= targetScore) {
        message = `🎯<strong> Target Achieved !!! You win !!!</strong> 🎉`;
      } else if (playerScore < targetScore) {
        message = `🚫<strong> Target Missed !!! Tou Loose !!!</strong> 🤖`;
        if (playerScore > opponentScore) {
          message = `🚫<strong> Target Missed, but you beat the bot !!!</strong> 🎉`;
        }
      }

      document.getElementById("result").innerHTML += `<br><br><hr><br>${message}`;
      document.getElementById("restartBtn").style.display = "block";

      // call smart contract if bet > 0 and user won the game!!!
      // Now read user info from the contract
      const userAddress = await signer.getAddress();
      const user = await contract.getUser(userAddress);
      console.log("called getUser for betAmount...");

      const betWeiValue = user[5];
      const betEthValue = ethers.formatEther(betWeiValue);
      currentUser.totalBet = betEthValue;

      document.getElementById("betPlaced").textContent = `${betEthValue} ETH`;

      let result = (playerScore >= targetScore) ? true : false;
      let diffOfPoints = (playerScore > opponentScore) ? (playerScore - opponentScore) : 0;

      if(result === true) {
        message = `🤑<strong> Your Bet amount is precessing...!</strong> 🎉`;
        document.getElementById("result").innerHTML += `<br><br><hr><br>${message}`;
        document.getElementById("restartBtn").style.display = "block";
      }

      const tx = await contract.payoutIfWon(result, diffOfPoints);
      console.log("Transaction submitted:", tx.hash);

      const receipt = await tx.wait(); // Wait for confirmation
      console.log("Transaction confirmed:", receipt.transactionHash);

      // Now read user info from the contract
      const user1 = await contract.getUser(userAddress);
      console.log("called getUder for betAmount...");

      const betWeiValue1 = user1[5];
      const betEthValue1 = ethers.formatEther(betWeiValue1);
      currentUser.totalBet = betEthValue1;
      currentUser.rating = user1[1]; // rating
      currentUser.gamesPlayed = user1[2]; // gamesPlayed*/

      // Fill in the UI
      document.querySelector("#profileDetails .dashboard-item:nth-child(2) p").textContent = currentUser.rating;
      document.querySelector("#profileDetails .dashboard-item:nth-child(3) p").textContent = currentUser.gamesPlayed;

      document.getElementById("ratingSummary").textContent = "⭐" + currentUser.rating;
      document.getElementById("betPlaced").textContent = `${betEthValue1} ETH`;

      getWalletBalance().then((balance) => {
        document.getElementById("walletBalance").textContent = `${balance} ETH`;
      });

    } catch (error) {
      console.error("User rejected MetaMask connection", error);
      alert("Connection to MetaMask failed.");
    }
  } else {
    alert("MetaMask not detected. Please install MetaMask.");
  }
}

function toggleRules() {
    const rules = document.getElementById("rules-content");
    rules.style.display = rules.style.display === "none" || rules.style.display === "" ? "block" : "none";
  }

// Function to toggle profile details
function toggleProfileDetails() {
    const details = document.getElementById("profileDetails");
    details.style.display = details.style.display === "block" ? "none" : "block";
  }


async function connectWallet() {
  alert("connectWallet called!!!!!!!!!!!");
  if (!window.ethereum) return alert("MetaMask not detected");
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log("Connected to wallet:", await signer.getAddress());
}

function login() {
  const username = "Undefined";
  loginWithMetaMask(username);
}

async function loginWithMetaMask(username) {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const walletAddress = accounts[0];
      console.log("Connected Wallet:", walletAddress);

      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log("Connected to wallet:", await signer.getAddress());

      // Display the user profile
      //document.getElementById("userProfile").innerHTML = `<p><strong>Status:</strong> Logged in</p>
      //<p><strong>Wallet:</strong> ${walletAddress}</p> `;

      // Shortened display version
      const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

      if (username === "") username = "Undefined";

      // Lookup local profile or create a new one
      /*
      if (username) {
        currentUser = userProfiles[walletAddress];
      }
        */

      // Send transaction to call login
      const tx = await contract.login(username);
      await tx.wait(); // Wait for transaction to be mined

      // Now read user info from the contract
      const userAddress = await signer.getAddress();
      const user = await contract.getUser(userAddress);
      console.log("provider: ", provider);
      console.log("signer: ", signer);
      console.log("contract: ", contract);

      currentUser.username = user[0];
      currentUser.rating = user[1]; // rating
      currentUser.gamesPlayed = user[2]; // gamesPlayed*/
      currentUser.shortAddress = shortAddress;
      currentUser.gamesWon = user[3];
      currentUser.totalBet = user[5];

      // Fill in the UI
      document.querySelector("#profileDetails .dashboard-item:nth-child(1) p").textContent = currentUser.username;
      document.querySelector("#profileDetails .dashboard-item:nth-child(2) p").textContent = currentUser.rating;
      document.querySelector("#profileDetails .dashboard-item:nth-child(3) p").textContent = currentUser.gamesPlayed;
      document.querySelector("#profileDetails .dashboard-item:nth-child(4) p").textContent = shortAddress;

      document.getElementById("unameSummary").textContent = currentUser.username;
      document.getElementById("ratingSummary").textContent = "⭐" + currentUser.rating;
      document.getElementById("walletSummary").textContent = "💰" + shortAddress;

      const betEthValue = ethers.formatEther(currentUser.totalBet);
      currentUser.totalBet = betEthValue;
      document.getElementById("betPlaced").textContent = `${betEthValue} ETH`;

      // Show logout, hide login, after successful login
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("signupBtn").style.display = "none";
      document.getElementById("signupInput").style.display = "none";
      document.getElementById("betBtn").style.display = "inline-block";
      document.getElementById("logoutBtn").style.display = "inline-block";

      getWalletBalance().then((balance) => {
        document.getElementById("walletBalance").textContent = `${balance} ETH`;
      });      

      // Optionally: Send wallet address to backend to create or fetch user profile
      // await fetch('/api/users/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ wallet: walletAddress })
      // });

    } catch (error) {
      console.error("User rejected MetaMask connection", error);
      alert("Connection to MetaMask failed.");
    }
  } else {
    alert("MetaMask not detected. Please install MetaMask.");
  }
}

function showSignupField() {
  document.getElementById("signupInput").style.display = "block";
  document.getElementById("loginBtn").style.display = "none";
}

function signupWithMetaMask() {
  const username = document.getElementById("usernameInput").value;
  if (!username) {
    alert("Please enter a username");
    return;
  }

  loginWithMetaMask(username);
}

function showBetInput() {
  document.getElementById("betInput").style.display = "block";
}

async function placeBet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const amount = document.getElementById("betAmount").value;
      if (!amount || parseFloat(amount) <= 0) {
        alert("Enter a valid ETH amount");
        return;
      }

      console.log("Placing bet of:", amount, "ETH");
      // handle ETH transaction here

      console.log(ethers); // Should have .utils.parseEther
      const value = ethers.parseEther(amount.toString());
      // Send transaction to call login
      const tx = await contract.bet({value});
      await tx.wait(); // Wait for transaction to be mined
      console.log("Transaction is mined... of bet ", amount, "ETH");
      // Now read user info from the contract
      const userAddress = await signer.getAddress();
      const user = await contract.getUser(userAddress);
      console.log("called getUder for betAmount...", amount, "ETH");

      const betWeiValue = user[5];
      const betEthValue = ethers.formatEther(betWeiValue);
      currentUser.totalBet = betEthValue;

      document.getElementById("betPlaced").textContent = `${betEthValue} ETH`;
      getWalletBalance().then((balance) => {
        document.getElementById("walletBalance").textContent = `${balance} ETH`;
      });  
    } catch (error) {
      console.error("User rejected MetaMask connection", error);
      alert("Connection to MetaMask failed.");
    }
  } else {
    alert("MetaMask not detected. Please install MetaMask.");
  }
}


function logoutWallet() {
  // Reset user state
  currentUser = null;

  // Clear UI values
  const dashboardItems = document.querySelectorAll("#profileDetails .dashboard-item p");
  dashboardItems.forEach((p) => (p.textContent = "---"));
  document.getElementById("unameSummary").textContent = "UNKNOWN";
  document.getElementById("ratingSummary").textContent = "⭐";
  document.getElementById("walletSummary").textContent = "💰";

  // reset UI
  document.getElementById("loginBtn").style.display = "inline-block";
  document.getElementById("signupBtn").style.display = "inline-block";
  document.getElementById("betBtn").style.display = "none";
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("betInput").style.display = "none";

  console.log("User logged out (frontend only).");

  // Optional: Clear session in your backend
  // await fetch('/api/logout', { method: 'POST' });
}

async function getWalletBalance() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0xaa36a7') { // Sepolia chain ID
        alert('Please switch to the Sepolia Test Network in MetaMask.');
        //return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];

      const balanceInWei = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [walletAddress, 'latest']
      });

      // Convert balance from Wei to Ether
      const balanceInEth = parseFloat(parseInt(balanceInWei, 16) / 1e18).toFixed(4);

      console.log(`Balance: ${balanceInEth} ETH`);
      return balanceInEth;
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  } else {
    alert("MetaMask not detected");
  }
}


if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
      logoutWallet(); // treat as logout
    }
  });
}