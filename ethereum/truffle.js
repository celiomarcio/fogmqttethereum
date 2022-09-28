module.exports = {
  networks: {
    development: {
      host: process.env.ETH_HOST,
      port: process.env.ETH_PORT,
      network_id: process.env.ETH_NET, 
      gas: 6721975,
      gasPrice   : 20000000000,
      from: process.env.ACCOUNT,
    }
  },
  compilers: {
    solc: {
      version: "0.4.24" // ex:  "0.4.20". (Default: Truffle's installed solc)
    }
 }
};
