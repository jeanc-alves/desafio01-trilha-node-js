import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUserCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUsecase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUsecase.execute({ email, password });
    return response.json(token);
  }
}

export { AuthenticateUserController };
