import { Injectable } from '@nestjs/common';

export interface Book {
  name: string;
}

@Injectable()
export class BooksService {
  private readonly books: Book[] = [{ name: 'Богатый папа бедный папа' }];

  findAll(): Book[] {
    return this.books;
  }
}
