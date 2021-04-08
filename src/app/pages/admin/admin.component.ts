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
  isEditing: boolean;
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
    this.movieFormGroup.get('ageRating').setValue(val.value);
    console.log(this.movieFormGroup.get('ageRating').value);
  }

  getEditMovieId(val) {
    this.isEditing = true;
    this.api.getMovieSpecific(val.id).subscribe((dataAPI) => {
      console.log(dataAPI);
      this.movieId = dataAPI.id;
      this.movieFormGroup.get('title').setValue(dataAPI.title);
      this.movieFormGroup.get('runtime').setValue(dataAPI.runtime);
      this.movieFormGroup.get('rating').setValue(dataAPI.rating);
      this.movieFormGroup.get('ageRating').setValue(dataAPI.ageRating);
      this.movieFormGroup.get('imgUrl').setValue(dataAPI.imgUrl);
      this.movieFormGroup.get('releaseDate').setValue(dataAPI.releaseDate.toDateString);
      for (let index = 0; index < dataAPI.genre.length; index++) {
        this.genres.push(this.fb.control(dataAPI.genre[index]));
      }
      this.movieFormGroup.get('description').setValue(dataAPI.description);
    })
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
    if (!this.isEditing) {
      this.api.postMovie(this.movieFormGroup.value).subscribe((dataAPI) => {
        console.log("movie has been created");
      }, () => {
        console.log("error on movie creation");
      });
    } else {
      let tempForm = this.fb.group({
        id: [this.movieId],
        title: [this.movieFormGroup.get('title').value],
        runtime: [this.movieFormGroup.get('runtime').value],
        rating: [this.movieFormGroup.get('rating').value],
        ageRating: [this.movieFormGroup.get('ageRating').value],
        imgUrl: [this.movieFormGroup.get('imgUrl').value],
        releaseDate: [this.movieFormGroup.get('releaseDate').value],
        genre: this.fb.array([this.movieFormGroup.get('genre').value]),
        description: [this.movieFormGroup.get('description').value],
        directors: this.fb.array([]),
        screenWriters: this.fb.array([]),
        scriptWriters: this.fb.array([]),
        actors: this.fb.array([]),
      })
      this.api.updateMovie(tempForm.value).subscribe((dataAPI) => {
        console.log('movie was update i guess');
      }, () => {
        console.log('error on movie update');
      });
    }
  }

  deleteMovie() {
    this.api.deleteMovie(this.movieId).subscribe((dataAPI) => {
      console.log("delete happend i guess");
    })
  }

}
