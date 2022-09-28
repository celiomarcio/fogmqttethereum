var mqtt = require('mqtt');


var value = 0;
//Moquitto Cloud
//const client  = mqtt.connect("mqtt://91.121.93.94",{clientId:"mqttjsNodei01"});
const client  = mqtt.connect("mqtt://127.0.0.1",{clientId:"mqttjsNodei01Client"});
console.log("connected flag  " + client.connected);


var options={
retain:true,
qos:1};

//handle incoming messages
client.on('message',(topic, message, packet) => {
		console.log("message is "+ message);
		console.log("topic is "+ topic);
		setValue(message);
});

client.on("connect",() => {	
		console.log("connected  "+ client.connected);

})
//handle errors
client.on("error",(error) => {
	console.log("Can't connect" + error);
	process.exit(1)
});

//publish
publish = (topic,msg,options) => {
		console.log("publishing",msg);
		client.publish(topic,msg,options);
}

getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	rand =  Math.floor(Math.random() * (max - min + 1)) + min;
	return rand;
}

setValue = (message) => {
	value = parseInt(message);
}

publishStatus = () => {
	let rand = getRandomIntInclusive(0,2);
	if (rand != value){
		message1 = rand.toString();
		publish(topicCommand,message1,options)
	};
}

var topic_list=["topic/valor"];
client.subscribe(topic_list,{qos:1}); 

let askmessage="give me value"
let topicGiveMeValue="topic/medavalor";
publish(topicGiveMeValue,askmessage,options);

let topicCommand="topic/comando";

var timer_id=setInterval(() => {publishStatus()},25000);

