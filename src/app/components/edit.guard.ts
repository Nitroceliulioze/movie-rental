import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanDeactivate<ProfileEditComponent> {
  canDeactivate(
    component: ProfileEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.editForm.dirty) {
        return confirm('All unsaved changes will be lost')
      }
    return true;
  }
  
}
