import { TestBed } from '@angular/core/testing';

import { ByIdResolver } from './by-id.resolver';

describe('ByIdResolver', () => {
  let resolver: ByIdResolver<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
