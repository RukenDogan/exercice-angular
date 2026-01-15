import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule,
  ],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.scss']
})
export class UserDetail implements OnInit {

  user: any = null;
  possessions: any[] = [];
  userId!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<any[]>('/assets/data/user.json').subscribe(users => {
      this.user = users.find(u => u.id === this.userId);

      this.possessions = [
        { nom: 'Ordinateur', valeur: 1200 },
        { nom: 'Téléphone', valeur: 800 }
      ];
    });
  }
}
