import { Component } from '@angular/core';
import { RouterModule, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BookListComponent } from './book-list/book-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, BookListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fe_books';
}
