import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookNewComponent } from '../book-new/book-new.component';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule, BookNewComponent],
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


    loadingBooks(){
      this.bookService.getBooks().subscribe(books => this.books = books);
    }

  ngOnInit(): void {
    this.loadingBooks();
  }

  addBook(){
    if (!this.newBookTitle.trim()) {
      return;
    }
    const book = {
      id: this.newBookId,
      title: this.newBookTitle,
      author: this.newBookAuthor,
      read: this.newBookRead
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
    console.log(id)
    this.bookService.deleteBook(id).subscribe({ next: () => {
      console.log('Delete successful, filtering books');
      this.books = this.books.filter(book => book.id !== id);  
    },
      error: (err) => console.error('Error deleting book:', err)
    });
  }
}
