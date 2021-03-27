import { Crew } from './Crew';

export class Movie {
    id: number;
    title: string;
    runtime: number;
    rating: number;
    ageRating: string;
    imgUrl: string;
    releaseDate: Date;
    genre: string[];
    description: string;
    directors: Crew[];
    screenWriters: Crew[];
    scripWriters: Crew[];
    actors: Crew[];
}
