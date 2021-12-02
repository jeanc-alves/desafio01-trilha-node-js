import { Router } from "express";

import { CreateRentalCroller } from "@modules/rentals/UseCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/UseCases/DevolutionsRental/DevolutionRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalCroller = new CreateRentalCroller();

const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalCroller.handle);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };
