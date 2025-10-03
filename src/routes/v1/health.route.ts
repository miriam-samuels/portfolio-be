import { Router } from "express";

class HealthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', (req, res) => {
            res.status(200).json({ status: 'ok' });
        });
    }
}

export default HealthRoutes;
