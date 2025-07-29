import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookListComponent } from './book-list/book-list.component';
import { authGuard } from './auth.guard';
import { noAuthGuard } from './no-auth.guard';
import { BookNewComponent } from './book-new/book-new.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((c)=> c.LoginComponent),
        // component: LoginComponent,
        canActivate: [noAuthGuard]
    },
    {
        path:'signup',
        component: SignupComponent,
        canActivate: [noAuthGuard]
    },
    {
        path: 'book-list', 
        component: BookListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'books/new',
        component: BookNewComponent,
        canActivate: [authGuard]
    }
];
