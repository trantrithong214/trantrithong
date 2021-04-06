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

var tempNull = { tempC: "", tempF: "", tempK: "" };

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

io.on("connection", (socket) => {
  console.log("a user connected, id: ", socket.id);
  io.emit("stations", stations);
  socket.on("disconnect", () => {
    if (stations_ID.includes(socket.id)) {
      stations_ID = stations_ID.filter((element) => element !== socket.id);
      stations = stations.filter((station) => station.id !== socket.id);

      io.to(socket.id).emit("temp2web", tempNull);
      io.emit("stations", stations);
      console.log("Room ", socket.id, " disconnected");
      console.log("stations_ID[]: ", stations_ID);
    } else console.log("user ", socket.id, " disconnected");
  });

  socket.on("create-station", (station) => {
    let stationTemp = station;
    stationTemp.id = socket.id;
    console.log("new station info: ", stationTemp);
    stations.push(stationTemp);
    stations_ID.push(stationTemp.id);
    console.log("stations_ID[]: ", stations_ID);

    io.to(socket.id).emit("station-id", socket.id);
    io.emit("stations", stations);
  });

  socket.on("update-station", (station) => {
    console.log("station will updated: ", station.name, ": ", station.id);
    let isStationUpdate = (element) => element.id == station.id;
    let index = stations.findIndex(isStationUpdate);
    stations[index] = station;
    console.log("updated station info: ", stations[index]);
    io.emit("stations", stations);
  });

  socket.on("list-rooms", (msg) => {
    console.log(stations);
    io.emit("stations", stations);
  });

  socket.on("join-room", (msg) => {
    socket.leaveAll();
    socket.join(msg);

    console.log("join-room", msg);

    console.log("client in station: ", socket.adapter.rooms);
  });

  socket.on("temp", (msg) => {
    io.to(socket.id).emit("temp2web", msg);
  });
});
