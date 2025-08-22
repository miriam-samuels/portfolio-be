import App from './app';
import BlogService from './service/blog.service';
import BlogController from './controller/blog.controller';
import AppRoutes from './routes/app.route';
import "reflect-metadata";
import { container } from 'tsyringe';


const PORT = Number(process.env.PORT) || 3000;

// manual DI wiring


const appRoutes = container.resolve(AppRoutes)

const app = new App(PORT, [appRoutes.router]);  // array in case of multiple
app.listen();
