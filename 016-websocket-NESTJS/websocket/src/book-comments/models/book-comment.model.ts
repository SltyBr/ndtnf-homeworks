export class BookCommentModel {
  id: number;
  bookId: number;
  comment: string;

  constructor({ id, bookId, comment } : { id: number, bookId: number, comment: string, }) {
    this.id = id;
    this.bookId = bookId;
    this.comment = comment;
  }
}