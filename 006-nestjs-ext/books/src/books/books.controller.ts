import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from './schemas/book.schema';
import * as createBook from './interfaces/create-book';
import { UpperCasePipe } from 'src/pipes/uppercase/uppercase.pipe';
import { CreateBookDto } from './interfaces/dto/create-book';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Query('test', new UpperCasePipe()) test: string) {
    console.log('test ', test);
    return await this.booksService.findAll();
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  create(@Body() body: CreateBookDto): Promise<BookDocument> {
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
