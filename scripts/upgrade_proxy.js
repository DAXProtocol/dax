import hre from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const { ethers, upgrades } = hre;
  const [signer] = await ethers.getSigners();

  const proxyAddress = process.env.PROXY_ADDRESS;
  const newContractName = process.env.NEW_CONTRACT_NAME;
  const trustedForwarder = process.env.FORWARDER_ADDRESS || ethers.ZeroAddress;

  if (!proxyAddress || !newContractName) {
    console.error("Usage: PROXY_ADDRESS=0x... NEW_CONTRACT_NAME=ContractName npx hardhat run scripts/upgrade_proxy.js --network <network>");
    process.exit(1);
  }

  console.log("=========================================================");
  console.log("DAX Protocol Zero-Downtime UUPS Proxy Upgrade");
  console.log("=========================================================");
  console.log("Caller Signer          :", signer.address);
  console.log("Target Proxy Address   :", proxyAddress);
  console.log("New Contract Name      :", newContractName);

  const preImpl = await upgrades.erc1967.getImplementationAddress(proxyAddress);
  console.log("Current Implementation :", preImpl);

  console.log("\nValidating and executing upgrade...");
  const NewContractFactory = await ethers.getContractFactory(newContractName);

  const upgradeOpts = {};
  if (newContractName.includes("Agreement")) {
    upgradeOpts.constructorArgs = [trustedForwarder];
  }

  const upgraded = await upgrades.upgradeProxy(proxyAddress, NewContractFactory, upgradeOpts);
  await upgraded.waitForDeployment();

  const postProxy = await upgraded.getAddress();
  const postImpl = await upgrades.erc1967.getImplementationAddress(postProxy);

  console.log("\n✅ Upgrade Completed Successfully!");
  console.log("   Proxy Address (Unchanged) :", postProxy);
  console.log("   Previous Implementation   :", preImpl);
  console.log("   New Implementation        :", postImpl);

  // Persist to deployments file if present
  try {
    const deploymentPath = path.join(process.cwd(), "deployments", "arbitrum_proxy_deployment.json");
    if (fs.existsSync(deploymentPath)) {
      const data = JSON.parse(fs.readFileSync(deploymentPath, "utf-8"));
      if (data.proxies && data.proxies.agreement && data.proxies.agreement.toLowerCase() === postProxy.toLowerCase()) {
        data.implementations.agreement = postImpl;
        data.timestamp = new Date().toISOString();
        fs.writeFileSync(deploymentPath, JSON.stringify(data, null, 2));
        console.log("   Updated deployments/arbitrum_proxy_deployment.json with new implementation.");
      }
    }
  } catch (err) {
    console.warn("   Notice: Could not auto-update deployment file:", err.message);
  }
  console.log("=========================================================");
}

main().catch((error) => {
  console.error("❌ Upgrade failed:", error);
  process.exit(1);
});
