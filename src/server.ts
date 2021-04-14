import express from "express";

const app = express();
const PORT = 3333;

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

app.listen(PORT, () => {
    console.log("Backend started on port:", PORT);
});
