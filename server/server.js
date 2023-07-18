const express = require('express') // export express
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8888
app.use(express.json()) // send data from database type json
app.use(express.urlencoded({extended : true})) // send data from database type url

app.use('/',(req, res)=>{
    res.send('SERVER ON')
})

app.listen(port,()=>{
    console.log('Server running on the port: '+ port)
})