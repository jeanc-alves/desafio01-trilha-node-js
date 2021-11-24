import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not be able add a new specification to a non exists car ", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["12345"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able add a new specification to a car ", async () => {
    const newCar = {
      name: "Fusca",
      description: "desc",
      daily_rate: 1100,
      fine_amount: 1100,
      lisence_plate: "SPF-1134",
      brand: "Chev",
      category_id: "149a6183-267b-423e-8b18-b5d0bd00f535",
    };
    const car = await carsRepositoryInMemory.create(newCar);
    const specification = await specificationRepositoryInMemory.create({
      name: "Carro Novo",
      description: "Carro 0 km",
    });

    const specifications_id = [specification.id];

    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCar).toHaveProperty("specifications");

    expect(specificationCar.specifications.length).toBe(1);
  });
});
