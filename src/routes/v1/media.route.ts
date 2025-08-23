import { Router } from 'express';
import MediaController from '../../controller/media.controller';


class MediaRoutes {
    public router: Router;

    constructor(private mediaController: MediaController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/presigned-url', this.mediaController.uploadFile);

    }
}

export default MediaRoutes;
