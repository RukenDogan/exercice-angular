import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class Users {

  // Observable qui contient les utilisateurs
  users$: Observable<any[]>;
  userLocal: any[] = [];

  constructor(private http: HttpClient) {
    this.users$ = this.http.get<any[]>('/data/user.json').pipe(
      map(users => {
        this.userLocal = [...users];
        return this.userLocal;
      })
    );
  }

  supprimer(user: any) {
    this.userLocal = this.userLocal.filter(u => u.id !== user.id);
  }
}