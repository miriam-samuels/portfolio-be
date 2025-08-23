import { Router } from 'express';
import BlogRoutes from './blog.route';
import MediaRoutes from './media.route';

class V1Routes {
  public router: Router;

  constructor(
    private blogRoutes: BlogRoutes,
    private mediaRoutes: MediaRoutes,
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/blog', this.blogRoutes.router);
    this.router.use('/media', this.mediaRoutes.router);
  }
}

export default V1Routes;
