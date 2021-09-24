import { loadMovies, loadMoviesSuccess } from './movies.actions';
import { reducer, initialState } from './movies.reducer';

describe('Movies Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    it('should load movies', () => {
      const newState = {
        ...initialState,
        movies: [],
      };
      const action = loadMoviesSuccess({ movies: [] });
      const state = reducer(initialState, action);
      expect(state).toBe(newState);
    });
  });
});
