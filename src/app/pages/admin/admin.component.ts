import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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
    genre: this.fb.array([]),
    description: [''],
    directors: this.fb.array([]),
    screenWriters: this.fb.array([]),
    scriptWriters: this.fb.array([]),
    actors: this.fb.array([]),
  });

  activeNavigation: string[] = this.navigationItems[0];
  movieId: number;
  ageRatingItem: AutoComplete;
  genreItem: AutoComplete;
  directorItem: AutoComplete;
  screenWriterItem: AutoComplete;
  scriptWriterItem: AutoComplete;
  actorItem: AutoComplete;

  constructor
  (
    private themeService: ThemeService,
    private api: APIService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  onNavigationItemClick(i: number) {
    this.activeNavigation = this.navigationItems[i];
  }
  addGenre() {
    /* this.genres.push(this.fb.control('')) */
    if (this.genreItem) {
      this.api.getGenreById(this.genreItem.id).subscribe(dataAPI => {
        //this.content = dataAPI;
        this.genres.push(this.fb.control(dataAPI.name));
        console.log(this.fb);
      });
    }
  }
  addDirector() {
    // if (this.directorItem) {
    //   this.api.getDirectorById(this.directorItem.id).subscribe(dataAPI => {
        
    //     this.directors.push(this.fb.control(dataAPI.name));
    //     console.log(this.fb);
    //   });
    // }
  }
  addScreenWriter() {
    // if (this.screenWriterItem) {
    //   this.api.getScreenWriterById(this.screenWriterItem.id).subscribe(dataAPI => {
        
    //     this.screenWriters.push(this.fb.control(dataAPI.name));
    //     console.log(this.fb);
    //   });
    // }
  }
  addScriptWriter() {
    // if (this.scriptWriterItem) {
    //   this.api.getScriptWriterById(this.scriptWriterItem.id).subscribe(dataAPI => {
        
    //     this.directors.push(this.fb.control(dataAPI.name));
    //     console.log(this.fb);
    //   });
    // }
  }
  addActor() {
    // if (this.actorItem) {
    //   this.api.getActorById(this.actorItem.id).subscribe(dataAPI => {
        
    //     this.directors.push(this.fb.control(dataAPI.name));
    //     console.log(this.fb);
    //   });
    // }
  }

  removeGenre(index: number) {
    this.genres.removeAt(index);
  }
  removeDirector(index: number) {
    this.directors.removeAt(index);
  }
  removeScreenWriter(index: number) {
    this.screenWriters.removeAt(index);
  }
  removeScriptWriter(index: number) {
    this.scriptWriters.removeAt(index);
  }
  removeActor(index: number) {
    this.actors.removeAt(index);
  }

  getValueFromComboBox(val) {
    this.genreItem = val;
  }
  getAgeRatingValue(val) {
    this.movieFormGroup.get('ageRating').setValue(val.id);
    console.log(this.movieFormGroup.get('ageRating').value);
  }

  get genres(): FormArray {
    return this.movieFormGroup.get("genre") as FormArray;
  }
  get directors(): FormArray {
    return this.movieFormGroup.get('directors') as FormArray;
  }
  get screenWriters(): FormArray {
    return this.movieFormGroup.get('screenWriters') as FormArray;
  }
  get scriptWriters(): FormArray {
    return this.movieFormGroup.get('scriptWriters') as FormArray;
  }
  get actors(): FormArray {
    return this.movieFormGroup.get('actors') as FormArray;
  }

  movieSubmit() {
    this.api.postMovie(this.movieFormGroup.value).subscribe((dataAPI) => {
      console.log("movie has been created");
    }, () => {
      console.log("error on movie creation");
    });
  }

}
