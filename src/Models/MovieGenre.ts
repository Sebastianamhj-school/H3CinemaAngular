import { Genre } from "./Genre";

export class MovieGenre {
  constructor(
      public movieId: number,
      public genreId: number,
      public genre: Genre
      //Help! MovieGenre har genre og genre har movieGenre?
  ) {}
}
