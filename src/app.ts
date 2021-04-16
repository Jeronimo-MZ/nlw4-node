import "reflect-metadata";
import express, { Request, Response } from "express";
import "express-async-errors";
import createConnection from "./database";
import routes from "./routes";
import { AppError } from "./errors/AppError";

createConnection();

const app = express();

app.use(express.json());

function logRequests(
    request: express.Request,
    _response: express.Response,
    next: express.NextFunction
) {
    const { url, method } = request;

    const message = `[${method}] ${url}`;

    console.time(message);
    next();
    console.timeEnd(message);
    return;
}

app.use(logRequests);
app.use(routes);
app.use((error: Error, _request: Request, response: Response) => {
    if (error instanceof AppError) {
        return response
            .status(error.statusCode)
            .json(JSON.stringify({ error: error.message }));
    }
    return response.status(500).json({
        status: "error",
        message: `Internal Server Error ${error.message}`,
    });
});

export { app };
