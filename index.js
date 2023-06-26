let mqtt;
let reconnectTimeout = 2000;
let host = 'localhost';
let port = 9001;
let topic = "Traffic Light";

let redOn = document.getElementById('lights').children[0];
let yellowOn = document.getElementById('lights').children[1];
let greenOn = document.getElementById('lights').children[2];
let command = document.getElementById('command');

function onFailure() {
    console.log("Connection Attempt to Host "+host+"Failed");
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(msg){
    out_msg="Message received "+msg.payloadString+"\n";
    out_msg=out_msg+"Topic received "+msg.destinationName;
    console.log(out_msg);

   if (msg.payloadString == "13") {
         greenOn.style.background = "green";
         yellowOn.style.background = "rgb(44, 44, 3)";
         redOn.style.background = "rgb(59, 7, 7)";
         command.innerHTML = "Move!"
    }
     else if (msg.payloadString == "12") {
         greenOn.style.background = "rgb(5, 43, 5)";
         yellowOn.style.background = "yellow";
         redOn.style.background = "rgb(59, 7, 7)";
         command.innerHTML = "Slow Down!"
    }
    else if (msg.payloadString == "11") {
        greenOn.style.background = "rgb(5, 43, 5)";
        yellowOn.style.background = "rgb(44, 44, 3)";
        redOn.style.background = "red";
        command.innerHTML = "Stop!"
    }
    
}

function onConnect() {
  
      console.log("Connected ");
      mqtt.subscribe(topic);
    }

    function MQTTconnect() {
		console.log("connecting to "+ host +" "+ port);
		let cname = "Alireza Jamali";
		mqtt = new Paho.MQTT.Client(host,port,cname);
		let options = {
			timeout: 3,
			onSuccess: onConnect,
			onFailure: onFailure,
			 };
		mqtt.onMessageArrived = onMessageArrived
		
		mqtt.connect(options);
            }