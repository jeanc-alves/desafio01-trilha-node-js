import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsReposiotyrInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsReposiotyrInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsReposiotyrInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("shoud be able to create a new rental", async () => {
    const newRental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12121212",
      expected_return_date: dayAdd24Hours,
    });

    expect(newRental).toHaveProperty("id");
    expect(newRental).toHaveProperty("start_date");
  });

  it("shoud not be able to create a new rental if there another open to the same user", async () => {
    expect(async () => {
      const newRental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12121212",
        expected_return_date: dayAdd24Hours,
      });

      const newRental1 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12121212",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("shoud not be able to create a new rental if there another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "12121212",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "12121212",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able to create a new rental if invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "12121212",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
