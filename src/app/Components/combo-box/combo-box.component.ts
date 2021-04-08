import { Component, Input, OnInit, EventEmitter, ElementRef, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
import { AutoComplete } from 'src/Models/AutoComplete';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent implements OnInit {

  constructor(private api: APIService) { }
  
  @Output()
  selectedItem = new EventEmitter<AutoComplete>();

  // Gets a element from HTML.
  @ViewChild('SearchInput', { static: true })
  SearchInput: ElementRef;

  // The model that is used for the API call.
  @Input()
  type: string;

  // The list of autocomplete options
  content: AutoComplete[] = [];

  // Creates an event that listens for inputs in the "SearchInput" element.
  ngOnInit(): void {
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      // limits the amount of times it can be called.
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      // makes an api call with the last input, returns an option of auto complete options.
      this.api.getAutoComplete(this.type , text).subscribe(dataAPI => {
        this.content = dataAPI;
      });
    });
  }

  // takes and send the output if you click on one of the options.
  getValue(item: AutoComplete): void {
    this.SearchInput.nativeElement.value = item.value;
    this.content = null;
    this.selectedItem.emit(item);
  }

  // takes and send the first option if you click enter
  onEnter(): void{
    if (this.content.length > 0) {
      this.SearchInput.nativeElement.value = this.content[0].value;
      this.selectedItem.emit(this.content[0]);
      this.content = null;
    }
  }
}