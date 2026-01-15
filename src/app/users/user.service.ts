import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // accessible partout
})
export class UserService {

  constructor() {}

  calculerAge(birthdate: string): number | null {
    if (!birthdate) return null; // pas de date
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
}
