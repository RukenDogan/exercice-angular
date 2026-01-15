import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AddUserComponent } from '../add-user/add-user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AddUserComponent],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class Users implements OnInit {
  private users: any[] = [];
  users$!: Observable<any[]>;  // observable exposé au template
  showModal = signal(false);

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/data/user.json').pipe(
      map(users => users.map(u => ({
        ...u,
        age: this.userService.calculerAge(u.birthdate)
      })))
    ).subscribe(data => {
      this.users = data;
      this.updateObservable();
    });
  }

  private updateObservable() {
    this.users$ = of(this.users);
  }

  supprimer(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    this.updateObservable();
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  ajouterUtilisateur(user: any) {
    const nextId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const userToAdd = {
      ...user,
      id: nextId,
      age: this.userService.calculerAge(user.birthdate)
    };
    this.users.push(userToAdd);
    this.updateObservable();
  }
}
