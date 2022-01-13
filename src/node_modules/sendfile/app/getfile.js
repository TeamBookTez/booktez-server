#!/usr/bin/env node
'use strict';
var netModule = require('net');  //for streaming socket
var ip = require('ip');  //ip utility
var fs = require('fs');

var constants = require('./constants');
var pairingService = require('./pairingService');
var fileTransferService = require('./fileTransferService');

var broadcastListener = new pairingService.BroadcastListener();
var fileReceiverClient = new fileTransferService.FileReceiver();
var thisIP = ip.address();
var hostIP;
var fileName;

//-----------
//*************Listen for broadcast  (udp datagram )
//----------------

broadcastListener.listenForBroadcast(thisIP, handshakeMadeHandler);

function handshakeMadeHandler(receivedHostIP, receivedFileName){
  hostIP = receivedHostIP;
  fileName = receivedFileName;
  setTimeout(transferFile, 4000);
}



//-----------
//*************Connect to server, Initiate transfer  (TCP Socket)
//----------------

function transferFile(){
  fileReceiverClient.beginTransfer(hostIP, thisIP, fileName, transferFinishedHandler);
}

function transferFinishedHandler(exitStatus){
  process.exit(exitStatus);
}
