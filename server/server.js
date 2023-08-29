const express = require('express') // export express
const cors = require('cors')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')


const app = express()
const port = process.env.PORT || 8888
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE" // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(cookieParser())
app.use(express.json()) // send data from database type json
app.use(express.urlencoded({extended : true})) // send data from database type url
dbConnect()
initRoutes(app)

app.use('/',(req, res)=>{
    res.send('SERVER ON')
})

app.listen(port,()=>{
    console.log('Server running on the port: '+ port)
})