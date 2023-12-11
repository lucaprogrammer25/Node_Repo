import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer"

import {getAll, getById, create, updateById, deleteById, createImage} from "./controller/planets.js"
import { logIn, signUp } from "./controller/users.js";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

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

app.post('/planets/:id/image', upload.single("image"), createImage)

app.post('/users/login', logIn)

app.post('/users/signup', signUp)

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running in port ${SERVER_PORT}`);
});
