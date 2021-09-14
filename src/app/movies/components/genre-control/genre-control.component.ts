import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type Genres = {
  action: boolean;
  adventure: boolean;
  comedy: boolean;
  crime: boolean;
  drama: boolean;
  fantasy: boolean;
  historical: boolean;
  horror: boolean;
  mystery: boolean;
  romance: boolean;
  satire: boolean;
  'sci-fi': boolean;
  thriller: boolean;
  western: boolean;
};

@Component({
  selector: 'ngi-genre-control',
  templateUrl: './genre-control.component.html',
  styleUrls: ['./genre-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GenreControlComponent,
    },
  ],
})
export class GenreControlComponent implements OnInit, ControlValueAccessor {
  genres: Genres = {
    action: false,
    adventure: false,
    comedy: false,
    crime: false,
    drama: false,
    fantasy: false,
    historical: false,
    horror: false,
    mystery: false,
    romance: false,
    satire: false,
    'sci-fi': false,
    thriller: false,
    western: false,
  };

  onChange: (genres: string) => {};

  onTouched: () => {};

  private touched = false;

  writeValue(obj: string): void {
    obj
      .split(', ')
      .map((g) => g.toLowerCase())
      .filter((g) => g)
      .forEach((g) => (this.genres[g as keyof Genres] = true));
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}

  toggleGenre(genreKey: string): void {
    const key = genreKey as keyof Genres;
    this.genres[key] = !this.genres[key];
    let genres = [];
    for (const [genre, isSelected] of Object.entries(this.genres)) {
      if (isSelected) {
        genres.push(genre);
      }
    }
    this.onChange(genres.join(', '));
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }
}
