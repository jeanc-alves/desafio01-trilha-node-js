import { ICreateCarDTO } from "@modules/cars/dto/CreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLisencePlate(lisence_plate: string): Promise<Car>;
}
export { ICarsRepository };
