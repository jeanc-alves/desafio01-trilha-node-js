import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
describe("Send forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("shoud be able to send a forgot password mail to user", async () => {
    const SendMail = jest.spyOn(mailProvider, "sendMail");

    await userRepositoryInMemory.create({
      name: "Jean Alves",
      password: "senha123",
      email: "jean@alves.com",
      driver_license: "FPS-6666",
    });

    await sendForgotPasswordMailUseCase.execute("jean@alves.com");
    expect(SendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("asd@asd.com")
    ).rejects.toEqual(new AppError("User Does not exists!"));
  });
  it("should be able to create an user token", async () => {
    const token_generate = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await userRepositoryInMemory.create({
      name: "Juca Chaves",
      password: "senha123",
      email: "juca@chaves.com",
      driver_license: "SPP-6666",
    });

    await sendForgotPasswordMailUseCase.execute("juca@chaves.com");

    expect(token_generate).toHaveBeenCalled();
  });
});
