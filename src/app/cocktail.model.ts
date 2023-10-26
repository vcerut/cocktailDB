export interface Cocktail {
  id: number;
  name: string;
  thumbnail: string;
  tag: string;
  alcoholic: string;
  category: string;
  ingredients: any[] | undefined;
  glass: string;
  instructions: string;
  slug: string;
}
