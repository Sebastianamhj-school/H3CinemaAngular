import { Customer } from "./Customer";

export class Seat {
    id: number;
    rowNumber: number;
    seatNumber: number;
    isBooked: boolean;
    customer: Customer;
}
