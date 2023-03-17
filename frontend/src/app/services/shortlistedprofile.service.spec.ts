import { TestBed } from '@angular/core/testing';

import { ShortlistedprofileService } from './shortlistedprofile.service';

describe('ShortlistedprofileService', () => {
  let service: ShortlistedprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortlistedprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
