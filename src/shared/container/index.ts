import { container } from 'tsyringe'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'

import { IUSerRepository } from '@modules/accounts/repositories/IUserRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUSerRepository>(
    "UsersRepository",
    UsersRepository
)