import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class Users implements OnInit {

  users$!: Observable<any[]>;  // observable exposé au template

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.http.get<any[]>('/data/user.json').pipe(
      map(users => users.map(u => ({
        ...u,
        age: this.userService.calculerAge(u.birthdate) // ajoute directement l'âge
      })))
    );
  }

  supprimer(id: number) {
    this.users$ = this.users$.pipe(
      map(users => users.filter(u => u.id !== id))
    );
  }
}
