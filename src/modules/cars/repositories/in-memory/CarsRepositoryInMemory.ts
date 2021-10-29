import { ICreateCarDTO } from "@modules/cars/dto/CreateCarDTO";
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
  }: ICreateCarDTO): Promise<Car> {
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

  async findAvailable(
    brand: string,
    category_id: string,
    name?: string
  ): Promise<Car[]> {
    const cars = await this.cars.filter((car) => {
      if (
        car.available === true ||
        ((brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name))
      ) {
        return car;
      }
      return null;
    });
    return cars
  }
}

export { CarsRepositoryInMemory };