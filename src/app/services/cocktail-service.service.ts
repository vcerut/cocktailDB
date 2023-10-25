import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import slugify from '@sindresorhus/slugify';
// import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CocktailServiceService {
  private drinkId: number = 0;

  constructor(private http: HttpClient) { }

  getCocktailsStartingWithA() {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  }

  getCocktailDetails(drinkId: number) {
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;

    return this.http.get(apiUrl);
  }


  transformDrink(drink: any) {
    return {
      id: drink.idDrink,
      name: drink.strDrink,
      thumbnail: drink.strDrinkThumb,
      tag: drink.strTags,
      alcoholic: drink.strAlcoholic,
      category: drink.strCategory,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      slug:  slugify(drink.strDrink),
      ingredients:  Array.from({length: 15}, (_, i) => i + 1)
          .map((i) => ({
            'name': drink[`strIngredient${i}`],
            'measure': drink[`strMeasure${i}`]
          })) 
          .filter((i) => i.name!==null),
    }
  }
}