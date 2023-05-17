import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
  
    // private recipes: Recipe[] = [
    //     new Recipe(
    //       'A Test Recipe', 
    //       'This is simply a test', 
    //       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //       [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French FRies', 20)
    //       ]),
    //     new Recipe(
    //       'Another Test Recipe', 
    //       'This is simply a test', 
    //       'https://upload.wikimedia.org/wikipedia/commons/2/2a/Spaghetti_al_Pomodoro.JPG',
    //       [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //       ])
    //   ];

      private recipes: Recipe[] = [];

      //'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      //'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',

      constructor(private slService: ShoppingListService){
      }

      setRecipes( recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes()  {
        return this.recipes.slice();
      }


      getRecipe(index: number){
        return this.recipes.slice()[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }


      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

}