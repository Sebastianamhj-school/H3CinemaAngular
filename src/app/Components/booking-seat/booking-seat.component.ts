import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Seat } from 'src/Models/Seat';

@Component({
  selector: 'app-booking-seat',
  templateUrl: './booking-seat.component.html',
  styleUrls: ['./booking-seat.component.scss']
})
export class BookingSeatComponent implements OnInit {

  @Input()
  seats: Seat[];

  @Input()
  bookingAmount: number;

  @Output()
  selectedSeatEvent = new EventEmitter<Seat>();
  selectedSeat: Seat;

  rows: Seat[][];

  ngOnInit(): void {
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

  // get the appropiate class for a seat.
  getClass(seat: Seat) : string {
    let cls: string = 'free'; // Green

    if (seat.isBooked) {
      cls = 'occupied'; // Red
    }
    else if (seat === this.selectedSeat) {
      cls = 'selected'; // Blue
    }

    return cls;
  }

  // Sets the selected seat, callback from click event.
  setSelectSeat(seat: Seat) : void {
    if (seat.isBooked != true && this.selectedSeat != seat) {
      this.selectedSeat = seat;
      this.selectedSeatEvent.emit(seat);
    }
  }

  // Temp, can be deleted when done.
  getLocation(seat:Seat): string {
    return `${seat.rowNumber}.${seat.seatNumber}`
  }
}