/*
SimpleSerial index.js
Created 7 May 2013
Modified 9 May 2013
by Tom Igoe
*/


var app = {
  macAddress: "AC:3F:A4:84:5A:85",  // get your mac address from bluetoothSerial.list
  chars: "",

  /*
  Application constructor
  */
  initialize: function() {
    this.bindEvents();

    alert("Starting SimpleSerial app");
    
  },
  /*
  bind any events that are required on startup to listeners:
  */
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    connectButton.addEventListener('touchend', app.manageConnection, false);
    printButton.addEventListener('touchend', app.printButton, false);
  },

  /*
  this runs when the device is ready for user interaction:
  */
  onDeviceReady: function() {
    // check to see if Bluetooth is turned on.
    // this function is called only
    //if isEnabled(), below, returns success:
    var listPorts = function() {
      // list the available BT ports:
      bluetoothSerial.list(
        function(results) {
          app.display(JSON.stringify(results));
        },
        function(error) {
          app.display(JSON.stringify(error));
        }
      );
    }

    // if isEnabled returns failure, this function is called:
    var notEnabled = function() {
      $('#connectButton').css('background','#ccc');

    }

    // check if Bluetooth is on:
    bluetoothSerial.isEnabled(
      listPorts,
      notEnabled
    );
  },
  /*
  Connects if not connected, and disconnects if connected:
  */
  manageConnection: function() {

    // connect() will get called only if isConnected() (below)
    // returns failure. In other words, if not connected, then connect:
    var connect = function () {
      // if not connected, do this:
      // clear the screen and display an attempt to connect
      app.clear();
      app.display("CONECTANDO....");
      // attempt to connect:
      bluetoothSerial.connect(
        app.macAddress,  // device to connect to
        app.openPort,    // start listening if you succeed
        app.showError    // show the error if you fail
      );
    };

    // disconnect() will get called only if isConnected() (below)
    // returns success  In other words, if  connected, then disconnect:
    var disconnect = function () {
      app.display("IMPRESSORA DESCONECTADA");
      // if connected, do this:
      bluetoothSerial.disconnect(
        app.closePort,     // stop listening to the port
        app.showError      // show the error if you fail
      );
    };

    // here's the real action of the manageConnection function:
    bluetoothSerial.isConnected(disconnect, connect);
  },
  /*
  subscribes to a Bluetooth serial listener for newline
  and changes the button:
  */
  openPort: function() {
    // if you get a good Bluetooth serial connection:
    app.display("CONECTADA : " + app.macAddress);
    /*

    var test = "^XA";
    test += "^MUM,70,50";
    test += "^PW70";
    test += "^LL50";
    test += "^LH0,0";
    test += "^JMA^FS";
    test += "^CVN";
    test += "^FDtestEMBALAGENS^FS";
    test += "^FO224,12^A0N,30,24^FDLEPACK EMBALAGENS^FS";
    test += "^FO252,45^A0N,15,12^FDA.DE.AMARAL EMBALAGENS - ME^FS";
    test += "^BY1,3.0,10^FO258,87^B8N,37,N,N^FN0^FS";
    test += "^FO16,136^GD531,1,2,B,L^FS";
    test += "^FO293,68^A0N,15,12^FDLEPACK@LEPACKEMBALAGENS.COM.BR^FS";
    test += "^FO31,148^A0N,45,36^FDBOBINA PVC PLASTICA ^FS";
    test += "^FO31,206^A0N,30,24^FDCOR: AMARELO^FS";
    test += "^FO34,255^A0N,30,24^FDTIPO: PLASTICO^FS";
    test += "^FO275,242^A0N,30,24^FD400MM  X  50MM^FS";
    test += "^FO10,10^A0N,1,1^FDNF 10005^FS";
    test += "^FO31,299^A0N,30,24^FDPERFURACAO: SIM^FS";
    test += "^FO32,345^A0N,30,24^FDPESO: 115,50kg^FS";
    test += "^FO13,134^GB539,254,4,B,0^FS";
    test += "^XZ";

    var test = "^XA";
    test += "^MUD,200,200";
    test += "^PW560";
    test += "^LL400";
    test += "^LH0,0";
    test += "^JMA^FS";
    test += "^CVN";
    test += "^FO224,12^A0N,30,24^FDLEPACK EMBALAGENS^FS";
    test += "^FO252,45^A0N,15,12^FDA.DE.AMARAL EMBALAGENS - ME^FS";
    test += "^BY1,3.0,10^FO258,87^B8N,37,N,N^FN0^FS";
    test += "^FO16,136^GD531,1,2,B,L^FS";
    test += "^FO293,68^A0N,15,12^FDLEPACK@LEPACKEMBALAGENS.COM.BR^FS";
    test += "^FO31,148^A0N,45,36^FDBOBINA PVC PLASTICA ^FS";
    test += "^FO34,206^A0N,30,24^FDCOR: AMARELO^FS";
    test += "^FO34,255^A0N,30,24^FDTIPO: PLASTICO^FS";
    test += "^FO275,242^A0N,30,24^FD400MM  X  50MM^FS";
    test += "^FO26,18^A0N,30,24^FDNF 10005^FS";
    test += "^FO31,299^A0N,30,24^FDPERFURACAO: SIM^FS";
    test += "^FO32,345^A0N,30,24^FDPESO: 115,50kg^FS";
    test += "^FO13,134^GB539,254,4,B,0^FS";
    test += "^XZ";

    var test = "^XA^CFD";
    test += "^POI";
    test += "^LH330,10";
    test += "^FO50,50";
    test += "^FDZEBRA TECHNOLOGIES^FS";
    test += "^FO50,75";
    test += "^FDVernon Hills, IL^FS";
    test += "^XZ";
    */

    // change the button's name:
    $('#connectButton').css('background','#063');
    // set up a listener to listen for newlines
    // and display any new data that's come in since
    // the last newline:
    bluetoothSerial.subscribe('\n', function (data) {
      app.clear();
      app.display(data);
    });
  },
  printButton: function() {
    // if you get a good Bluetooth serial connection:
    app.display("CONECTADA: " + app.macAddress);
    /*

    var test = "^XA";
    test += "^MUM,70,50";
    test += "^PW70";
    test += "^LL50";
    test += "^LH0,0";
    test += "^JMA^FS";
    test += "^CVN";
    test += "^FDtestEMBALAGENS^FS";
    test += "^FO224,12^A0N,30,24^FDLEPACK EMBALAGENS^FS";
    test += "^FO252,45^A0N,15,12^FDA.DE.AMARAL EMBALAGENS - ME^FS";
    test += "^BY1,3.0,10^FO258,87^B8N,37,N,N^FN0^FS";
    test += "^FO16,136^GD531,1,2,B,L^FS";
    test += "^FO293,68^A0N,15,12^FDLEPACK@LEPACKEMBALAGENS.COM.BR^FS";
    test += "^FO31,148^A0N,45,36^FDBOBINA PVC PLASTICA ^FS";
    test += "^FO31,206^A0N,30,24^FDCOR: AMARELO^FS";
    test += "^FO34,255^A0N,30,24^FDTIPO: PLASTICO^FS";
    test += "^FO275,242^A0N,30,24^FD400MM  X  50MM^FS";
    test += "^FO10,10^A0N,1,1^FDNF 10005^FS";
    test += "^FO31,299^A0N,30,24^FDPERFURACAO: SIM^FS";
    test += "^FO32,345^A0N,30,24^FDPESO: 115,50kg^FS";
    test += "^FO13,134^GB539,254,4,B,0^FS";
    test += "^XZ";

    var test = "^XA";
    test += "^MUD,200,200";
    test += "^PW560";
    test += "^LL400";
    test += "^LH0,0";
    test += "^JMA^FS";
    test += "^CVN";
    test += "^FO224,12^A0N,30,24^FDLEPACK EMBALAGENS^FS";
    test += "^FO252,45^A0N,15,12^FDA.DE.AMARAL EMBALAGENS - ME^FS";
    test += "^BY1,3.0,10^FO258,87^B8N,37,N,N^FN0^FS";
    test += "^FO16,136^GD531,1,2,B,L^FS";
    test += "^FO293,68^A0N,15,12^FDLEPACK@LEPACKEMBALAGENS.COM.BR^FS";
    test += "^FO31,148^A0N,45,36^FDBOBINA PVC PLASTICA ^FS";
    test += "^FO34,206^A0N,30,24^FDCOR: AMARELO^FS";
    test += "^FO34,255^A0N,30,24^FDTIPO: PLASTICO^FS";
    test += "^FO275,242^A0N,30,24^FD400MM  X  50MM^FS";
    test += "^FO26,18^A0N,30,24^FDNF 10005^FS";
    test += "^FO31,299^A0N,30,24^FDPERFURACAO: SIM^FS";
    test += "^FO32,345^A0N,30,24^FDPESO: 115,50kg^FS";
    test += "^FO13,134^GB539,254,4,B,0^FS";
    test += "^XZ";

    var test = "^XA^CFD";
    test += "^POI";
    test += "^LH330,10";
    test += "^FO50,50";
    test += "^FDZEBRA TECHNOLOGIES^FS";
    test += "^FO50,75";
    test += "^FDVernon Hills, IL^FS";
    test += "^XZ";
    */



    // change the button's name:
    $('#connectButton').css('background','#063');
    // set up a listener to listen for newlines
    // and display any new data that's come in since
    // the last newline:
    bluetoothSerial.subscribe('\n', function (data) {
      app.clear();
      app.display(data);
    });
  },
  /*
  unsubscribes from any Bluetooth serial listener and changes the button:
  */
  closePort: function() {
    // if you get a good Bluetooth serial connection:
    app.display("DESCONECTANDO DA: " + app.macAddress);

    // change the button's name:
    $('#connectButton').css('background','rgb(167, 96, 84)');
    // unsubscribe from listening:
    bluetoothSerial.unsubscribe(
      function (data) {
        app.display(data);
      },
      app.showError
    );
  },
  /*
  appends @error to the message div:
  */
  showError: function(error) {
    app.display(error);
  },

  /*
  appends @message to the message div:
  */
  display: function(message) {
    var display = document.getElementById("message"), // the message div
    lineBreak = document.createElement("br"),     // a line break
    label = document.createTextNode(message);     // create the label

    display.appendChild(lineBreak);          // add a line break
    display.appendChild(label);              // add the message node
  },
  /*
  clears the message div:
  */
  clear: function() {
    var display = document.getElementById("message");
    display.innerHTML = "";
  }
};      // end of app
