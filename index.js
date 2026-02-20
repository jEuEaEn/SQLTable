import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './Db.js'

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

        res.status(500).send({message:'Hay un error en los cromosomas'}, err)

    }

})

app.post("/Games",async (req,res)=>{

    const {title, year} = req.body

    try{

        const [result] = await pool.query("INSERT INTO Juegos (title, year) VALUES (?, ?)",
            [title, year]
        )
        res.status(201).json({ id: result.insertId})

    }catch{

        res.status(500).json({msg: "Falla"})

    }

})


app.listen(3000, () =>{

    console.log('Servidr corrieendo en el puerto 3000')

})