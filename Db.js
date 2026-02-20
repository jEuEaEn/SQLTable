import mysql from 'mysql2/promise'
import 'dotenv/config'

export const pool =  mysql.createPool({

    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password, 
    database: process.env.DB_Name,
    connectionLimit: 10

})

