import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookListComponent } from './book-list/book-list.component';
import { authGuard } from './auth.guard';
import { noAuthGuard } from './no-auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: 'login',
        // loadComponent: () => import('./login/login.component')
        component: LoginComponent,
        canActivate: [noAuthGuard]
    },
    {
        path: 'book-list', 
        component: BookListComponent,
        canActivate: [authGuard]
    }
];
