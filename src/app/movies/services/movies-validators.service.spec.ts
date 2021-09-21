import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
  genreValidator,
  MovieGenreAsyncValidator,
  sciFiGenreYearValidator,
} from './movies-validators.service';
import { FormControl, FormGroup } from '@angular/forms';

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

describe('genreValidator', () => {
  it('should validate genre', () => {
    // Arrange
    const fc = new FormControl();
    fc.setValidators(genreValidator);

    // Act
    fc.setValue(['action', 'thriller']);
    // Assert
    expect(fc.status).toBe('VALID');

    // Act
    fc.setValue(['comedy']);
    // Assert
    expect(fc.status).toBe('VALID');

    // Act
    fc.setValue(['action', 'thrlr']);
    // Assert
    expect(fc.status).toBe('INVALID');

    // Act
    fc.setValue(['cmdy']);
    // Assert
    expect(fc.status).toBe('INVALID');
  });
});

describe('sciFiGenreYearValidator', () => {
  it('', () => {
    const genreCtrl = new FormControl('sci-fi');
    const yearCtrl = new FormControl();
    const fg = new FormGroup({
      genre: genreCtrl,
      year: yearCtrl,
    });

    fg.setValidators(sciFiGenreYearValidator);

    yearCtrl.setValue('2000');
    expect(fg.status).toBe('VALID');

    yearCtrl.setValue('1900');
    expect(fg.status).toBe('INVALID');
  });
});
