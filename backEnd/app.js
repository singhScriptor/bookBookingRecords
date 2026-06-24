const express = require('express')
const db = require('./utils/db-connection')
const cors = require('cors')
const path = require('path')
const port = 3000

const app = express()


app.use(express.json())
app.use(cors())

const routes = require('./routes/bookRouter')

app.use(express.static(path.join(__dirname,'../frontEnd')))



// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../frontEnd/index.html'))
// })

app.use('/books',routes)


app.use((err,req,res,next)=>{
    console.log(err.stack)
    const status = err.statusCode || 500
    const message = err.message || "internal server error"
    res.status(status).json({error: message})
})



db.sync({alter:true})
.then(()=>{
    app.listen(port,()=>{
        console.log("server is listening...!")
    })
})
.catch((err)=>{
    console.log(err.message)
})