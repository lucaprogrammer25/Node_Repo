import { Request, Response } from "express";
import pgPromise from "pg-promise";
import Joi from "joi";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/postgres")


const setupDb = async () => {
  db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL
    )
  `)

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)

  console.log(planets);
  
}
setupDb()

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
  
  const getAll = async  (_: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets;`)
    res.status(200).json(planets);
  }
  
  const getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id))
    res.status(200).json(planet);
  }

  const planetSchema = Joi.object({
    name: Joi.string().required(),
  })
  
  const create = async  (req: Request, res: Response) => {
    const { name}  = req.body;
    const newPlanet = { name }
    const validateNewPlanet = planetSchema.validate(newPlanet)
    if(validateNewPlanet.error){
      return res.status(400).json({ msg: validateNewPlanet.error.details[0].message })
    } else {

      await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
      // planets = [...planets, newPlanet]    
      res.status(201).json({ msg: "the new planet was created" })
    }
  }

  const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
    // planets = planets.map((p) => (p.id === Number(id) ? {...p, name} : p ))
  
    console.log(planets);
    res.status(200).json({ msg: "The planet was updated"})
  }

  const deleteById = async (req: Request, res: Response) => {
    const {id} = req.params;
    await db.none(`DELETE FROM planets WHERE id=$1`, Number(id))
    // planets = planets.filter((p) => p.id !== Number(id))
  
    console.log(planets)
  
    res.status(200).json({ msg:"The planet was deleted" })
  };

  export {getAll, getById, create, updateById, deleteById}