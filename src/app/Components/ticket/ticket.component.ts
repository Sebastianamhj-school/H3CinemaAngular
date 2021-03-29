import { Component, Input, OnInit } from '@angular/core';
import { Booking } from 'src/Models/Booking';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input()
  ticket: Booking;

  ngOnInit(): void {
  }
}
