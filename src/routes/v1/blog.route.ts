import { Router } from 'express';
import BlogController from '../../controller/blog.controller';
import { injectable } from 'tsyringe';


@injectable()
class BlogRoutes {
    public router: Router;
    
    constructor(private blogController: BlogController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.blogController.getPosts);
        this.router.post('/', this.blogController.createPost);
        this.router.patch('/', this.blogController.updatePost);
        this.router.delete('/:id', this.blogController.deletePost);
    }
}

export default  BlogRoutes;
