import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { ScreeningComponent } from './pages/screening/screening.component';

const routes: Routes = [
  { path: '', redirectTo: '/front-page', pathMatch: 'full' },
  { path: 'front-page', component: FrontPageComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'screening/:id', component: ScreeningComponent },
  { path: "**", component: FrontPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
