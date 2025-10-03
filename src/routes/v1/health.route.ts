import { Router } from "express";

class HealthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/');
    }
}

export default HealthRoutes;
