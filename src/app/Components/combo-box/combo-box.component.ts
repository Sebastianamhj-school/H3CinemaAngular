import { Component, Input, OnInit, EventEmitter, ElementRef, Output } from '@angular/core';
import { AutoComplete } from 'src/Models/AutoComplete';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent implements OnInit {

  constructor(private eRef: ElementRef) { }
  
  @Input()
  content: AutoComplete[] = null;

  @Input()
  threshhold: number = 1;

  @Output()
  selectedId = new EventEmitter<number>();

  inputValue: string = "";

  ngOnInit(): void {
    
  }

  getValue(item: AutoComplete): void {
    this.inputValue = item.value;
    this.selectedId.emit(item.id);
  }

  filterOptions(input: string): AutoComplete[] {
    if (!this.content) {
      return null;
    }

    let filter = this.content.filter(val => val.value.toLowerCase().includes(input.toLowerCase()));
    if (this.inputValue.length < this.threshhold) {
      return null;
    }

    return filter;
  }
}