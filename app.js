let history = [];
let playerScore = 0;
let opponentScore = 0;
let targetScore = 32;
let currentRound = 1;
const maxRounds = 10;

function startGame() {
  // Reset state
  history = [];
  playerScore = 0;
  opponentScore = 0;
  currentRound = 1;
  targetScore = 32;

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

function makeChoice(playerChoice) {
  if (currentRound > maxRounds) return;

  const opponentChoice = Math.random() < 0.5 ? 'share' : 'steal';
  // opponentChoice will be through smart contract..
  // we have to pass the array of previous choices...

  // Scoring logic
  let roundPoints = {
    player: 0,
    opponent: 0
  };

  if (playerChoice === 'share' && opponentChoice === 'share') {
    roundPoints.player = 3;
    roundPoints.opponent = 3;
  } else if (playerChoice === 'share' && opponentChoice === 'steal') {
    roundPoints.player = 0;
    roundPoints.opponent = 5;
  } else if (playerChoice === 'steal' && opponentChoice === 'share') {
    roundPoints.player = 5;
    roundPoints.opponent = 0;
  } else {
    roundPoints.player = 1;
    roundPoints.opponent = 1;
  }

  // Update total scores
  playerScore += roundPoints.player;
  opponentScore += roundPoints.opponent;

  document.getElementById("result").innerHTML = `
  <div class="result-flex">
    <div class="choice">
      🙋‍♂️ You: <span class="${playerChoice === 'share' ? 'green' : 'red'}">
        ${playerChoice === 'share' ? '🤝' : '💸'} (+${roundPoints.player})
      </span>
    </div>
    <div class="choice">
      🤖 Bot: <span class="${opponentChoice === 'share' ? 'green' : 'red'}">
        ${opponentChoice === 'share' ? '🤝' : '💸'} (+${roundPoints.opponent})
      </span>
    </div>
  </div>
`;
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
  } else {
    updateRound();
  }
}

function renderHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
  
    history.forEach((round) => {
      const entry = document.createElement("div");
      entry.className = "history-entry";
  
      const playerIcon = round.playerChoice === "share" ? "🟢" : "🔴";
      const opponentIcon = round.opponentChoice === "share" ? "🟢" : "🔴";
      const playerPoints = round.playerPoints > 0 ? `+${round.playerPoints}` : `0`;
      const opponentPoints = round.opponentPoints > 0 ? `+${round.opponentPoints}` : `0`;
  
      entry.innerHTML = `
        <div class="round-number">Round ${round.round}</div>
        <div class="move">
          ${playerIcon} | ${opponentIcon}
        </div>
        <div class="points">
          <span class="points ${round.playerChoice === "share" ? "green" : "red"}">${playerPoints}</span> |
          <span class="points ${round.opponentChoice === "share" ? "green" : "red"}">${opponentPoints}</span>
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

function showFinalResult() {
  // call smart contract if bet > 0 and user won the game!!!
  let message = "";

  if (playerScore > opponentScore) {
    message = `<strong>You win!</strong> 🎉`;
  } else if (playerScore < opponentScore) {
    message = `<strong>Bot wins!</strong> 🤖`;
  } else {
    message = `<strong>It's a tie!</strong>`;
  }

  document.getElementById("result").innerHTML += `<br><br><hr><br>${message}`;
  document.getElementById("restartBtn").style.display = "block";
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

const userProfiles = {
  "0x51bb51b4afdc0f4cc966b9d30f421c89229569af": {
    username: "vip",
    rating: 4.9,
    games: 27
  },
  // Add more mock users if needed
};

async function loginWithMetaMask(username) {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const walletAddress = accounts[0];
      console.log("Connected Wallet:", walletAddress);

      // Display the user profile
      //document.getElementById("userProfile").innerHTML = `<p><strong>Status:</strong> Logged in</p>
      //<p><strong>Wallet:</strong> ${walletAddress}</p> `;

      // Shortened display version
      const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

      // Lookup local profile or create a new one
      currentUser = {
        username: username,
        rating: "N/A",
        games: 0
      };

      if (username) {
        currentUser = userProfiles[walletAddress];
      }

      // Fill in the UI
      document.querySelector("#profileDetails .dashboard-item:nth-child(1) p").textContent = currentUser.username;
      document.querySelector("#profileDetails .dashboard-item:nth-child(2) p").textContent = currentUser.rating;
      document.querySelector("#profileDetails .dashboard-item:nth-child(3) p").textContent = currentUser.games;
      document.querySelector("#profileDetails .dashboard-item:nth-child(4) p").textContent = shortAddress;

      document.getElementById("unameSummary").textContent = currentUser.username;
      document.getElementById("ratingSummary").textContent = "⭐" + currentUser.rating;
      document.getElementById("walletSummary").textContent = "💰" + shortAddress;

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

function placeBet() {
  const amount = document.getElementById("betAmount").value;
  if (!amount || parseFloat(amount) <= 0) {
    alert("Enter a valid ETH amount");
    return;
  }

  console.log("Placing bet of:", amount, "ETH");
  // handle ETH transaction here
  document.getElementById("betPlaced").textContent = `${amount} ETH`;
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
        return;
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