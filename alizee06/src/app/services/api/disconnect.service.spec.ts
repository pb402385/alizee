import { TestBed } from '@angular/core/testing';

import { DisconnectService } from './disconnect.service';

describe('DisconnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisconnectService = TestBed.get(DisconnectService);
    expect(service).toBeTruthy();
  });
});
