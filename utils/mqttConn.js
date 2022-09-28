var mqtt = require('mqtt');
const dateTime = require("../utils/dateTime")
const config = require('../config/config.json');
global.gConfig = config;
const ethereumConn = require('../utils/ethereumConn.js');

var count =0;

const mqttConnect = () => {
	var client  = mqtt.connect("mqtt://${global.gConfig.mqttHost}",{clientId: global.gConfig.mqttClientId});

	var options={
		retain:true,
		qos:1};
	
	console.log("connected flag  " + client.connected);

	//handle incoming messages
	client.on('message',function(topic, message, packet){
		console.log("message is "+ message);
		console.log("topic is "+ topic);
		if (topic == 'topic/comando')
			{
				console.log(dateTime.getTimeNow() + ": Tx init");
				ethereumConn.setState(parseInt(message))
			}
		else if (topic == 'topic/medavalor')
			{
				const state = ethereumConn.getState();
				console.log("Estado Atual" + state);
				client.publish("topic/valor",state.toString(), options)
			};
		
	});

	client.on("connect",function(){	
		console.log("connected  "+ client.connected);

	})
	//handle errors
	client.on("error",function(error){
	console.log("Can't connect" + error);
	process.exit(1)});
	//publish

	function publish(topic,msg,options){
		console.log("publishing",msg);

		if (client.connected == true){
			client.publish(topic,msg,options);
		}
		count+=1;

		if (count==2) //ens script
			clearTimeout(timer_id); //stop timer
			client.end();	
	}

	var topic_list=["topic/comando","topic/medavalor"];
	client.subscribe(topic_list,{qos:1}); //single topic
}


module.exports.mqttConnect = mqttConnect;