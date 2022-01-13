module.exports.FileSender = FileSender;
module.exports.FileReceiver = FileReceiver;

var netModule = require('net');
var fs = require('fs');

var constants = require('./constants');


//----------
//************File Sender**********************  (TCP Socket)
//-----------------------
function FileSender(){

  this.transferFile = function(fileToSend, thisIP, destinationIP, callback){    
    
    var server = netModule.createServer();
    var socket;

    //-------------Configure Socket Server
    server.on('connection', function(socketConnection){
      socket = socketConnection;
      //check client ip against expected destinationIP
      //vetClientIP();

      //configure socket (sends file on 'data')
      configureSocket();
    });

    //----------------Start Server
    server.listen(constants.PORT, thisIP, function(){
      console.log('Initiating server. Listening on PORT: '+ constants.PORT +' at address: '+ thisIP)
    }); 
    setTimeout(function(){server.close();}, 8000);


    //-----------------Helper functions
    //--------------------------------------------
    function configureSocket(){
      //Kill Socket after 10 seconds inactivity
      socket.setTimeout(constants.SOCKET_TTL, function(){
        console.log('Socket Timeout');
        socketConnection.destroy();
        callback(1);
      });

      //Log disconnections
      socket.on('close', function() {
        console.log('Server disconnected from client.');
        callback(0);
      });

      //Receive client messages on 'data' events
      socket.on('data', function(chunk){
        console.log(chunk.toString());
      });
      //begin sending file after first data event
      socket.once('data', sendFile);    
    }

    function vetClientIP(){
      if (socket.remoteAddress !== destinationIP){
        console.log('Wrong client connected to socket.  Expected connection from: ' 
                    + destinationIP + ' but connection made by: ' 
                    + socket.remoteAddress);
        process.exit(2);
      }else{
        console.log('You have connected to client at: ' + socket.remoteAddress);
      //socket.write('You have connected to '+thisIP);
      }
    }

    function sendFile(){  
      var readFile = fs.createReadStream(fileToSend);
      
      readFile.on('data', function(chunk){
        socket.write(chunk);
      });
      
      readFile.on('end', function(){
        console.log('File Sent');
        socket.end();
        socket.destroy();
        callback(0);
      });
    }
  }
}


//----------
//************File Receiver**********************  (TCP Socket)
//-----------------------
function FileReceiver(){
  this.beginTransfer = function(hostIP, thisIP, fileName, callback) {

    var socketConnection = new netModule.Socket();
    socketConnection.on('error', function(err){console.log('Error in file transfer socket on receiving end: ', err);});

    socketConnection.connect(constants.PORT, hostIP, function connected(){
      //----------Config and handshake-------------------------------
      //Kill Socket after 5 seconds inactivity
      socketConnection.setTimeout(10000, function(){
        console.log('Socket Timeout');
        socketConnection.destroy();
        callback(1);
      });

      socketConnection.write('Client at: '+ thisIP + ' confirms connection.');
      

      //-----------Receive data and write to file in current directory-------------
      var writeStream = fs.createWriteStream(process.cwd() + '/' + fileName);
      socketConnection.on('data', function(chunk){
        writeStream.write(chunk);
      });

      socketConnection.on('end', function(){
        console.log('File Received');
        console.log('Closing Connection');
        writeStream.end();
        socketConnection.destroy();
        callback(0);
      });

    });
  };
}
