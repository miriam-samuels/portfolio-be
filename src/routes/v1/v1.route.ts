// routes/index.ts
import { Router } from 'express';
import BlogRoutes from './blog.route';
import { injectable } from 'tsyringe';

@injectable()
class V1Routes {
  public router: Router;

  constructor(private blogRoutes: BlogRoutes) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/blog', this.blogRoutes.router);
  }
}

export default V1Routes;
