import { ICreateRentalDTO } from "../../dto/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsReposiotyrInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = new Rental();
    Object.assign(newRental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });
    this.rentals.push(newRental);
    return newRental;
  }
  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }
}
export { RentalsReposiotyrInMemory };
