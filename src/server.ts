import 'dotenv/config';
import App from './app';
import AppRoutes from './routes/app.route';
import BlogController from "./controller/blog.controller";
import BlogRepository from "./repository/blog.repository";
import BlogRoutes from "./routes/v1/blog.route";
import V1Routes from "./routes/v1/v1.route";
import BlogService from "./service/blog.service";
import MediaRoutes from './routes/v1/media.route';
import MediaController from './controller/media.controller';
import MediaService from './service/media.service';
import StorageService from './service/storage.service';
import HealthRoutes from './routes/v1/health.route';


const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  // 1. Connect DB
  // await dbConfig.connect();


  // 2. Build routes (repositories, services, controllers, etc.)
  const appRoutes = createAppRoutes();;

  // 3. Start server
  const app = new App(PORT, [appRoutes.router]);
  app.listen();
}


function createAppRoutes(): AppRoutes {
  const blogRepo = new BlogRepository();

  const blogService = new BlogService(blogRepo);
  const storageService = new StorageService()
  const mediaService = new MediaService(storageService);

  const blogController = new BlogController(blogService);
  const mediaController = new MediaController(mediaService);

  const blogRoutes = new BlogRoutes(blogController);
  const mediaRoutes = new MediaRoutes(mediaController);
  const healthRoutes = new HealthRoutes();
  const v1Routes = new V1Routes(blogRoutes, mediaRoutes, healthRoutes);
  const appRoutes = new AppRoutes(v1Routes);

  return appRoutes;
}

bootstrap()