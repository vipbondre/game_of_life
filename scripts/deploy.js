async function main() {
  const Game = await ethers.getContractFactory("PrisonersDilemma");
  const game = await Game.deploy();
  await game.waitForDeployment();
  console.log("Contract deployed at:", await game.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});