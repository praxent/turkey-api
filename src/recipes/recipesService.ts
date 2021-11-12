import { Recipe } from './recipe'
const JSONdb = require('simple-json-db')
const db = new JSONdb('./data/recipes.json')

// A post request should not contain an id.
export type RecipeCreationParams = Pick<Recipe, 'temp' | 'name' | 'time' | 'img_url' | 'instructions'>

export class RecipesService {
  //public get(nameOrId: number): Recipe | null;
  //public get(nameOrId: string): Recipe | null;
  // public get(nameOrId: string | number | undefined): Recipe | Recipe[] {

  //   if (!nameOrId) {
  //     return this.listAll()
  //   }


  //   if (typeof nameOrId === "number") {
  //     return this.getById(nameOrId)
  //   }


  //   if (typeof nameOrId === "string") {
  //     const recipes = this.listAll()
  //     return recipes.filter((recipe: Recipe) => (recipe.name === nameOrId))
  //   }

  //   return []
  // }

  public listAll(): Recipe[] {
    return db.JSON()
  }

  public getById(id: number): Recipe | undefined {
    return db.get(id)
  }

  public listByName(name: string): Recipe[] {
    const recipes = this.listAll()
    return recipes.filter((recipe: Recipe) => (recipe.name === name))
  }

  public create(RecipeCreationParams: RecipeCreationParams): Recipe {
    const id = Math.floor(Math.random() * 10000)
    const recipe = {
      id: id,
      ...RecipeCreationParams,
    }
    db.set(id, recipe)
    return recipe
  }
}
