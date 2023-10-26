const express = require("express"); // Importamos Express para utilizarlo en nuestro proyecto.
const cors = require("cors");

const app = express(); //Creamos una aplicación con Express JS

app.use(express.static('app'));
app.use(cors());
app.use(express.json());

const players = [];

class Player {
  constructor(id){
    this.id = id;
  }

  assignMokepon(mokepon){
    this.mokepon  = mokepon
  }

  updatePosition(x, y){
    this.x = x;
    this.y = y;
  }

  assignAttacks(attacks){
    this.attacks = attacks;
  }
}

class Mokepon {
  constructor(name){
    this.name = name
  }
}

//En la URL Raíz cuando reciba una petición responda HOLA
app.get("/join", (req, res) => {
  const id = `${Math.random()}`

  const player = new Player(id);
  players.push(player);

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.send(id);
});

app.post("/mokepon/:playerId", (req, res) => {
  const playerId = req.params.playerId || ""
  const name = req.body.mokepon || ""
  const mokepon = new Mokepon(name)
  const playerIndex = players.findIndex((player) => playerId === player.id)

  if (playerIndex >= 0) {
    players[playerIndex].assignMokepon(mokepon)
  }

  console.log(players);
  console.log(playerId);
  res.end();
})

app.post("/mokepon/:playerId/position", (req, res) => {
  const playerId = req.params.playerId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const playerIndex = players.findIndex((player) => playerId === player.id)

  if (playerIndex >= 0) {
    players[playerIndex].updatePosition(x, y)
  }

  const enemys = players.filter((player) => playerId !== player.id)

  res.send({
    enemys
  })
})


app.post("/mokepon/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || ""
  const attacks = req.body.attacks || []

  const playerIndex = players.findIndex((player) => playerId === player.id)

  if (playerIndex >= 0) {
    players[playerIndex].assignAttacks(attacks)
  }

  res.end();
})

app.get("/mokepon/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || ""
  const player = players.find((player) => player.id === playerId)
  res.send({
    attacks: player.attacks || []
  })
})

// Escuche continuamente en el puerto 8080, las solicitudes de los clientes.
app.listen(8080, () => {
    console.log('Service UP');
} );

//verbos Http o Métodos HTTP, son 11 principales métodos estandares que se utilizan en la web, pero se pueden realizarn métodos personalizados.
