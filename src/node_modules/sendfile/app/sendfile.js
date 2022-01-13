#!/usr/bin/env node
'use strict';

var ip = require('ip');

var constants = require('./constants');
var pairingService = require('./pairingService');
var fileTransferService = require('./fileTransferService');

var broadcaster = new pairingService.Broadcaster();
var fileServer = new fileTransferService.FileSender();
var thisIP = ip.address();
var destinationIP;


//Parse arguments
var fileToSend = process.argv[2];
var fileNameRegex = /[^/]+$/;
var fileName = fileToSend.match(fileNameRegex)[0];
var authentication = process.argv[3];

var broadcastMessage = new Buffer(fileName.toString());


//-------------------
//*************Broadcast intent and location   (UDP datagram socket)
//---------------

broadcaster.initiateBroadcast(thisIP, broadcastMessage, broadcastResponseHandler);

function broadcastResponseHandler(exitStatus, passedDestinationIP){
  if (exitStatus !== 0){
    process.exit(exitStatus);
  }else{
    destinationIP = passedDestinationIP;
    transferFile();
  }
}



//----------
//************File Server**********************  (TCP Socket)
//-----------------------
function transferFile(){
  fileServer.transferFile(fileToSend, thisIP, destinationIP, transferFinishedHandler);
}

function transferFinishedHandler(exitStatus){
  process.exit(exitStatus);
}
