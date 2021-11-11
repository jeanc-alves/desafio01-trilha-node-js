import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "car descriiption",
      daily_rate: 110,
      fine_amount: 1100,
      brand: "brand",
      lisence_plate: "SDA-2015",
      category_id: "dd92ea3e-b5d1-4b92-927c-5ea97fe9117a",
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("Should be able list all available cars by brand ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "car descriiption",
      daily_rate: 110,
      fine_amount: 1100,
      brand: "brand_test",
      lisence_plate: "SDA-2015",
      category_id: "dd92ea3e-b5d1-4b92-927c-5ea97fe9117a",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "brand_test",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able list all available cars by name ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "car descriiption",
      daily_rate: 110,
      fine_amount: 1100,
      brand: "brand_test",
      lisence_plate: "SDA-2015",
      category_id: "dd92ea3e-b5d1-4b92-927c-5ea97fe9117a",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car3" });
    expect(cars).toEqual([car]);
  });

  it("Should be able list all available cars by category_id ", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "car descriiption",
      daily_rate: 110,
      fine_amount: 1100,
      brand: "brand_test",
      lisence_plate: "SDA-2015",
      category_id: "dd92ea3e",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "dd92ea3e",
    });
    console.log("cars :", cars);

    expect(cars).toEqual([car]);
  });
});
