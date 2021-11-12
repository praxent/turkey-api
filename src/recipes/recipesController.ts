import { Body, Controller, Get, Path, Post, Delete, Query, Res, Route, SuccessResponse, TsoaResponse } from 'tsoa'
import { Recipe } from './recipe'
import { RecipesService, RecipeCreationParams } from './recipesService'

@Route('Recipes')
export class RecipesController extends Controller {
  private recipesService;

  constructor() {
    super();
    this.recipesService = new RecipesService();
  }

  @Get('{RecipeId}')
  public async getRecipe(
    @Path() RecipeId: number,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Recipe | string> {
    const recipe = this.recipesService.getById(RecipeId);
    if (!recipe) {
      return notFoundResponse(404, { reason: "No turkeys found! :(" });
    }
    return recipe;
  }

  @Get('')
  public async getRecipeByName(@Query() name?: string): Promise<Recipe[]> {
    if (name)
      return this.recipesService.listByName(name)
    else
      return this.recipesService.listAll();
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createRecipe(@Body() requestBody: RecipeCreationParams): Promise<Recipe> {
    this.setStatus(201)
    return this.recipesService.create(requestBody)
  }

  @SuccessResponse('204', 'Deleted')
  @Delete('{RecipeId}')
  public async deleteRecipe(
    @Path() RecipeId: number,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<string | void> {
    const recipe = this.recipesService.deleteById(RecipeId);
    if (!recipe) {
      return notFoundResponse(404, { reason: "No turkeys found! :(" });
    }
    return;
  }
  
}