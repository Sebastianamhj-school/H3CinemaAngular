import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-box',
  templateUrl: './create-box.component.html',
  styleUrls: ['./create-box.component.scss']
})
export class CreateBoxComponent implements OnInit {
  @Input() box: string;
  @Input() formType: null;


  constructor() { }

  ngOnInit(): void {
  }

}
