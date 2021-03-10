import { Crew } from './Crew';

export class Movie {
    constructor(
        public Id: number,
        public Title: string,
        public Runtime: number,
        public Rating: number,
        public AgeRating: string,
        public ImgUrl: string,
        public ReleaseDate: string,
        public Genre: string[],
        public Directors: Crew[],
        public ScreenWriters: Crew[],
        public ScriptWriters: Crew[],
        public Actors: Crew[]
    ) { }
}