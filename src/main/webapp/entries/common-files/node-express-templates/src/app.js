import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import MovieController from './presentation/http/controllers/MovieController';
import db from './infra/database/db';
import Server from './presentation/http/Server';

const initAppExpress = () => {
    const appExpress = express();
    appExpress.use(logger('dev'));
    appExpress.use(express.json());
    appExpress.use(express.urlencoded({ extended: false }));
    appExpress.use(cookieParser());

    // Add controllers here
    appExpress.use('/movies', MovieController);

    return appExpress;
};
class Application {
    constructor() {
        this.database = db;
        this.server = new Server(initAppExpress());
    }

    async start() {
        if (this.database) {
            await this.database.authenticate();
        }

        await this.server.start(this.appExpress);
    }
}

export default new Application();
