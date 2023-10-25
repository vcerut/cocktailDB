import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component';
import { CocktailDetailsComponent } from './components/cocktail-details/cocktail-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: CocktailListComponent },
  { path: 'drink/:id', component: CocktailDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
