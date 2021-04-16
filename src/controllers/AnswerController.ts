import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
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
            return response
                .status(400)
                .json({ error: "Survey User doesn' exist!" });
        }
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        return response.json(surveyUser);
    }
}

export { AnswerController };
