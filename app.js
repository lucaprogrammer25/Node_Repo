import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

const { SERVER_PORT } = process.env;

app.use(morgan("dev"));

let planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
];


app.get('/planets', (_, res) => {
  res.status(200).json(planets);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running in port ${SERVER_PORT}`);
});
