import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
          ],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class Users implements OnInit {

  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/data/user.json').subscribe(data => {
      this.users = data;
      console.log('JSON chargé', this.users);
    });
  }
}
