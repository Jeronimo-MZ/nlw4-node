import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u: id } = request.query;

        const surveysUsersRepository = getCustomRepository(
            SurveysUsersRepository
        );
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(id),
        });

        if (!surveyUser) {
            throw new AppError("Survey User doesn' exist!", 404);
        }
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        return response.json(surveyUser);
    }
}

export { AnswerController };
