'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
                validate: {
                    isEmail: true,
                    len: [2,50],
                    notNull: true
                }
            },
            passwordHash: {
                type: Sequelize.STRING
            },
            resetPasswordToken: {
                type: Sequelize.STRING
            },
            resetPasswordExpires: {
                type: Sequelize.DATE
            },
            invitationToken: {
                type: Sequelize.STRING
            },
            invitationTokenExpires: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {

        return queryInterface.dropTable('Users');
    }
};