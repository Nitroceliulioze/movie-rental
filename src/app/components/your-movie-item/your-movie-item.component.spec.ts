import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourMovieItemComponent } from './your-movie-item.component';

describe('YourMovieItemComponent', () => {
  let component: YourMovieItemComponent;
  let fixture: ComponentFixture<YourMovieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourMovieItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourMovieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
