const Web3 = require('web3');

const TruffleConfig = require('../truffle');

var Migrations = artifacts.require("./Migrations.sol");

module.exports = async function(deployer, network) {
  const config = TruffleConfig.networks[network];
  console.log(config);

  if (process.env.ACCOUNT_PASSWORD) {
    console.log('>> Connecting in http://'+ config.host + ':' + config.port);
    const web3 = new Web3('http://'+ config.host + ':' + config.port);
    console.log('>> Unlocking account ' + config.from);
    await web3.eth.personal.unlockAccount(config.from, process.env.ACCOUNT_PASSWORD, 36000).
      then((response) => { 
        console.log(">>Unlock = " + response);
        console.log('>> Deploying migration');
        deployer.deploy(Migrations); }).
      catch((error) => { 
        console.log(error); 
      });
  };
  
};