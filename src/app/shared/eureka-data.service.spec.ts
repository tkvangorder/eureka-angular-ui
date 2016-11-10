/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EurekaDataService } from './eureka-data.service';

describe('Service: EurekaData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EurekaDataService]
    });
  });

  it('should ...', inject([EurekaDataService], (service: EurekaDataService) => {
    expect(service).toBeTruthy();
  }));
});
