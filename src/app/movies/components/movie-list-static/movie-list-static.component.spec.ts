import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListStaticComponent } from './movie-list-static.component';

describe('MovieListStaticComponent', () => {
  let component: MovieListStaticComponent;
  let fixture: ComponentFixture<MovieListStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListStaticComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
