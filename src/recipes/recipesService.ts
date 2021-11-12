import { Recipe } from './recipe'
const JSONdb = require('simple-json-db')
const db = new JSONdb('./data/recipes.json')

// A post request should not contain an id.
export type RecipeCreationParams = Pick<Recipe, 'temp' | 'name' | 'time' | 'imgUrl' | 'instructions'>

export class RecipesService {
  public listAll(): Recipe[] {
    const recipes = Object.values<Recipe>(db.JSON())
    return recipes
  }

  public getById(id: number): Recipe | undefined {
    return db.get(id)
  }

  public listByName(name: string): Recipe[] {
    const recipes = this.listAll()
    return recipes.filter((recipe: Recipe) => (recipe.name.toLowerCase().trim().indexOf(name.toLowerCase().trim()) > -1))
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

  public deleteById(id: number): Recipe | undefined {
    return db.delete(id)
  }
}
