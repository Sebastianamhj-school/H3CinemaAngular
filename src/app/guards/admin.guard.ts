import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        //console.log("Guard reached");
        if (this.tokenService.isTokenValid()) {
            var admin = this.tokenService.isAdmin();
            //console.log("Token is valid");
            if (admin) {
                return true;
            } else {
                this.router.navigate(['/front-page'], { queryParams: { returnUrl: state.url}});
                return false;
            }
        } else {
            //console.log("Token is invalid");
            this.router.navigate(['/front-page'], { queryParams: { returnUrl: state.url}});
            return false;
        }

    }

    constructor(
        private router: Router,
        private tokenService: TokenStorageService
    ) {}
}