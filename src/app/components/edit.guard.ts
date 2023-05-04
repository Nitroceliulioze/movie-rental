import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@Injectable({
  providedIn: 'root',
})
export class EditGuard implements CanDeactivate<ProfileEditComponent> {
  canDeactivate(
    component: ProfileEditComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.editForm.dirty) {
      return confirm('All unsaved changes will be lost');
    }
    return true;
  }
}
