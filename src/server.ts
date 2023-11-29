import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

const { SERVER_PORT } = process.env;

app.use(express.json()); 
app.use(morgan("dev"));

type Planet = {
  id: number,
  name: string,
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];


app.get('/planets', (_, res) => {
  res.status(200).json(planets);
});

app.get('/planets/:id', (req, res) => {
  const { id } = req.params
  const planet = planets.find(p => p.id === Number(id))
  res.status(200).json(planet);
});

app.post('/planets', (req, res) => {
  const {id, name} = req.body;
  const newPlanet = {id, name}
  planets = [...planets, newPlanet]

  console.log(planets)

  res.status(201).json({ msg: "the new planet was created" })
})

app.put('/planets/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? {...p, name} : p ))

  console.log(planets);
  res.status(200).json({ msg: "The planet was updated"})
}) 

app.delete('/planets/:id', (req, res) => {
  const {id} = req.params;
  planets = planets.filter((p) => p.id !== Number(id))

  console.log(planets)

  res.status(200).json({ msg:"The planet was deleted" })
})

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running in port ${SERVER_PORT}`);
});
