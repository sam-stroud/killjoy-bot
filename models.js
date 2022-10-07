module.exports = { getAllAdmins, insertAdmin, getAdmin, deleteAdmin };
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './discordbot.db',
});

// Admin Table/Model
class Admin extends Model {}
Admin.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'Admin' });


// Functions
async function getAllAdmins() {
    await sequelize.sync();
    const admins = await Admin.findAll({
        attributes: ['id', 'username'],
    });
    return admins;
}

async function insertAdmin(mid, musername) {
    await sequelize.sync();
    await Admin.create({
        id: mid,
        username: musername,
    });
}

async function getAdmin(mid, musername) {
    await sequelize.sync();
    const admin = await Admin.findAll({
        attributes: ['id', 'username'],
        where: {
            id: mid,
            username: musername,
        },
    });
    return admin;
}

async function deleteAdmin(mid, musername) {
    await sequelize.sync();
    await Admin.destroy({
        where: {
            id: mid,
            username: musername,
        },
    });
}