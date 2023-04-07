import { TestBed } from '@angular/core/testing';

import { YourMoviesService } from './your-movies.service';

describe('YourMoviesService', () => {
  let service: YourMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
