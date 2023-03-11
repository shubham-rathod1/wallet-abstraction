// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

const [owner, acc1] = await ethers.getSigners();
console.log("account 1", owner.address);
console.log("account 2", acc1.address);

const Wallet = await hre.ethers.getContractFactory("Wallet");
const wallet = await Wallet.deploy(acc1.address, "shubham");

await wallet.deployed();
console.log("wallet contract deployed to -", wallet.address);

const Counter  = await hre.ethers.getContractFactory("Counter");
const counter = await Counter.deploy();

await counter.deployed();
console.log("counter contract deployed to -", counter.address);

// read the value and update via account contract;

console.log("the counter value 1", await counter.counter());
const unsignedTxt = await counter.populateTransaction.increment();
await wallet.connect(owner).call(counter.address, unsignedTxt.data);
console.log("inceremented the counter");
console.log('log new counter value', await counter.counter());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
