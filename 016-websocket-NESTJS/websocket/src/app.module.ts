import { Module } from '@nestjs/common';
import { BookCommentsModule } from './book-comments/book-comments.module';
import { BookCommentsGatewayModule } from './book-comments-gateway/book-comments-gateway.module';

@Module({
  imports: [BookCommentsModule, BookCommentsGatewayModule],
})
export class AppModule {}
