import { Router } from "express";

import { CreateRentalCroller } from "@modules/rentals/UseCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/UseCases/DevolutionsRental/DevolutionRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { ListRentalsByUserController } from "../../../../modules/rentals/UseCases/ListRentalByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalCroller = new CreateRentalCroller();

const devolutionRentalController = new DevolutionRentalController();

const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalCroller.handle);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
