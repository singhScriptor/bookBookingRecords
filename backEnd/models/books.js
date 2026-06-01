const { DataTypes } = require('sequelize')

const sequelize = require('../utils/db-connection')

const books = sequelize.define('books',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    takeOn:{
        type:DataTypes.DATE,
        allowNull:false
    },
    returnOff:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fine:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},
    {
        tableName:'books',
        timestamps:false
    }

)
module.exports = books
