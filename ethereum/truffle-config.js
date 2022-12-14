const mnemonic = process.env.MNEMONIC;

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    gethdev: {
      host: "192.168.0.19",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      gasPrice: 10000000000,
      skipDryRun: true,
      networkCheckTimeout: "100000000",
      websockets: false,
      provider: function() {
        return new HDWalletProvider(mnemonic, "")
      },
      network_id: 3
    },
    mocha: {
      enableTimeouts: false
    }
  },
  compilers: {
    solc: {
      version: "0.5.1" 
    }
  }

  
};

