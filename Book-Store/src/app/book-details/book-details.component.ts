import { Component, OnInit } from '@angular/core';
import { Ibook } from 'books';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Ibook;
  
  constructor() { }

  ngOnInit(): void {
  }

}
