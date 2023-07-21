const Migrations = artifacts.require("./auth_symbol.sol");

module.exports = function (deployer) {
    deployer.deploy(Migrations);
};
