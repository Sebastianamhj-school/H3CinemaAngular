import { Component, Input, OnInit, HostListener, ElementRef } from '@angular/core';
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

  inputValue: string = "";
  optionsVisible: boolean = false;

  ngOnInit(): void {
    
  }

  @HostListener('document:click', ['$event'])
  clickout(event :Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.optionsVisible = false;
    }
  }

  getValue(item: AutoComplete): void {
    this.inputValue = item.value;
    this.optionsVisible = false;
  }

  onFocusInput(): void {
    this.optionsVisible = true;
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