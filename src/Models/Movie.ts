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
    directors: Crew[];
    screenWriters: Crew[];
    scriptWriters: Crew[];
    actors: Crew[];
}