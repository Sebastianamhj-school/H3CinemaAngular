import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { ScreeningComponent } from './pages/screening/screening.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/front-page', pathMatch: 'full' },
  { path: 'front-page', component: FrontPageComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'screening/:id', component: ScreeningComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: "**", component: FrontPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
