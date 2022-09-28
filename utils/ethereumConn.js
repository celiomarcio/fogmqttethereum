const dateTime = require('./dateTime.js');
const web3jsraw = require('web3js-raw');
//web3jsraw = require('../libs/web3raw')
const Web3 = require('web3');
const ethereumnode= global.gConfig.node;
const deviceConfig = require('../config/' + global.gConfig.deviceFile); 
const artifact = require('./ConceptProof.json');
const latestNetwork = artifact.networks[Object.keys(artifact.networks).reduce((res, curr) => curr > res ? curr : res)];
const privKey = new Buffer.from(deviceConfig.privateKey, 'hex');

const { hashPersonalMessage, addHexPrefix, sha3 } = require('ethereumjs-util');
const hashMessageHex = message => addHexPrefix(hashPersonalMessage(Buffer.from(message)).toString('hex'));

// Connect to local node
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumnode));
//web3.eth.defaultAccount = web3.eth.accounts[0];
const nonce = web3.eth.getTransactionCount(deviceConfig.address, "latest")
//web3jsraw
var W3JSR = new web3jsraw();
W3JSR.getWeb3(artifact.abi, latestNetwork.address, ethereumnode);

//W3JSR.getDefaultTxnAttributes () ;

// Instance using ABI and contract address
const conceptProof = web3.eth.contract(artifact.abi).at(latestNetwork.address);

//Set Value using Smart Contract ABI

const setState = async (message) => {
    W3JSR.prepareSignSend(artifact.abi,latestNetwork.address,"set_mystate",deviceConfig.address,privKey,[message]).then((result,error) =>{
        console.log(result);
        console.log(dateTime.getTimeNow() + ": Tx success");
        // res.status(200).send(JSON.stringify(result));
    },(error) =>{
        console.log(error);
        console.log(dateTime.getTimeNow() + ": Tx erro");
        //retVal = {"error":error};
       // res.status(200).send(JSON.stringify(retVal));
    });
};

//Get Value using Smart Contract ABI

const getState = () => {
    let state = conceptProof.get_mystate();
    console.log('state:' + state );
    return state;
};

module.exports.getState = getState;
module.exports.setState = setState;
