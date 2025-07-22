import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books: Book[] = [];
  newBookId: number = 0;
  newBookTitle: string = '';
  newBookAuthor: string = '';
  newBookRead: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  addBook(){
    if (!this.newBookTitle.trim()) {
      return;
    }
    const book = {
      id: this.newBookId,
      title: this.newBookTitle,
      author: this.newBookAuthor,
      read: false
    };

    this.bookService.createBook(book).subscribe(newBook => { this.books.push(newBook);
       this.newBookId = 0;
      this.newBookTitle = '';
      this.newBookAuthor = '';
      this.newBookRead = false;
     
  } );
}
  updateBook(book: Book) {
    this.bookService.updateBook(book).subscribe(updatedBook => {
      const index = this.books.findIndex(b => b.id === updatedBook.id);
      if (index !== -1) {
        this.books[index] = updatedBook;
      }
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({ next: () => this.books.filter(book => book.id !== id),
      error: (err) => console.error('Error deleting book:', err)
    });
  }
}