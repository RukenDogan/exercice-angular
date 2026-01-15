import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  newUser = {
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    adresse: '',
    birthdate: ''
  };

  submit() {
    this.userAdded.emit(this.newUser);
    this.close.emit();
    this.reset();
  }

  reset() {
    this.newUser = { nom: '', prenom: '', email: '', tel: '', adresse: '', birthdate: '' };
  }
}
