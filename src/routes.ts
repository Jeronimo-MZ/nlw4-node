import { Router } from "express";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

const routes = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

routes.post("/users", userController.create);

routes.post("/surveys", surveyController.create);
routes.get("/surveys", surveyController.show);

routes.post("/send-mail", sendMailController.execute);

routes.get("/answers/:value", answerController.execute);

routes.get("/nps/:survey_id", npsController.execute);

export default routes;
