import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  lisence_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    name,
    description,
    daily_rate,
    lisence_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlredadyExists = await this.carsRepository.findByLisencePlate(
      lisence_plate
    );

    if (carAlredadyExists) {
      throw new AppError("Car already exists !");
    }
    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      lisence_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
