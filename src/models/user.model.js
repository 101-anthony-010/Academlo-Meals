const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "disabled"),
        allowNull: false,
        defaultValue: "active",
    },
    role: {
        type: DataTypes.ENUM("admin", "normal"),
        allowNull: false,
        defaultValue: "normal",
    }
})

module.exports = User;