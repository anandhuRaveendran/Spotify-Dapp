const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AccessControlModule", (m) => {
  const AccessC = m.contract("AccessControl");
  return { AccessC };
});
