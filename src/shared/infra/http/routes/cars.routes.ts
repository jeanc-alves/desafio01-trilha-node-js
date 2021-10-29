import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListaAvailableCarsController'


import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

let createCarController = new CreateCarController()
let listaAvailableCarsController = new ListAvailableCarsController()

carsRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
)

carsRoutes.get("/available", listaAvailableCarsController.handle)

export { carsRoutes }

