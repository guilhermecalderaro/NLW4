import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const userRepository = getCustomRepository(UserRepository);

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(request.body);
        } catch (error) {
            throw new AppError(error);

        }

        const userAlreadyExists = await userRepository.findOne({
            email
        })

        if (userAlreadyExists) {
            throw new AppError("User already exists!");

        }

        const user = userRepository.create({
            name, email
        });

        await userRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };
