import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private readonly authService: AuthService,
              private readonly router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authorized = this.authService.isAuthorized();
    if (authorized) {
      await this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
