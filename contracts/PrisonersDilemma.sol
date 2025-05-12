// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PrisonersDilemma {
    struct User {
        string username;
        uint256 rating;
        uint256 gamesPlayed;
        uint256 gamesWon;
        bool isRegistered;
        uint256 totalBet; // total amount of ETH the user has bet
    }

    mapping(address => User) private users;

    event LoggedIn(address player, string username);
    event BotChoice(string choice);
    event BetPlaced(address indexed player, uint256 amount);
    event GameResult(address indexed player, bool won, uint256 diffOfPoints, uint256 newRating);


    // New login function: creates or retrieves a user
    function login(string memory _username) external returns (
        string memory username,
        uint256 rating,
        uint256 gamesPlayed,
        bool isRegistered
    ) {
        User storage user = users[msg.sender];

        if (!user.isRegistered) {
            user.username = _username;
            user.rating = 0;
            user.gamesPlayed = 0;
            user.gamesWon = 0;
            user.isRegistered = true;
            user.totalBet = 0;
            emit LoggedIn(msg.sender, _username);
        }

        return (user.username, user.rating, user.gamesPlayed, user.isRegistered);
    }

    // Getter for user details (optional utility)
    function getUser(address _userAddress) external view returns (
        string memory username,
        uint256 rating,
        uint256 gamesPlayed,
        bool isRegistered
    ) {
        User memory user = users[_userAddress];
        return (user.username, user.rating, user.gamesPlayed, user.isRegistered);
    }

    // New BET function
    function bet() external payable {
        require(users[msg.sender].isRegistered, "User not registered");
        require(msg.value > 0, "Bet amount must be greater than 0");

        users[msg.sender].totalBet += msg.value;
        emit BetPlaced(msg.sender, msg.value);
    }

    function payoutIfWon(bool result, uint256 diffOfPoints) external {
        User storage user = users[msg.sender];
        user.gamesPlayed++;

        if (result) {
            user.gamesWon++;
            user.rating += diffOfPoints;

            require(user.totalBet > 0, "No bet to payout");
            uint256 payoutAmount = user.totalBet * 2;
            user.totalBet = 0;

            require(address(this).balance >= payoutAmount, "Insufficient contract balance");
            payable(msg.sender).transfer(payoutAmount);
        } else {
            user.totalBet = 0; // Lost the bet, reset it
        }

        // You can use diffOfPoints for further analytics or events if needed
        emit GameResult(msg.sender, result, diffOfPoints, user.rating);
    }


    function getRandomNumber(uint256 salt) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, block.number, 
                                    msg.sender, tx.origin, gasleft(), salt)));
    }

    // Stub functions: to be implemented later
    function botChoiceFunction1(string[] memory previousChoices) internal view returns (string memory) {
        uint256 random = getRandomNumber(previousChoices.length) % 2;
        return random == 0 ? "Steal" : "Share";
    }

    function botChoiceFunction2(string[] memory previousChoices) internal pure returns (string memory) {
        uint256 size = previousChoices.length;
        if (size == 0) return "Share";
        if (keccak256(bytes(previousChoices[size - 1])) == keccak256(bytes("Share"))) {
            return "Share";
        } else {
            return "Steal";
        }
    }

    function botChoiceFunction3(string[] memory previousChoices) internal pure returns (string memory) {
        uint256 size = previousChoices.length;
        if (size == 0) return "Steal";
        if (keccak256(bytes(previousChoices[size - 1])) == keccak256(bytes("Share"))) {
            return "Steal";
        } else {
            return "Share";
        }
    }

    function botChoiceFunction4(string[] memory previousChoices) internal view returns (string memory) {
        uint256 random = getRandomNumber(previousChoices.length) % 10;
        if (random == 7 || random == 3) return "Share"; 
        return "Steal";
    }

    function botChoiceFunction5(string[] memory previousChoices) internal pure returns (string memory) {
        uint256 size = previousChoices.length;
        if (size == 0) return "Steal";
        if (keccak256(bytes(previousChoices[size - 1])) == keccak256(bytes("Share"))) {
            return "Share";
        } else {
            return "Steal";
        }
    }

    function generateBotChoice(string[] memory previousChoices) external view returns (string memory) {
        uint256 random = getRandomNumber(previousChoices.length) % 5;

        if (random == 0) return botChoiceFunction1(previousChoices);
        if (random == 1) return botChoiceFunction2(previousChoices);
        if (random == 2) return botChoiceFunction3(previousChoices);
        if (random == 3) return botChoiceFunction4(previousChoices);
        return botChoiceFunction5(previousChoices);
    }

    // Allow the contract to receive ETH
    receive() external payable {}
}