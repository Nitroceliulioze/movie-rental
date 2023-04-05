import { AbstractControl } from "@angular/forms";

export function passwordMatcher(c: AbstractControl): {[key: string] : boolean} | null {
    const passwordControl = c.get('password1');
    const confirmPassControl = c.get('password2');
  
    if (passwordControl?.pristine || confirmPassControl?.pristine) {
      return null
    }
  
    if(passwordControl?.value === confirmPassControl?.value) {
      return null
    }
    return { 'match': true}
  }