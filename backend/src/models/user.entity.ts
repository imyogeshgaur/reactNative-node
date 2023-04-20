import { DataTypes, Sequelize } from "sequelize";
const sequelize = new Sequelize("mysql://root:root@localhost:3306/carrier_training")

const User = sequelize.define('User',{
    userId:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    userName:{
        type:DataTypes.STRING,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,  
    },
    firstName:{
        type:DataTypes.STRING
    },
    lastName:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

User.sync();

export default User;