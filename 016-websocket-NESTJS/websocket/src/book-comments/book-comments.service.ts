import { Injectable } from '@nestjs/common';
import { BookCommentModel } from './models/book-comment.model';

@Injectable()
export class BookCommentsService {
  private comments: BookCommentModel[] = [];
  private currentId = 1;

  create(bookId: number, comment: string): BookCommentModel {
    const newComment = new BookCommentModel({
      id: this.currentId++,
      bookId,
      comment,
    });
    this.comments.push(newComment);
    return newComment;
  }

  findAll(): BookCommentModel[] {
    return this.comments;
  }

  findAllBookComment(bookId: number): BookCommentModel[] {
    return this.comments.filter(comment => comment.bookId === bookId);
  }

  findOne(id: number): BookCommentModel {
    return this.comments.find(comment => comment.id === id)!;
  }

  update(id: number, comment: string): BookCommentModel {
    const commentToUpdate = this.findOne(id);

    if (commentToUpdate) {
      commentToUpdate.comment = comment;
    }

    return commentToUpdate;
  }

  remove(id: number): boolean {
    const index = this.comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
      this.comments.splice(index, 1);
      return true;
    }
    return false;
  }
}
