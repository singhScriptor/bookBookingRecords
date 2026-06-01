const express = require('express')
const db = require('./utils/db-connection')
const cors = require('cors')
const port = 3000

const app = express()


app.use(express.json())
app.use(cors())

const routes = require('./routes/bookRouter')

app.get('/',(req,res)=>{
    res.send('Hey there welcome to my server!')
})

app.use('/books',routes)

db.sync({alter:true})
.then(()=>{
    app.listen(port,()=>{
        console.log("server is listening...!")
    })
})
.catch((err)=>{
    console.log(err.message)
})