import "reflect-metadata";
import App from './app';
import AppRoutes from './routes/app.route';
import { container } from 'tsyringe';
import { PrismaClient } from "@prisma/client";


const PORT = Number(process.env.PORT) || 3000;

container.registerSingleton<PrismaClient>(PrismaClient);


const appRoutes = container.resolve(AppRoutes)

const app = new App(PORT, [appRoutes.router]);  // array in case of multiple
app.listen();
