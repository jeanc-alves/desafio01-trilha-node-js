import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      lisence_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Brand Car",
      category_id: "123",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able a car with exists licence plate", async () => {
    await createCarUseCase.execute({
      name: "Name Car1",
      description: "Description Car",
      daily_rate: 100,

      lisence_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Brand Car",
      category_id: "123",
    });
    await expect(
      createCarUseCase.execute({
        name: "Name Car2",
        description: "Description Car",
        daily_rate: 100,

        lisence_plate: "ABC-1234",
        fine_amount: 100,
        brand: "Brand Car",
        category_id: "123",
      })
    ).rejects.toEqual(new AppError("Car already exists !"));
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description Car",
      daily_rate: 100,
      lisence_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Brand Car",
      category_id: "123",
    });

    expect(car.available).toBe(true);
  });
});
