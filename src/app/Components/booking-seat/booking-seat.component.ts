import { Component, Input, OnInit } from '@angular/core';
import { Seat } from 'src/Models/Seat';

@Component({
  selector: 'app-booking-seat',
  templateUrl: './booking-seat.component.html',
  styleUrls: ['./booking-seat.component.scss']
})
export class BookingSeatComponent implements OnInit {

  @Input()
  seats: Seat[];

  rows: Seat[][];
  selectedSeat: Seat;

  ngOnInit(): void {
    this.seats = new Array<Seat>();
    this.seats.push({ id: 1, rowNumber: 1, seatNumber: 1, isBooked: true, customer: null });
    this.seats.push({ id: 2, rowNumber: 1, seatNumber: 2, isBooked: true, customer: null });
    this.seats.push({ id: 3, rowNumber: 1, seatNumber: 3, isBooked: false, customer: null });
    this.seats.push({ id: 4, rowNumber: 1, seatNumber: 4, isBooked: false, customer: null });
    this.seats.push({ id: 5, rowNumber: 2, seatNumber: 1, isBooked: false, customer: null });
    this.seats.push({ id: 6, rowNumber: 2, seatNumber: 2, isBooked: false, customer: null });
    this.seats.push({ id: 7, rowNumber: 2, seatNumber: 3, isBooked: false, customer: null });
    this.seats.push({ id: 8, rowNumber: 2, seatNumber: 4, isBooked: false, customer: null });
    this.seats.push({ id: 9, rowNumber: 3, seatNumber: 1, isBooked: false, customer: null });
    this.seats.push({ id: 10, rowNumber: 3, seatNumber: 2, isBooked: false, customer: null });
    this.seats.push({ id: 11, rowNumber: 3, seatNumber: 3, isBooked: false, customer: null });
    this.seats.push({ id: 12, rowNumber: 3, seatNumber: 4, isBooked: false, customer: null });

    // Get the highest row and seat number from the input.
    let rowAmount = Math.max.apply(Math, this.seats.map(function (o) { return o.rowNumber; }))
    let seatAmount = Math.max.apply(Math, this.seats.map(function (o) { return o.seatNumber; }))

    // Fills out an empty array as to not got null references when assigning to it.
    this.rows = new Array(rowAmount).fill(null)
    .map(() => new Array<Seat>(seatAmount).fill(null));

    // Populates the 2dimentional array.
    this.seats.forEach(item => {
      this.rows[item.rowNumber - 1][item.seatNumber - 1] = item;
    });
  }

  // get the appropiate color for a seat.
  getColor(seat: Seat) : string {
    let color: string = 'lightgray';

    if (seat.isBooked) {
      color = 'red';
    }
    else if (seat === this.selectedSeat) {
      color = 'limegreen';
    }

    return color;
  }

  // Sets the selected seat, callback from click event.
  setSelectSeat(seat: Seat) : void {
    if (seat.isBooked != true) {
      this.selectedSeat = seat;
    }
  }

  // Temp, can be deleted when done.
  getLocation(seat:Seat): string {
    return `${seat.rowNumber}.${seat.seatNumber}`
  }
}