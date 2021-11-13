import { inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExist = await this.carsRepository.findById(car_id);
    if (!carExist) {
      throw new AppError("Car does not exist");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );
    carExist.specifications = specifications;
    return this.carsRepository.create(carExist);
  }
}
export { CreateCarSpecificationUseCase };