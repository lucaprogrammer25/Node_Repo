import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import {getAll, getById, create, updateById, deleteById} from "./controller/planets.js"


dotenv.config();
const app = express();

const { SERVER_PORT } = process.env;

app.use(express.json()); 
app.use(morgan("dev"));




app.get('/planets', getAll);

app.get('/planets/:id', getById);

app.post('/planets', create)

app.put('/planets/:id', updateById) 

app.delete('/planets/:id', deleteById)

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running in port ${SERVER_PORT}`);
});
