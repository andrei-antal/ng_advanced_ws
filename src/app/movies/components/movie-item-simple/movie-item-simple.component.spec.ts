import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MovieItemSimpleComponent } from './movie-item-simple.component';

describe('MovieItemSimpleComponent', () => {
  let component: MovieItemSimpleComponent;
  let fixture: ComponentFixture<MovieItemSimpleComponent>;
  let movieItemDe: DebugElement;
  let movieItemEl: HTMLElement;

  let editCommentBtn: HTMLButtonElement;
  let readonlyCommentElement: HTMLDivElement;
  let editableCommentElement: HTMLDivElement;
  let commentElement: HTMLTextAreaElement;
  let wordsElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieItemSimpleComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieItemSimpleComponent);
    component = fixture.componentInstance;
    movieItemDe = fixture.debugElement;
    movieItemEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
