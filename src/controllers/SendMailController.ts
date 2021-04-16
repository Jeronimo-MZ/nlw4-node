import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";

import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
    public async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(
            SurveysUsersRepository
        );

        const user = await usersRepository.findOne({ email });

        if (!user) {
            return response.status(400).json({
                error: "User do not exist!",
            });
        }

        const survey = await surveysRepository.findOne({ id: survey_id });

        if (!survey) {
            return response.status(400).json({
                error: "Survey do not exist!",
            });
        }

        const npsPath = resolve(
            __dirname,
            "..",
            "views",
            "emails",
            "npsMail.hbs"
        );

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.MAIL_URL,
        };

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [
                { user_id: user.id },
                { survey_id: survey.id },
                { value: null },
            ],
        });

        if (surveyUserAlreadyExists) {
            await SendMailService.execute(
                email,
                survey.title,
                variables,
                npsPath
            );
            return response.json(surveyUserAlreadyExists);
        }

        // salvar as informações na tabela SurveysUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id,
        });
        await surveysUsersRepository.save(surveyUser);

        // enviar email para usuario

        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController };
