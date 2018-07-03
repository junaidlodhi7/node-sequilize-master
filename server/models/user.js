'use strict';
const bcrypt = require('bcrypt');
const salt   = bcrypt.genSaltSync(10);
require('dotenv').config();
const secret = process.env.SECRET;
const jwt     = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        passwordHash: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [6, Infinity]
            }
        },
        resetPasswordToken: {
            type: DataTypes.STRING
        },
        resetPasswordExpires: {
            type: DataTypes.DATE
        },
        invitationToken: {
            type: DataTypes.STRING
        },
        invitationTokenExpires: {
            type: DataTypes.DATE
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            unique: true
        }

    },{
        indexes: [{unique: true, fields: ['email']}]
    });
    User.associate = function (models) {
        // User.hasMany(models.Role , { as: 'roles' ,foreignKey: 'userId' })
    };
    User.beforeCreate(function(user , options){
        user.passwordHash = bcrypt.hashSync(user.passwordHash, salt, null);
    });

    User.prototype.authenticate = function authenticate(value) {
        if (bcrypt.compareSync(value, this.passwordHash))
            return this;
        else
            return false;
    };

    User.prototype.generateJwtToken = function generateJwtToken() {
        return jwt.sign({ email: this.email, id: this.id}, secret);
    };

    return User;
};