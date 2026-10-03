import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy platform token first (used for arbitration stakes)
  const MockTokenFactory = await ethers.getContractFactory("MockToken");
  const daxToken = await MockTokenFactory.deploy("DAX Platform Token", "DAX", ethers.parseEther("10000000"));
  await daxToken.waitForDeployment();
  const daxTokenAddr = await daxToken.getAddress();
  console.log("DAX Platform Token deployed to:", daxTokenAddr);

  const usdtToken = await MockTokenFactory.deploy("Tether USD", "USDT", ethers.parseEther("10000000"));
  await usdtToken.waitForDeployment();
  const usdtTokenAddr = await usdtToken.getAddress();
  console.log("Mock USDT deployed to:", usdtTokenAddr);

  const usdcToken = await MockTokenFactory.deploy("USD Coin", "USDC", ethers.parseEther("10000000"));
  await usdcToken.waitForDeployment();
  const usdcTokenAddr = await usdcToken.getAddress();
  console.log("Mock USDC deployed to:", usdcTokenAddr);

  const wethToken = await MockTokenFactory.deploy("Wrapped Ether", "WETH", ethers.parseEther("10000000"));
  await wethToken.waitForDeployment();
  const wethTokenAddr = await wethToken.getAddress();
  console.log("Mock WETH deployed to:", wethTokenAddr);

  // Deploy AMM Swap router
  const AMMFactory = await ethers.getContractFactory("DAX_AMM");
  // Deployer acts as the temporary treasury, can be updated later
  const amm = await AMMFactory.deploy(deployer.address);
  await amm.waitForDeployment();
  console.log("DAX AMM deployed to:", await amm.getAddress());

  // Deploy DAX Court Arbitration contract
  const CourtFactory = await ethers.getContractFactory("DAX_Court");
  const court = await CourtFactory.deploy(
    daxTokenAddr,     // Staking token
    deployer.address  // Treasury
  );
  await court.waitForDeployment();
  const courtAddr = await court.getAddress();
  console.log("DAX Court deployed to:", courtAddr);

  // Deploy DAX_Agreement Protocol contract (Universal Trusted Layer for Agreements)
  const AgreementFactory = await ethers.getContractFactory("DAX_Agreement");
  const agreement = await AgreementFactory.deploy(
    deployer.address, // Treasury
    25,               // 0.25% protocol fee
    courtAddr,        // Dispute Court
    deployer.address  // Initial Trusted Forwarder
  );
  await agreement.waitForDeployment();
  const agreementAddr = await agreement.getAddress();
  console.log("DAX_Agreement Protocol deployed to:", agreementAddr);

  // Deploy DAX_OfferPool contract
  const OfferPoolFactory = await ethers.getContractFactory("DAX_OfferPool");
  const offerPool = await OfferPoolFactory.deploy(
    agreementAddr,
    deployer.address // Treasury
  );
  await offerPool.waitForDeployment();
  console.log("DAX OfferPool deployed to:", await offerPool.getAddress());

  console.log("Deployment finished successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
