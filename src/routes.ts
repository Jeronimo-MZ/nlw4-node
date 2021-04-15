import { Router } from "express";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

const routes = Router();
const userController = new UserController();
const surveyController = new SurveyController();

routes.post("/users", userController.create);

routes.post("/surveys", surveyController.create);
routes.get("/surveys", surveyController.show);

export default routes;
