import App from './app';
import AppRoutes from './routes/app.route';
import BlogController from "./controller/blog.controller";
import BlogRepository from "./repository/blog.repository";
import BlogRoutes from "./routes/v1/blog.route";
import V1Routes from "./routes/v1/v1.route";
import BlogService from "./service/blog.service";
import { PrismaClient } from '@prisma/client';


const PORT = Number(process.env.PORT) || 3000;

const appRoutes = createAppRoutes();

const app = new App(PORT, [appRoutes.router]);  // array in case of multiple
app.listen();

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