module.exports.Broadcaster = Broadcaster;
module.exports.BroadcastListener = BroadcastListener;

var dgram = require('dgram');
var constants = require('./constants');




//-------------------
//*************Broadcaster
//---------------

function Broadcaster(){
  
  //Initiate Broadcast
  this.initiateBroadcast = function (thisIP, broadcastMessage, callback){
    var broadcaster = dgram.createSocket('udp4');
    var destinationIP;

    broadcaster.bind(constants.PORT, function initiateBroadcast(){

      //configure broadcast
      console.log('Initiating broadcast');
      broadcaster.setTTL(constants.BROADCAST_TTL);
      broadcaster.setBroadcast(1);
      
      //Begin broadcasting interval
      var broadcastingInterval = setInterval ( sendBroadcast, constants.BROADCAST_INTERVAL );
      
      
      //Listen for Response and kill broadcast if heard, begin file transfer
      broadcaster.on('message', function (msg, envelope){
        if (msg.toString() === 'Client Receiving'){
          console.log('Broadcast answered by: '+ envelope.address);
          destinationIP = envelope.address;
          killBroadcast(0);
        }
      });

      //Set timeout to stop listening after var broadcastLife
      var timeout = setTimeout(function(){
        console.log('Broadcast Unanswered' );
        killBroadcast(1);
      }, constants.BROADCAST_LIFE);
      
      function sendBroadcast(){
        broadcaster.send( broadcastMessage, 0, broadcastMessage.length, constants.PORT, '255.255.255.255', function(err, bytes){
          if (err) {
            console.log('Error broadcasting: ', err);
            callback(1);
          };
        } );
      };

      //kill broadcast
      function killBroadcast (exitStatus){
        clearInterval(broadcastingInterval);
        clearTimeout(timeout);
        broadcaster.close();
        callback(exitStatus, destinationIP);
      };
    });
  }
}


//----------------
//*************Broadcast Listener
//----------------

function BroadcastListener(){

  this.listenForBroadcast = function(thisIP, callback){
    //begin listening
    var antennaSocket = dgram.createSocket('udp4');
    antennaSocket.bind(constants.PORT, function listening (){

      console.log('Listening for host Broadcast...');

      //Configure antenna
      antennaSocket.on('error', function (err){
        console.log('Failed to bind to broadcast socket');
        antennaSocket.close();
        throw err;
      });

      antennaSocket.on('message', function (msg, envelope){
        var hostIP = envelope.address;
        var fileName = msg.toString();
        var response = new Buffer('Client Receiving');

        console.log('Receiving Broadcast from: ', hostIP);

        //send Response
        antennaSocket.send(response, 0, response.length, constants.PORT, hostIP, function (err, bytes){
          if (err){console.log(err);}
          killAntenna();

          console.log('Connecting to ' + hostIP + ' to get file:', fileName);

          callback(hostIP, fileName);
        });

      });

      //stop listening after 10 seconds 
      var timeout = setTimeout(function(){
        console.log( 'No Broadcast detected.' );
        killAntenna();
        process.exit(1);
      }, constants.BROADCAST_LISTENER_ANTENNA_LIFE);

      killAntenna = function (){
        clearTimeout(timeout);
        antennaSocket.close();
      };
    });
  };
}
