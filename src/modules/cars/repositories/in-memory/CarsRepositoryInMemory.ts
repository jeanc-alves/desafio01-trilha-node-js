import { ICreateCarDTo } from "@modules/cars/dto/CreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    lisence_plate,
  }: ICreateCarDTo): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      lisence_plate,
    });

    this.cars.push(car);
    return car;
  }

  async findByLisencePlate(lisence_plate: string): Promise<Car> {
    return this.cars.find((car) => car.lisence_plate === lisence_plate);
  }
}

export { CarsRepositoryInMemory };
