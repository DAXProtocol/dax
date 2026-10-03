import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const [owner, partyA, partyB] = await ethers.getSigners();

  // Deploy Mock Token
  const MockTokenFactory = await ethers.getContractFactory("MockToken");
  const token = await MockTokenFactory.deploy("Mock USD", "USDT", ethers.parseEther("1000000"));
  await token.waitForDeployment();
  const tokenAddr = await token.getAddress();

  // Mint to partyA
  await token.transfer(partyA.address, ethers.parseEther("10000"));

  // Deploy DAX Court & Agreement
  const CourtFactory = await ethers.getContractFactory("DAX_Court");
  const court = await CourtFactory.deploy(tokenAddr, owner.address);
  await court.waitForDeployment();
  const courtAddr = await court.getAddress();

  const AgreementFactory = await ethers.getContractFactory("DAX_Agreement");
  const agreement = await AgreementFactory.deploy(owner.address, 25, courtAddr, owner.address);
  await agreement.waitForDeployment();
  const agreementAddr = await agreement.getAddress();

  console.log("\n====================================================");
  console.log("DAX Universal Agreement Protocol Gas Estimation Report");
  console.log("====================================================\n");

  // 1. Approve token
  const escrowAmt = ethers.parseEther("100");
  let tx = await token.connect(partyA).approve(agreementAddr, escrowAmt);
  let receipt = await tx.wait();
  console.log(`1. Token Approval (approve): ${receipt.gasUsed.toString()} gas`);

  // 2. Create & Fund Agreement
  const termsHash = ethers.id("Agreement Terms: Full Stack Web Development");
  const salt = ethers.hexlify(ethers.randomBytes(32));
  const deadline = Math.floor(Date.now() / 1000) + 86400 * 7;

  tx = await agreement.connect(partyA).createAndFundAgreement(
    partyB.address,
    tokenAddr,
    escrowAmt,
    termsHash,
    deadline,
    salt
  );
  receipt = await tx.wait();
  console.log(`2. Create & Fund Agreement (createAndFundAgreement): ${receipt.gasUsed.toString()} gas`);

  // Compute agreementId
  const agreementId = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      ["address", "address", "address", "uint256", "bytes32", "uint64", "bytes32"],
      [partyA.address, partyB.address, tokenAddr, escrowAmt, termsHash, deadline, salt]
    )
  );

  // 3. Attach Evidence
  const evidenceRoot = ethers.id("Commitment Evidence SHA-256");
  tx = await agreement.connect(partyB).attachEvidence(agreementId, evidenceRoot);
  receipt = await tx.wait();
  console.log(`3. Attach Evidence (attachEvidence): ${receipt.gasUsed.toString()} gas`);

  // 4. Release Escrow
  tx = await agreement.connect(partyA).releaseEscrow(agreementId);
  receipt = await tx.wait();
  console.log(`4. Settle & Release Escrow (releaseEscrow): ${receipt.gasUsed.toString()} gas`);

  console.log("\nGas estimation complete.\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
