const hre = require("hardhat");

async function main() {
  const GameLogic = await hre.ethers.getContractFactory("PrisonersDilemma");
  const game = await GameLogic.deploy();
  await game.deployed();
  console.log("GameLogic deployed to:", game.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
