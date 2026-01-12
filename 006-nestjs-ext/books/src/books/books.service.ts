import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './interfaces/dto/create-book';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [
    { name: 'Богатый папа бедный папа', author: 'Ya' },
  ];

  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return await this.BookModel.find().exec();
  }

  async findById(id: string): Promise<BookDocument | null> {
    return this.BookModel.findById(id).exec();
  }

  create(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);

    return book.save();
  }

  async updateBook(id: string, data: CreateBookDto): Promise<Book | null> {
    return await this.BookModel.findByIdAndUpdate(id, data);
  }

  async deleteBook(id: string) {
    return await this.BookModel.findByIdAndDelete(id);
  }
}
