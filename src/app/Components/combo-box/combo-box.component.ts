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
  selectedId = new EventEmitter<number>();

  @ViewChild('SearchInput', { static: true })
  SearchInput: ElementRef;

  @Input()
  type: string;

  content: AutoComplete[] = [];

  ngOnInit(): void {
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.api.getAutoComplete(this.type , text).subscribe(dataAPI => {
        this.content = dataAPI;
      });
    });
  }

  getValue(item: AutoComplete): void {
    this.SearchInput.nativeElement.value = item.value;
    this.content = null;
    this.selectedId.emit(item.id);
  }

  onEnter(): void{
    if (this.content.length > 0) {
      this.SearchInput.nativeElement.value = this.content[0].value;
      this.selectedId.emit(this.content[0].id);
      this.content = null;
    }
    
  }
}