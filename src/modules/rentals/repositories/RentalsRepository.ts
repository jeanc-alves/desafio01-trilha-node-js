import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../dto/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "./IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id, end_date: null } });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return openByUser;
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    });
    await this.repository.save(rental);
    return rental;
  }
  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
  }
}
export { RentalsRepository };
