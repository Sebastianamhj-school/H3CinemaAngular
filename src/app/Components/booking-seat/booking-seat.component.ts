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
  selectedSeatsEvent = new EventEmitter<Seat[]>();
  statusMessage: string = "";
  selectedSeats: Seat[] = [];
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
    else if (this.selectedSeats.includes(seat)) {
      cls = 'selected'; // Blue
    }

    return cls;
  }

  setSelectSeat(seat: Seat, row: Seat[]): void {
    let tempSeats = [];
    let seatIndex = row.indexOf(seat);

    for (let i = 0; i < this.bookingAmount; i++) {
      if (row[seatIndex + i]) {
        tempSeats[i] = this.getSeat(row[seatIndex + i]);
      } else {
        tempSeats[i] = null;
      }
    }
    if (!tempSeats.includes(null)) {
      this.selectedSeats = tempSeats;
      this.statusMessage = ""
      this.selectedSeatsEvent.emit(this.selectedSeats);
    } else {
      this.statusMessage = "Can't select this seat."
    }
  }

  private getSeat(seat: Seat): Seat{
    if (seat.isBooked != true) {
      return seat;
    }
    return null;
  }

  // Temp, can be deleted when done.
  getLocation(seat:Seat): string {
    return `${seat.rowNumber}.${seat.seatNumber}`
  }
}