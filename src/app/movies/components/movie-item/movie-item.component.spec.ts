import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { Movie } from '../../model/movie';
import { MovieItemComponent } from './movie-item.component';
import { WordCountPipe } from '../../pipes/word-count.pipe';

const MockMovie: Movie = {
  id: '1',
  title: 'Star Wars Episode IX: The Rise of Skywalker',
  year: '2019',
  genre: 'Action, Adventure, Fantasy',
  plot: 'The surviving Resistance faces the First Order once more in the final chapter of the Skywalker saga.',
  poster:
    'https://images-na.ssl-images-amazon.com/images/I/91rKEgY1qDL._SY679_@@._V1_SX300.jpg',
  comment: '',
};

@Component({
  template: `
    <ngi-movie-item
      [movie]="movie"
      (commentUpdate)="update($event)"
    ></ngi-movie-item>
  `,
})
class TestMovieItemComponent {
  public movie = { ...MockMovie };
  public update(event: any) {}
}

describe('MovieItemComponent', () => {
  let component: TestMovieItemComponent;
  let fixture: ComponentFixture<TestMovieItemComponent>;
  let movieItemDe: DebugElement;
  let saveCommentBtn: HTMLButtonElement;
  let commentElement: HTMLTextAreaElement;
  let clearCommentBtn: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestMovieItemComponent, MovieItemComponent, WordCountPipe],
      imports: [RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMovieItemComponent);
    component = fixture.componentInstance;
    movieItemDe = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly display the movie title', () => {
    const titleElement = movieItemDe.query(
      By.css('[data-testId=title]')
    ).nativeElement;
    expect(titleElement.textContent).toContain(MockMovie.title);
  });

  it('should correctly dispatch an commentUpdate event when comment is cleared', () => {
    // Arrange
    clearCommentBtn = movieItemDe.query(
      By.css('[data-testId=clear-comment]')
    ).nativeElement;
    component.movie = {
      ...component.movie,
      comment: 'Comment',
    };

    fixture.detectChanges();

    spyOn(component, 'update');

    // Act
    clearCommentBtn.click();
    fixture.detectChanges();

    // Assert
    expect(component.update).toHaveBeenCalledWith({
      id: MockMovie.id,
      newComment: '',
    });
  });

  it('should correctly dispatch an commentUpdate event when comment is saved', () => {
    // Arrange
    saveCommentBtn = movieItemDe.query(
      By.css('[data-testId=save-comment]')
    ).nativeElement;
    commentElement = movieItemDe.query(
      By.css('[data-testId=comment]')
    ).nativeElement;

    spyOn(component, 'update');

    commentElement.value = 'Comment';
    commentElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Act
    saveCommentBtn.click();
    fixture.detectChanges();

    // Assert
    expect(component.update).toHaveBeenCalledWith({
      id: MockMovie.id,
      newComment: 'Comment',
    });
  });
});
