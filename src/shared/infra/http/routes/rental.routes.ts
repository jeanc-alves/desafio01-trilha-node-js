import { Router } from "express";

import { CreateRentalCroller } from "../../../../modules/rentals/UseCases/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalCroller = new CreateRentalCroller();

rentalRoutes.post("/", ensureAuthenticated, createRentalCroller.handle);

export { rentalRoutes };
