import { Component, OnInit } from '@angular/core';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';
import { Cocktail } from 'src/app/cocktail.model';
import slugify from '@sindresorhus/slugify';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  cocktails: Cocktail[] = [];
  
  constructor(private cocktailService: CocktailServiceService) {}

  ngOnInit() {
    this.cocktailService.getCocktailsStartingWithA().subscribe((data: any) => {
      this.cocktails =  data.drinks.map((cocktail: any) => this.cocktailService.transformDrink(cocktail))
    })
  }
}
