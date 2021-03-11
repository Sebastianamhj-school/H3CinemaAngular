import { Crew } from './Crew';

export class Movie {
    constructor(
        public id: number,
        public title: string,
        public runtime: number,
        public rating: number,
        public ageRating: string,
        public imgUrl: string,
        public releaseDate: string,
        public genre: string[],
        public directors: Crew[],
        public screenWriters: Crew[],
        public scriptWriters: Crew[],
        public actors: Crew[]
    ) { }
}