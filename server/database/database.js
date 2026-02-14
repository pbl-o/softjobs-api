import dotenv from 'dotenv'
dotenv.config()
import {Pool} from 'pg';
import format from 'pg-format' 

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    allowExitOnIdle:true
})

export const getDataConnection = async()=>{
    const {rows} = await pool.query("SELECT NOW()")
    if(!rows || rows.length === 0){
        console.log(error)
    }
    console.log(`Database connected at ${rows[0].now}`)
}
