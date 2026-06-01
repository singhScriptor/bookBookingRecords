const express = require('express')
const router = express.Router()

const bookControl = require('../controller/booksController')

router.post('/',bookControl.postBooks)
router.get('/',bookControl.getBooks)
router.put('/:id',bookControl.putBooks)
router.delete('/:id',bookControl.deleteBooks)

module.exports = router