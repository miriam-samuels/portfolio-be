import { Router } from 'express';
import V1Routes from './v1/v1.route';
import { injectable } from 'tsyringe';

@injectable()
class AppRoutes {
    public router: Router;

    constructor(private v1Routes:V1Routes  ) {
        this.router = Router()
        this.initializeRoutes()
    }

    private async initializeRoutes() {
        this.router.use('/v1', this.v1Routes.router);
    }
}

export default AppRoutes;
