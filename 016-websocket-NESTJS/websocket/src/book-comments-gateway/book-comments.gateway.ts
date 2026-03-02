import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BookCommentsService } from '../book-comments/book-comments.service';
import { BookCommentModel } from '../book-comments/models/book-comment.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BookCommentsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('getAllComments')
  handleGetAllComments(
    @MessageBody() bookId: number,
    @ConnectedSocket() client: Socket,
  ): BookCommentModel[] {
    const comments = this.bookCommentsService.findAllBookComment(bookId);
    return comments;
  }

  @SubscribeMessage('addComment')
  handleAddComment(
    @MessageBody() data: { bookId: number; comment: string },
    @ConnectedSocket() client: Socket,
  ): BookCommentModel {
    const newComment = this.bookCommentsService.create(
      data.bookId,
      data.comment,
    );

    // Отправляем обновленный список комментариев всем клиентам
    this.server.emit('commentsUpdated', {
      bookId: data.bookId,
      comments: this.bookCommentsService.findAllBookComment(data.bookId),
    });

    return newComment;
  }
}
