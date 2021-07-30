import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string;
    descripition: string
}

class CategoriesRepository {
    private categories: Category[] = [];

    constructor() {
        this.categories = []
    }

    create({ descripition, name }: ICreateCategoryDTO): void {
        const category = new Category()

        Object.assign(category, {
            name,
            descripition,
            created_at: new Date()
        })

        this.categories.push(category)
    }
    list(): Category[] {
        return this.categories
    }

    findCategorybyName(name: string) {
        return this.categories.find((category) => category.name === name)
    }
}

export { CategoriesRepository }