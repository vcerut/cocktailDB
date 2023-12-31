import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import slugify from '@sindresorhus/slugify';
import { Cocktail } from 'src/app/cocktail.model';
import { CocktailServiceService } from 'src/app/services/cocktail-service.service';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss'],
})
export class CocktailDetailsComponent implements OnInit {
  headers: any;
  cocktail: Cocktail | undefined;

  drinkId: number = -1;
  paramsSub: any;
  httpSub: any;
  activatedRoute: any;
  currentLanguage: any;
  tags: string[] = [];

  setCurrentLanguage(language: any) {
    this.currentLanguage = language;
  }

  splitTags(cocktail: Cocktail | undefined): string[] {
    if (cocktail && cocktail.tag && typeof cocktail.tag === 'string') {
      return cocktail.tag.split(',').map((tag) => tag.trim());
    }
    return [];
  }

  constructor(
    private route: ActivatedRoute,
    private getCocktailDetailsService: CocktailServiceService
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((params) => {
      const [id, ...slug] = params['id'].split('-');
      this.drinkId = +id;
      this.httpSub = this.getCocktailDetailsService
        .getCocktailDetails(this.drinkId)
        .subscribe(
          (data: any) => {
            this.cocktail = data.drinks
              ? this.getCocktailDetailsService.transformDrink(data.drinks[0])
              : undefined;
            this.tags = this.splitTags(this.cocktail);
          }
        );
      return this.drinkId;
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.httpSub.unsubscribe();
  }
}
