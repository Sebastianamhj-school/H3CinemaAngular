import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-create-box',
  templateUrl: './create-box.component.html',
  styleUrls: ['./create-box.component.scss']
})
export class CreateBoxComponent implements OnInit {
  @Output() createClicked = new EventEmitter<string>();

  @Input() box: string;
  


  constructor() { }

  ngOnInit(): void {
  }

  boxClicked() {
    console.log('clicked?');
    this.createClicked.emit('create');
  }

}
