
const books = require('../models/books')

const postBooks = async (req,res,next)=>{
    try{
        const {name,takeOn,returnOff,fine,status} = req.body
        const result = await books.create({name,takeOn,returnOff,fine,status})
        res.json(result)
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

const getBooks = async(req,res,next)=>{
    try{
        const result = await books.findAll()
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(404).json({ message: "not found!" })
        }
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

const putBooks = async(req,res,next)=>{
    try{
        const {id}= req.params
        const {name,takeOn,returnOff,fine,status} = req.body

        const [updated] = await books.update({name,takeOn,returnOff,fine,status},{where:{id}})
        if(updated){
            //const updatedBook = await books.findByPk(id)
            res.json(updated)
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

const deleteBooks = async(req,res,next)=>{
    try{
         const {id} = req.params
         const result = await books.destroy({where:{id}})
        if(result){
            res.json({message:'successfully deleted'})
        }
        else{
            res.status(404).json({message:"not found!"})
        }
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

module.exports = {
    postBooks,
    getBooks,
    putBooks,
    deleteBooks
}