import { Seat } from "./Seat";

export class Screening {
    
    id: number;
    time: Date;
    movie: string;
    ageRating: string;
    theater: string;
    seats: Seat;
}