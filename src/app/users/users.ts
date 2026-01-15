import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class Users implements OnInit {

  private users: any[] = [];   // tableau interne
  users$!: Observable<any[]>;  // observable exposé au template

  showModal = signal(false);

  newUser = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    adresse: '',
    birthdate: ''
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    // Charger les utilisateurs depuis le JSON
    this.http.get<any[]>('/data/user.json').subscribe(data => {
      this.users = data.map(u => ({
        ...u,
        age: this.userService.calculerAge(u.birthdate)
      }));
      this.updateObservable();
    });
  }

  // Méthode pour mettre à jour l'observable
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

  ajouterUtilisateur() {
    const nextId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;

    const userToAdd = {
      ...this.newUser,
      id: nextId,
      age: this.userService.calculerAge(this.newUser.birthdate)
    };

    this.users.push(userToAdd);
    this.updateObservable();
    this.closeModal();

    // Réinitialiser le formulaire
    this.newUser = { id: 0, nom: '', prenom: '', email: '', tel: '', adresse: '', birthdate: '' };
  }
}
