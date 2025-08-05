// photon.js
const APP_ID = "2c9b122f-63f0-46a6-afc7-d7578fd0a594 // Replace t"; Photon Realtime App ID
const GAME_VERSION = "1.0";

let client;

function connectToPhoton() {
  client = new Photon.LoadBalancing.LoadBalancingClient(
    Photon.ConnectionProtocol.Ws,
    APP_ID,
    GAME_VERSION
  );

  client.onEvent = function (code, content, actorNr) {
    console.log("Photon Event:", code, content, actorNr);
  };

  client.onStateChange = function (state) {
    console.log("Photon State:", state);
  };

  client.onJoinRoom = function () {
    console.log("Joined room successfully!");

    // Spawn player
    const id = client.myActor().actorNr;
    console.log("Spawn player with ID:", id);
  };

  client.onJoinRandomRoomFailed = function () {
    console.log("No random room found, creating one...");
    client.myRoom().name = "YTChillRoom";
    client.createRoom();
  };

  client.connectToRegionMaster("us");
}

window.onload = () => {
  connectToPhoton();
  setInterval(() => client.service(), 50); // Pump Photon service
};
