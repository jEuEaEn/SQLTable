import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './Db.js'

await pool.query(`
    CRAETE TABE IF NOT EXISTS Games(

    id int AUTO_INCREMENT PRYMARY KEY,
    title varchar(50) NOT NULL,
    year int NOT NULL,
    genre varchar(150) NOT NULL
    
    )
    `)

const app = express()
app.use(express.json())
app.use(cors())


app.get('/',(req,res) =>{

    res.json({message: 'Servidor corriendo'})

})


app.get("/Games",async (req,res)=>{

    try{

        const [rows] = await pool.query("SELECT * FROM Juegos")
        res.json({ rows })

    }catch(err){

        res.status(500).send({message:'Hay un error en los cromosomas', error:err})

    }

})

app.post("/Games",async (req,res)=>{

    const {title, year, genre} = req.body

    try{

        const [result] = await pool.query("INSERT INTO Juegos (title, year, genre) VALUES (?, ?, ?)",
            [title, year, genre]
        )
        res.status(201).json({ id: result.insertId})

    }catch{

        res.status(500).json({msg: "Falla"})

    }

})

app.delete("/Games/:id", async (req,res) =>{

    const id = req.params.id
    try{
        const [result] = await pool.query('DELETE FROM Juegos WHERE id=?', [id])

        if(result.affectedRows == 0 ){

            return res.status(404).json({message : 'Juego no encontrado'})

        }

        res.status(200).send({message: 'Pelicula encontrada correctamente'})
    }catch(error){

        res.status(500).json({message:'Error en el servidor al eliminar', err: error})

    }

})

app.listen(3000, () =>{

    console.log('Servidr corrieendo en el puerto 3000')

})