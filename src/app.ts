import express, { Application, Router } from 'express';
import dotenv from 'dotenv';
class App {
    public app: Application;
    private readonly port: number;

    constructor(port: number, routes: Router[]) {
        this.app = express();
        this.port = port;

        dotenv.config();

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeRoutes(routes: Router[]) {
        routes.forEach((route) => {
            this.app.use('/api', route);
        });
    }

    private registerServices(){
        
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on http://localhost:${this.port}`);
        });
    }
}



export default App;
