import { TestBed } from '@angular/core/testing';

import { DemandhandlerService } from './demandhandler.service';

describe('DemandhandlerService', () => {
  let service: DemandhandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandhandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
