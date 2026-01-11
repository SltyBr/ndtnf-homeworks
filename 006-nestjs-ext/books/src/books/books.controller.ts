import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from './schemas/book.schema';
import * as createBook from './interfaces/dto/create-book';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll() {
    return await this.booksService.findAll();
  }

  @Post()
  create(@Body() body: createBook.CreateBookDto): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    return await this.booksService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() body: createBook.CreateBookDto,
  ) {
    return await this.booksService.updateBook(id, body);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.deleteBook(id);
  }
}
