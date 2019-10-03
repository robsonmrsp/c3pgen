import Sequelize from 'sequelize';

const db = new Sequelize('db_netflics', 'postgres', 'Aersoftwares@123', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

});

export default db;
