module.exports = async function ({ ethers }) {
  const AccessControl = await ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy();
  await accessControl.deployed();
  console.log("AccessControl deployed to:", accessControl.address);
};
