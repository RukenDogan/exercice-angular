import { Routes } from '@angular/router';
import { Users } from './users/users';
import { UserDetail } from './user-detail/user-detail';

export const routes: Routes = [
    { path: '', component: Users },
    { path: 'users/:id', component: UserDetail }
];
