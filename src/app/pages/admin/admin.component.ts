import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AutoComplete } from 'src/Models/AutoComplete';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  navigationItems = [
    ['Movies', 'square'],
    ['Screenings', 'square'],
    ['Users', 'circle'], 
    ['Customers', 'circle'], 
    ['Bookings', 'square']
  ];

  movieFormGroup = this.fb.group({
    title: [''],
    runtime: [''],
    rating: [''],
    ageRating: [''],
    imgUrl: [''],
    releaseDate: [''],
    genre: this.fb.array([
      this.fb.control('')
    ]),
    description: [''],
  });

  activeNavigation: string[] = this.navigationItems[0];
  movieId: number;
  status: string;

  constructor
  (
    private themeService: ThemeService,
    private apiService: APIService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    
  }

  exitCreate() {
    this.status = "null";
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  onNavigationItemClick(i: number) {
    this.status = "null";
    this.activeNavigation = this.navigationItems[i];
  }

  receiveBoxClicked(event) {
    this.status = event;
  }

  addGenre() {
    this.genres.push(this.fb.control(''))
  }

  removeGenre(genreIndex: number) {
    this.genres.removeAt(genreIndex);
  }

  get genres(): FormArray {
    return this.movieFormGroup.get("genre") as FormArray;
  }

  movieSubmit() {
    console.log(this.movieFormGroup.get("genre")["controls"]);
  }

}
