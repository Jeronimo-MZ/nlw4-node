import { Router } from "express";
import { AnswerController } from "./controllers/AnswerController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

const routes = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();

routes.post("/users", userController.create);

routes.post("/surveys", surveyController.create);
routes.get("/surveys", surveyController.show);

routes.post("/send-mail", sendMailController.execute);

routes.get("/answers/:value", answerController.execute);

export default routes;
