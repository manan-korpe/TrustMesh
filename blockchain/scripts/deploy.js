const hre = require("hardhat");
async function main() {
  const c = await hre.ethers.deployContract("IdentityRegistry");
  await c.waitForDeployment();
  console.log("IdentityRegistry:", await c.getAddress());
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
