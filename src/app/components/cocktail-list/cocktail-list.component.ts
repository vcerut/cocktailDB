import { Component, OnInit } from '@angular/core';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';
import { Cocktail } from 'src/app/cocktail.model';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  cocktails: Cocktail[] = [];
  filteredCocktails: Cocktail[] = []; // Add a new array for filtered cocktails
  showAlcoholicOnly: boolean = false;

  constructor(private cocktailService: CocktailServiceService) {}

  ngOnInit() {
    this.getCocktailsByLetter('A');
  }

  getCocktailsByLetter(letter: string) {
    this.cocktailService.getCocktailsStartingWithLetter(letter).subscribe((data: any) => {
      this.cocktails = data.drinks.map((cocktail: any) => this.cocktailService.transformDrink(cocktail));
      this.filteredCocktails = [...this.cocktails]; 
      this.filterAlcoholicDrinks();
    });
  }

  onLetterClick(letter: string) {
    this.getCocktailsByLetter(letter);
  }

  onAlcoholicCheckboxChange() {
    this.filterAlcoholicDrinks();
  }

  filterAlcoholicDrinks() {
    if (this.showAlcoholicOnly) {
      this.filteredCocktails = this.cocktails.filter(cocktail => cocktail.alcoholic === 'Alcoholic');
    } else {
      this.filteredCocktails = [...this.cocktails];
    }
  }
}
