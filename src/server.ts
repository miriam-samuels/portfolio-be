import "reflect-metadata";
import App from './app';
import AppRoutes from './routes/app.route';
import { container } from 'tsyringe';


const PORT = Number(process.env.PORT) || 3000;

const appRoutes = container.resolve(AppRoutes)

const app = new App(PORT, [appRoutes.router]);  // array in case of multiple
app.listen();
