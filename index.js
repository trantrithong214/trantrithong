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

var tempNull = {
  tempC1: "",
  tempF1: "",
  tempH1: "",
  tempC2: "",
  tempF2: "",
  tempH1: "",
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

io.on("connection", (socket) => {
  console.log("a user connected, id: ", socket.id);
  io.emit("stations", stations);

  socket.on("create-station", (station) => {
    let stationT = station;
    stationT.id = socket.id;
    console.log("new station info: ", stationT);
    stations.push(stationT);
    stations_ID.push(stationT.id);
    console.log("stations_ID[]: ", stations_ID);

    io.to(socket.id).emit("station-id", socket.id);
    io.emit("stations", stations);
  });

  socket.on("join-room", (msg) => {
    socket.leaveAll();
    socket.join(msg);

    console.log("join-room: ", msg);

    console.log("client in station: ", socket.adapter.rooms);
  });

  socket.on("temp", (msg) => {
    io.emit("temp2web", msg);
  });
});
