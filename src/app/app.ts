import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './users/users';

@Component({
  selector: 'app-root',
  imports: [
            RouterOutlet
        ],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('exercice-angular');
}
