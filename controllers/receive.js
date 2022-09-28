const ethereumConn = require('../utils/ethereumConn.js');

const deviceConfig = require('../config/' + global.gConfig.deviceFile); 

console.log(deviceConfig);

// Receive payload validate on blockchain and send to Endpoint
exports.postReceive = (req, res, next) => {
    console.log('received message: ' + JSON.stringify(req.body));
    let message = JSON.stringify(req.body);
    ethereumConn.setState(parseInt(req.body["value"]));
};

