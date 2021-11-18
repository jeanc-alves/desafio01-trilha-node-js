import multer from "multer";
import { Router } from "express";
import uploadConfig from "@config/upload";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListaAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarsImagesController } from "../../../../modules/cars/useCases/uploadCarsImages/UploadCarImagesController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listaAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImagesController = new UploadCarsImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listaAvailableCarsController.handle);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarsImagesController.handle
);

export { carsRoutes };
