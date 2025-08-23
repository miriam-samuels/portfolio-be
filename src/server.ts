import App from './app';
import AppRoutes from './routes/app.route';
import BlogController from "./controller/blog.controller";
import BlogRepository from "./repository/blog.repository";
import BlogRoutes from "./routes/v1/blog.route";
import V1Routes from "./routes/v1/v1.route";
import BlogService from "./service/blog.service";
import { PrismaClient } from '@prisma/client';
import dbConfig from './config/db.config';


const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  // 1. Connect DB
  await dbConfig.connect();

  // 2. Build routes (repositories, services, controllers, etc.)
  const appRoutes = createAppRoutes();;

  // 3. Start server
  const app = new App(PORT, [appRoutes.router]);
  app.listen();
}


function createAppRoutes(): AppRoutes {
  const prisma = new PrismaClient();
  const blogRepo = new BlogRepository(prisma);
  const blogService = new BlogService(blogRepo);
  const blogController = new BlogController(blogService);
  const blogRoutes = new BlogRoutes(blogController);
  const v1Routes = new V1Routes(blogRoutes);
  const appRoutes = new AppRoutes(v1Routes);

  return appRoutes;
}

bootstrap()