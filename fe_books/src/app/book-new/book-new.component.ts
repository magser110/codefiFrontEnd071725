import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-new',
  imports: [ReactiveFormsModule],
  templateUrl: './book-new.component.html',
  styleUrl: './book-new.component.scss'
})
export class BookNewComponent {
  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    read: new FormControl('', [Validators.required]),
    cover_image: new FormControl('', [Validators.required])
  });

  selectedFile: File | null = null;

  constructor(private bookService: BookService, private router: Router) {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    this.bookService.createBook(this.bookForm.value).subscribe({
      next: (book: Book) => {
        console.log('Book created', book);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error creating book', error)
      }
    });
  }
}
