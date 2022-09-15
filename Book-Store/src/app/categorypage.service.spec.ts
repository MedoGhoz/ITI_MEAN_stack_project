import { TestBed } from '@angular/core/testing';

import { CategorypageService } from './categorypage.service';

describe('CategorypageService', () => {
  let service: CategorypageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorypageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
