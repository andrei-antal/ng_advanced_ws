import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MovieGenreAsyncValidator } from './movies-validators.service';

describe('MovieGenreAsyncValidator', () => {
  let service: MovieGenreAsyncValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MovieGenreAsyncValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
