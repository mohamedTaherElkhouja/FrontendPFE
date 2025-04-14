import { TestBed } from '@angular/core/testing';

import { PvDechetServiceService } from './pv-dechet-service.service';

describe('PvDechetServiceService', () => {
  let service: PvDechetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PvDechetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
