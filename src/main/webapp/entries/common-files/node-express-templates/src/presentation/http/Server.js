
class Server {
    constructor(appExpress, port) {
        this.port = port || 5001;
        this.appExpress = appExpress;
    }

    start() {
        return new Promise((resolve) => {
            const http = this.appExpress
                .listen(this.port, () => {
                    const { port } = http.address();
                    console.log(`[p ${process.pid}] Listening at port ${port}`);
                    resolve();
                });
        });
    }
}

export default Server;
