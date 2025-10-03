import { Router } from 'express';
import BlogRoutes from './blog.route';
import MediaRoutes from './media.route';
import HealthRoutes from './health.route';

class V1Routes {
  public router: Router;

  constructor(
    private blogRoutes: BlogRoutes,
    private mediaRoutes: MediaRoutes,
    private healthRoutes: HealthRoutes,
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/blog', this.blogRoutes.router);
    this.router.use('/media', this.mediaRoutes.router);
    this.router.use('/health', this.healthRoutes.router);
  }
}

export default V1Routes;
