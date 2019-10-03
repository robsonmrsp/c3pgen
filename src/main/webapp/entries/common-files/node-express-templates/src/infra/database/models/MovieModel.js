import Sequelize from 'sequelize';
import db from '../db';

// ######################################################################################
class MovieModel extends Sequelize.Model { }
MovieModel.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        defaultValue: () => Math.floor(Math.random() * 10000),
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sinopse: {
        type: Sequelize.STRING,
    },
    releaseDate: {
        field: 'release_date',
        type: Sequelize.DATE,
        defaultValue: () => new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    },
}, {
    sequelize: db,
    modelName: 'Movie',
    tableName: 'movie',
    // Globally remove those configs
    createdAt: false,
    deletedAt: false,
    updatedAt: false,
});

export default MovieModel;
