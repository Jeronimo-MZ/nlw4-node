import "reflect-metadata";
import express from "express";
import createConnection from "./database";
import routes from "./routes";

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

// app.use(logRequests);
app.use(routes);

export { app };
