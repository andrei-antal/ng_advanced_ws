import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreControlComponent } from './genre-control.component';

describe('GenreControlComponent', () => {
  let component: GenreControlComponent;
  let fixture: ComponentFixture<GenreControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
