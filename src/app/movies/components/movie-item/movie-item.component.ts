import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Movie } from '../../model/movie';

export interface CommentUpdate {
  id: string;
  newComment: string;
}

@Component({
  selector: 'ngi-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnChanges {
  @Input() public movie: Movie;
  @Input() public editable = true;
  @Output() public commentUpdate = new EventEmitter<CommentUpdate>();
  @Output() public movieDelete = new EventEmitter<string>();

  public commentSaved: boolean;
  public movieComment: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.movie) {
      this.movieComment = changes.movie.currentValue.comment;
      this.commentSaved = this.movieComment.length > 0;
    }
  }

  public wordCount(comment: string): number {
    if (!comment || comment.length === 0) {
      return 0;
    } else {
      return comment.trim().replace(/  +/g, ' ').split(' ').length;
    }
  }

  public saveComment(): void {
    if (!this.commentSaved) {
      this.commentUpdate.emit({
        id: this.movie.id,
        newComment: this.movieComment,
      });
    } else {
      this.commentSaved = false;
    }
  }

  public clearComment(): void {
    this.commentUpdate.emit({
      id: this.movie.id,
      newComment: '',
    });
  }
}
