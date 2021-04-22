var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var phong1 = require("./phong1");
var phong2 = require("./phong2");
var phong3 = require("./phong3");
var phong4 = require("./phong4");
var phong5 = require("./phong5");
var phong6 = require("./phong6");

var stations = [];
var stations_ID = [];
var tnull1 = {
  C: "",
  H: "",
  lux: "",
};

var tnull2 = {
  C: "",
  H: "",
};

const PORT = 3484;
http.listen(process.env.PORT || PORT, console.log("server running ", PORT));
app.use("/phong1.html", phong1);
app.use("/phong2.html", phong2);
app.use("/phong3.html", phong3);
app.use("/phong4.html", phong4);
app.use("/phong5.html", phong5);
app.use("/phong6.html", phong6);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "/index.html");
});

io.on("connection", (cambien) => {
  console.log("a user connected, id: ", cambien.id);

  io.emit("stations", stations);

  cambien.on("disconnect", () => {
    if (stations_ID.includes(cambien.id)) {
      stations = stations.filter((station1) => station1.id !== cambien.id);
      io.emit("cambien1web", tnull1);
      io.emit("stations", stations);
      console.log("user ", cambien.id, " disconnected");
    }

    if (stations_ID.includes(cambien.id)) {
      stations = stations.filter((station2) => station2.id !== cambien.id);
      io.emit("cambien2web", tnull2);
      io.emit("stations", stations);
      console.log("user ", cambien.id, " disconnected");
    }
  });

  cambien.on("create-station1", (station1) => {
    let stationT = station1;
    stationT.id = cambien.id;
    console.log("new station info: ", stationT);
    stations.push(stationT);
    stations_ID.push(stationT.id);
    console.log("stations_ID[]: ", stations_ID);
    io.emit("station-id", cambien.id);
    io.emit("stations", stations);
  });
  cambien.on("create-station2", (station2) => {
    let stationT = station2;
    stationT.id = cambien.id;
    console.log("new station info: ", stationT);
    stations.push(stationT);
    stations_ID.push(stationT.id);
    console.log("stations_ID[]: ", stations_ID);
    io.emit("station-id", cambien.id);
    io.emit("stations", stations);
  });
  cambien.on("create-station3", (station) => {
    let stationT = station;
    stationT.id = cambien.id;
    console.log("new station info: ", stationT);
    stations.push(stationT);
    stations_ID.push(stationT.id);
    console.log("stations_ID[]: ", stations_ID);
    io.emit("station-id", cambien.id);
    io.emit("stations", stations);
  });
  cambien.on("create-station4", (station) => {
    let stationT = station;
    stationT.id = cambien.id;
    console.log("new station info: ", stationT);
    stations.push(stationT);
    stations_ID.push(stationT.id);
    console.log("stations_ID[]: ", stations_ID);
    io.emit("station-id", cambien.id);
    io.emit("stations", stations);
  });
  cambien.on("create-station5", (station) => {
    let stationT = station;
    stationT.id = cambien.id;
    console.log("new station info: ", stationT);
    stations.push(stationT);
    stations_ID.push(stationT.id);
    console.log("stations_ID[]: ", stations_ID);
    io.emit("station-id", cambien.id);
    io.emit("stations", stations);
  });
  cambien.on("create-station6", (station) => {
    let stationT = station;
    stationT.id = cambien.id;
    console.log("new station info: ", stationT);
    stations.push(stationT);
    stations_ID.push(stationT.id);
    console.log("stations_ID[]: ", stations_ID);
    io.emit("station-id", cambien.id);
    io.emit("stations", stations);
  });

  cambien.on("cambien1", (msg1) => {
    io.emit("cambien1web", msg1);
  });
  cambien.on("cambien2", (msg2) => {
    io.emit("cambien2web", msg2);
  });
  cambien.on("cambien3", (msg3) => {
    io.emit("cambien3web", msg3);
  });
  cambien.on("cambien4", (msg4) => {
    io.emit("cambien4web", msg4);
  });
  cambien.on("cambien5", (msg5) => {
    io.emit("cambien5web", msg5);
  });
  cambien.on("cambien6", (msg6) => {
    io.emit("cambien6web", msg6);
  });
});
