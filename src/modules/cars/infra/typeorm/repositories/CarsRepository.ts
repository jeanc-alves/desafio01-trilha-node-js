import { ICreateCarDTO } from "@modules/cars/dto/CreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    lisence_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      name,
      lisence_plate,
      fine_amount
    });

    await this.repository.save(car);
    return car;
  }
  async findByLisencePlate(lisence_plate: string): Promise<Car> {
    return this.repository.findOne({ lisence_plate })
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {

    const carsQuery = await this.repository
      .createQueryBuilder("c").where("available = :available", { available: true })
    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand })
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name })
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }
}

export { CarsRepository };
