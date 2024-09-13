async function main() {
    // Get the contract to deploy
    const AccessControl = await ethers.getContractFactory("AccessControl");
    console.log("Deploying AccessControl...");
  
    // Deploy the contract
    const accessControl = await AccessControl.deploy();
    await accessControl.deployed();
  
    console.log("AccessControl deployed to:", accessControl.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  